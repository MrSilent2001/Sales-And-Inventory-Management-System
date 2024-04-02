import React, { useState } from 'react';
import "./button.css";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

const ShopNowButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: '#d7d7d7'
    },
    '&.MuiButton-root': {
        width: '13em',
        height: '4em'
    },
    fontSize: '0.7em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

function CustomizedButton({ variant, size, type, id, style, onClick, children, hoverBackgroundColor, disabled, isActive}) {
    const [isHovered, setIsHovered] = useState(false);



    const handleMouseEnter = () => {
        setIsHovered(false);
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
