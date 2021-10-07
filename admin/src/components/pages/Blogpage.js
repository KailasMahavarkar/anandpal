import React, { useState, useEffect } from "react";
import createIcon from "../../../src/assets/createIcon.svg";

import { Link, useHistory } from "react-router-dom";
import auth from "../../auth";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync, isEmpty, randomHash } from "../../helper";

const Blogpage = (props) => {
	const history = useHistory();
	const [blogs, setBlogs] = useState([]);

	const blogDeleteHandler = async () => {
		let deleteID = localStorage.getItem("currentID");
		if (window.confirm(`Do you want to delete ${deleteID}`)) {
			try {
				const deleteBlog = await axios.delete(url(`/blog/delete`), {
					headers: {},
					data: {
						blogID: deleteID,
					},
				});
				if (deleteBlog.status === 200) {
					console.log(blogs);
					localStorage.removeItem(deleteID);
				}
			} catch (error) {
				console.log(error.response.data);
			}
		} else {
			console.log("You pressed cancel!");
		}
	};

	useEffectAsync(async () => {
        try {
            localStorage.removeItem("currentID");
			const items = await axios.get(url("/blog/xread"));

            console.log(items)

            if (!isEmpty(items)){
                setBlogs(items.data);
            }
		} catch (error) {
			console.log("error --> ", error.response);
		}
	}, []);

	const newBlogHandler = () => {
		const currentID = randomHash();
		localStorage.setItem("currentID", currentID);
		history.push(`/blogs/${currentID}`);
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
								onClick={() => {
									localStorage.setItem("currentID", blog._id);
								}}
							>
								<div onClick={blogDeleteHandler}>Delete</div>
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
