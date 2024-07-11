import React from "react";
import './SupplierHomePage.css';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SupplierReviewSubmitForm from "./Supplier Feedbacks/Supplier Feedback";
import ShopReviewSubmitForm from "../../Customer/Home/Shop Reviews/Shop Reviews";

function SupplierHome() {
    return (
        <>
            <SupplierNavbar/>
            <div className="supplierHome">

                <div className="carouselOuter-supplier">
                    <div className="carouselText">
                        <div className="supplierCarouselHeader">
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
                        We Sell These Types of Products
                    </h3>

                    <h5>You can supply your products which are inder these categories. We are ready to provide you a platform to sell your products efficiently.</h5>

                    <div className="supplierProductCategoryTypes">
                        <div className="supplierProductCategoryTypesRow">
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Building Material</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Hardware and Tools</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Safety Equipments</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Electrical Supplies</p>
                            </div>
                        </div>
                        <div className="supplierProductCategoryTypesRow">
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Plumbing Supplies</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Interior Finishes</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Landscaping Products</p>
                            </div>
                            <div className="supplierProductCategoryCard">
                                <p className="supplierProductCategoryCardName">Construction Chemicals</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="instructions">
                    <h3 className="instructionTopic">
                        Instructions to Sell
                    </h3>

                    <div className="instructionContent">
                        <div>
                            <ul>
                                <li>
                                    You should have the quality products which are going to sell to the Tradeasy Customers. Customer ar expecting higher quality
                                    from the Tradeasy. Therefore, make sure that you have the best quality.
                                </li>
                                <li>
                                    Please, make sure that you have the continuous supply for Tradeasy warehouses, because without a continuous supply for Tradeasy
                                    warehouses, we are unable to provide the best service for our customers
                                </li>
                                <li>
                                    When you add an item to make available for purchase by admin, please make sure to add accurate information about the items. Also, make
                                    sure to add quality images of the items.
                                </li>
                                <li>
                                    Ensure that your stock levels are updated regularly to reflect current inventory. This helps prevent overselling and backorders, which can frustrate customers.
                                </li>
                                <li>
                                    Be transparent about shipping times and costs. Clear communication about delivery expectations helps build trust with customers. Write compelling and honest product descriptions.
                                    Highlight the features and benefits that make your product stand out from the competition.
                                </li>
                            </ul>
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

                <div className="supplierReviewOuter">
                    <h3>Make Your Reviews</h3>
                    <div className="supplierReviewContent">
                        <div className="supplierReviewDesc">
                            <div className="supplierReviewDescPara">
                                <p>Dear Suppliers,</p>
                                <p>
                                    Thank you for choosing Tradeasy! We value your feedback as it helps us improve our services and provide the best products. Your honest review—whether positive or constructive—is essential for us to grow and serve you better. By sharing your experiences, you guide us in enhancing our offerings and help future customers make informed decisions. We appreciate your time and support in making Tradeasy the best place for all your construction needs!
                                </p>
                                <p>
                                    The Tradeasy Team
                                </p>
                            </div>
                        </div>
                        <div className="supplierReviewForm">
                            <SupplierReviewSubmitForm></SupplierReviewSubmitForm>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default SupplierHome;