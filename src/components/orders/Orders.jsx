import React, { useState } from 'react'
import { useEffect } from 'react';
import { getOrders } from '../../api/user-api';
import Order from './order/Order'
import './Orders.css'

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then((result) => {
                setOrders(result.orders);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders_oreder">
                {
                    orders && orders.length !== 0 ?
                        orders.map((order, i) =>
                            <Order key={i} order={order} />
                        )
                        :
                        <div style={{
                            'display': 'flex',
                            'alignItems': 'center',
                            'justifyContent': 'center',
                            'width': '100%',
                            'height': '50vh',
                        }}>
                            No Orders Yet
                        </div>
                }
            </div>
        </div>
    )
}

export default Orders