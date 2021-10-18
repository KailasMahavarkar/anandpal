import React, { useRef, useState, useEffect } from "react";
import { useEffectAsync } from "../../../helper";
import axios from "axios";
import { url } from "../../../helper";
import { useLocation } from "react-router-dom";
import Output from "editorjs-react-renderer";

const EditorPage = () => {
	const location = useLocation();
	const currentID = useRef(location.pathname.split("/").pop());
	const [loaded, setLoaded] = useState(false);
	const [editorData, setEditorData] = useState({});

	const Post = (props) => {
		console.log("props -->", props.data);
		return (
			<section>
				<Output data={props.data} />
			</section>
		);
	};

	useEffectAsync(async () => {
		try {
			const result = await axios.get(
				url(`/api/blog/read/${currentID.current}`)
			);

			if (result.data.success) {
				setEditorData(result.data.msg.data);
				setLoaded(true);
			}
		} catch (error) {
			console.error(error.response);
		}
	}, []);

	return (
		<div className="editorjs__wrapper">
			<div id="editorjs">
				{loaded ? <Post data={editorData} /> : null}
			</div>
		</div>
	);
};

export default EditorPage;
