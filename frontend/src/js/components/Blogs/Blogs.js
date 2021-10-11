import React, { useState, useEffect } from "react";
import img1 from "../../../images/introductionBG.jpg";
import img2 from "../../../images/profile.png";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { url, useEffectAsync } from "../../../helper";

const Blogs = () => {
	const [allBlogs, setAllBlogs] = useState([]);

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/blog/read"));

			if (result.status === 200) {
				console.log(result.data);
				setAllBlogs(result.data);
			}
		} catch (error) {
			console.log(error.response);
		}
	}, []);

	const renderBlogs = () => {
		if (allBlogs.length > 0) {
			const titleHandler = (title) => {
				const fixedLength = 80;
				if (title.length > fixedLength) {
					return title.substring(0, fixedLength) + "....";
				}
				return title;
			};

			return allBlogs.map((blog, index) => {
				return (
					<div className="blogposts__item" key={index}>
						<div className="blogposts__item__title">
							{titleHandler(blog.title)}
						</div>
						<div className="blogposts__item__timestamp">
							{new Date(blog.create_ts).toLocaleString()}
						</div>
					</div>
				);
			});
		}
	};

	return <div className="blogposts">{renderBlogs()}</div>;
};

export default Blogs;
