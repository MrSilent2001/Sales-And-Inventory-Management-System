import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Card/card';
import { Button } from '@mui/material';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';

// Initialize Stripe promise
let stripePromise = "";

// Function to get the Stripe instance
const getStripe = () => {
    // If Stripe instance is not already created, initialize it
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY); // Load Stripe with the publishable key
    }
    return stripePromise;
}

// Cart Component
function Cart() {
    // State variables
    const [cart, setCart] = useState([]); // Cart items
    const [totalAmount, setTotalAmount] = useState(0); // Total amount of the cart
    const [stripeError, setStripeError] = useState(null); // Stripe error message
    const [isLoading, setLoading] = useState(false); // Loading state for Stripe checkout

    // Effect to retrieve cart data from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    // Effect to calculate total amount whenever cart changes
    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.amount;
        });
        setTotalAmount(total);
    }, [cart]);

    // Function to remove item from cart
    const removeFromCart = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                if (item.amount === 1) {
                    return null; // If amount is 1, remove the item
                } else {
                    return { ...item, amount: item.amount - 1 }; // Otherwise, decrement the amount
                }
            }
            return item;
        }).filter(Boolean); // Filter out null values (removed items)
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart in local storage
    }

    // Configuration options for Stripe checkout
    const checkoutOptions = {
        lineItems: cart.map(item => ({ price: item.id, quantity: item.amount })),
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    // Function to redirect to Stripe checkout
    const redirectToCheckout = async () => {
        setLoading(true);
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) setStripeError(error.message);
        setLoading(false);
    }

    // If there is a Stripe error, display an alert
    if (stripeError) alert(setStripeError);

    // Render component
    return (
        <>
            <CustomerNavbar />
            <div className="cartOuter">
                <div className="cardspace">
                    {cart.map(item => (
                        <MediaControlCard key={item.id} item={item} removeFromCart={removeFromCart} />
                    ))}
                </div>
                <div className="cartInner">
                    <div className="arrow">
                        <ArrowBackIosIcon />
                    </div>
                    <div className="totalText">
                        <p>Total Amount</p>
                        <p className="amount ">Rs {totalAmount.toFixed(2)}</p>
                        <Button variant="contained" color="success" onClick={redirectToCheckout} disabled={isLoading}>
                            <div className="text-container">
                                <p className="text" style={{ color: isLoading ? 'white' : 'inherit' }}>
                                    {isLoading ? "Loading..." : "Buy Now"}
                                </p>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
