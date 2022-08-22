import React from 'react'
import CheckoutProduct from '../../checkout/checkoutProduct/CheckoutProduct'
import './Order.css'
import ObjectID from "bson-objectid"

function Order({ order }) {
    const dateTime = ObjectID(order._id).getTimestamp().toUTCString();
    return (
        <div className='order'>
            <h2>order</h2>
            <div className='order_details'>
                <p>oredered on: {dateTime}</p>
                <p className="order_id">
                     order id: {order._id}
                </p>
            </div>
            {
                order.products?.map((item, i) =>
                    <CheckoutProduct
                        key={i}
                        _id={item._id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        images={item.images}
                        hideButton
                    />
                )
            }
            <div className="order_total">
                total: {order.total}
            </div>
        </div>
    )
}

export default Order