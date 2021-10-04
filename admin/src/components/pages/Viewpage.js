import React, { useState, useRef, useEffect} from "react";
import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import Navbar from "./../blocks/Navbar";
import axios from "axios";
import { isEmpty, url, randomHash, useEffectAsync } from "../../helper";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";


const Viewpage = (props) => {
	const [blogTitle, setBlogTitle] = useState("");
	const [blogAuthor, setBlogAuthor] = useState("");
	const [blogStatus, setBlogStatus] = useState("unpublished");
    const [editorData, setEditorData] = useState('');
	const editorInstance = useRef(null);
    
    
    useEffectAsync(async ()=>{
        const currentID = localStorage.getItem('currentID')
        try{
            const checkExists = await axios.get(url(`/blog/xread/${currentID}`))
            if (!isEmpty(checkExists)){
                
                setBlogAuthor(checkExists.data.msg.author);
                setBlogTitle(checkExists.data.msg.title);
                setBlogStatus(checkExists.data.msg.status);
                const parsed = JSON.parse(checkExists.data.msg.data);
                if (isEmpty(parsed.blocks)){
                    parsed['blocks'] = [{"id":"wvCLQ0wF5E","type":"paragraph","data":{"text":"Begin super blog ...","alignment":"left"}}]
                }
                setEditorData(parsed);
            }else{
                await editorInstance.current.clear();
            }
            console.log(checkExists)
        }catch(error){
            console.log(error)
        }

    }, [editorInstance])

	const blogStatusHandler = () => {
		if (blogStatus === "published") {
			setBlogStatus("unpublished");
		} else {
			setBlogStatus("published");
		}
	};

	const titleChangeHandler = ({ target: { value } }) => {
		setBlogTitle(value);
	};
	const authorChangeHandler = ({ target: { value } }) => {
		setBlogAuthor(value);
	};

	const dataSaveHandler = async () => {
		try {
			const savedData = await editorInstance.current.save();

            if (!localStorage.getItem("currentID")) {
                localStorage.setItem("currentID", randomHash());
            }
            const currentID = localStorage.getItem("currentID");
            

            try{
                const result = await axios.post(url('/blog/create'), {
                    id: currentID,
                    title: blogTitle,
                    data: JSON.stringify(savedData),
                    author: blogAuthor,
                    status: blogStatus
                })
                console.log({
                    id: currentID,
                    title: blogTitle,
                    data: JSON.stringify(savedData),
                    author: blogAuthor,
                    status: blogStatus
                });

                editorInstance.current.configuration.data = result.data.data;
            }catch(error){
                console.log("Error creating", error)
            }
           

            
		} catch (error) {
			console.error(error);
		}
    };

	const dataClearHandler = async () => {
		await editorInstance.current.clear();
	};

	return (
		<div className="view">
			<Navbar />
			<div className="options mt-20">
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
				<div className="options__save" onClick={dataSaveHandler}>
					Save
				</div>

				<div className="options__status" onClick={blogStatusHandler}>
					{blogStatus}
				</div>
			</div>

			<div className="editorjs__wrapper">
				<div id="editorjs">
					<EditorJs
						tools={EDITOR_JS_TOOLS}
						data={editorData}
						instanceRef={(instance) =>
							(editorInstance.current = instance)
						}
                        enableReInitialize={true} 
					/>
				</div>
			</div>
		</div>
	);
};

export default Viewpage;
