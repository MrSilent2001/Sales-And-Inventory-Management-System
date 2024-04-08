import React, { useState } from 'react';
import "./button.css";
import Button from "@mui/material/Button";

function CustomizedButton({ variant, size, type, id, style, onClick, children, hoverBackgroundColor, disabled, isActive}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <Button
                className="button"
                variant={variant}
                size={size}
                type={type}
                id={id}
                isActive={isActive}
                style={{
                    ...style,
                    backgroundColor: isActive ? 'lightblue' : (isHovered ? hoverBackgroundColor : style.backgroundColor),
                    cursor: isHovered ? 'pointer' : 'default'
                }}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                disabled={disabled}
            >
                {children}
            </Button>
        </div>
    );
}

export default CustomizedButton;
