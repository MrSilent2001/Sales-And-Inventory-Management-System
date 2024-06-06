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
    const [customer, setCustomer] = useState({});

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

                const customer = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCustomer(customer.data);

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

    // const downloadPDF = () => {
    //     const input = pdfRef.current;
    //     console.log(input);
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;
    //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //         const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //         const imgY = 10;
    //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //         pdf.save('invoice.pdf');
    //         const receipt = pdf.output('blob');
    //         console.log(receipt)
    //
    //         return receipt;
    //     });
    // }

    const downloadPDF = () => {
        return new Promise((resolve, reject) => {
            const input = pdfRef.current;
            console.log(input);
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 10;
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save('invoice.pdf');
                const receipt = pdf.output('blob');
                console.log(receipt)
                resolve(receipt);
            }).catch(error => {
                reject(error);
            });
        });
    }

    console.log(customer.email)
    console.log(customer.username)

    const sendReceipt = async () => {
        try {
            const pdf = await downloadPDF();
            const formData = new FormData();
            formData.append('pdfFilePath', pdf, 'invoice.pdf');
            formData.append('receiverName', customer.username);
            formData.append('emailSubject', "Payment Receipt!");
            formData.append('emailBody', "Thank you for dealing with Tradeasy Pvt. Ltd!");
            formData.append('receiverEmail', customer.email);

            const response = await axios.post('http://localhost:9000/email/send/customerInvoice', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Payment response:', response.data);
        } catch (error) {
            console.error('Payment error:', error.message);
        }
    }


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
                    onClick={sendReceipt}
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

            <div style={{
                position: 'absolute',
                left: '-9999px'
            }}>
                <SalesReceipt ref={pdfRef} purchasedItems={purchasedItems}/>
            </div>
        </div>
    );
};

export default Success;
