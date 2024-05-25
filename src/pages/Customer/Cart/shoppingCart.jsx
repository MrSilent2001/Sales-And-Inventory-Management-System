import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Cards/shoppingCartCard';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import {loadStripe} from "@stripe/stripe-js";
import React, {useEffect, useState} from 'react';
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";
import {useAuth} from "../../../context/AuthContext";

const getStripe = () => {
    let stripePromise = '';
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    }
    console.log(stripePromise);
    return stripePromise;
}

function Cart() {
    const { auth } = useAuth();
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const token = localStorage.getItem('accessToken');

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

    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            // Calculate the discounted price for each item if discountRate is present
            const finalPrice = item.discountRate
                ? item.productSellingPrice * (1 - item.discountRate / 100)
                : item.productSellingPrice;
            total += finalPrice * item.amount;
        });
        setTotalAmount(total);
    }, [cart]);

    const removeFromCart = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                if (item.amount === 1) {
                    return null;
                } else {
                    return {...item, amount: item.amount - 1};
                }
            }
            return item;
        }).filter(Boolean);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

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

        const metadata = cart.map(item => ({
            name: item.productName,
            qty: item.amount,
            price: item.productSellingPrice,
        }));
        console.log('cart', JSON.stringify(metadata))

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
    }

    return (
        <>
            <CustomerNavbar/>
            <div className="cartOuter">
                <div className="cardspace">
                    {cart.map(item => (
                        <MediaControlCard key={item.id} item={item} removeFromCart={removeFromCart}/>
                    ))}
                </div>

                <div className="cartInner">
                    <div className="arrow">
                        <ArrowBackIosIcon/>
                    </div>
                    <div className="totalText">
                        <p>Total Amount</p>
                        <p className="amount">Rs {totalAmount.toFixed(2)}</p>
                        <CustomizedButton
                            onClick={redirectToCheckout}
                            disabled={isLoading}
                            hoverBackgroundColor="#0aaf0b"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#057007',
                                width: '7.5em',
                                height: '2.25em',
                                fontSize: '0.85em',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.625em',
                                border: 'none',
                                marginTop: '0.25em',
                                marginBottom: '2em',
                            }}>
                            {isLoading ? "Loading..." : "Buy Now"}
                        </CustomizedButton>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cart;
