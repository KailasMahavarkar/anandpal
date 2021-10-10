import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Item from "./Cart/Item";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import img from "../../images/contactUs.jpg";
// redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const items = [
  { name: "book", desc: "this is a book", cost: 600, img: img },
  { name: "cd", desc: "this is a cd", cost: 900, img: img },
  { name: "tie", desc: " this is a tie", cost: 650, img: img },
  { name: "cloth", desc: "this is a cloth", cost: 670, img: img },
];

function ShoppingCart() {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  return (
    <>
      {cartItems.length !== 0 && (
        <Link to="/checkout" className="nav_item">
          <div className="cart-icon">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ margin: "0 2px" }}
            />
          </div>
        </Link>
      )}
      <div className="cart-container">
        {items.map((item, key) => {
          if (cartItems.some((cartItem) => cartItem.name === item.name)) {
            return (
              <Item
                dispatch={dispatch}
                info={item}
                key={key}
                addedToCart={true}
              />
            );
          }
          return (
            <Item
              dispatch={dispatch}
              info={item}
              key={key}
              addedToCart={false}
            />
          );
        })}
      </div>
      <h5 className="cart-no-more">No more items</h5>
    </>
  );
}

export default ShoppingCart;
