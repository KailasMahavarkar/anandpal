import React, { useRef, useReducer, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { isEmpty, url, randomHash, useEffectAsync } from "../../helper";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../tools";
import customToast from "../blocks/swal/customToast";
import blogReducer from "../reducers/blogReducer";
import ACTIONS from "../reducers/actions";

const Editorpage = () => {
	const editorInstance = useRef(null);
	const blogInitialState = {
		title: "",
		author: "",
		status: false,
	};
	const [blogState, blogDispatch] = useReducer(blogReducer, blogInitialState);
	const location = useLocation();
	const currentID = useRef("");

	const editorReadyHandler = async () => {
		try {
			currentID.current = location.pathname.split("/").pop();
			if (location.search !== "?newblog") {
				const result = await axios.get(
					url(`/blog/xread/${currentID.current}`)
				);

                blogDispatch({
                    type: ACTIONS.BLOG_STATE,
                    payload: {
                        title: result.data.msg.title,
                        author: result.data.msg.author,
                        status: result.data.msg.status,
                    },
                });

				await editorInstance.current.render(result.data.msg.data);
			}
		} catch (error) {
			console.log("main error -> ", error);
		}
	};


	const dataSaveHandler = async (blur = false) => {
		try {
			const savedData = await editorInstance.current.save();

			try {
				const PAYLOAD = {
					id: currentID.current,
					title: blogState.title,
					data: savedData,
					author: blogState.author,
					status: blogState.status,
				};
				const result = await axios.post(url("/blog/create"), PAYLOAD);
				if (blur === true) {
					if (blogState.status) {
						customToast("success", "Blog status is now published");
					} else {
						customToast(
							"warning",
							"Blog status is now unpublished"
						);
					}
				} else {
					customToast("info", "Data Saved");
				}
			} catch (error) {
                customToast("error", "error saving editor data");
				console.log("Error creating", error.response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="view">
			<Navbar />
			<div className="options mt-20">
				<div className="options__main options__title">
					<input
						type="text"
						placeholder="Blog Title"
						value={blogState.title}
						onChange={(e) =>
							blogDispatch({
								type: ACTIONS.BLOG_UPDATE_TITLE,
								payload: e.target.value,
							})
						}
					></input>
				</div>
				<div className="options__main options__author">
					<input
						type="text"
						placeholder="Author Name"
						value={blogState.author}
						onChange={(e) =>
							blogDispatch({
								type: ACTIONS.BLOG_UPDATE_AUTHOR,
								payload: e.target.value,
							})
						}
					></input>
				</div>
				<div
					className="options__clear"
					onClick={async () => {
						if (editorInstance) {
							await editorInstance.current.clear();
						}
					}}
				>
					Clear
				</div>

				<div className="options__clear" onClick={dataSaveHandler}>
					Save
				</div>

				<div
					className={`options__status options__status-${blogState.status}`}
					onClick={() => {
						blogDispatch({
							type: ACTIONS.BLOG_UPDATE_STATUS,
							payload: blogState.status,
						});

						dataSaveHandler(true);
					}}
				>
					{blogState.status
						? "Click to Publish"
						: "Rollback to Private"}
				</div>
			</div>

			<div className="editorjs__wrapper">
				<div id="editorjs">
					{editorInstance ? (
						<>
							<EditorJs
								tools={EDITOR_JS_TOOLS}
								instanceRef={(instance) =>
									(editorInstance.current = instance)
								}
								onReady={editorReadyHandler}
								enableReInitialize={true}
							/>
						</>
					) : (
						"loading editor ...."
					)}
				</div>
			</div>
		</div>
	);
};

export default Editorpage;
