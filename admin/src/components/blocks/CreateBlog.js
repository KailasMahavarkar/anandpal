import React from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";

const CreateBlog = () => {
	return (
		<div className="wrapper_editorjs">
			<div id="editorjs">
				<EditorJs data={data} tools={EDITOR_JS_TOOLS} />
			</div>
		</div>
	);
};

export default CreateBlog;
