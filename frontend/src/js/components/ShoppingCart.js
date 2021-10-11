import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Item from "./Cart/Item";
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import img from "../../images/contactUs.jpg";
// redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function ShoppingCart() {
  const [items, setItems] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const { data } = await axios.get("http://localhost:1000/product/read");
      setItems(data);
    };
    loadItems();
  }, []);

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
        {items ? (
          items.map((item, key) => {
            if (cartItems.some((cartItem) => cartItem.title === item.title)) {
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
    </>
  );
}

export default ShoppingCart;
