import React from "react";
import './SupplierHomePage.css';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";

function SupplierHome() {
    return (
        <>
            <SupplierNavbar/>
            <div className="supplierHome">

                <div className="carouselOuter-supplier">
                    <div className="carouselText">
                        <div className="carouselHeader">
                            <h1>TRADEASY</h1>
                            <p>Best Place for the Construction Substances</p>
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

                <div className="products">
                    <h3 className="productsTopic">
                        Products
                    </h3>

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
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SupplierHome;