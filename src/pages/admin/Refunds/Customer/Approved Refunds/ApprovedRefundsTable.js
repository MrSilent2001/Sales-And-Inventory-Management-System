import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import './ApprovedRefundsTable.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import {useState, useEffect} from "react";
import axios from "axios";

const ApprovedRefundsTable = ({ onBack }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Column details from InventoryRefundRequestsTable.js
  const columns = [
    { id: 'name', label: 'Name', minWidth: 70, align: 'center' },
    { id: 'contact_number', label: 'Contact number', minWidth: 150, align: 'center' },
    { id: 'inventory_id', label: 'Refund Id', minWidth: 120, align: 'center' },
    { id: 'amount', label: 'Price', minWidth: 200, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 200, align: 'center' }
  ];

  useEffect(() => {
    const fetchApprovedRefunds = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:9000/refund/approvedRefunds/getAll');
        setRows(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch approved refunds:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchApprovedRefunds();
  }, []);

  const mappedData = rows.map(row => ({
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
            <Link to="/InventoryRefundRequestsTable">
              <BackArrow onClick={onBack} style={{ marginTop: '-0.1em' }} />
            </Link>
            <span style={{ fontWeight: "bold", }}>Refund Request</span>
          </div>
          {error && <p>{error}</p>}
          {loading ? <p>Loading...</p> : (
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

export default ApprovedRefundsTable;