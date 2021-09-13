import React, { useState, useRef } from "react";

import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";

import { useHistory } from "react-router-dom";

const Newblog = (props) => {

    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const instanceRef = useRef(null);


    const titleChangeHandler = ({target: {value}}) => {
        setBlogTitle(value);
    }
    const authorChangeHandler = ({target: {value}}) => {
        setBlogAuthor(value);
    }

    
    const handleDataSave = async() => {
        const savedData = await instanceRef.current.save()
        console.log(savedData)
    }
    

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
				<div className="options__save" onClick={handleDataSave}>Save</div>
				<div className="options__delete">Delete</div>
				<div className="options__status">Status</div>
			</div>

			<div className="editorjs__wrapper">
				<div id="editorjs">
					<EditorJs 
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={EDITOR_JS_TOOLS} 
                    // data={data}
                    />
				</div>
			</div>
		</div>
	);
};

export default Newblog;
