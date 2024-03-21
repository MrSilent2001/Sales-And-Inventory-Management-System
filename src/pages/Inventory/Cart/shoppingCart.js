import React, { useState } from 'react';
import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Card/card';
import { Button } from '@mui/material';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise = "";

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    return stripePromise;
}

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleAddToCart = (item) => {
        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            // If the item already exists, update its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity++;
            setCartItems(updatedCartItems);
        } else {
            // If the item is not in the cart, add it
            setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (itemId) => {
        // Remove the item from the cart
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const checkoutOptions = {
        lineItems: cartItems.map(item => ({
            price: item.price, // Assuming price is the ID of the price in Stripe
            quantity: item.quantity
        })),
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    const redirectToCheckout = async () => {
        setLoading(true);
        console.log("RedirectToCheckout");

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("stripe checkout error:", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    }

    if (stripeError) alert(setStripeError);

    return (
        <>
            <CustomerNavbar />
            <div className="cartOuter">
                <div className="cardspace">
                    {cartItems.map((item, index) => (
                        <MediaControlCard key={index} item={item} onRemoveFromCart={() => handleRemoveFromCart(item.id)} />
                    ))}
                </div>
                <div className="cartInner">
                    <div className="arrow">
                        <ArrowBackIosIcon />
                    </div>
                    <div className="totalText">
                        <p>Total Amount</p>
                        <p className="amount">
                            Rs {getTotalAmount().toFixed(2)}
                        </p>
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
