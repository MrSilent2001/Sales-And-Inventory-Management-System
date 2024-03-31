import React, { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import './ApprovedRefundsTable.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import DefaultTable from "../../../../../components/Table/Default Table/defaultTable";
import BackArrow from "../../../../../components/Icons/backArrow";

const ApprovedRefundsTable = ({ onBack }) => {
  const [refundRequests, setRefundRequests] = useState([]);

  useEffect(() => {
    approvedRefundsData().then(data => {
      setRefundRequests(data);
    });
  }, []);

  // This function will transform the data to match the expected structure for the ReusableTable
  const transformData = (data) => {
    if (!data) return [];
    return data.map(({ name, requestId, orderId, amount, status }) => [
      name,
      requestId,
      orderId,
      amount,
      status
    ]);
  };

  return (
      <>
        <SalesNavbar/>
        <Container className='inner_container' maxWidth="90%">
          <Box sx={{pt: 4, display: 'flex', flexDirection: 'column' }}>
            <div style={{display: 'flex',alignItems: 'flex-start', padding: '0.65em 0 0.65em 0', marginTop: '2em 0'}}>

              <Link to="/InventoryRefundRequestsTable">
                <BackArrow
                    onClick={onBack}
                    style={{marginTop: '-0.1em'}}
                />
              </Link>
              <span style={{fontWeight: "bold", }}>Refund Request</span>
            </div>

            <Paper elevation={4}>
              <DefaultTable data={transformData(refundRequests)} />
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
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' },
    { name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.19,500.00', status: '2024/01/15' }

  ]);
}

export default ApprovedRefundsTable;
