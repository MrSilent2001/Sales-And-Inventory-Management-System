import CustomizedButton from "../../../components/Button/button";
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import SalesReceipt from '../../Customer/Cart/Bill/invoice';
import {Navigate} from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Success = () => {
    const sessionId = localStorage.getItem('sessionId');
    const [purchasedItems, setPurchasedItems] = useState([]);
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');
    const [navigate, setNavigate] = useState(false);
    // const [paymentDetails, setPaymentDetails] = useState({});

    const pdfRef = useRef();

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

                // const customer = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`,{
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
                //
                // setPaymentDetails({
                //     amount: session.amount_total/100,
                //     paymentId: session.payment_method_configuration_details.id,
                //     email: 'dmcoder01@gmail.com'
                //     // email: customer.data.email
                // })
                // console.log(paymentDetails)
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);


    // const invoiceDownload = async () => {
    //     try {
    //         // Fetching the updated list of customers after deletion
    //         const response = await axios.post('http://localhost:9000/email/send/customerInvoice', {
    //             receiverName: '',
    //             emailSubject: "Account Termination Warning!",
    //             emailBody: "It is monitored that you have not been logged into your account for a while. Please signed-in or otherwise the account will be terminated without any prior notice.",
    //             receiverEmail: ''
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log(response.data);
    //
    //     } catch (error) {
    //         console.error('Error deleting customer:', error);
    //     }
    // }

    const handleRedirect = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/products"/>
    }

    const downloadPDF = () => {
        const input = pdfRef.current;
        console.log(input);
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            console.log(imgWidth, imgHeight);
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf');

        });
    }

    // const sendReceipt = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:9000/payment/customerPayment/receipt', paymentDetails, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log('Payment response:', response.data);
    //     } catch (error) {
    //         console.error('Payment error:', error.message);
    //     }
    // }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1>Success</h1>
            <h2>Thank you for your purchase!</h2>

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
                        marginRight: '1em',
                    }}
                    onClick={handleRedirect}
                >
                    Go Back
                </CustomizedButton>

                <CustomizedButton
                    onClick={downloadPDF}
                    hoverBackgroundColor="#0aaf0b"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#007bff',
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

            <div style={{display: 'none'}}>
                <SalesReceipt ref={pdfRef} purchasedItems={purchasedItems}/>
            </div>
        </div>
    );
};

export default Success;
