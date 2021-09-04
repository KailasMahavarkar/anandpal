import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import FormData from "form-data";

import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";

function App() {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [data, setData] = useState("");

	const authorChangeHandler = (e) => {
		setAuthor(e.target.value);
		console.log(author);
	};

	const titleChangeHandler = (e) => {
		setTitle(e.target.value);
		console.log(title);
	};

	return (
		<div className="App">
            <div className="wrapper_editorjs">
                <div id="editorjs">
                    <EditorJs data={data} tools={EDITOR_JS_TOOLS} />
                </div>
            </div>


			<input
				type="submit"
				value="submit"
				onClick={() => {
					console.log("submit clicked");
				}}
			/>

			{/* <form
				action="http://localhost:1000/blog/create"
				method="post"
				enctype="multipart/form-data"
			>
				<div className="author">
					author:{" "}
					<input
						type="text"
						name="author"
						value={author}
						onChange={authorChangeHandler}
					/>
				</div>
				<div className="title">
					title:{" "}
					<input
						type="text"
						name="title"
						value={title}
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="file">
					<input type="file" name="avatar" />
				</div>
				
			</form> */}
		</div>
	);
}

export default App;
