import React, { useState, useEffect, useRef } from "react";
import createIcon from "../../../src/assets/createIcon.svg";

import { useHistory } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync, isEmpty, randomHash } from "../../helper";
import yesNO from "../blocks/swal/yesNo";
import customToast from "../blocks/swal/customToast";

const Blogpage = (props) => {
	const history = useHistory();
	const [blogs, setBlogs] = useState([]);
    const [forceCount, setForceCount] = useState(0);

	const blogDeleteHandler = (title, id) => {
		const onSuccessDelete = async () => {
			try {
				const result = await axios.delete(url(`/blog/delete`), {
					headers: {},
					data: {
						blogID: id,
					},
				});
				customToast("success", result.data.msg);
                setForceCount((forceCount)=>forceCount+1);
			} catch (error) {
				customToast("error", error.response.data.msg);
			}
		};
		yesNO(title, onSuccessDelete);
        
	};

	useEffectAsync(async () => {
		try {
			localStorage.removeItem("currentID");
			const items = await axios.get(url("/blog/xread"));
			if (!isEmpty(items)) {
				setBlogs(items.data);
			}
		} catch (error) {
			console.log("error --> ", error.response);
		}
	}, [forceCount]);

	const newBlogHandler = () => {
		const currentID = randomHash();
		localStorage.setItem("currentID", currentID);
		history.push(`/blogs/${currentID}?newblog`);
	};

	const viewPageHandler = ({ target: { alt } }) => {
		localStorage.setItem("currentID", alt);
		history.push(`/blogs/${alt}`);
	};

	const renderBlogs = () => {
		if (blogs.length > 0) {
			const titleHandler = (title) => {
				const fixedLength = 80;
				if (title.length > fixedLength) {
					return title.substring(0, fixedLength) + "....";
				}
				return title;
			};

			return blogs.map((blog, index) => {
				return (
					<div className="blogposts__item" key={index}>
						<div className="blogposts__item__title">
							{titleHandler(blog.title)}{" "}
						</div>
						<div className="blogposts__item__inner">
							<div
								className="blogposts__item__inner__edit"
								onClick={() => {
									localStorage.setItem("currentID", blog._id);
									history.push(`/blogs/${blog._id}`);
								}}
							>
								<div onClick={viewPageHandler}>Edit</div>
							</div>
							<div
								className="blogposts__item__inner__delete"
								onClick={() =>
									blogDeleteHandler(blog.title, blog._id)
								}
							>
								<div>Delete</div>
							</div>
						</div>
						<div className="blogposts__item__id">{blog._id}</div>
						<div className="blogposts__item__timestamp">
							{new Date(blog.create_ts).toLocaleString()}
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div className="view">
			<Navbar />
			<div className="blogposts">
				<div className="alink blogposts__item">
					<div className="blogposts__item__main">
						<div className="blogposts__item__main__createicon">
							<img
								src={createIcon}
								alt="edit-icon"
								width="150px"
								height="150px"
								onClick={newBlogHandler}
							/>
						</div>
						<div
							className="blogposts__item__main__createtext"
							onClick={newBlogHandler}
						>
							Create New Blog
						</div>
					</div>
				</div>

				{renderBlogs()}
			</div>
		</div>
	);
};

export default Blogpage;
