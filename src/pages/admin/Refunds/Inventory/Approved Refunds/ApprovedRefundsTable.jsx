import React, { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import './ApprovedRefundsTable.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable"; // This refers to the second version
import axios from "axios";
import PageLoader from "../../../../../components/Page Loader/pageLoader";

const ApprovedRefundsTable = ({ onBack }) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Column details from InventoryRefundRequestsTable.js
  const columns = [
    { columnId: 'name', label: 'Name', minWidth: 70, align: 'center' },
    { columnId: 'contact_number', label: 'Contact number', minWidth: 150, align: 'center' },
    { columnId: 'inventory_id', label: 'Refund Id', minWidth: 120, align: 'center' },
    { columnId: 'amount', label: 'Price', minWidth: 200, align: 'center' },
    { columnId: 'status', label: 'Status', minWidth: 200, align: 'center' }
  ];

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchApprovedRefunds = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:9000/refund/approvedRefunds/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRows(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch approved refunds:', err);
        setError('Failed to load data');
        setIsLoading(false);
      }
    };

    fetchApprovedRefunds();
  }, []);

  const mappedData = rows.map(row => ({
    id: row.inventory_id, // Ensure each row has a unique id for React key
    name: row.supplier, // Assuming mapping from supplier to name
    contact_number: row.phone, // Assuming phone maps to contact number
    inventory_id: row.inventory_id, // Direct mapping
    amount: row.price, // Assuming price maps to amount
    status: row.status // Direct mapping
  }));

  return (
    <>
      <SalesNavbar />
      <Container className='inner_container' maxWidth="90%">
        <Box sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0.65em 0 0.65em 0', marginTop: '2em 0' }}>
            <Link to="/viewRefundRequests">
              <BackArrow onClick={onBack} style={{ marginTop: '-0.1em' }} />
            </Link>
            <span style={{ fontWeight: "bold", }}>Refund Request</span>
          </div>
          {error && <p>{error}</p>}
          {isLoading ? <PageLoader /> : (
            <Paper elevation={4} style={{ width: '100%' }}>
              <CustomizedTable columns={columns} rows={mappedData} style={{ width: '100%' }} />
            </Paper>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ApprovedRefundsTable;
