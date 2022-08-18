import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import { removeFromCart } from "../../../api/user-api";
import "./CheckoutProduct.css";

function CheckoutProduct({ _id, title, price, rating, image, hideButton }) {
  const [, dispatch] = useStateValue();

  const addItem = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        _id,
        title,
        image,
        price,
        rating,
      },
    });
  }

  const removeItem = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      _id: _id,
    });
    removeFromCart(_id) || addItem();
  };

  return (
    <div className="checkout_product">
      <img className="checkout_product_image" src={image} alt={title} />
      <div className="checkout_product_info">
        <p className="checkout_product_title">{title}</p>
        <p className="checkout_product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout_product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideButton &&
          <button onClick={removeItem}>Remove from Basket</button>
        }
      </div>
    </div>
  );
}

export default CheckoutProduct;
