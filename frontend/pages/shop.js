import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Item from "../components/Cart/Item";
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { url, isEmpty } from "../helper";
// import { addItemToCart } from "../redux/actions/cartCreator";

function shop() {
	const [items, setItems] = useState({});
	const cartItems = useSelector((state) => state.shop.cart);

	useEffect(async () => {
		const { data } = await axios.get(url("/api/product/read"));
		setItems(data);
	}, []);

	return (
		<>
			<div className="title__lander title__lander-shop">
				Shopping Cart
			</div>
			{Object.keys(cartItems)?.length !== 0 && (
				<Link href="/checkout" className="nav_item">
					<div className="cart-icon">
						<FontAwesomeIcon
							icon={faShoppingCart}
							style={{ margin: "0 2px" }}
						/>
					</div>
				</Link>
			)}
			<div className="view">
				<div className="cart-container">
					{!isEmpty(items) ? (
						items.map((item, key) => {
							return (
								<Item
									key={key}
									info={item}
									showInfo={false}
									addedToCart={item._id in cartItems}
								/>
							);
						})
					) : (
						<FontAwesomeIcon
							icon={faSpinner}
							className="fa-spin"
							style={{ margin: "0 2px" }}
						/>
					)}
				</div>
				<h5 className="cart-no-more">No more items</h5>
			</div>
		</>
	);
}

export default shop;
