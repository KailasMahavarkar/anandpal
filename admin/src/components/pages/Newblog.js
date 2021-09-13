import React from "react";

import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";

import { useHistory } from "react-router-dom";

const Newblog = (props) => {
	return (
		<div className="view">
			<div className="editorjs__wrapper">
				<div id="editorjs">
					<EditorJs  tools={EDITOR_JS_TOOLS} />
				</div>
			</div>
		</div>
	);
};

export default Newblog;
