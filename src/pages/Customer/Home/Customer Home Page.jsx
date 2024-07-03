import React, {useEffect, useState} from "react";
import './Customer Home Page.css';
import Footer from "../../../layout/footer/footer";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Link, useNavigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import ShopReviewSubmitForm from "./Shop Reviews/Shop Reviews";
import ReviewCard from "./Shop Reviews/Small Shop Review Card";
import axios from "axios";
import ReviewsGrid from "./Shop Reviews/Small Shop Review Card";

function CustomerHome() {

    const [reviews, setReviews] = useState([]);
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:9000/admin/getAllShopReviews',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const latestReviews = response.data.slice(-4).reverse();
                setReviews(latestReviews);
                console.log(latestReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleNavigate = () => {
        navigate('/customerReviews');
    };

    return (
        <>
            <CustomerNavbar/>
            <div className="customerHome">

                <div className="carouselOuter">
                    {/*<img src={require('./HomeCarousel.jpg')} alt=""/>*/}

                    <div className="carouselText">
                        <div className="carouselHeader">
                            <h1>TRADEASY</h1>
                            <p>Best Place for the Construction Substances</p>
                            <div className="carouselButton">
                                <Link to="/products">
                                    <CustomizedButton
                                        // hoverBackgroundColor="#d7d7d7"
                                        style={{
                                            color: '#000000',
                                            backgroundColor: '#620707',
                                            border: '1px solid #242F9B',
                                            width: '11em',
                                            height: '3.75em',
                                            fontSize: '0.7em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Shop Now
                                    </CustomizedButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="aboutUs">
                    <h3 className="aboutUsTopic">
                        About Us
                    </h3>
                    <p className="aboutUsParagraph">
                        Welcome to Tradeasy – your one-stop solution for top-quality construction substances! At
                        Tradeasy, we cater to all your building needs with a diverse range of reliable and durable
                        materials. Our expert team is here to guide you, ensuring you find the right substances for any
                        project, big or small. Trust Tradeasy for excellence in construction – where quality meets
                        convenience!
                    </p>
                    <p className="aboutUsParagraph aboutUsParagraphLast">
                        What sets Tradeasy apart is our unwavering commitment to excellence in construction. We
                        understand the importance of using high-quality materials for durability and longevity. Every
                        product in our inventory undergoes rigorous quality checks to meet and exceed industry
                        standards, providing you with confidence and peace of mind in your construction endeavors. Trust
                        Tradeasy for an unparalleled blend of quality and convenience. Explore our extensive selection,
                        and let us be your trusted companion in the journey towards construction excellence. Welcome to
                        Tradeasy – where craftsmanship meets choice!
                    </p>
                </div>

                <div className="customerReviewOuter">
                    <h3 className="customerReviewTopic">
                        Customer Reviews
                    </h3>

                    <div className="customerReviews">
                        <ReviewsGrid reviews={reviews}></ReviewsGrid>
                    </div>

                    <div className="viewCustomerReviews">
                        <CustomizedButton
                            onClick={handleNavigate}
                            hoverBackgroundColor="#c6ccf3"
                            style={{
                                color: '#423333',
                                backgroundColor: 'rgba(225,221,221,0.75)',
                                border: '1px solid #242F9B',
                                width: '11em',
                                height: '2.95em',
                                fontSize: '0.8em',
                                padding: '0.5em 0.625em',
                            }}>
                            View More
                        </CustomizedButton>
                    </div>
                </div>


                <div className="products">
                    <h3 className="productsTopic">
                        Products
                    </h3>

                    <p>At Tradeasy, you can discover a wide range of products to meet all your construction needs. Whether you’re searching for building materials, tools, equipment, or accessories, we have it all. Our extensive selection ensures that you can find any product you need for your construction projects, making Tradeasy your go-to destination for all things construction. At Tradeasy, we offer a vast selection of construction products designed to fulfill every requirement of your project. From high-quality materials and power tools to essential construction supplies and specialized equipment, you’ll find everything you need in one convenient place. Explore our range and experience the convenience of finding all your construction products at Tradeasy.</p>

                    <div className="productCategoryTypes">
                        <div className="productCategoryTypesRow">
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Building Material</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Hardware and Tools</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Safety Equipments</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Electrical Supplies</p>
                            </div>
                        </div>
                        <div className="productCategoryTypesRow">
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Plumbing Supplies</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Interior Finishes</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Landscaping Products</p>
                            </div>
                            <div className="productCategoryCard">
                                <p className="productCategoryCardName">Construction Chemicals</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="contactUs">
                    <h3 className="contactUsTopic">
                        Contact Us
                    </h3>

                    <div className="contactUsContent">
                        <div className="mapContainer">

                            <div className="map"> <iframe title="map" width="720" height="360" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=No%2016/B,%20Galle%20Road,%20Colombo%203+(Tradeasy)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe></div>

                        </div>

                        <div className="addressContaier">
                            <div className="address">
                                <p>No 16/B, Galle Road, Colombo 3</p>
                                <p>011 5556667</p>
                                <p>ContactUs@Tradeasy.com </p>
                            </div>
                        </div>
                    </div>

                    <div className="shopReviewOuter">
                        <h3>Make Your Reviews</h3>
                        <div className="shopReviewContent">
                            <div className="shopReviewDesc">
                                <div className="shopReviewDescPara">
                                    <p>Dear Customer,</p>
                                    <p>
                                        Thank you for choosing Tradeasy for your shopping needs! We strive to provide the best products and services, and to achieve this, we need your help. Your honest review is invaluable in enhancing our services, guiding future shoppers, fostering transparency, and driving innovation. By sharing your genuine experiences—whether positive or areas needing improvement—you help us understand what we are doing well and where we can improve. Your feedback also provides insights for other customers, helping them make informed decisions. Constructive criticism fuels our efforts to introduce new features and improve existing ones, ensuring a shopping experience that exceeds expectations. Please take a few moments to submit your review. Together, we can make Tradeasy the best shopping destination for everyone. Thank you for your support!
                                    </p>
                                    <p>
                                        The Tradeasy Team
                                    </p>
                                </div>
                            </div>
                            <div className="shopReviewForm">
                                <ShopReviewSubmitForm></ShopReviewSubmitForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CustomerHome;