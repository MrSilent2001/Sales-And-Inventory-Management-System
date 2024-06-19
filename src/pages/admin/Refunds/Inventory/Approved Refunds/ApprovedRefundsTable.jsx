import React, { useState, useEffect,useMemo } from 'react';
import { Container, Box, Paper, Modal } from '@mui/material';
import './ApprovedRefundsTable.css';
import InventoryNavbar from '../../../../../layout/navbar/Inventory navbar/Inventory navbar';
import Footer from "../../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable"; 
import axios from "axios";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import ViewInventoryRequest from '../Modal/viewInventoryRefundRequest/viewInventoryRequest';
import CustomizedButton from '../../../../../components/Button/button';
import DynamicTable from '../../../../../components/Table/customizedTable2';

const ApprovedRefundsTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewRequestVisible, setViewRequestVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem('accessToken');

  const columns = useMemo(() => [
    { accessorKey: 'supplierName', header: 'Name', size: 70, align: 'center' },
    { accessorKey: 'contact_number', header: 'Contact number', size: 150, align: 'center' },
    { accessorKey: 'inventory_id', header: 'Refund Id', size: 120, align: 'center' },
    { accessorKey: 'amount', header: 'Price', size: 200, align: 'center' },
    { accessorKey: 'status', header: 'Status', size: 200, align: 'center' },
    { accessorKey: 'actions', header: 'Actions', size: 250, align: 'center' } // Increased minWidth for additional buttons
  ], []);

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

  const dataWithActions = rows.map(row => ({
    supplierName: row.supplierName,
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
            textAlign: 'center'
          }}>
          View
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
              <DynamicTable
                columns={columns}
                data={dataWithActions}
                includeProfile={false}
                tableWidth="100%"
                enableFilters={false}
                initialShowGlobalFilter={true}
              />
            </Paper>
          )}
        </Box>
      </Container>
      <Modal open={viewRequestVisible} onClose={() => setViewRequestVisible(false)}>
        <ViewInventoryRequest request={selectedRequest} onClose={() => setViewRequestVisible(false)} />
      </Modal>
      <Footer />
    </>
  );
};

export default ApprovedRefundsTable;
