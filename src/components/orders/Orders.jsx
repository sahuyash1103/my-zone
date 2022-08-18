import React from 'react'
import Order from './order/Order'
import { useStateValue } from '../../context/StateProvider'
import './Orders.css'

function Orders() {
    const [{ user }] = useStateValue();

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders_oreder">
                {
                    user?.cart.map(item =>
                        <Order order={user?.cart} />
                    )
                }
            </div>
        </div>
    )
}

export default Orders