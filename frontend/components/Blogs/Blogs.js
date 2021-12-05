import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.css";
import axios from "axios";
import { url, useEffectAsync } from "../../helper";
import prettyMS from "pretty-ms";
import Link from 'next/link';

const BlogCard = ({ blogState }) => (
	<Link href={`/blogs/${blogState._id}`}>
		<div className="blogpost__item">
			<div className="blogpost__item__image">
				<img src={blogState.header_image} alt="blogheader" />
			</div>
			<div className="blogpost__item__category">{blogState.category}</div>
			<div className="blogpost__item__title">{blogState.title}</div>
			<div className="blogpost__item__basic">{blogState.short_info}</div>
			<div className="blogpost__item__about">
				<div className="blogpost__item__about__logo">
					<img src="./ap_logo.jpg" alt="" />
				</div>
				<div className="blogpost__item__about__info">
					<div className="blogpost__item__about__info__author">
						{blogState.author}
					</div>
					<div className="blogpost__item__about__info__timestamp">
						{prettyMS(Date.now() - blogState.published_time, {
							compact: true,
						})}
						{" ago"}
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
					<div className="blogposts__item">
						<BlogCard blogState={blog} key={index} />
					</div>
				);
			});
		}
	};

	return <div className="blogposts">{renderBlogs()}</div>;
};

export default Blogs;
