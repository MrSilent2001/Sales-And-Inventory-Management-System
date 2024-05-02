import React, {useEffect, useState} from 'react';
import { Modal } from "@mui/material";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import AddPayment from "../../admin/Payment Dashboard/Inventory/Modal/AddPayment/addPayment";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import "./paymentDashboard.css";
import SearchBar from "../../../components/search bar/search bar";

const columns = [
    { columnId: 'id', label: 'Id', minWidth: 100, align: 'center' },
    { columnId: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
    { columnId: 'contactNumber', label: 'Contact No.', minWidth: 170, align: 'center' },
    { columnId: 'email', label: 'E-mail', minWidth: 170, align: 'center' },
    { columnId: 'purchasedItems', label: 'Items Purchased', minWidth: 100, align: 'center' },
    { columnId: 'totalAmount', label: 'Total Amount', minWidth: 170, align: 'center'}
];

function PaymentDashboard() {
    const [visible, setVisible] = useState(false);
    const [payments, setPayments] = useState([]);

    const [openError, setOpenError] = useState(false);

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = () => {
        setOpenError(false);
    };


    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:9000/payment/customerPayment/getAllCustomerPayments');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching Payment data:', error);
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
            <InventoryNavbar />
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
                            <CustomizedTable
                                columns={columns}
                                rows={mappedData}
                                style={{width: '100%'}}
                            />
                    </div>
                    <Modal open={visible}>
                        <AddPayment onClose={() => setVisible(false)}></AddPayment>
                    </Modal>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PaymentDashboard;
