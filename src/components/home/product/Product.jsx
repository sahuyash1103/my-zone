import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import { addToCart } from "../../../api/user-api";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../../../services/authService";
import "./Product.css";

function Product({ _id, title, images, price, rating }) {
  const [, dispatch] = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();


  const removeItem = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: _id,
    });
  }

  const addItem = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        _id,
        title,
        images,
        price,
        rating,
      },
    });
    addToCart(_id) || removeItem();

  };

  return (
    <div className="product">
      <div className="product__info">
        <h4 onClick={() => {
          navigate(`/product/${_id}`, { state: { from: location } });
        }}>
          {title}
        </h4>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img src={images[0]} alt="" />

      <button
        onClick={
          getToken() ?
            addItem
            :
            () => navigate("/login", { state: { from: location } })
        }>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
