import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

function Item({ dispatch, info, addedToCart }) {
  return (
    <div className="items-container">
      <h1>{info.title}</h1>
      <div className="items-images">
        <Carousel
          showArrows={true}
          autoPlay={true}
          showIndicators={true}
          showThumbs={false}
          stopOnHover={false}
          dynamicHeight={true}
          infiniteLoop={true}
          statusFormatter={() => null}
        >
          {info.images
            .filter((img) => img !== "")
            .map((img) => {
              return (
                img !== "" && <img src={img} className="blog-image" alt="" />
              );
            })}
        </Carousel>
      </div>

      <div className="items-product">
        <h5>
          MRP: <strike>{info.price} &#8377;</strike>
        </h5>
        <h3>Our Price: {info.discount_price} &#8377;</h3>
        <p className="items-desc">{info.info}</p>
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
