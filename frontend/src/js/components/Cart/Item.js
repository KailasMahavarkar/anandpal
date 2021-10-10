import React from "react";
import img from "../../../images/contactUs.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

function Item({ dispatch, info, addedToCart }) {
  return (
    <div className="items-container">
      <h1>{info.name}</h1>
      <div className="items-images">
        <img src={info.img} />
      </div>

      <div className="items-product">
        <h2>Rs. {info.cost}</h2>
        <p className="items-desc">{info.desc}</p>
        <div className="items-buttons">
          <button
            className="items-add"
            onClick={() =>
              dispatch({
                type: "add",
                payload: { ...info, quantity: 1 },
              })
            }
          >
            {addedToCart ? (
              <>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  style={{ margin: "0 2px" }}
                />
                Already In Cart
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ margin: "0 2px" }}
                />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
