import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Card/card';
import { Button } from '@mui/material';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';


let stripePromise = "";

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    return stripePromise;

}


function Cart() {

    const [cart, setCart] = useState([]);
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve cart data from local storage
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                if (item.amount === 1) {
                    // If amount is 1, remove the item
                    return null;
                } else {
                    // Otherwise, decrement the amount
                    return { ...item, amount: item.amount - 1 };
                }
            }
            return item;
        }).filter(Boolean); // Filter out null values (removed items)
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const checkoutOptions = {
        lineItems: cart.map(item => ({ price: item.id, quantity: item.amount })), // Adjust this according to your data structure
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
                        <p className="amount ">Rs 12,000.00</p>
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
