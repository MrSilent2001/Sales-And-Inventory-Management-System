import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Cards/shoppingCartCard';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import CustomizedAlert from "../../../components/Alert/alert";
import {Link} from "react-router-dom";
import emptyCartImage from "../../../assets/images/empty-cart-image.png";


const getStripe = () => {
    let stripePromise = '';
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    }
    console.log(stripePromise);
    return stripePromise;
};

function Cart() {
    const { auth } = useAuth();
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [totalAmountWithoutDiscount, setTotalAmountWithoutDiscount] = useState(0);
    const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);


    // Alert state for removing items from cart
    const [removeFromCartOpenSuccess, setRemoveFromCartOpenSuccess] = useState(false);

    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    // Load cart data from local storage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                } else {
                    console.error("Parsed cart data is not an array:", parsedCart);
                }
            } catch (error) {
                console.error("Error parsing cart data from localStorage:", error);
            }
        }
    }, []);

    // Calculate total amount whenever cart changes
    useEffect(() => {
        let total = 0;
        let totalWithoutDiscount = 0;
        let totalDiscountedPrice = 0;

        cart.forEach(item => {
            const finalPrice = item.discountRate
                ? item.productSellingPrice * (1 - item.discountRate / 100)
                : item.productSellingPrice;
            total += finalPrice * item.amount;
            totalWithoutDiscount += item.productSellingPrice * item.amount;
            totalDiscountedPrice += (item.discountRate ? item.productSellingPrice * (item.discountRate / 100) * item.amount : 0);
        });

        setTotalAmount(total);
        setTotalAmountWithoutDiscount(totalWithoutDiscount);
        setTotalDiscountedPrice(totalDiscountedPrice);
    }, [cart]);


    console.log(cart);

    // Remove an item from the cart
    const removeFromCart = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                if (item.amount === 1) {
                    return null;
                } else {
                    return { ...item, amount: item.amount - 1 };
                }
            }
            return item;
        }).filter(Boolean);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        removeFromCartHandleClickSuccess();
    };

    const lineItems = cart.map(item => {
        // Calculate the discounted price for each item if discountRate is present
        const finalPrice = item.discountRate
            ? item.productSellingPrice * (1 - item.discountRate / 100)
            : item.productSellingPrice;

        // Use the first image URL from the array, or adjust as needed
        const imageUrl = item.productImage.length > 0 ? item.productImage[0] : '';

        console.log(imageUrl)
    })

    // Redirect to Stripe checkout
    const redirectToCheckout = async () => {
        setLoading(true);
        const stripe = getStripe();
        const lineItems = cart.map(item => {
            // Calculate the discounted price for each item if discountRate is present
            const finalPrice = item.discountRate
                ? item.productSellingPrice * (1 - item.discountRate / 100)
                : item.productSellingPrice;

            return {
                price_data: {
                    currency: 'lkr',
                    product_data: {
                        name: item.productName,
                        images: [item.productImage]
                    },
                    unit_amount: finalPrice * 100,
                },
                quantity: item.amount,
            };
        });

        console.log(cart)

        const metadata = cart.map(item => ({
            name: item.productName,
            qty: item.amount,
            price: item.productSellingPrice,
        }));
        console.log('cart', JSON.stringify(metadata));

        try {
            const response = await axios.post('http://localhost:9000/payment/customerPayment/checkout', {
                lineItems: lineItems,
                metadata: {
                    items: JSON.stringify(metadata)
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLoading(false);
            localStorage.setItem("sessionId", response.data.id);
            window.location.href = response.data.url;

        } catch (error) {
            console.error('Error creating checkout session:', error);
            setLoading(false);
        }
    };

    // Handle closing the alert
    const removeFromCartHandleCloseSuccess = () => {
        setRemoveFromCartOpenSuccess(false);
    };

    // Handle opening the alert
    const removeFromCartHandleClickSuccess = () => {
        setRemoveFromCartOpenSuccess(true);
    };

    return (
        <>
            <CustomerNavbar />
            <div className="cartOuter">
                <div className="arrow">
                    <Link to="/products">
                        <ArrowBackIosIcon/>
                    </Link>
                </div>
                {cart.length === 0 ? (
                    <div className="emptyCartContainer">
                        <img src={emptyCartImage} alt="Cart is empty" className="emptyCartImage"/>
                    </div>
                ) : (
                    <>
                        <div className="cardspace">
                            {cart.map(item => (
                                <MediaControlCard key={item.id} item={item} removeFromCart={removeFromCart}/>
                            ))}
                        </div>

                        <div className="cartInner">
                            <div className="itemsList">
                                {cart.map(item => {
                                    const finalPrice = item.discountRate
                                        ? item.productSellingPrice * (1 - item.discountRate / 100)
                                        : item.productSellingPrice;
                                    return (
                                        <div key={item.id} className="itemDetails">
                                            <p>{item.productName} x {item.amount} - Rs {finalPrice.toFixed(2)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr/>
                            <div className="totalText">
                                {totalDiscountedPrice > 0 && (
                                    <>
                                        <p style={{color: 'gray'}}><strong>Total:</strong> Rs {totalAmountWithoutDiscount.toFixed(2)} -
                                            Rs {totalDiscountedPrice.toFixed(2)} (Discount)</p>
                                        {/*<p>Discounted Price: Rs {totalDiscountedPrice.toFixed(2)}</p>*/}
                                    </>
                                )}
                                <p style={{fontSize: '1.08em'}}>
                                    <strong>Final Price:</strong> Rs {totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <div className="buttom">
                                <CustomizedButton
                                    onClick={redirectToCheckout}
                                    disabled={isLoading}
                                    hoverBackgroundColor="#0aaf0b"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#057007',
                                        width: '21.5em',
                                        height: '4.25em',
                                        fontSize: '0.85em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.625em',
                                        border: 'none',
                                        marginTop: '0.25em',
                                        marginBottom: '2em',
                                    }}
                                >
                                    {isLoading ? "Loading..." : "Buy Now"}
                                </CustomizedButton>
                            </div>
                        </div>


                    </>
                )}
            </div>

            <CustomizedAlert
                open={removeFromCartOpenSuccess}
                onClose={removeFromCartHandleCloseSuccess}
                severity="error"
                message="Item removed from Cart!"
            />

            <Footer/>
        </>
    );

}

export default Cart;
