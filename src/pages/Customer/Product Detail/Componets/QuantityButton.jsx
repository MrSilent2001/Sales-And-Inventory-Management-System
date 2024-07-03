import React from "react";
import plus from "./Icons/iconImages/icon-plus.svg";
import minus from "./Icons/iconImages/icon-minus.svg";

const QuantityButton = ({ onQuant, onRemove, onAdd, productQuantity, quantityError }) => {
    const handleAddClick = () => {
        if (productQuantity === 0 || onQuant === productQuantity) {
            quantityError(true);
        } else {
            onAdd();
        }
    };

    return (
        <div className="amount">
            <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
                <img src={minus} alt="icon-minus" />
            </button>
            <p>{onQuant}</p>
            <button className="plus" onClick={handleAddClick}>
                <img src={plus} alt="icon-plus" />
            </button>
        </div>
    );
};

export default QuantityButton;
