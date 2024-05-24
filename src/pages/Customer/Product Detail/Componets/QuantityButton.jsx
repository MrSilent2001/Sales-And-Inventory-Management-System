import React from "react";
import plus from "./Icons/iconImages/icon-plus.svg";
import minus from "./Icons/iconImages/icon-minus.svg";

const QuantityButton = ({ onQuant, onRemove, onAdd, productQuantity }) => {
    return (
        <div className="amount">
            <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
                <img src={minus} alt="icon-minus" />
            </button>
            <p>{onQuant}</p>
            <button className="plus" onClick={onAdd} disabled={onQuant === productQuantity}>
                <img src={plus} alt="icon-plus" />
            </button>
        </div>
    );
};

export default QuantityButton;
