import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import './SalesRejectedRefundsTable.css';

const SalesRejectedRefundsTable = () => {
    const [rejectedRefunds, setRejectedRefunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRejectedRefunds = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/customerRefund/getRefundByStatus', {
                    params: {
                        refundStatus: 'rejected'
                    }
                });
                setRejectedRefunds(response.data);
            } catch (error) {
                console.error('Error fetching rejected refunds:', error);
                setError('Failed to fetch rejected refunds. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchRejectedRefunds();
    }, []);

    const columns = [
        { columnId: 'name', label: 'Name', minWidth: 70, align: 'center' },
        { columnId: 'requestId', label: 'Request Id', minWidth: 150, align: 'center' },
        { columnId: 'orderId', label: 'Order Id', minWidth: 120, align: 'center' },
        { columnId: 'amount', label: 'Amount', minWidth: 100, align: 'center' },
        { columnId: 'status', label: 'Status', minWidth: 100, align: 'center' }
    ];

    const mappedData = rejectedRefunds.map(row => ({
        id: row.requestId, // Ensure each row has a unique id for React key
        name: row.name,
        requestId: row.requestId,
        orderId: row.orderId,
        amount: row.amount,
        status: row.status
    }));

    return (
        <>
            <InventoryNavbar />
            <Container className='inv_inner_container' maxWidth="80%">
                <Box sx={{ my: 4, display: 'flex', flexDirection: 'column' }}>
                    <Link to="/viewRefundRequests">
                        <Button
                            startIcon={<BackArrow />}
                            size="large"
                            style={{ color: "black", fontWeight: 'bold', textTransform: "none" }}
                            sx={{ width: '20%', mt: '2%', mb: '2%', ml: '-87.5%' }}
                        >
                            Refund Requests
                        </Button>
                    </Link>
                    {loading ? (
                        <PageLoader />
                    ) : error ? (
                        <Typography variant="body1" color="error">
                            {error}
                        </Typography>
                    ) : (
                        <Paper elevation={4}>
                            <CustomizedTable
                                columns={columns}
                                rows={mappedData}
                            />
                        </Paper>
                    )}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default SalesRejectedRefundsTable;
