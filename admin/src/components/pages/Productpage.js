import React, { useState, useEffect, useRef } from "react";

import editIcon from "../../../src/assets/editIcon.svg";
import deleteIcon from "../../../src/assets/deleteIcon.svg";
import createIcon from "../../../src/assets/createIcon.svg";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync, randomHash } from "../../helper";
import customToast from "../blocks/swal/customToast";
import yesNO from "../blocks/swal/yesNo";

const Productpage = (props) => {
	const history = useHistory();
	const [products, setProducts] = useState([]);
    const [forceRenderCount, setForceRenderCount] = useState(0);

	const productDeleteHandler =  (productID, productTitle) => {
		const yesHandler = async () => {
			try {
				const deleteProduct = await axios.delete(
					url(`/product/delete`),
					{
						headers: {},
						data: {
							productID: productID,
						},
					}
				);
				if (deleteProduct.status === 200) {
					customToast("success", `${productTitle} has been deleted`);
                    setForceRenderCount(forceRenderCount =>  forceRenderCount + 1);
				}
			} catch (error) {
				console.log(error.response.data);
			}
		};
		yesNO(productTitle, yesHandler);
	};

	useEffectAsync(async () => {
		try {
			const items = await axios.get(url("/api/product/read"));
			setProducts(items.data);
		} catch (error) {
			console.log(error.response);
		}
	}, [forceRenderCount]);

	const newProductHandler = () => {
		localStorage.removeItem("currentPID");
		const currentPID = randomHash();
		localStorage.setItem("currentPID", currentPID);

		// edge case -> user tries to edit localstorage
		if (!localStorage.getItem(currentPID)) {
			history.push("/");
		}

		history.push(`/products/${currentPID}?newproduct`);
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
							{titleHandler(product.title)}
						</div>
						<div className="productposts__item__inner">
							<div
								className="productposts__item__inner__edit"
								onClick={() => {
									localStorage.setItem(
										"currentPID",
										product._id
									);
									history.push(`/products/${product._id}`);
								}}
							>
								<div onClick={viewPageHandler}>Edit</div>
							</div>
							<div
								className="productposts__item__inner__delete"
								onClick={() => {
									productDeleteHandler(product._id, product.title);
								}}
							>
								<div>Delete</div>
							</div>
						</div>
						<div className="productposts__item__id">
							{product._id}
						</div>
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
