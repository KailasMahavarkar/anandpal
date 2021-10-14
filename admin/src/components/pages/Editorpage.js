import React, { useRef, useReducer, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { isEmpty, url, randomHash, useEffectAsync, HEADER_PAYLOAD } from "../../helper";
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
		published_status: true,
	};
	const [blogState, blogDispatch] = useReducer(blogReducer, blogInitialState);
	const location = useLocation();
	const currentID = useRef("");

	const editorReadyHandler = async () => {
		currentID.current = location.pathname.split("/").pop();
		if (location.search !== "?newblog") {
			try {
				const result = await axios.get(
					url(`/blog/xread/${currentID.current}`),
                    {
                        headers: HEADER_PAYLOAD
                    }
				);
				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_AUTHOR,
					payload: result.data.msg.author,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_TITLE,
					payload: result.data.msg.title,
				});

				blogDispatch({
					type: ACTIONS.BLOG_UPDATE_STATUS,
					payload: result.data.msg.published_status,
				});

				if (isEmpty(result.data.msg.data.blocks)) {
					await editorInstance.current.clear();
				} else {
					await editorInstance.current.render(result.data.msg.data);
				}
			} catch (error) {
				console.log(error);
			}
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
					published_status: blogState.published_status,
				};
				const result = await axios.post(url("/blog/create"), PAYLOAD);
				if (blur === true) {
					blogDispatch({
						type: ACTIONS.BLOG_UPDATE_STATUS,
						payload: blogState.published_status,
					});

					if (blogState.published_status) {
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
					className={`options__status options__status-${blogState.published_status}`}
					onClick={() => dataSaveHandler(true)}
				>
					{blogState.published_status
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
