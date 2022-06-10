import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../../context/StateProvider";

function CheckoutProduct({ id, title, price, rating, image }) {
  const [, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
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
        <button onClick={removeFromCart}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
