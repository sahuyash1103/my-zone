import React from "react";
import "./Checkout.css";
import Subtotal from "./subtotal/Subtotal";
import { useStateValue } from "../../context/StateProvider";
import CheckoutProduct from "./checkoutProduct/CheckoutProduct";
import { emptyCart } from "../../api/user-api";

function Checkout() {
  const [{ user }, dispatch] = useStateValue();
  return (<>
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user ? user.username : "Guest"}</h3>
          <div className="cart_status">
            <h2 className="checkout__title">{user?.cart.length ? `you have ${user?.cart.length} items in cart` : "your cart is empty"}</h2>

            {
              !user.cart?.length || <button onClick={() => {
                emptyCart();
                dispatch({
                  type: "EMPTY_CART",
                });
              }}>
                Clear Cart
              </button>
            }
          </div>
          {user?.cart?.map((item, i) => (
            <CheckoutProduct
              key={i}
              _id={item._id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              images={item.images}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
    {
      !user || !user.cart?.length ? <div style={{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'width': '100%',
        'height': '50vh',
      }}>
        your cart is empty
      </div> : ''
    }
  </>
  );
}

export default Checkout;
