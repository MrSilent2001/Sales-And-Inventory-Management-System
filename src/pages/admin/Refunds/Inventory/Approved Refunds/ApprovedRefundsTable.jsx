import React, { useState, useEffect,useMemo } from 'react';
import {Container, Box, Paper, Modal, Typography, Button} from '@mui/material';
import './ApprovedRefundsTable.css';
import InventoryNavbar from '../../../../../layout/navbar/Inventory navbar/Inventory navbar';
import Footer from "../../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";
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
    { accessorKey: 'contact_number', header: 'Contact number', size: 70, align: 'center' },
    { accessorKey: 'inventory_id', header: 'Refund Id', size: 50, align: 'center' },
    { accessorKey: 'amount', header: 'Price', size: 100, align: 'center' },
    { accessorKey: 'status', header: 'Status', size: 100, align: 'center' },
    { accessorKey: 'actions', header: 'Actions', size: 125, align: 'center' } // Increased minWidth for additional buttons
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
            width: '6.5em',
            height: '2.75em',
            fontSize: '0.8em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em'
          }}>
          View
        </CustomizedButton>
      </div>
    )
  }));

  return (
    <>
      <InventoryNavbar />
      <Container
          maxWidth="90%"
          sx={{
            backgroundColor: '#DBDFFD',
            width: '100%',
            height: '37.5em'
          }}
      >
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
            <Link to="/InventoryRefundRequestsTable">
            <Button
                startIcon={<BackArrow/>}
                size="large"
                style={{
                  color: "black",
                  fontWeight: 'bold',
                  textTransform: "none",
                  fontSize: '1.25em',
                  cursor: 'pointer'
                }}
            >
              Approved Refunds
            </Button>
          </Link>

          </Box>
          {isLoading ?
              <PageLoader /> :
              (
              <DynamicTable
                  columns={columns}
                  data={dataWithActions}
                  includeProfile={false}
                  tableWidth="100%"
                  enableFilters={false}
                  initialShowGlobalFilter={true}
              />
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
