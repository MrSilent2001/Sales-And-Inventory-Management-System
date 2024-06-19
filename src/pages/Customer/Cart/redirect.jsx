import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const sessionId = localStorage.getItem('sessionId');
    const token = localStorage.getItem('accessToken');
    const cart = JSON.parse(localStorage.getItem('cart'));
    const customerId = localStorage.getItem('id');
    const [purchasedItems, setPurchasedItems] = useState([]);
    let [navigate, setNavigate] = useState(1);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const navigateTo = useNavigate();

    // const productsPurchased = cart.map(item => item.productName);
    // const productsPurchasedId = cart.map(item => item.id);
    const productsPurchasedIdAndAmount = cart.map(item => ({ id: item.id, amount: item.amount }));

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/payment/customerPayment/checkout-session/${sessionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const session = response.data;
                console.log(session);
                const items = JSON.parse(session.metadata.items);
                setPurchasedItems(items);
                console.log(items);

                return session;
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        const recordPayment = async (session) => {
            try {
                const response = await axios.get(`http://localhost:9000/customer/findCustomer/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const customer = response.data;

                await axios.post("http://localhost:9000/payment/customerPayment/create", {
                    customerId: customer.id,
                    customerName: customer.username,
                    customerEmail: customer.email,
                    contactNo: customer.contactNo,
                    totalAmount: session.amount_total / 100
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // add order to the database
                await axios.post("http://localhost:9000/order/create", {
                    orderReceiverName: customer.username,
                    orderReceiverAddress: customer.address,
                    orderReceiverContact: customer.contactNo,
                    orderItems: productsPurchasedIdAndAmount,
                    orderPrice: session.amount_total / 100,
                    orderCustomerId: customer.id,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            } catch (error) {
                console.error('Error recording payment:', error);
            }
        };

        const updateQuantities = async (cart) => {
            const quantities = {};
            for (const item of cart) {
                try {
                    // Fetch current quantity from the database
                    const response = await axios.get(`http://localhost:9000/product/findProduct/${item.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const currentQuantity = response.data.productQuantity;
                    console.log(`Current quantity for item ${item.id}:`, currentQuantity);

                    // Reduce quantity by 1 and store in quantities object
                    const newQuantity = currentQuantity - 1;
                    quantities[item.id] = newQuantity;
                    console.log(`New quantity for item ${item.id}:`, newQuantity);

                    // Update the quantity in the database
                    await axios.put(`http://localhost:9000/product/update/${item.id}`, {
                        productQuantity: newQuantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(`Updated quantity for item ${item.id} in the database.`);
                } catch (error) {
                    console.error(`Error updating quantity for item ${item.id}:`, error);
                }
            }
            setUpdatedQuantities(quantities);
            setNavigate(true);
        };

        const processPayment = async () => {
            if (sessionId && cart) {
                const session = await fetchSession();
                await recordPayment(session);
                await updateQuantities(cart);
            }
        };

        if (navigate === 1) {
            processPayment();
            navigate++;
            navigateTo("/success");
        }
    }, []);

    return (
        <>Redirecting...</>
    );
};

export default Redirect;
