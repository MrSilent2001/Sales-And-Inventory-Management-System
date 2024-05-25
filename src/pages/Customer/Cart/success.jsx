import CustomizedButton from "../../../components/Button/button";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SalesReceipt from '../../Customer/Cart/Bill/invoice';
import { useReactToPrint } from 'react-to-print';
import {Navigate} from "react-router-dom";

const Success = () => {
    const sessionId = localStorage.getItem('sessionId');
    const [purchasedItems, setPurchasedItems] = useState([]);
    const token = localStorage.getItem('accessToken');
    const [navigate, setNavigate] = useState(false);
    const componentRef = useRef();

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
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleRedirect = ()=>{
        localStorage.setItem("cart", []);
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to="/products"/>
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Success</h1>
            <h2>Thank you for your purchase!</h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    }}
                    onClick={handleRedirect}
                >
                    Go Back
                </CustomizedButton>

                <CustomizedButton
                    onClick={handlePrint}
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
                    }}
                >
                    Download
                </CustomizedButton>
            </div>
            <div style={{ display: 'none' }}>
                <SalesReceipt ref={componentRef} purchasedItems={purchasedItems} />
            </div>
        </div>
    );
};

export default Success;
