import React, { useState, useEffect,useMemo } from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../../../layout/footer/footer";
import BackArrow from "../../../../../components/Icons/backArrow";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import './SalesRejectedRefundsTable.css';
import DynamicTable from '../../../../../components/Table/customizedTable2';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from '../../../../../components/Button/button';

import { Box, Container, Typography,Button } from '@mui/material';


const SalesRejectedRefundsTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rejectedRefunds, setRejectedRefunds] = useState([]);
    const [error, setError] = useState('');

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchRejectedRefunds = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/customerRefund/getRefundByStatus', {
                    params: {
                        refundStatus: 'rejected'
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRejectedRefunds(response.data);
            } catch (error) {
                console.error('Error fetching rejected refunds:', error);
                setError('Failed to fetch rejected refunds. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRejectedRefunds();
    }, []);

    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 100, align: 'center' },
        { accessorKey: 'customerName', header: 'Name', size: 70, align: 'center' },
        { accessorKey: 'contact', header: 'Mail Address', size: 70, align: 'center' },
        { accessorKey: 'totalPrice', header: 'Total Price', size: 100, align: 'center' },
        { accessorKey: 'reason', header: 'Reason to deny', size: 100, align: 'center' }
    ], []);

    const dataWithActions = rejectedRefunds.map(row => ({
        id: row.id,
        customerName: row.customerName,
        orderId: row.orderId,
        contact: row.contact,
        totalPrice: row.totalPrice,
        reason: row.denialReason
    }));

    return (
        <>
            <SalesNavbar />
            <Container maxWidth="90%" style={{ backgroundColor: '#DBDFFD', height: '47em' }}>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '2em 0 1em 7em',
                            marginBottom: 0.5
                        }}
                    >
                        <Link to="/viewRefundRequests">
                            <Button
                                startIcon={<BackArrow />}
                                size="large"
                                style={{
                                    color: "black",
                                    fontWeight: 'bold',
                                    textTransform: "none",
                                    fontSize: '1.25em'
                                }}
                            >
                                Rejected Refunds
                            </Button>
                        </Link>
                        
                    </Box>
                    {isLoading ? (
                        <PageLoader />
                    ) : error ? (
                        <Typography variant="body1" color="error">
                            {error}
                        </Typography>
                    ) : (
                        <DynamicTable
                            columns={columns}
                            data={dataWithActions}
                            style={{ minWidth: 700, maxHeight: 400 }}
                            includeProfile={false}
                            tableWidth="100%"
                            enableFilters={false}
                            initialShowGlobalFilter={true}
                        />
                    )}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default SalesRejectedRefundsTable;
