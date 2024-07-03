import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Gallery from "./Componets/Gallery";
import "./productDetail.css"
import MobileGallery from "./Componets/MobileGallery";
import Description from "./Componets/Description";
import MediaControlCard from "./Componets/relatedproductCard";
import ProductReviewCard from "./Componets/productReviewCard";
import Footer from "../../../layout/footer/footer";
import ProductReviewSubmitForm from "./Componets/productReviewSubmitForm";
import CustomizedAlert from "../../../components/Alert/alert";


function ProductDetail(){
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [productsWithOffers, setProductsWithOffers] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [productReview, setProductReview] = useState([]);
    const [quant, setQuant] = useState(0);
    const [orderedQuant, setOrderedQuant] = useState(0);
    const [cart, setCart] = useState([]);
    const [availableQuantity, setAvailableQuantity] = useState(0);

    //add to cart Alert Variables
    const [addToCartOpenSuccess, setAddToCartOpenSuccess] = useState(false);

    //add to Review Submit Variables
    const [reviewSubmitOpenSuccess, setReviewSubmitOpenSuccess] = useState(false);

    //add to Review Submit Error Variables
    const [reviewSubmitErrorOpenSuccess, setReviewSubmitErrorOpenSuccess] = useState(false);

    //data fetching error Alert Variables
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);

    //quantity error Alert Variables
    const [quantityErrorOpenSuccess, setQuantityErrorOpenSuccess] = useState(false);

    //handle add to cart increments, decrements and reset
    const addQuant = () => {
        setQuant(quant + 1);
    };

    const removeQuant = () => {
        setQuant(quant - 1);
    };

    const resetQuant = () => {
        setQuant(0);
        setOrderedQuant(0);
    };

    const handleAddToCart = (count) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === product.id);
        const updatedCart = [...cart];

        // If item already exists in cart, increase its quantity
        if (existingItemIndex !== -1) {
            // Check if adding the given count will exceed product quantity
            if (updatedCart[existingItemIndex].amount + count <= product.productQuantity) {
                updatedCart[existingItemIndex].amount += count;
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                resetQuant();
                setAvailableQuantity(product.productQuantity - updatedCart[existingItemIndex].amount);
                addToCartHandleClickSuccess();
            } else {
                quantityErrorHandleClickSuccess();
            }
        } else {
            // If item is not in cart, check if adding it with the given count will exceed product quantity
            if (product.productQuantity >= count) {
                setCart([...updatedCart, { ...product, amount: count }]);
                localStorage.setItem("cart", JSON.stringify([...updatedCart, { ...product, amount: count }]));
                setAvailableQuantity(product.productQuantity - count);
                resetQuant();
                addToCartHandleClickSuccess();
            } else {
                quantityErrorHandleClickSuccess();
            }
        }
    };


    //related product cart handle clicks
    const handleBodyClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    //Handle add to cart Alert Variable
    const addToCartHandleCloseSuccess = () => {
        setAddToCartOpenSuccess(false);
    };

    const addToCartHandleClickSuccess = () => {
        setAddToCartOpenSuccess(true);
    };

    //Handle Review Submit Alert Variable
    const reviewSubmitHandleCloseSuccess = () => {
        setReviewSubmitOpenSuccess(false);
    };

    const reviewSubmitHandleClickSuccess = () => {
        setReviewSubmitOpenSuccess(true);
    };

    //Handle Review Submit Error Alert Variable
    const reviewSubmitErrorHandleCloseSuccess = () => {
        setReviewSubmitErrorOpenSuccess(false);
    };

    const reviewSubmitHandleErrorClickSuccess = () => {
        setReviewSubmitErrorOpenSuccess(true);
    };

    //Handle Data Error Alert Variable
    const dataErrorHandleCloseSuccess = () => {
        setDataErrorOpenSuccess(false);
    };

    const dataErrorHandleClickSuccess = () => {
        setDataErrorOpenSuccess(true);
    };

    //Handle Quantity Error Alert Variable
    const quantityErrorHandleCloseSuccess = () => {
        setQuantityErrorOpenSuccess(false);
    };

    const quantityErrorHandleClickSuccess = () => {
        setQuantityErrorOpenSuccess(true);
    };

    const fetchCartAndSetAvailableQuantity = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
            const existingItem = storedCart.find(cartItem => cartItem.id === product.id);
            if (existingItem) {
                setAvailableQuantity(product.productQuantity - existingItem.amount);
            } else {
                setAvailableQuantity(product.productQuantity);
            }
        } else {
            setCart([]); // Set to an empty array if no cart is found in local storage
            setAvailableQuantity(product.productQuantity);
        }
    };

    useEffect(() => {
        const fetchProductsWithOffers = async () => {
            try {
                const responseProducts = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const responseOffers = await axios.get('http://localhost:9000/discounts/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const responseReviews = await axios.get('http://localhost:9000/product/review/getAllProductsReview', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

                // Merge products with offers
                const mergedProducts = responseProducts.data.map(product => {
                    const offer = responseOffers.data.find(offer => parseInt(offer.productId) === product.id && offer.startDate <= today && offer.endDate >= today);
                    const discountRate = offer ? offer.discountRate : null;
                    return {
                        ...product,
                        discountRate: discountRate // Assign discountRate if found, otherwise null
                    };
                });

                setProductsWithOffers(mergedProducts);

                // Find and set the single product with offers using productId
                const singleProductWithOffer = mergedProducts.find(product => product.id === parseInt(productId));
                setProduct(singleProductWithOffer);

                // Find and set related products based on productCategory
                if (singleProductWithOffer) {
                    const relatedProducts = mergedProducts.filter(product => product.productCategory === singleProductWithOffer.productCategory && product.id !== singleProductWithOffer.id);
                    setRelatedProducts(relatedProducts);
                }

                // Filter reviews based on productId
                const filteredReviews = responseReviews.data.filter(review => parseInt(review.productId) === parseInt(productId));
                setProductReview(filteredReviews.length > 0 ? filteredReviews : null);

                console.log("review", filteredReviews);

                // Call fetchCartAndSetAvailableQuantity after setting the product
                if (singleProductWithOffer) {
                    fetchCartAndSetAvailableQuantity(singleProductWithOffer);
                }


            } catch (error) {
                console.error('Error fetching products with offers:', error);
                dataErrorHandleClickSuccess();
            }
        };

        fetchProductsWithOffers();
    }, [productId, token, reviewSubmitOpenSuccess]);

    // useEffect(() => {
    //     const storedCart = JSON.parse(localStorage.getItem("cart"));
    //     if (storedCart) {
    //         setCart(storedCart);
    //     } else {
    //         setCart([]); // Set to an empty array if no cart is found in local storage
    //     }
    // }, []);


    return(
        <>
            <div className="productDetailBody">
                <CustomerNavbar />
                <div className="productDetailsection">
                    <div className="productDetailIntter">
                        <section className="productDetailCore">

                            {product && product.productImage && (
                                <Gallery images={product.productImage} thumbnails={product.productImage}/>
                            )}

                            {product && product.productImage && (
                                <MobileGallery images={product.productImage}/>
                            )}

                            {product && (
                                <Description
                                    onQuant={quant}
                                    onAdd={addQuant}
                                    onRemove={removeQuant}
                                    onAddToCart={handleAddToCart}
                                    quantity={product.productQuantity}
                                    price={product.productSellingPrice}
                                    description={product.productDescription}
                                    title={product.productName}
                                    category={product.productCategory}
                                    offer={product.discountRate}
                                    availableQuantity={availableQuantity}
                                    quantityError={setQuantityErrorOpenSuccess}
                                />
                            )}
                        </section>

                        <div className="relatedProducts">

                            <h2> Related Products</h2>

                            <section className="realatedProductDetailCore">

                                {relatedProducts && relatedProducts.map(item => (
                                    <MediaControlCard key={item.id} item={item} handleBodyClick={handleBodyClick}/>
                                ))}

                            </section>
                        </div>

                    </div>

                    <div className="productDetailReviewSection">

                        <h2>Product Reviews</h2>

                        <div className="productDetailReviewInner">
                            {productReview && productReview.length > 0 ? (
                                productReview.map(reviews => (
                                    <ProductReviewCard key={reviews.id} reviews={reviews}/>
                                ))
                            ) : (
                                <p>Currently no Reviews Available</p>
                            )}
                        </div>
                    </div>


                    <div className="productDetailReviewSubmitSection">
                        <h2>Submit a Reviews</h2>

                        <ProductReviewSubmitForm productId={productId} submitAlert={reviewSubmitHandleClickSuccess} submitErrorAlert={reviewSubmitHandleErrorClickSuccess}/>

                    </div>


                </div>
                <CustomizedAlert
                    open={addToCartOpenSuccess}
                    onClose={addToCartHandleCloseSuccess}
                    severity="success"
                    message="Item added to the cart!"
                />

                <CustomizedAlert
                    open={reviewSubmitOpenSuccess}
                    onClose={reviewSubmitHandleCloseSuccess}
                    severity="success"
                    message="Review Submitted Succesfully!"
                />

                <CustomizedAlert
                    open={reviewSubmitErrorOpenSuccess}
                    onClose={reviewSubmitErrorHandleCloseSuccess}
                    severity="error"
                    message="Error Occured!"
                />

                <CustomizedAlert
                    open={dataErrorOpenSuccess}
                    onClose={dataErrorHandleCloseSuccess}
                    severity="error"
                    message="Error Fetching Data!"
                />

                <CustomizedAlert
                    open={quantityErrorOpenSuccess}
                    onClose={quantityErrorHandleCloseSuccess}
                    severity="warning"
                    message="Can't add more item due to the stock avaliability!"
                />

                <Footer/>
            </div>

        </>

    );

}

export default ProductDetail;