import React, { useState } from 'react';
import { TableContainer, Paper, Modal } from "@mui/material";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import AddPayment from "../../admin/Payment Dashboard/Inventory/Modal/AddPayment/addPayment";
import paymentData from "../../../data/data.json";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";

const columns = [
    { id: 'id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
    { id: 'items', label: 'Items (\u20A8.)', minWidth: 170, align: 'center' },
    { id: 'amount', label: 'Total Amount', minWidth: 170, align: 'center' },
];

function PaymentDashboard() {
    const [visible, setVisible] = useState(false);

    // Ensure paymentData.paymentData is not null or undefined before mapping
    const rows = paymentData.paymentData || [];

    const mappedData = rows.map(row => ({
        id: row.id,
        name: row.name,
        address: row.address,
        items: row.items,
        amount: row.amount
    }));

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
                    <div className="paymentDashboard">
                        <TableContainer component={Paper} >
                            <CustomizedTable
                                style={{ maxHeight: 500, width: '95%', paddingBottom: '2em'}}
                                columns={columns}
                                rows={mappedData}
                            />
                        </TableContainer>
                        <Modal open={visible}>
                            <AddPayment onClose={() => setVisible(false)}></AddPayment>
                        </Modal>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PaymentDashboard;
