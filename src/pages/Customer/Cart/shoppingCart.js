import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Cards/shoppingCartCard';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import {loadStripe} from "@stripe/stripe-js";
import React, {useEffect, useState} from 'react';
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";

const getStripe = () => {
    let stripePromise = '';
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    console.log(stripePromise);
    return stripePromise;
}

function Cart() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    useEffect(() => {
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

    const handlePaymentSuccess = async (paymentData) => {
        console.log('Payment Data:', paymentData)
        try {
            const response = await axios.post('http://localhost:9000/payment/customerPayment/create', paymentData);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending payment data to backend:', error);

        }
    }

    const redirectToCheckout = async () => {
        setLoading(true);
        const stripe = getStripe();
        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: item.productName,
                    images:[item.productImage]
                },
                unit_amount: item.productPrice * 100,
            },
            quantity: item.amount,
        }));

        console.log(lineItems);

        try {
            const response = await axios.post('http://localhost:9000/payment/customerPayment/checkout', {
                lineItems: lineItems
            });

            setLoading(false);

            const customerData = JSON.parse(localStorage.getItem('user'));
            const paymentData = {
                customerId: customerData[2],
                customerName: customerData[3],
                customerEmail:customerData[4],
                contactNo: customerData[5],
                totalAmount: response.data.amount_total/100,
                //stripeCheckoutSessionId: response.data.id
            };
            handlePaymentSuccess(paymentData);
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



