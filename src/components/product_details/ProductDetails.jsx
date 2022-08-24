import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useParams } from "react-router-dom";
import { buyProducts, getProdeuct } from "../../api/store-api";
import { addToCart } from "../../api/user-api";
import { getToken } from "../../services/authService";
import "./ProductDetails.css";

function ProductDetails() {
    const { product_id } = useParams();
    const [, dispatch] = useStateValue();
    const [product, setProduct] = useState();
    const [image, setImage] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getProdeuct(product_id).then((result) => {
            setProduct(result);
            setImage(result.images[0])
        });

    }, [product_id]);

    const removeItem = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: product._id,
        });
    }

    const addItem = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                _id: product._id,
                title: product.title,
                images: product.images,
                price: product.price,
                rating: product.rating,
            },
        });
        addToCart(product._id) || removeItem();

    };

    const buy = async () => {
        const result = await buyProducts([product._id], product.price);
        if (!result) {
            alert('order failed.');
        }
    }

    return ((product && image) &&
        <div className="product-details">
            <div className="left_container">
                <div className="image_container">
                    <div className="more_images">
                        {
                            product.images.map((img, i) =>
                                <img onClick={(e) => {
                                    setImage(e.target.src);
                                    console.log(image === img);
                                }
                                } src={img} key={i} alt="more"
                                    style={image === img ? { borderColor: 'black' } : ''}
                                />
                            )
                        }
                    </div>
                    <img src={image || product.images[0]} alt="product" />
                </div>
                <div className="button_container">
                    <button onClick={
                        getToken() ?
                            addItem
                            :
                            () => navigate("/login", { state: { from: location } })}
                        className="add-to-cart">
                        ADD TO CART
                    </button>
                    <button onClick={getToken() ?
                        buy :
                        () => navigate("/login", {
                            state: { from: location }
                        })}
                        className="buy-btn">BUY</button>
                </div>
            </div>
            <div className="right_container">
                <h2>{product.title}</h2>
                <div className="rating_container">
                    {Array(product.rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))}
                </div>
                <div className="price_container">
                    ${product.price}
                </div>

                <div className="description_container">
                    NO DESCRIPTION PROVIDED.
                    <br />
                    <br />

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ducimus voluptatibus eveniet iste quis incidunt culpa eius ipsa rerum officiis dolores corrupti aliquid libero doloremque, excepturi recusandae provident laborum illum quam minus nihil veritatis temporibus modi. Reprehenderit dolorem possimus tenetur commodi neque aperiam inventore dolores eos minus sit voluptates molestiae voluptatibus, officia recusandae praesentium ratione impedit doloribus obcaecati, beatae odio fugiat est dolorum. Repellendus repudiandae possimus, officia earum esse commodi sunt consequuntur placeat labore, dolore mollitia quisquam nesciunt, dicta quibusdam nam eligendi reprehenderit nobis cum aspernatur minus. Ipsam, neque quas itaque odit id sint explicabo. Corrupti excepturi illum voluptatum fugiat? Facilis dignissimos mollitia sed dolorum ratione! Quaerat tempora qui aspernatur. Quos ex qui ullam molestias assumenda, voluptatem praesentium inventore ut soluta deserunt suscipit, molestiae impedit esse animi iure autem eius dicta officiis doloremque! A atque assumenda fugit quae excepturi, enim officiis laudantium accusamus eos, sed nesciunt necessitatibus! Odit neque rem repellendus corporis soluta natus, sed maiores obcaecati tempora iure aliquam inventore tempore cupiditate minus rerum. Nisi nam totam voluptatum possimus doloribus mollitia molestiae libero sint voluptas quas, velit laborum! Explicabo vitae, saepe magnam laudantium inventore animi, natus sapiente veritatis repellendus magni dolorem? Odio id ipsam autem beatae animi dolorem eaque!
                </div>
                <div className="reviews_container">
                    NO REVIEWS PROVIDED.

                    <br />
                    <br />

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ducimus voluptatibus eveniet iste quis incidunt culpa eius ipsa rerum officiis dolores corrupti aliquid libero doloremque, excepturi recusandae provident laborum illum quam minus nihil veritatis temporibus modi. Reprehenderit dolorem possimus tenetur commodi neque aperiam inventore dolores eos minus sit voluptates molestiae voluptatibus, officia recusandae praesentium ratione impedit doloribus obcaecati, beatae odio fugiat est dolorum. Repellendus repudiandae possimus, officia earum esse commodi sunt consequuntur placeat labore, dolore mollitia quisquam nesciunt, dicta quibusdam nam eligendi reprehenderit nobis cum aspernatur minus. Ipsam, neque quas itaque odit id sint explicabo. Corrupti excepturi illum voluptatum fugiat? Facilis dignissimos mollitia sed dolorum ratione! Quaerat tempora qui aspernatur. Quos ex qui ullam molestias assumenda, voluptatem praesentium inventore ut soluta deserunt suscipit, molestiae impedit esse animi iure autem eius dicta officiis doloremque! A atque assumenda fugit quae excepturi, enim officiis laudantium accusamus eos, sed nesciunt necessitatibus! Odit neque rem repellendus corporis soluta natus, sed maiores obcaecati tempora iure aliquam inventore tempore cupiditate minus rerum. Nisi nam totam voluptatum possimus doloribus mollitia molestiae libero sint voluptas quas, velit laborum! Explicabo vitae, saepe magnam laudantium inventore animi, natus sapiente veritatis repellendus magni dolorem? Odio id ipsam autem beatae animi dolorem eaque!
                </div>
            </div>
        </div>
    )
}

export default ProductDetails