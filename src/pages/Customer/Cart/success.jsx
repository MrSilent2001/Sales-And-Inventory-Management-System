import CustomizedButton from "../../../components/Button/button";
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import SalesReceipt from '../../Customer/Cart/Bill/invoice';
import {Navigate} from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import dayjs from "dayjs";

const Success = () => {
    const sessionId = localStorage.getItem('sessionId');
    const [purchasedItems, setPurchasedItems] = useState([]);
    const token = localStorage.getItem('accessToken');
    const [navigate, setNavigate] = useState(false);

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
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);


    const invoiceDownload = async () => {
        try {
            // Fetching the updated list of customers after deletion
            const response = await axios.post('http://localhost:9000/email/send/customerInvoice', {
                receiverName: '',
                emailSubject: "Account Termination Warning!",
                emailBody: "It is monitored that you have not been logged into your account for a while. Please signed-in or otherwise the account will be terminated without any prior notice.",
                receiverEmail: ''
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    }

    const handleRedirect = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/products"/>
    }

    const downloadPDF = () => {
        const input = pdfRef.current;
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

    {/*-------------------------------------------------------------*/}
    const [customer, setCustomer] = React.useState([]);
    const id = localStorage.getItem('id');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomer(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };
        fetchCustomer();
    }, [token, id]);

    let totalQuantity = 0;
    let grossTotal = 0;
    let discount = 0;
    let netTotal = 0;
    let billedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    purchasedItems.forEach((item) => {
        totalQuantity += item.qty;
        grossTotal += item.price * item.qty;
    });

    discount = 0.0;
    netTotal = grossTotal - discount;


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

            <div style={{display: 'none'}}  ref={pdfRef}>
                {/*<SalesReceipt ref={pdfRef} purchasedItems={purchasedItems}/>*/}
                <div className="sales-receipt">
                    <div className="sales-receipt-header">
                        <div className="logo">
                            <img className="sales-receipt-sys-logo" src="Logo.png" alt="tradeasy logo"/>
                        </div>
                        <div className="sales-receipt-store-details">
                            <h5 className="shopName">Tradeasy Pvt. Ltd.</h5>
                            <p className="branchAddress">No: 30, Main Street, Galle</p>
                            <p className="branchPhone">+94 912 222 231</p>
                            <p className="branchEmail">office@tradeasy.com</p>
                        </div>
                    </div>
                    <hr className="invoice-line-top"/>
                    <h5 className="payemnt-receipt-Txt">Payment - Receipt</h5>
                    <hr className="invoice-line-top"/>
                    <div className="receipt-content">
                        <table className="receipt-details-table">
                            <tbody>
                            <tr>
                                <td className="receipt-details-label">Invoice No:</td>
                                <td className="receipt-details-value">1</td>
                            </tr>
                            <tr>
                                <td className="receipt-details-label">Invoiced At:</td>
                                <td className="receipt-details-value">{billedAt}</td>
                            </tr>
                            <tr>
                                <td className="receipt-details-label">Customer:</td>
                                <td className="receipt-details-value">{customer.username}</td>
                            </tr>
                            <tr>
                                <td className="receipt-details-label">Email:</td>
                                <td className="receipt-details-value">{customer.email}</td>
                            </tr>
                            <tr>
                                <td className="receipt-details-label">Contact No:</td>
                                <td className="receipt-details-value">{customer.contactNo}</td>
                            </tr>
                            </tbody>
                        </table>
                        <hr className="invoice-line"/>
                        <div className="items">
                            <table className="item-table">
                                <thead>
                                <tr>
                                    <th>Description</th>
                                    <th style={{textAlign: 'center'}}>Price</th>
                                    <th style={{textAlign: 'right'}}>Qty</th>
                                    <th style={{textAlign: 'right'}}>Amount(Rs)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {purchasedItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td style={{textAlign: 'left'}}>{item.price.toFixed(2)}</td>
                                        <td style={{textAlign: 'right'}}>{item.qty}</td>
                                        <td style={{textAlign: 'right'}}>{(item.price * item.qty).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="invoice-line"/>
                    <div className="billMiddle">
                        <div className="inquaryQR">
                            For any inquiry
                            <small>Scan me</small>
                            {/* <img className="qrImg" src={SugesstionQR} alt="Sugession QR" /> */}
                        </div>
                        <div className="total">
                            <table className="total-table">
                                <tbody>
                                <tr>
                                    <td>No Qty</td>
                                    <td style={{textAlign: 'right'}}>{totalQuantity}</td>
                                </tr>
                                <tr>
                                    <td>Gross Total</td>
                                    <td style={{textAlign: 'right'}}>{grossTotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td style={{textAlign: 'right'}}>{discount.toFixed(2)}</td>
                                </tr>
                                <tr style={{fontSize: '16px', fontWeight: 'bold'}}>
                                    <td>Net Total</td>
                                    <td style={{textAlign: 'right'}}>{netTotal.toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="invoice-line-top"/>
                    <div className="footer">
                        <h5> Thank you, Come again!</h5>
                        <p>
                            © <span style={{fontFamily: 'Princess Sofia, cursive'}}> Tradeasy -</span>Powered By 99X Pvt
                            Ltd.
                        </p>
                        <hr className="invoice-line"/>
                        <p className="special-note">
                            Please use this bill as a reference if you have any price discrepancies, refunds or product
                            returns.
                            Only applicable for 7 days from today.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
