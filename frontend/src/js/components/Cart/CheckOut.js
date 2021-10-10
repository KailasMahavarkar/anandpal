import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CheckOut() {
  const cartItems = useSelector((state) => state.cartItems);
  const name = useRef(null);
  const email = useRef(null);
  const phoneNo = useRef(null);
  const emailOTP = useRef(null);

  let userDetails = {};

  // condition
  // if (cartItems.length === 0) {
  //   window.location = "/shop";
  // }

  const [verified, setVerified] = useState(false);
  const [sentOTP, setSentOTP] = useState(false);

  const dispatch = useDispatch();
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity * item.cost;
  });

  // functions
  const sendOPT = async (e) => {
    {
      e.preventDefault();
      userDetails = {
        name: name.current.value,
        email: email.current.value,
        phoneNo: email.current.value,
      };
      console.log(userDetails);
      setSentOTP(true);
    }
  };

  // razor pay
  const razorpayHandler = async (e) => {
    e.preventDefault();
    const response = await Axios.post("http://localhost:4040/razorpay/order", {
      amount: total * 100,
    });
    const { data } = response;
    const options = {
      key: "rzp_test_11XaW3qVDXTYZC", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Anand Pallavi",
      description: "payment for your order",
      image: "https://cdn.logo.com/hotlink-ok/logo-social.png",

      readonly: {
        email: true,
        contact: true,
      },
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: async function (response) {
        try {
          const paymentId = response.razorpay_payment_id;
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          // console.log("call back before capture payment id", paymentId);
          const url = `http://localhost:4040/razorpay/capture/${paymentId}`;
          const captureResponse = await Axios.post(url, {
            amount: data.amount,
          });
          dispatch({
            type: "clear",
          });
          const successObj = JSON.parse(captureResponse.data);
          // console.log("call back after capture payment id",successObj.error.metadata.payment_id);
          if (successObj.captured) {
            console.log("payment successfull");
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
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      theme: {
        color: "#42b1e0",
      },
    };

    const razorpay = new window.Razorpay(options);
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
            <th>Quantity</th>
            <th>Price</th>
            <th>total</th>
          </tr>
          {cartItems.map((product, key) => (
            <tr key={key}>
              <td>
                <div className="checkout-cart-items-column1">
                  <img
                    src={product.img}
                    className="checkout-cart-items-image"
                  />
                  <div className="checkout-cart-items-column1-details">
                    <p>{product.name}</p>
                    <span>{product.desc}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="quantity-alteration">
                  <button
                    className="change-quantity"
                    onClick={() =>
                      dispatch({
                        type: "quantity",
                        payload: { quantity: -1, index: key },
                      })
                    }
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
                        payload: { quantity: +1, index: key },
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="cost">{product.cost} &#8377;</td>
              <td className="cost">
                {product.quantity * product.cost} &#8377;
              </td>
            </tr>
          ))}
        </table>
        <Link to="/shop" className="cart-link">
          &#8592; Back to Shopping...
        </Link>
      </div>
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
          <form className="checkout-form">
            <input
              type="text"
              name="name"
              id=""
              placeholder="Name"
              ref={name}
              disabled={sentOTP}
            />
            <input
              type="text"
              name="phoneNo"
              id=""
              placeholder="Phone Number"
              ref={phoneNo}
              disabled={sentOTP}
            />
            <input
              type="text"
              name="email"
              id=""
              placeholder="E-Mail"
              ref={email}
              disabled={sentOTP}
            />
            <div style={{ display: "flex", flex: "1 1", gap: "5px" }}>
              <button id="send_otp_button" onClick={(e) => sendOPT(e)}>
                Send OTP
              </button>
              <button
                id="send_otp_button"
                onClick={(e) => {
                  e.preventDefault();
                  setSentOTP(false);
                }}
              >
                Edit Details
              </button>
            </div>
            {sentOTP && (
              <>
                <p>A OTP has been sent to your E-mail.</p>
                <input
                  type="text"
                  name="emailOTP"
                  placeholder="Enter E-mail OTP"
                  id=""
                  ref={email}
                />
                {/* <input
                  type="text"
                  name="phoneOTP"
                  placeholder="Enter Phone Number OTP"
                  id=""
                /> */}
                <button
                  id="verify_button"
                  onClick={(e) => {
                    e.preventDefault();
                    setVerified(true);
                  }}
                >
                  Verify
                </button>
              </>
            )}
            <p>
              The contact number and the email address will be the asme while
              paying.
            </p>
            {verified && (
              <button id="checkout_button" onClick={(e) => razorpayHandler(e)}>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  style={{ margin: "0 5px", fontSize: "15px" }}
                />
                Pay &#8377;{total}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
