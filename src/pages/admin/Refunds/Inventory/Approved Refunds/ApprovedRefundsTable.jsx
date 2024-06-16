import React, { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import './ApprovedRefundsTable.css';
import InventoryNavbar from '../../../../../layout/navbar/Inventory navbar/Inventory navbar';
import Footer from "../../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable"; 
import axios from "axios";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import ViewInventoryRequest from '../Modal/viewInventoryRefundRequest/viewInventoryRequest';

const ApprovedRefundsTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewRequestVisible, setViewRequestVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Column details from InventoryRefundRequestsTable.js
  const columns = [
    { columnId: 'name', label: 'Name', minWidth: 70, align: 'center' },
    { columnId: 'contact_number', label: 'Contact number', minWidth: 150, align: 'center' },
    { columnId: 'inventory_id', label: 'Refund Id', minWidth: 120, align: 'center' },
    { columnId: 'amount', label: 'Price', minWidth: 200, align: 'center' },
    { columnId: 'status', label: 'Status', minWidth: 200, align: 'center' },
    { columnId: 'actions', label: 'Actions', minWidth: 250, align: 'center' } // Increased minWidth for additional buttons
  ];

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
  }, [token]);

  const handleViewRequest = (request) => {
    console.log('Request:', request); 
    setSelectedRequest(request);
    setViewRequestVisible(true);
  };

  const handleDeleteRequest = async (requestId) => {
    console.log('Deleting request:', requestId);
    try {
      await axios.delete(`http://localhost:9000/refund/inventoryRefund/delete/${requestId}`);
      setRows(prevRequests => prevRequests.filter(request => request.inventory_id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const mappedData = rows.map(row => ({
    id: row.inventory_id,
    name: row.supplier,
    contact_number: row.phone,
    inventory_id: row.inventory_id,
    amount: row.price,
    status: row.status,
    actions: (
      <div style={{ display: 'flex' }}>
        <CustomizedButton
          onClick={() => handleViewRequest(row)}
          hoverBackgroundColor="#242F9B"
          style={{
            color: 'white',
            backgroundColor: '#242F9B',
            width: '7.5em',
            height: '2.75em',
            fontSize: '0.95em',
            fontFamily: 'inter',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            textTransform: 'none',
            textAlign: 'center',
            marginRight: '1.5em'
          }}>
          View
        </CustomizedButton>
        <CustomizedButton
          onClick={() => handleDeleteRequest(row.inventory_id)}
          hoverBackgroundColor="#960505"
          style={{
            color: 'white',
            backgroundColor: '#960505',
            width: '7.5em',
            height: '2.75em',
            fontSize: '0.95em',
            fontFamily: 'inter',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            textTransform: 'none',
            textAlign: 'center',
          }}>
          Delete
        </CustomizedButton>
      </div>
    )
  }));

  return (
    <>
      <InventoryNavbar />
      <Container className='inner_container' maxWidth="90%">
        <Box sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0.65em 0 0.65em 0', marginTop: '2em 0' }}>
            <Link to="/InventoryRefundRequestsTable">
              <BackArrow style={{ marginTop: '-0.1em', cursor: 'pointer' }} />
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
      <Modal open={viewRequestVisible}>
        <ViewInventoryRequest request={selectedRequest} onClose={() => setViewRequestVisible(false)} />
      </Modal>
      <Footer />
    </>
  );
};

export default ApprovedRefundsTable;
