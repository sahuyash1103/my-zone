import React from 'react'
import {Link} from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider';
import CheckoutProduct from '../checkout/checkoutProduct/CheckoutProduct';
import './Payment.css';

function Payment() {
    const [{ user }] = useStateValue();

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
                                    image={item.image}
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
                    </div>
                    <div className="payment__details">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment