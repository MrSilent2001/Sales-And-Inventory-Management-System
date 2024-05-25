import React, {useEffect, useState} from 'react';
import { Modal } from "@mui/material";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import AddPayment from "../../admin/Payment Dashboard/Inventory/Modal/AddPayment/addPayment";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";

const columns = [
    { id: 'id', label: 'Id', minWidth: 100, align: 'center' },
    { id: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
    { id: 'contactNumber', label: 'Contact No.', minWidth: 170, align: 'center' },
    { id: 'email', label: 'E-mail', minWidth: 170, align: 'center' },
    { id: 'purchasedItems', label: 'Items Purchased', minWidth: 100, align: 'center' },
    {id: 'totalAmount', label: 'Total Amount', minWidth: 170, align: 'center'}
];

function InventoryPayments() {
    const [visible, setVisible] = useState(false);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/payment/customerPayment/getAllCustomerPayments');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching Payment data:', error);
            }
        };

        fetchPayments();
    }, []);

    let rows = payments;

    const mappedData = rows.map(row => ({ ...row}));


    return (
        <>
            <InventoryNavbar />
            <div className="paymentDashboardOuter">
                <div className="paymentDashboardInner">
                    <div className="payment-title">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'92.5%'}}>
                            <h2 style={{marginLeft: '5em'}}>Payments</h2>
                            <CustomizedButton
                                onClick={() => setVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Add Payment
                            </CustomizedButton>
                        </div>
                    </div>
                    <div className="paymentDashboard" style={{margin: '2.5em 0 5em 2.5em'}}>
                        <CustomizedTable
                            style={{ maxHeight: 400, width: '100%'}}
                            columns={columns}
                            rows={mappedData}
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

export default InventoryPayments;