import React, { useState } from 'react';
import "./button.css";

function CustomizedButton({ type, id, style, onClick, children, hoverBackgroundColor }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <button
                className="button"
                type={type}
                id={id}
                style={{
                    ...style,
                    backgroundColor: isHovered ? hoverBackgroundColor : style.backgroundColor,
                    cursor: isHovered ? 'pointer' : 'default'
                }}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </button>
        </div>
    );
}

export default CustomizedButton;
