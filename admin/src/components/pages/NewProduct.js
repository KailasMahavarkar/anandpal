import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../blocks/Navbar";
import { isEmpty, url, randomHash, useEffectAsync } from "../../helper";
import axios from "axios";
import Upload from "rc-upload";

const NewProduct = (props) => {
	const [productTitle, setProductTitle] = useState("");
	const [productInfo, setProductInfo] = useState("");
	const [productPrice, setProductPrice] = useState(0);
	const [discountPrice, setDiscountPrice] = useState(0);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const currentImage = useRef(0);

	const [image0, setImage0] = useState("");
	const [image1, setImage1] = useState("");
	const [image2, setImage2] = useState("");

	const [currentPID, setCurrentPID] = useState(
		localStorage.getItem("currentPID")
	);

	useEffectAsync(async () => {
		try {
			if (localStorage.getItem("currentPID")) {
				setCurrentPID(localStorage.getItem("currentPID"));
			} else {
				setCurrentPID(randomHash(24));
			}
			const checkExists = await axios.get(
				url(`/product/read/${currentPID}`)
			);
			console.log("checkexists", checkExists);
			if (!isEmpty(checkExists)) {
				const {
					title,
					price,
					discount_price,
					available_quantity,
					info,
					image0,
                    image1,
                    image2
				} = checkExists.data.msg;

				if (!isEmpty(image0)){
				    setImage0(image0);
				}
				if (!isEmpty(image1)){
				    setImage1(image1);
				}
				if (!isEmpty(image2)){
				    setImage1(image2);
				}

				setProductTitle(title);
				setProductPrice(price);
				setDiscountPrice(discount_price);
				setProductInfo(info);
				setAvailableQuantity(available_quantity);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const infoChangeHandler = ({ target: { value } }) => {
		setProductInfo(value);
	};

	const titleChangeHandler = ({ target: { value } }) => {
		setProductTitle(value);
	};

	const productSaveHandler = async () => {
		try {

			const dataframe = {
				id: currentPID,
				title: productTitle,
				info: productInfo,
				price: productPrice,
				discount_price: discountPrice,
				available_quantity: availableQuantity,
                image0: image0,
                image1: image1,
                image2: image2,

			};

			const result = await axios.post(url("/product/create"), dataframe);
			console.log(result.data);
		} catch (error) {
			console.error(error.response);
		}
	};
	const priceChangeHandler = ({ target: { value } }) => {
		setProductPrice(Number(value));
	};

	const discountPriceChangeHandler = ({ target: { value } }) => {
		setDiscountPrice(Number(value));
	};

	const availableQuantityChangeHandler = ({ target: { value } }) => {
		setAvailableQuantity(Number(value));
	};

	const uploadProps = {
		action: url("/product/upload"),
		method: "POST",
		multiple: false,
		onStart(file) {
			console.log("onStart");
		},
		onSuccess(result) {
			if (currentImage.current === 0) {
				setImage0(result.file.url);
			}
			if (currentImage.current === 1) {
				setImage1(result.file.url);
			}
			if (currentImage.current === 2) {
				setImage2(result.file.url);
			}
		},
		onError(err) {
			console.log("onError", err);
		},
		beforeUpload(file, fileList) {
			console.log(file, fileList);
		},
	};

	return (
		<div className="view">
			<Navbar />
			<div className="newproduct">
				<div className="newproduct__main">
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Title
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={titleChangeHandler}
							value={productTitle}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Info
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={infoChangeHandler}
							value={productInfo}
						/>
					</div>

					<div className="split">
						<label htmlFor="" className="split__title">
							Product Price
						</label>
						<input
							type="text"
							className="split__input"
							onChange={priceChangeHandler}
							value={productPrice}
						/>
					</div>

					{/* <div className="split">
						<label htmlFor="" className="split__title">
							Discounted Price
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={discountPriceChangeHandler}
							value={discountPrice}
						/>
					</div> */}

					<div className="split">
						<label htmlFor="" className="split__title">
							Available Quantity
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={availableQuantityChangeHandler}
							value={availableQuantity}
						/>
					</div>

					<div className="split">
						{image0 ? (
							<>
								<img src={image0} width='auto' height='200px' />
							</>
						) : (
							<Upload
								{...uploadProps}
								className="split__upload"
								onClick={() => {
									currentImage.current = 0;
								}}
							>
								<button className="custom-file-upload">
									Upload 0
								</button>
							</Upload>
						)}

						{image1 ? (
							<>
								<img src={image1} width='auto' height='200px'/>
							</>
						) : (
							<Upload
								{...uploadProps}
								className="split__upload"
								onClick={() => {
									currentImage.current = 1;
								}}
							>
								<button className="custom-file-upload">
									Upload 1
								</button>
							</Upload>
						)}

						{image2 ? (
							<>
								<img src={image2} width='auto' height='200px' />
							</>
						) : (
							<Upload
								{...uploadProps}
								className="split__upload"
								onClick={() => {
									currentImage.current = 2;
								}}
							>
								<button className="custom-file-upload">
									Upload 2
								</button>
							</Upload>
						)}
					</div>

					<button
						className="split__save"
						onClick={productSaveHandler}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
