import React, {useEffect, useState} from 'react';
import Footer from "../../../layout/footer/footer";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import "./paymentDashboard.css";
import SearchBar from "../../../components/search bar/search bar";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import PageLoader from "../../../components/Page Loader/pageLoader";

const columns = [
    { columnId: 'id', label: 'Id', minWidth: 100, align: 'center' },
    { columnId: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
    { columnId: 'contactNo', label: 'Contact No.', minWidth: 170, align: 'center' },
    { columnId: 'customerEmail', label: 'E-mail', minWidth: 170, align: 'center' },
    { columnId: 'totalAmount', label: 'Total Amount', minWidth: 170, align: 'center'}
];

function PaymentDashboard() {
    const [visible, setVisible] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openError, setOpenError] = useState(false);

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = () => {
        setOpenError(false);
    };


    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/payment/customerPayment/getAllCustomerPayments');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching Payment data:', error);
            }finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Fetch payments function with query parameter
    const fetchSearchedPayments = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/payment/customerPayment/search?keyword=${query}`);
            setPayments(response.data);
        } catch (error) {
            handleClickError();
            console.error('Error fetching payments:', error);
        }
    };

    let rows = payments;

    const mappedData = rows.map(row => ({ ...row}));


    return (
        <>
            <SalesNavbar />
            <div className="paymentDashboardOuter">
                <div className="paymentDashboardInner">
                    <div className="payment-title">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <h2>Payments</h2>
                            <SearchBar
                                label="Search Payments"
                                onKeyPress={fetchSearchedPayments}
                            />
                        </div>
                    </div>
                    <div className="paymentDashboard" >
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <CustomizedTable
                                columns={columns}
                                rows={rows}
                                style={{ width: '100%' }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PaymentDashboard;
