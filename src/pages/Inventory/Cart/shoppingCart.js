import React, { useState } from 'react';
import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Card/card';
import { Button } from '@mui/material';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import {loadStripe} from "@stripe/stripe-js";


let stripePromise = "";

const getStripe = () =>{
    if(!stripePromise){
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    return stripePromise;

}

function Cart() {

    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const item ={
        price: 'price_1OahRJG6hT4n4c8nb8zXkyz8',
        quantity: 1
    };

    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    const redirectToCheckout = async() =>{
        setLoading(true);
        console.log("RedirectToCheckout");

        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout(checkoutOptions);
        console.log("stripe checkout error:", error);

        if(error) setStripeError(error.message);
        setLoading(false);
    }

    if(stripeError) alert(setStripeError);

    return (
        <>
            <CustomerNavbar/>
            <div className="cartOuter">

                <div className="cardspace">
                    <MediaControlCard/>
                    <MediaControlCard/>
                    <MediaControlCard/>
                </div>

                <div className="cartInner">

                    <div className="arrow">
                        <ArrowBackIosIcon/>
                    </div>

                    <div className="totalText">
                        <p>Total Amount</p>
                        <p className = "amount ">Rs 12,000.00</p>
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

            <Footer/>
        </>
    );
}
export default Cart;