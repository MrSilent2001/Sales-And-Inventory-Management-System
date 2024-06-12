import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import './SalesApprovedRefundsTable.css';

const SalesApprovedRefundsTable = () => {
  const [approvedRefunds, setApprovedRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApprovedRefunds = async () => {
      try {
        const response = await axios.get('http://localhost:9000/refund/customerRefund/getRefundByStatus', {
          params: {
            refundStatus: 'accepted'
          }
        });
        setApprovedRefunds(response.data);
      } catch (error) {
        console.error('Error fetching approved refunds:', error);
        setError('Failed to fetch approved refunds. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedRefunds();
  }, []);

  const columns = [
    { columnId: 'customerName', label: 'Name', minWidth: 70, align: 'center' },
    { columnId: 'id', label: 'Request Id', minWidth: 150, align: 'center' },
    { columnId: 'orderId', label: 'Order Id', minWidth: 120, align: 'center' },
    { columnId: 'totalPrice', label: 'Amount', minWidth: 100, align: 'center' },
    { columnId: 'status', label: 'Status', minWidth: 100, align: 'center' }
  ];

  const mappedData = approvedRefunds.map(row => ({
    id: row.id, 
    customerName: row.customerName,
    requestId: row.requestId,
    orderId: row.orderId,
    totalPrice: row.totalPrice,
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

export default SalesApprovedRefundsTable;