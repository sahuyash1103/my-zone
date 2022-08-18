import React from 'react'
import Product from '../product/Product';
import "./Layout.css";

function Layout({ products }) {
    return (
        <>
            <div className="home__row">
                {products.map(((product, i) =>
                    <Product
                        key={i}
                        _id={product._id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        image={product.images}
                    />))
                }
            </div>
        </>
    )
}

export default Layout;