import React from "react";
import "./Checkout.css";
import Subtotal from "./subtotal/Subtotal";
import { useStateValue } from "../../context/StateProvider";
import CheckoutProduct from "./checkoutProduct/CheckoutProduct";

function Checkout() {
  const [{ cart, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {cart?.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
