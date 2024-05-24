import React from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";

const Description = ({ onQuant, onAdd, onRemove, onAddToCart, title, description, quantity, price, offer, category }) => {

    const finalPrice = price - (price * offer / 100);
    const earlierPrice = price + (price * offer / 100);

    return (
        <section className="productDetailDescription">
            <p className="pre">{category}</p>
            <h1>{title}</h1>
            <p className="desc">
                {description}
            </p>
            <div className="price">
                <div className="main-tag">
                    <p>{price.toFixed(2)}</p> {/* Display the final price */}
                    <p>{offer}%</p> {/* Display the offer percentage */}
                </div>
                <s>${earlierPrice.toFixed(2)}</s> {/* Display the original price */}
            </div>
            <div className="buttons">
                <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} productQuantity={quantity}/>
                <button
                    className="add-to-cart"
                    onClick={() => {
                        onAddToCart(onQuant);
                    }}
                >
                    <CartIcon/>
                    add to cart
                </button>
            </div>
        </section>
    );
};

export default Description;
