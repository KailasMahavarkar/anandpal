import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../blocks/Navbar";
import { isEmpty, url, randomHash, useEffectAsync } from "../../helper";
import axios from "axios";

const NewProduct = (props) => {
	const [productTitle, setProductTitle] = useState("");
	const [productInfo, setProductInfo] = useState("");
	const [productPrice, setProductPrice] = useState(0);
	const [discountPrice, setDiscountPrice] = useState(0);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const [currentPID, setCurrentPID] = useState(localStorage.getItem('currentPID'));

    useEffectAsync(async ()=>{
        
        try{
            if (localStorage.getItem('currentPID')){
                setCurrentPID(localStorage.getItem('currentPID'))
            }else{
                setCurrentPID(randomHash(24));
            }
            const checkExists = await axios.get(url(`/product/read/${currentPID}`))
            console.log("checkexists", checkExists);
            if (!isEmpty(checkExists)){
                const {title, price, discount_price, available_quantity, info} = checkExists.data.msg;
                setProductTitle(title);
                setProductPrice(price);
                setDiscountPrice(discount_price);
                setProductInfo(info);
                setAvailableQuantity(available_quantity);
            }
            console.log(checkExists)
        }catch(error){
            console.log(error)
        }

    }, [])

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
			}


			const result = await axios.post(
                url("/product/create"), 
                dataframe
            );
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

					<div className="split">
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
					</div>

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
