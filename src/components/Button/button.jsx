import React, { useEffect, useState } from 'react';
import "./button.css";
import Button from "@mui/material/Button";

function CustomizedButton({
                              variant, size, type, id, style = {}, onClick, children,
                              hoverBackgroundColor, disabled, isActive, defaultTextColor, hoverTextColor
                          }) {
    const [isHovered, setIsHovered] = useState(false);
    const [defaultTextColorInner, setDefaultTextColorInner] = useState('#ffffff');
    const [hoverTextColorInner, setHoverTextColorInner] = useState('#ffffff');

    useEffect(() => {
        if (defaultTextColor) {
            setDefaultTextColorInner(defaultTextColor);
        }

        if (hoverTextColor) {
            setHoverTextColorInner(hoverTextColor);
        }
    }, [defaultTextColor, hoverTextColor]);

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
                    backgroundColor: isActive ? 'lightblue' : (isHovered ? hoverBackgroundColor : style.backgroundColor || 'default'),
                    cursor: isHovered ? 'pointer' : 'default',
                    fontFamily: 'inter',
                    textTransform: 'none',
                    fontWeight: '500',
                    color: isActive ? hoverTextColorInner : (isHovered ? hoverTextColorInner : defaultTextColorInner),
                    textAlign: 'center'
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
