import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Cards/shoppingCartCard';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import React, { useEffect, useState } from 'react';
import CustomizedButton from "../../../components/Button/button";
import {loadStripe} from "@stripe/stripe-js";

let stripePromise = "";

const getStripe = () => {
    if (!stripePromise) {
        //stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripePromise = loadStripe('pk_test_51OaaAGG6hT4n4c8nfxnNFoOroCTuVGkZJeOB63fTdNGluws7CDw36bOR8HDlMAXwybMqfvDK9KSubfJljBvVvmV300D1erYeiI');
    }
    return stripePromise;
}

function Cart() {

    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [stripeError, setStripeError] = useState(null); // Payment Gateway
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        // Retrieve cart data from local storage
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        console.log("storedCart",storedCart);
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    console.log("cart",cart)

    useEffect(() => {
        // Calculate total amount whenever cart changes
        let total = 0;
        cart.forEach(item => {
            total += item.productPrice * item.amount;
        });
        setTotalAmount(total);
    }, [cart]);

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


    const item =cart.map(item => ({
        product: item.productName,
        price: item.productPrice.toString(),
        quantity: item.amount
    }));

    console.log("item",item)

    const checkoutOptions = {
        lineItems: item,
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    const redirectToCheckout = async() =>{
        setLoading(true);
        console.log("RedirectToCheckout");

        const stripe = getStripe();
        const {error} = await stripe.redirectToCheckout(checkoutOptions);
        console.log("stripe checkout error:", error);

        if(error) setStripeError(error.message);
        setLoading(false);
    }

    if(stripeError) alert(setStripeError);

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
                                fontWeight: '550',
                                border: 'none',
                                marginTop: '0.25em',
                                marginBottom:'2em',
                            }}>
                            {isLoading ? "Loading..." : "Buy Now"}
                        </CustomizedButton>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
export default Cart;
