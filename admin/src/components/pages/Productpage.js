import React, { useState, useEffect } from "react";

import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import { useHistory } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync, randomHash } from "../../helper";

const Productpage = (props) => {
	const history = useHistory();
	const [products, setProducts] = useState([]);


	const productDeleteHandler = async () => {
        const productID = localStorage.getItem("currentPID");
		if (window.confirm(`Do you want to delete ${productID}`)) {
			try {
				const deleteProduct = await axios.delete(url(`/product/delete`), {
					headers: {},
					data: {
						productID: productID,
					},
				});
				if (deleteProduct.status === 200) {
					console.log(products);
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
			const items = await axios.get(url("/product/read"));
			setProducts(items.data);
		} catch (error) {
			console.log(error.response);
		}
	}, [products]);

	const newProductHandler = () => {
		localStorage.removeItem("currentPID");
		const currentPID = randomHash();
		localStorage.setItem("currentPID", currentPID);

		// edge case -> user tries to edit localstorage
		if (!localStorage.getItem(currentPID)) {
			history.push("/");
		}

		history.push(`/products/${currentPID}`);
	};

	const viewPageHandler = ({ target: { alt } }) => {
		localStorage.setItem("currentPID", alt);

		history.push(`/products/${alt}`);
	};

	const renderProducts = () => {
		if (products.length > 0) {
			const titleHandler = (title) => {
				const fixedLength = 80;
				if (title.length > fixedLength) {
					return title.substring(0, fixedLength) + "....";
				}
				return title;
			};

			return products.map((product, index) => {
				return (
					<div className="productposts__item" key={index}>
						<div className="productposts__item__title">
							{titleHandler(product.title)}{" "}
						</div>
                        <div className="productposts__item__inner">
							<div
								className="productposts__item__inner__edit"
								onClick={() => {
									localStorage.setItem("currentPID", product._id);
									history.push(`/products/${product._id}`);
								}}
							>
								<div onClick={viewPageHandler}>Edit</div>
							</div>
							<div
								className="productposts__item__inner__delete"
								onClick={() => {
									localStorage.setItem(
										"currentPID",
										product._id
									);
								}}
							>
								<div onClick={productDeleteHandler}>Delete</div>
							</div>
						</div>
						<div className="productposts__item__id">{product._id}</div>
						<div className="productposts__item__timestamp">
							{new Date(product.create_ts).toLocaleString()}
						</div>
					</div>
				);
			});
		}
	};

	return (
        
		<div className="view">
			<Navbar />
			<div className="productposts">
				<div className="alink productposts__item">
					<div className="productposts__item__main">
						<div className="productposts__item__main__createicon">
							<img
								src={createIcon}
								alt="edit-icon"
								width="150px"
								height="150px"
								onClick={newProductHandler}
							/>
						</div>
						<div
							className="productposts__item__main__createtext"
							onClick={newProductHandler}
						>
							Create New product
						</div>
					</div>
				</div>

				{renderProducts()}
			</div>
		</div>
	);
};

export default Productpage;
