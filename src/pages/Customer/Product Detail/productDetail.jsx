import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Container} from "@mui/material";
import Gallery from "./Componets/Gallery";
import "./productDetail.css"
import MobileGallery from "./Componets/MobileGallery";
import Description from "./Componets/Description";


function ProductDetail(){
    const token = localStorage.getItem('accessToken');
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
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
    }

    useEffect(() => {
        const fetchProductandOffers = async () => {
            try {
                const responseProduct = await axios.get(`http://localhost:9000/product/findProduct/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const product = responseProduct.data;

                const responseAllOffers = await axios.get(`http://localhost:9000/discounts/getAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const allOffers = responseAllOffers.data;

                const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

                // Find the offer applicable to the fetched product for today's date (if any)
                const offer = allOffers.find(offer => offer.productId === productId && offer.startDate <= today && offer.endDate >= today);

                // Create product with offer variable
                const productWithOffer = {
                    ...product,
                    discountRate: offer ? offer.discountRate : null // Assign the offer's discountRate or null if no valid offer found
                };

                setProduct(productWithOffer);

            } catch (error) {
                console.error('Error fetching product and offers:', error);
            }
        };

        fetchProductandOffers();

    }, [productId, token]);


    console.log(product)


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);



    return(
        <>
            <CustomerNavbar />
            <Container component="section">

                <section className="productDetailCore">
                    {product && product.productImage && (
                        <Gallery images={product.productImage} thumbnails={product.productImage} />
                    )}

                    {product && product.productImage && (
                        <MobileGallery images={product.productImage} />
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
            </Container>

        </>

    );

}

export default ProductDetail;