import { IconButton } from "@mui/material";
import React, { useState } from "react";
import NextIcon from "./Icons/NextIcon";
import PreviousIcon from "./Icons/PreviousIcon";

const MobileGallery = ({ images }) => {
    const [currentMobileImage, setCurrentMobileImage] = useState(images[0]);
    const [mobileImageIndex, setMobileImageIndex] = useState(0);

    const handleIncrement = () => {
        if (mobileImageIndex === images.length - 1) {
            setCurrentMobileImage(images[0]);
            setMobileImageIndex(0);
        } else {
            setCurrentMobileImage(images[mobileImageIndex + 1]);
            setMobileImageIndex(mobileImageIndex + 1);
        }
    };

    const handleDecrement = () => {
        if (mobileImageIndex === 0) {
            setCurrentMobileImage(images[images.length - 1]);
            setMobileImageIndex(images.length - 1);
        } else {
            setCurrentMobileImage(images[mobileImageIndex - 1]);
            setMobileImageIndex(mobileImageIndex - 1);
        }
    };

    return (
        <section className="productDetail-mobile-gallery hide-in-desktop">
            <IconButton
                className="icon-button-prev"
                disableRipple
                onClick={handleDecrement}
                sx={{
                    height: "42px",
                    width: "42px",
                    bgcolor: "#fff",
                }}
            >
                <PreviousIcon />
            </IconButton>
            <img src={currentMobileImage} alt="featured-product" />
            <IconButton
                className="icon-button-next"
                disableRipple
                onClick={handleIncrement}
                sx={{
                    height: "42px",
                    width: "42px",
                    bgcolor: "#fff",
                }}
            >
                <NextIcon />
            </IconButton>
        </section>
    );
};

export default MobileGallery;
