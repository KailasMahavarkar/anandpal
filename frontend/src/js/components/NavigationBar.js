import React from "react";

function NavigationBar() {
  return (
    <div className="nav_bar">
      <div className="company">
        <div className="relative_container">
          <div className="company_logo" />
        </div>
        <div className="relative_container">
          <div className="company_text">anandpal</div>
        </div>
      </div>
      <div className="nav_items">
        <a href="/" className="nav_item">
          home
        </a>
        <a href="/about_us" className="nav_item">
          about us
        </a>
        <a href="" className="nav_item">
          dreams
        </a>
        <a href="/business" className="nav_item">
          business
        </a>
        <a href="" className="nav_item">
          lifestyle & adventure
        </a>
        <a href="" className="nav_item">
          blogs{" "}
        </a>
        <a href="" className="nav_item">
          cart
        </a>
      </div>
    </div>
  );
}

export default NavigationBar;
