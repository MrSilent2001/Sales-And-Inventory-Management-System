import React, { useEffect, useMemo, useState } from 'react';
import "./supplierPayments.css";
import Footer from "../../../layout/footer/footer";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";

function SupplierPayments() {
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    const columns = useMemo(() => [
        { accessorKey: 'email', header: 'Email', size: 25 },
        { accessorKey: 'date', header: 'Date of Payment', size: 25 },
        { accessorKey: 'itemsPurchased', header: 'Products Purchased', size: 25 },
        { accessorKey: 'billAmount', header: 'Bill Amount', size: 75 },
        {
            accessorKey: 'receipt',
            header: 'Proof',
            size: 125,
            cellRenderer: ({ cell }) => (
                <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
                    Payment Receipt
                </a>
            ),
        },
    ], []);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/payment/supplierPayment/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPayments(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching payments:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPayments();
    }, [token, id]);

    return (
        <>
            <SupplierNavbar />
            <div className="supplierPaymentManagementOuter">
                <div className="supplierPaymentManagementInner">
                    <h2 className="supplierPaymentManagement-title">Payments</h2>
                    <div className="supplierPaymentManagement">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={payments}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Order status updated successfully!"
            />
            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Error fetching Payments."
            />
        </>
    );
}

export default SupplierPayments;
