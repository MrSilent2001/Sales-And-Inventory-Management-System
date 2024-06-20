import React, { useState, useEffect,useMemo } from 'react';
import { Box, Container, Modal, Typography } from '@mui/material';
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import { Link } from "react-router-dom";
import InventoryRefundRequest from '../Modal/InventoryRefundRequest/InventoryRefundRequest';
import CustomizedButton from "../../../../../components/Button/button";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import ViewInventoryRequest from '../Modal/viewInventoryRefundRequest/viewInventoryRequest';
import DynamicTable from '../../../../../components/Table/customizedTable2';
import { useNavigate } from "react-router-dom";

 
const InventoryRefundRequestsTable = ({ onViewApproved }) => {
    const navigate = useNavigate(); 
    const [visible, setVisible] = useState(false);
    const [viewRequestVisible, setViewRequestVisible] = useState(false);
    const [refundRequests, setRefundRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRefundRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll');
                setRefundRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching refund requests:', error);
                setError('Failed to fetch refund requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchRefundRequests();
    }, []);

    const handleViewRequest = (request) => {
        console.log('Request:', request);
        setSelectedRequest(request);
        setViewRequestVisible(true);
    };

    const handleDeleteRequest = async (requestId) => {
        console.log('Deleting request:', requestId);
        try {
            await axios.delete(`http://localhost:9000/refund/inventoryRefund/delete/${requestId}`);
            setRefundRequests(prevRequests => prevRequests.filter(request => request.inventory_id !== requestId));
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'supplierName', header: 'Name', size: 70, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact number', size: 150, align: 'center' },
        { accessorKey: 'inventory_id', header: 'Refund Id', size: 120, align: 'center' },
        { accessorKey: 'amount', header: 'Price', size: 200, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 200, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 250, align: 'center' } // Increased minWidth for additional button
    ], []);

    const dataWithActions = refundRequests.map(row => ({
        inventory_id: row.inventory_id,
        supplierName: row.supplierName,
        contact_number: row.phone,
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
            <Container
                className='inner_container'
                maxWidth="100%"
                sx={{
                    backgroundColor: '#DBDFFD',
                    width: '100%',
                    height: '47em',
                    overflow: 'hidden'
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 2,
                            marginBottom: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Refund Request
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <CustomizedButton
                                onClick={() => navigate('/eligiblePurchaseOrderForRefund')}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Refund Requests
                            </CustomizedButton>

                            <Link to="/ApprovedRefundsTable">
                                <CustomizedButton
                                    onClick={onViewApproved}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Approved Refunds
                                </CustomizedButton>
                            </Link>
                        </div>
                    </Box>
                    <br />
                    <br />
                    <br />
                    <br />
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <PageLoader />
                        </Box>
                    ) : error ? (
                        <Typography variant="body1" color="error">
                            {error}
                        </Typography>
                    ) : (
                        <DynamicTable
                            columns={columns}
                            data={dataWithActions}
                            style={{ minWidth: 700, maxHeight: 400 }}
                            includeProfile={false}
                            tableWidth="100%"
                            enableFilters={false}
                            initialShowGlobalFilter={true}
                        />
                    )}
                </Box>
            </Container>
            <Modal open={visible}>
                <InventoryRefundRequest onClose={() => setVisible(false)} />
            </Modal>
            <Modal open={viewRequestVisible}>
                <ViewInventoryRequest request={selectedRequest} onClose={() => setViewRequestVisible(false)} />
            </Modal>
            <Footer />
        </>
    );
};

export default InventoryRefundRequestsTable;
