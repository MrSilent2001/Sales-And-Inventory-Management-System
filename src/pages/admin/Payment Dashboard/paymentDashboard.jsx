import React, {useEffect, useMemo, useState} from 'react';
import Footer from "../../../layout/footer/footer";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import "./paymentDashboard.css";
import SearchBar from "../../../components/search bar/search bar";
import SalesNavbar from "../../../layout/navbar/Sales navbar/sales navbar";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";

// const columns = [
//     { columnId: 'id', label: 'Id', minWidth: 100, align: 'center' },
//     { columnId: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
//     { columnId: 'contactNo', label: 'Contact No.', minWidth: 170, align: 'center' },
//     { columnId: 'customerEmail', label: 'E-mail', minWidth: 170, align: 'center' },
//     { columnId: 'totalAmount', label: 'Total Amount', minWidth: 170, align: 'center'}
// ];

function PaymentDashboard() {
    const [visible, setVisible] = useState(false);
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openError, setOpenError] = useState(false);

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'Id', size: 75 },
        { accessorKey: 'customerName', header: 'Customer Name', size: 75  },
        { accessorKey: 'contactNo', header: 'Contact', size: 75  },
        { accessorKey: 'customerEmail', header: 'E-mail', size: 75  },
        { accessorKey: 'totalAmount', header: 'Total Amount', size: 75  }
    ], []);

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = () => {
        setOpenError(false);
    };

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/payment/customerPayment/getAllCustomerPayments' , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },}
                );
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
            const response = await axios.get(`http://localhost:9000/payment/customerPayment/search?keyword=${query}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                            <h3>Payments</h3>
                        </div>
                    </div>
                    <div className="paymentDashboard" >
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={payments}
                                includeProfile={true}
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
