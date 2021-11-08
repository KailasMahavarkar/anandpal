import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { url, sha256, isEmpty } from "../../../helper";
import customToast from "../Block/swal/customToast";
import Swal from "sweetalert2";

function CheckOut() {
	const cartItems = useSelector((state) => state.cartItems);
	const name = useRef(null);
	const email = useRef(null);
	const phoneNo = useRef(null);
	const emailOTP = useRef(null);
	const address = useRef(null);

	const [payData, setPayData] = useState({});
	const [paymentDone, setPaymentDone] = useState(false);

	const [verified, setVerified] = useState(false);
	const [sentOTP, setSentOTP] = useState(false);
	const [otpHEX, setOTP] = useState(0);

	const dispatch = useDispatch();
	let total = 0;
	cartItems.forEach((item) => {
		total += item.quantity * item.discount_price;
	});

	const paymentOptions = (amount, order_id) => {
		return {
			key: "rzp_test_11XaW3qVDXTYZC", // Enter the Key ID generated from the Dashboard
			amount: (total * 100)?.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "Anand Pallavi",
			description: "payment for your order",
			image: "https://cdn.logo.com/hotlink-ok/logo-social.png",

			readonly: {
				email: true,
				contact: true,
			},
			order_id: payData.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};
				try {
					const paymentResponse = await axios.post(
						url("/api/order/success"),
						{
							order_id: order_id,
						}
					);

					if (paymentResponse.data.success) {
						setPaymentDone(true);
						customToast("success", "payment successfull");
						Swal.fire(
							"Please Save your order id",
							paymentResponse.data.order_id
						);
						dispatch({
							type: "remove",
						});
					} else {
						customToast("error", paymentResponse.data.msg);
					}
				} catch (error) {
					console.log("catch block error", error);
				}
			},

			prefill: {
				name: "Gaurav Kumar",
				email: "gaurav.kumar@example.com",
				contact: "9999999999",
			},
			theme: {
				color: "#42b1e0",
			},
		};
	};

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	// razor pay
	const razorpayHandler = async (e) => {
		e.preventDefault();

		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?");
			return;
		}

		const razorpay = new window.Razorpay(
			paymentOptions(total, payData.order_id)
		);
		razorpay.on("payment.failed", function (response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});
		razorpay.open();
	};

	const otpSendHandler = ({ target: { name, email, phoneNo } }) => {
		if ((name.value, email.value, phoneNo.value)) {
			// const reply = axios.post(url("/api/sendmail"), {});
			// console.log(reply);

			setSentOTP(true);

			// 5555 -> dummy otp
			setOTP(
				"c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525"
			);

			console.log(otpHEX);
		}
	};

	const verifyOtpHandler = async () => {
		const CurrentOTPHex = await sha256(emailOTP.current.value);
		console.log(CurrentOTPHex);
		if (CurrentOTPHex === otpHEX) {
			setVerified(true);
			console.log("verified");

			if (isEmpty(payData)) {
				try {
					const response = await axios.post(url("/api/order"), {
						amount_paid: total * 100,
						order_name: name.current.value,
						order_email: email.current.value,
						address: address.current.value,
						phone_number: phoneNo.current.value,
						items_ordered: cartItems.map((x) => x._id),
					});

					setPayData(response.data);

					console.log("resp -->", response.data);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	return (
		<div className="checkout">
			<div className="checkout-cart-items">
				<div className="checkout-cart-items-header">
					<h2>Shopping Cart</h2>
					<h2>{cartItems.length} Items</h2>
				</div>
				<table className="checkout-cart-items-table">
					<tr>
						<th style={{ textAlign: "left" }}>Product Details</th>
						<th>Available Quantity</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>total</th>
					</tr>
					{cartItems.map((product, key) => (
						<tr key={key}>
							<td>
								<div className="checkout-cart-items-column1">
									<img
										src={
											product.images.filter(
												(img) => img !== ""
											)[0]
										}
										className="checkout-cart-items-image"
									/>
									<div className="checkout-cart-items-column1-details">
										<p>{product.title}</p>
										<span>{product.info}</span>
									</div>
								</div>
							</td>
							<td className="cost">
								{product.available_quantity} PCS
							</td>
							<td>
								<div className="quantity-alteration">
									<button
										className="change-quantity"
										onClick={() => {
											dispatch({
												type: "quantity",
												payload: {
													quantity: -1,
													index: key,
												},
											});
										}}
									>
										-
									</button>
									<span className="checkout-cart-items-quantity">
										{product.quantity}
									</span>
									<button
										className="change-quantity"
										onClick={() =>
											dispatch({
												type: "quantity",
												payload: {
													quantity: +1,
													index: key,
												},
											})
										}
									>
										+
									</button>
								</div>
							</td>

							<td className="cost">
								{product.discount_price} &#8377;
							</td>
							<td className="cost">
								{product.quantity * product.discount_price}{" "}
								&#8377;
							</td>
						</tr>
					))}
				</table>
				<Link to="/shop" className="cart-link">
					&#8592; Back to Shopping...
				</Link>
			</div>
			{Number(total) > 0 && !paymentDone ? (
				<div className="checkout-cart-summary">
					<div className="checkout-cart-summary-header">
						<h2>Shopping Cart </h2>
						<h2> {cartItems.length} Items</h2>
					</div>
					<div>
						<div className="final-costing">
							{/* <p>{cartItems.length}</p> */}
							<p>
								Total Price: <span>{total} &#8377;</span>
							</p>
						</div>
						<form
							className="checkout-form"
							action="javascript:void(0);"
							// method="post"
							onSubmit={otpSendHandler}
						>
							<input
								type="text"
								name="name"
								id=""
								placeholder="Name"
								ref={name}
								disabled={sentOTP}
								required={true}
							/>
							<input
								type="text"
								name="phoneNo"
								id=""
								placeholder="Phone Number"
								ref={phoneNo}
								disabled={sentOTP}
								required={true}
							/>
							<input
								type="text"
								name="email"
								id=""
								placeholder="E-Mail"
								ref={email}
								disabled={sentOTP}
								required={true}
							/>
							<input
								type="text"
								name="address"
								id=""
								placeholder="Address"
								ref={address}
								disabled={sentOTP}
								required={true}
							/>
							<div
								style={{
									display: "flex",
									flex: "1 1",
									gap: "5px",
								}}
							>
								<input
									type="submit"
									value="submit"
									id="send_otp_button"
									value="Send Otp"
								/>
							</div>
						</form>
						{sentOTP && (
							<>
								<form
									className="checkout-form"
									action="javascript:void(0);"
									// method="post"
									onClick={verifyOtpHandler}
								>
									<p>A OTP has been sent to your E-mail.</p>
									<input
										type="text"
										name="otp"
										placeholder="Enter E-mail OTP"
										id=""
										ref={emailOTP}
										required
									/>
									<input
										type="submit"
										id="verify_button"
										value="submit"
									/>
								</form>
							</>
						)}
						{/* <p>
							The contact number and the email address will be the
							asme while paying.
						</p> */}
						{verified && (
							<button
								id="checkout_button"
								onClick={(e) => razorpayHandler(e)}
							>
								<FontAwesomeIcon
									icon={faShoppingBag}
									style={{
										margin: "0 5px",
										fontSize: "15px",
									}}
								/>
								Pay &#8377;{total}
							</button>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default CheckOut;
