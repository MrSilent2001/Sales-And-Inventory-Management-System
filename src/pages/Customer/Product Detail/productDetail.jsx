import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Container} from "@mui/material";
import Gallery from "./Componets/Gallery";
import "./productDetail.css"
import MobileGallery from "./Componets/MobileGallery";
import Description from "./Componets/Description";
import MediaControlCard from "./Componets/relatedproductCard";


function ProductDetail(){
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [productsWithOffers, setProductsWithOffers] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quant, setQuant] = useState(0);
    const [orderedQuant, setOrderedQuant] = useState(0);
    const [cart, setCart] = useState([]);

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

        // If item already exists in cart, increase its quantity
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].amount += count;
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            resetQuant;
        }
        // If item is not in cart, add it with quantity 1
        else {
            setCart([...cart, { ...product, amount: count }]);
            localStorage.setItem("cart", JSON.stringify([...cart, { ...product, amount: count }]));
        }
    };

    const handleBodyClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`);
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

            } catch (error) {
                console.error('Error fetching products with offers:', error);
            }
        };

        fetchProductsWithOffers();
    }, [productId, token]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);



    return(
        <>
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

                        {product && product.productQuantity && (
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
                            />
                        )}
                    </section>

                    <div className="relatedProducts">
                        <h2>                           Related Products</h2>
                        <section className="realatedProductDetailCore">
                            {relatedProducts && relatedProducts.map(item => (
                                <MediaControlCard key={item.id} item={item} handleBodyClick={handleBodyClick}/>
                            ))}
                        </section>
                    </div>

                </div>
            </div>

        </>

    );

}

export default ProductDetail;