import React, {useEffect, useMemo, useState} from 'react';
import { Modal } from "@mui/material";
import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../layout/footer/footer";
import AddPayment from "./Modal/AddPayment/addPayment";
import CustomizedTable from "../../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import SearchBar from "../../../../components/search bar/search bar";
import CustomizedButton from "../../../../components/Button/button";
import "./inventoryPayments.css";
import PageLoader from "../../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../../components/Table/customizedTable2";

function InventoryPayments() {
    const [visible, setVisible] = useState(false);
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const columns = useMemo(() => [
        { accessorKey: 'supplierId', header: 'Supplier Id', size: 100, align: 'center' },
        { accessorKey: 'supplierName', header: 'Supplier Name', size: 100, align: 'center' },
        { accessorKey: 'date', header: 'Purchased Date', size: 100, align: 'center' },
        { accessorKey: 'itemsPurchased', header: 'Items Purchased', size: 170, align: 'center' },
        { accessorKey: 'billAmount', header: 'Total Amount', size: 170, align: 'center' },
    ], []);


    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/payment/supplierPayment/getAll' , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPayments(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching Payment data:', error);
            }finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const fetchSearchedPayments = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/payment/supplierPayment/search?keyword=${query}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPayments(response.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching payments:', error);
        }
    };

    const handlePaymentAdded = (updatedPayments) => {
        setPayments(updatedPayments);
    };

    return (
        <>
            <InventoryNavbar />
            <div className="invPaymentDashboardOuter">
                <div className="invPaymentDashboardInner">
                    <div className="invSearchContainer">
                        <SearchBar
                            label="Search Products"
                            onKeyPress={fetchSearchedPayments}
                        />
                        <CustomizedButton
                            onClick={() => setVisible(true)}
                            hoverBackgroundColor="#2d3ed2"
                            style={{
                                backgroundColor: '#242F9B',
                                border: '1px solid #242F9B',
                                width: '9.5em',
                                height: '2.5em',
                                fontSize: '0.75em',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550'
                            }}>
                            Add Payment
                        </CustomizedButton>
                    </div>
                    <div className="invPaymentDashboard" >
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
                    <Modal open={visible}>
                        <AddPayment
                            onClose={() => setVisible(false)}
                            onPaymentAdded={handlePaymentAdded}
                        />
                    </Modal>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default InventoryPayments;
