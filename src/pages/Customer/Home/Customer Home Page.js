import React from "react";
import './Customer Home Page.css'
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const ShopNowButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: '#d7d7d7' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '13em',
        height: '4em'
    },
    fontSize: '0.7em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));
function CustomerHome(){
    return(
        <div className="custoemrHome">

            <div className="carouselOuter">
                {/*<img src={require('./HomeCarousel.jpg')} alt=""/>*/}

                <div className="carouselText">
                    <div className="carouselHeader">
                        <h1>TRADEASY</h1>
                        <p>Best Place for the Construction Substances</p>
                        <div className="carouselButton">
                            <ShopNowButton>Shop Now</ShopNowButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerHome;