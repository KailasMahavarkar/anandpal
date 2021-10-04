import React, { useState, useRef, useEffect} from "react";
import Navbar from "./../blocks/Navbar";
import axios from "axios";
import { isEmpty, url, randomHash, useEffectAsync } from "../../helper";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./../../tools";
import SnackBar from "../blocks/SnackBar";


const Viewpage = (props) => {
	const [blogTitle, setBlogTitle] = useState("");
	const [blogAuthor, setBlogAuthor] = useState("");
	const [blogStatus, setBlogStatus] = useState("unpublished");
    const [editorData, setEditorData] = useState('');
	const editorInstance = useRef(null);
    const [bar, setBar] = useState(false);
    const [newError, setNewError] = useState('')
    
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
        // setNewError('');
		try {
            
            const savedData = await editorInstance.current.save();
            
            
            if (!localStorage.getItem("currentID")) {
                localStorage.setItem("currentID", randomHash());
            }
            const currentID = localStorage.getItem("currentID");
            
            
            try{
                setBar(false);
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
                // setBar(true);
                editorInstance.current.configuration.data = result.data.data;
            }catch(error){
                console.log("Error creating", error)
                // setNewError('Error Creating EditorJS 1');
            }
           

            
		} catch (error) {
			console.error(error);
            // setNewError('Error Creating EditorJS 2');
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
            {bar ? (<SnackBar MESSAGE="Data Saved"></SnackBar>): (<></>)}
            {/* {newError ? (<SnackBar MESSAGE={newError}></SnackBar>): (<></>)} */}
		</div>
	);
};

export default Viewpage;
