import React, { useRef, useState } from "react";
import { useEffectAsync } from "../../../helper";
import axios from "axios";
import { url } from "../../../helper";
import { useLocation } from "react-router-dom";
import Blocks from "editorjs-blocks-react-renderer";

const EditorPage = () => {
	const location = useLocation();
	const currentID = useRef(location.pathname.split("/").pop());
	const [articleData, setArticleData] = useState({});
	const loaded = useRef(false);

	useEffectAsync(async () => {
		try {
			const result = await axios.get(
				url(`/api/blog/read/${currentID.current}`)
			);

			if (result.data.success) {
				setArticleData(result.data.msg.data);
				loaded.current = true;
			}
		} catch (error) {
			console.error(error.response);
		}
	}, []);

	return (
		<div className="editorjs__wrapper">
			<div id="editorjs">
				{console.log(articleData)}
				{loaded.current ? (
					<>
						<Blocks data={articleData} />
					</>
				) : null}
			</div>
		</div>
	);
};

export default EditorPage;
