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

            <div className="aboutUs">
                <h2 className="aboutUsTopic">
                    About Us
                </h2>
                <p className="aboutUsParagraph">
                    Welcome to Tradeasy – your one-stop solution for top-quality construction substances! At Tradeasy, we cater to all your building needs with a diverse range of reliable and durable materials. Our expert team is here to guide you, ensuring you find the right substances for any project, big or small. Trust Tradeasy for excellence in construction – where quality meets convenience!
                </p>
                <p className="aboutUsParagraph aboutUsParagraphLast">
                    What sets Tradeasy apart is our unwavering commitment to excellence in construction. We understand the importance of using high-quality materials for durability and longevity. Every product in our inventory undergoes rigorous quality checks to meet and exceed industry standards, providing you with confidence and peace of mind in your construction endeavors. Trust Tradeasy for an unparalleled blend of quality and convenience. Explore our extensive selection, and let us be your trusted companion in the journey towards construction excellence. Welcome to Tradeasy – where craftsmanship meets choice!
                </p>
            </div>
        </div>
    )
}

export default CustomerHome;