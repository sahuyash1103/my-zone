import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from '../../context/reducer';
import './Payment.css';

function Payment() {
    const [{ user }] = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/login');

        user?.cart?.length === 0 && navigate('/');
    })

    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout (<Link to='/checkout'>{user?.cart?.length} items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>pincode, address</p>
                        <p>city, country</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            user?.cart.map((item, i) =>
                                <CheckoutProduct
                                    key={i}
                                    _id={item._id}
                                    title={item.title}
                                    images={item.images}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            )
                        }
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment__title">
                        <h3>Payment methode</h3>
                        <CurrencyFormat
                            renderText={(value) => (
                                <p>
                                    Total ({user?.cart?.length} items): <strong>{value}</strong>
                                </p>
                            )}
                            decimalScale={2}
                            value={getCartTotal(user?.cart)} // Part of the homework
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                        />
                    </div>
                    <div className="payment__details">
                        <form>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment