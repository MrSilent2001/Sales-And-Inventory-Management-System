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
        if (!disabled) {
            setIsHovered(true);
        }
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
                    backgroundColor: isActive
                        ? 'lightblue'
                        : (disabled ? '#d3d3d3' : (isHovered ? hoverBackgroundColor : style.backgroundColor || 'default')),
                    cursor: disabled ? 'not-allowed' : (isHovered ? 'pointer' : 'default'),
                    fontFamily: 'inter',
                    textTransform: 'none',
                    fontWeight: '500',
                    borderRadius: '0.35em',
                    color: isActive
                        ? hoverTextColorInner
                        : (disabled ? '#a9a9a9' : (isHovered ? hoverTextColorInner : defaultTextColorInner)),
                    textAlign: 'center',
                    border: `2px solid ${disabled ? '#a9a9a9' : 'transparent'}`, // Adjust border color here
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
