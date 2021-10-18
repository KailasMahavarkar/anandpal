import React, { useState, useEffect } from "react";
import img1 from "../../../images/introductionBG.jpg";
import img2 from "../../../images/profile.png";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { url, useEffectAsync } from "../../../helper";
import anandpal_logo from "../../../images/ap_logo.webp";
import prettyMS from "pretty-ms";
import { Link } from "react-router-dom";

const BlogCard = ({ blogState }) => (
	<Link to={`/blogs/${blogState._id}`}>
		<div className="blogcard">
			<div className="blogcard__image">
				<div className="blogcard__image">
					<img src={blogState.header_image} alt="blogheader" />
				</div>
			</div>
			<div className="blogcard__category">{blogState.category}</div>
			<div className="blogcard__title">{blogState.title}</div>
			<div className="blogcard__basic">{blogState.short_info}</div>
			<div className="blogcard__about">
				<div className="blogcard__about__logo">
					<img src={anandpal_logo} alt="" />
				</div>
				<div className="blogcard__about__info">
					<div className="blogcard__about__info__author">
						{blogState.author}
					</div>
					<div className="blogcard__about__info__timestamp">
						{prettyMS(Date.now() - blogState.published_time, {
							compact: true,
						})} {" ago"}
					</div>
				</div>
			</div>
		</div>
	</Link>
);

const Blogs = () => {
	const [allBlogs, setAllBlogs] = useState([]);

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/api/blog/read"));

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
						<BlogCard blogState={blog} />
					</div>
				);
			});
		}
	};

	return <div className="blogposts">{renderBlogs()}</div>;
};

export default Blogs;
