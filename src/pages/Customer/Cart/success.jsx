import CustomizedButton from "../../../components/Button/button";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Success = () => {
    const sessionId = localStorage.getItem('sessionId');
    const [purchasedItems, setPurchasedItems] = useState([]);
    const token = localStorage.getItem('accessToken');

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
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Success</h1>
            <h2>Thank you for your purchase!</h2>
            <h2>Purchased Items:</h2>
            {/*<ul>*/}
            {/*    {purchasedItems.map(item => (*/}
            {/*        <li key={item.id}>*/}
            {/*            {item.productName} - Rs {item.productSellingPrice} x {item.amount}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CustomizedButton
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
                    Go Back
                </CustomizedButton>

                <CustomizedButton
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
                    Download
                </CustomizedButton>
            </div>
        </div>
    );
};

export default Success;
