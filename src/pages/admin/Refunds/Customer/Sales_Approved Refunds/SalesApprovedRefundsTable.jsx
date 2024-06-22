import React, { useState, useEffect,useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../../../layout/footer/footer";
import BackArrow from "../../../../../components/Icons/backArrow";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import './SalesApprovedRefundsTable.css';
import DynamicTable from '../../../../../components/Table/customizedTable2';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";

const SalesApprovedRefundsTable = () => {
  const [approvedRefunds, setApprovedRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchApprovedRefunds = async () => {
      try {
        const response = await axios.get('http://localhost:9000/refund/customerRefund/getRefundByStatus', {
          params: {
            refundStatus: 'accepted'
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const columns = useMemo(() => [
    { accessorKey: 'customerName', header: 'Name', size: 70, align: 'center' },
    { accessorKey: 'id', header: 'Request Id', size: 150, align: 'center' },
    { accessorKey: 'orderId', header: 'Order Id', size: 120, align: 'center' },
    { accessorKey: 'totalPrice', header: 'Amount', size: 100, align: 'center' },
    { accessorKey: 'status', header: 'Status', size: 100, align: 'center' }
  ], []);

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
        <SalesNavbar/>
        <div className="approvedRefundsDashboardOuter">
          <div className="approvedRefundsDashboardInner">
            <div className="searchContainer">
              <Link to="/viewRefundRequests">
                <Button
                    startIcon={<BackArrow/>}
                    size="large"
                    style={{
                      color: "black",
                      fontWeight: 'bold',
                      textTransform: "none",
                      fontSize: '1.25em'
                    }}
                >
                  Approved Refunds
                </Button>
              </Link>

            </div>
            <div className="approvedRefunds-dashboard">
              {loading ? (
                  <PageLoader />
              ) : error ? (
                  <Typography variant="body1" color="error">
                    {error}
                  </Typography>
              ) : (
                  <DynamicTable
                      columns={columns}
                      data={mappedData}
                      includeProfile={false}
                      tableWidth="100%"
                      enableFilters={false}
                      initialShowGlobalFilter={true}
                  />
              )}
            </div>
          </div>
        </div>
        <Footer/>
      </>
  );
};

export default SalesApprovedRefundsTable;
