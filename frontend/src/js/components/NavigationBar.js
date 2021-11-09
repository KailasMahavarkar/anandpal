import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function NavigationBar() {
	const cartItems = useSelector((state) => state.cartItems);
	const history = useHistory();
	return (
		<div className="nav_bar">
			<div className="company">
				<div className="relative_container">
					<div
						className="company_logo"
						onClick={() => history.push("/")}
					/>
				</div>
				<div className="relative_container">
					<div
						className="company_text"
						onClick={() => history.push("/")}
					>
						anandpal
					</div>
				</div>
			</div>
			<div className="nav_items">
				<Link to="/" className="nav_item">
					home
				</Link>
				<Link to="/about_us" className="nav_item">
					about us
				</Link>
				<Link to="" className="nav_item">
					dreams
				 </Link>
				{/*<Link to="/business" className="nav_item">
					business
				</Link> */}
				{/* <a href="" className="nav_item">
          lifestyle & adventure
        </a> */}
				<Link to="/blogs" className="nav_item">
					blogs
				</Link>
				<Link to="/shop" className="nav_item">
					Shop
				</Link>
				<Link to="/checkout" className="nav_item">
					{cartItems.length === 0 ? null : (
						<div className="itemsInCart"></div>
					)}
					Cart
				</Link>
			</div>
		</div>
	);
}

export default NavigationBar;
