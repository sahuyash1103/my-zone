import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from '../../context/reducer';
import _ from "lodash";
import { buyProducts } from '../../api/store-api';
import { emptyCart } from '../../api/user-api';
import './Payment.css';
import { useState } from 'react';

function Payment() {
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [card, setCard] = useState('');
    const [cvv, setCVV] = useState('');
    const [mm, setMM] = useState('');
    const [yy, setYY] = useState('');

    const isNumeric = (value) => /^\d+$/.test(value);



    useEffect(() => {
        !user && navigate('/login');

        user?.cart?.length === 0 && navigate('/');
    });

    const pay = async (e) => {
        e.preventDefault();
        const products = _.map(user?.cart, '_id');
        const result = await buyProducts(products, getCartTotal(user?.cart));
        if (result) {
            emptyCart();
            dispatch({
                type: "EMPTY_CART",
            });
            navigate("/");
            alert('all the products have been ordered.')
        }
    }

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
                            <input type={'text'} className='card' maxLength={'19'} placeholder="Card text" value={card} onChange={(e) => {
                                isNumeric(e.target.value) && setCard(e.target.value);
                            }} />
                            <div>
                                <input type={'text'} className='cvv' maxLength={'3'} placeholder="CVV text" value={cvv} onChange={(e) => {
                                    isNumeric(e.target.value) && setCVV(e.target.value);
                                }} />
                                <input type={'text'} className='MM' maxLength={'2'} placeholder="MM" value={mm} onChange={(e) => {
                                    isNumeric(e.target.value) && setMM(e.target.value);
                                }} />
                                <p style={{
                                    display: 'inline-block',
                                    fontSize: '35px',
                                    fontWeight: '200',
                                    MouseEvent: 'none',
                                }}>/</p>
                                <input type={'text'} className='YY' maxLength={'2'} placeholder="YY" value={yy} onChange={(e) => {
                                    isNumeric(e.target.value) && setYY(e.target.value);
                                }} />
                            </div>
                            <div>
                                <button className='cancel_btn' onClick={() => navigate("/")}>Cancel</button>
                                <button type='submit' value='submit' className='pay_btn' onClick={pay}>Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment