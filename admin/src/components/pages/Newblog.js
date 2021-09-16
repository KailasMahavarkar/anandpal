import React, { useState, useRef, useEffect } from "react";
import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";
import useUndo from 'use-undo';

const Newblog = (props) => {
	const [blogTitle, setBlogTitle] = useState("");
	const [blogAuthor, setBlogAuthor] = useState("");
	const [blogState, setBlogState] = useState("unpublish");
	const [blogUndo, setBlogUndo] = useState();
	const instanceRef = useRef(null);

	const blogStateHandler = () => {
		blogState == "publish"
			? setBlogState("unpublish")
			: setBlogState("publish");
		console.log(blogState);
	};


	const titleChangeHandler = ({ target: { value } }) => {
		setBlogTitle(value);
		console.log(blogTitle);
	};
	const authorChangeHandler = ({ target: { value } }) => {
		setBlogAuthor(value);
		console.log(blogTitle);
	};

	const dataSaveHandler = async () => {
        const savedData = await instanceRef.current.save()
        console.log(JSON.stringify(savedData))
	};

	const dataUndoHandler = async () => {
	
    };

	const dataClearHandler = async () => {
		await instanceRef.current.clear();
		setBlogTitle("");
		setBlogAuthor("");
	};

	return (
		<div className="view">
			<div className="options">
				<div className="options__main options__title">
					<input
						type="text"
						placeholder="Blog Title"
						value={blogTitle}
						onChange={titleChangeHandler}
					></input>
				</div>
				<div className="options__main options__author">
					<input
						type="text"
						placeholder="Author Name"
						value={blogAuthor}
						onChange={authorChangeHandler}
					></input>
				</div>
				<div className="options__clear" onClick={dataClearHandler}>
					Clear
				</div>
				<div
					className="options__save"
					onClick={dataSaveHandler}
				>
					Save
				</div>
				<div
					className="options__clear"
					onClick={dataUndoHandler}
				>
					Undo
				</div>

				<div className="options__status" onClick={blogStateHandler}>
					{blogState}
				</div>
			</div>

			<div className="editorjs__wrapper">
				<div id="editorjs">
					<EditorJs
						instanceRef={(instance) =>
							(instanceRef.current = instance)
						}
						tools={EDITOR_JS_TOOLS}
						// data={data}
					/>
				</div>
			</div>
		</div>
	);
};

export default Newblog;
