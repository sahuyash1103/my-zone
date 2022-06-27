import React from 'react'
import CheckoutProduct from '../../checkout/checkoutProduct/CheckoutProduct'
import './Order.css'

function Order({ order }) {
    return (
        <div className='order'>
            <h2>order</h2>
            <p>oreder date and time</p>
            <p className="order_id">
                <small> order id</small>
            </p>
            {
                order.map((item, i) =>
                    <CheckoutProduct
                        key={i}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                        hideButton
                    />)
            }
            <div className="order_total">
                total
            </div>
        </div>
    )
}

export default Order