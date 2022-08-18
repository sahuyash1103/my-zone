import React from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../../context/StateProvider";
import { getCartTotal } from "../../../context/reducer";
import "./Subtotal.css";

function Subtotal() {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({user?.cart?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(user?.cart)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => user?.cart.length ? navigate('/payment') : null}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
