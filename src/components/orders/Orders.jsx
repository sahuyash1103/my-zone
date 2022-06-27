import React from 'react'
import Order from './order/Order'
import { useStateValue } from '../../context/StateProvider'
import './Orders.css'

function Orders() {
    const [{ cart }] = useStateValue();

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders_oreder">
                {
                    cart.map(item =>
                        <Order order={cart} />
                    )
                }
            </div>
        </div>
    )
}

export default Orders