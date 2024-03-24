// ApprovedRefundsTable.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReusableTable from '../../../components/Reusable Table/Reusable Table';
import './SalesApprovedRefundsTable.css'
import {Link} from "react-router-dom";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";

const SalesApprovedRefundsTable = ({ onBack }) => {
  const [refundRequests, setRefundRequests] = useState([]);

  useEffect(() => {
    approvedRefundsData().then(data => {
      setRefundRequests(data);
    });
  }, []);

  // This function will transform the data to match the expected structure for the ReusableTable
  const transformData = (data) => {
    return data.map(({ name, requestId, orderId, amount, status }) => [
      name,
      requestId,
      orderId,
      amount,
      "refunded"
    ]);
  };

  return (
    <>
      <InventoryNavbar/>
      <Container className='inv_inner_container' maxWidth="80%">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column' }}>
          <Link to="/RefundRequestsTable">
            <Button
                startIcon={<ArrowBackIosIcon />}
                size="large"
                style={{ color: "black", fontWeight: 'bold', textTransform: "none" }}
                onClick={onBack} // onBack prop
                sx={{ width: '20%', mt: '2%', mb: '2%', ml:'-87.5%'}}
            >
              Approved Refunds
            </Button>
          </Link>
          <Paper elevation={4}>
            <ReusableTable data={transformData(refundRequests)}/>
          </Paper>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

const approvedRefundsData = () => {
  return Promise.resolve([
    { name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.19,500.00', status: '2024/01/15' },
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002', amount: 'Rs.150,000.00', status: '2024/01/16' },
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' },
    { name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.19,500.00', status: '2024/01/15' },
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002', amount: 'Rs.150,000.00', status: '2024/01/16' },
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' },,
    { name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.19,500.00', status: '2024/01/15' },
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002', amount: 'Rs.150,000.00', status: '2024/01/16' },
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' },
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' }
  ]);
}

export default SalesApprovedRefundsTable;
