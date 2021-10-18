import React from "react";
import Blogs from "./Blogs/Blogs";

function BlogPage() {
	return (
		<div className="blogs">
			<div className="blogs-lander">
				Checkout our Blogs
			</div>
			<div className="blogs-container">
				<Blogs />
			</div>
		</div>
	);
}

export default BlogPage;
