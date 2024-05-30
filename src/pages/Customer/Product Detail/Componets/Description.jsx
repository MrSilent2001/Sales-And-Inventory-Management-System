import React from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";

const Description = ({ onQuant, onAdd, onRemove, onAddToCart, title, description, quantity, price, offer, category }) => {
    // Calculate the final price based on the offer if available
    const finalPrice = offer !== null ? price - (price * offer / 100) : price;

    return (
        <section className="productDetailDescription">
            <p className="pre">{category}</p>
            <h1>{title}</h1>
            <p className="desc">
                {description}
            </p>
            <div className="price">
                <div className="main-tag">
                    <p>${finalPrice.toFixed(2)}</p> {/* Display the final price */}
                    {offer !== null && <p>{offer}%</p>} {/* Display the offer percentage if available */}
                </div>
                {offer !== null && <s>{price.toFixed(2)}</s>} {/* Display the original price if offer is available */}
            </div>
            <div className="buttons">
                <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} productQuantity={quantity}/>
                {quantity === 0 ? (
                    <button className="add-to-cart" disabled={true} style={{ backgroundColor: 'red' }}>Out of stock</button>
                ) : (
                    <>

                        <button
                            className="add-to-cart"
                            onClick={() => {
                                onAddToCart(onQuant);
                            }}
                        >
                            <CartIcon/>
                            add to cart
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default Description;
