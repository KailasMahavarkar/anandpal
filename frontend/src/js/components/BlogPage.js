import React from "react";
import Blogs from "./Blogs/Blogs";

function BlogPage() {
  return (
    <div>
      <div className="blogs-lander">
        Check Out our Blogs
        <div className="blogs-lander-scroll-container">
          <div className="blogs-lander-scroll"></div>
        </div>
      </div>
      <div className="blogs-container">
        <Blogs />
        <Blogs />
        <Blogs />
      </div>
    </div>
  );
}

export default BlogPage;
