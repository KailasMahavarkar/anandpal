import React, { useState, useRef, useEffect, useReducer } from "react";
import Navbar from "./../blocks/Navbar";
import { isEmpty, url, randomHash, useEffectAsync, xiter } from "../../helper";
import axios from "axios";
import Upload from "rc-upload";
// import SnackBar from './../blocks/SnackBar';
import productReducer from "./../reducers/productReducer";
import ACTIONS from "../reducers/actions";
import yesNO from "../blocks/swal/yesNo";
import customToast from "../blocks/swal/customToast";
import uploadWait from "../blocks/swal/uploadWait";

const NewProduct = (props) => {
	const currentPID = useRef(localStorage.getItem("currentPID"));
	const productInitialState = {
		id: currentPID.current,
		title: "",
		price: 0,
		discount_price: 0,
		available_quantity: 0,
		info: "",
		images: ["", "", "", "", "", ""],
	};

	const [state, dispatch] = useReducer(productReducer, productInitialState);
	const [currentImage, setCurrentImage] = useState(0);

	useEffectAsync(async () => {
		try {
			if (localStorage.getItem("currentPID")) {
				currentPID.current = localStorage.getItem("currentPID");
			} else {
				currentPID.current = randomHash(24);
			}

			const checkExists = await axios.get(
				url(`/product/read/${currentPID.current}`)
			);

			if (!isEmpty(checkExists.data.msg)) {
				dispatch({
					type: ACTIONS.PRODUCT_STATE,
					payload: checkExists.data.msg,
				});
			}
		} catch (error) {
			console.log("error new product --> ", error.response);
		}
	}, []);

	const productSaveHandler = async () => {
		const productData = {
			...state,
		};
		try {
			const result = await axios.post(
				url("/product/create"),
				productData
			);
			console.log(result.data);
		} catch (error) {
            customToast("error", error.response.data.msg);
			console.error("error saving product --> ", error.response);
		}
	};

	const uploadProps = {
		action: url("/product/upload"),
		method: "POST",
		multiple: false,
		onStart(file) {
            console.log(file.name)
            uploadWait(file.name)
		},
		onSuccess(result) {
            const PAYLOAD = { number: currentImage['x'], url: result.file.url }
			dispatch({
				type: ACTIONS.UPDATE_IMAGES,
				payload: PAYLOAD,
			});
            customToast("success", `New Image Uploaded at ${currentImage['x']}`);
            productSaveHandler()
		},
		onError(err) {
			console.log("onError", err);
		},
		beforeUpload(file, fileList) {
			console.log(file, fileList);
		},
	};



    const imageConfirmHandler = (x) => {
        const yesHandler = async () => {
            dispatch({
                type: ACTIONS.UPDATE_IMAGES,
                payload: { number: x, url: "" },
            });
            await productSaveHandler();
        }
        yesNO(x, yesHandler)
	};

	const repeatUpload = (x) => (
		<div className="card">
			{state.images[x] ? (
				<>
					<img
						src={state.images[x]}
						alt=""
						height="200px"
						width="auto"
					/>
					<div className="card__control">
						<div className="card__control__button">
							<div>
								<Upload
									{...uploadProps}
									onClick={() => setCurrentImage({ x })}
								>
									<div className="card__upload__text">
										{`Upload image ${x}`}
									</div>
								</Upload>
							</div>
						</div>
						<div className="card__control__button ">
							<div
								className="card__upload__delete"
								onClick={()=>imageConfirmHandler(x)}
							>
								delete
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="card__upload">
						<Upload
							{...uploadProps}
							onClick={() => setCurrentImage({ x })}
						>
							<div className="card__upload__text">
								{`Upload image ${x}`}
							</div>
						</Upload>
					</div>
				</>
			)}
		</div>
	);



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
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_TITLE,
									payload: value,
								})
							}
							value={state.title}
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
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_INFO,
									payload: value,
								})
							}
							value={state.info}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Price
						</label>
						<input
							type="text"
							className="split__input"
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_PRICE,
									payload: value,
								})
							}
							value={state.price}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Discounted Price
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_DISCOUNT_PRICE,
									payload: value,
								})
							}
							value={state.discount_price}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Available Quantity
						</label>
						<input
							type="text"
							className="split__input"
							placeholder="...."
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_AVAILABLE_QUANTITY,
									payload: value,
								})
							}
							value={state.available_quantity}
						/>
					</div>

					<div>
						<div className="split">
							{[0, 1].map((x) => repeatUpload(x))}
						</div>
						<div className="split">
							{[2, 3].map((x) => repeatUpload(x))}
						</div>
						<div className="split">
							{[4, 5].map((x) => repeatUpload(x))}
						</div>
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
