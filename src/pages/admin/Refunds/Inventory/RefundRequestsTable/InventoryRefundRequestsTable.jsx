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
import CustomizedAlert from "../../../../../components/Alert/alert";

 
const InventoryRefundRequestsTable = ({ onViewApproved }) => {
    const navigate = useNavigate(); 
    const [visible, setVisible] = useState(false);
    const [viewRequestVisible, setViewRequestVisible] = useState(false);
    const [refundRequests, setRefundRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('accessToken');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    useEffect(() => {
        const fetchRefundRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
            await axios.delete(`http://localhost:9000/refund/inventoryRefund/delete/${requestId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRefundRequests(prevRequests => prevRequests.filter(request => request.inventory_id !== requestId));
            handleCloseSuccess();
        } catch (error) {
            console.error('Error deleting request:', error);
            handleClickError();
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'supplierName', header: 'Name', size: 70, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact number', size: 75, align: 'center' },
        { accessorKey: 'inventory_id', header: 'Refund Id', size: 75, align: 'center' },
        { accessorKey: 'amount', header: 'Price', size: 100, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 100, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 150, align: 'center' } // Increased minWidth for additional button
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
                    hoverBackgroundColor="#2d3ed2"
                    style={{
                        color: 'white',
                        backgroundColor: '#242F9B',
                        width: '6.5em',
                        height: '2.75em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        marginRight: '1.5em'
                    }}>
                    View
                </CustomizedButton>
                <CustomizedButton
                    onClick={() => handleDeleteRequest(row.inventory_id)}
                    hoverBackgroundColor="#f11717"
                    style={{
                        color: 'white',
                        backgroundColor: '#960505',
                        width: '6.5em',
                        height: '2.75em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                    }}>
                    Delete
                </CustomizedButton>
            </div>
        )
    }));

    const createToolbarButton = () => {
        const buttonStyle1 = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '11em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            marginRight: '1em'
        };

        const buttonStyle2 = {
            backgroundColor: '#057007',
            border: '1px solid #242F9B',
            width: '11em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            marginLeft: '1em'
        };

        return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 2,
                        marginBottom: 2
                    }}
                >
                    <Link to="/eligiblePurchaseOrderForRefund">
                        <CustomizedButton
                            onClick={onViewApproved}
                            hoverBackgroundColor="#2d3ed2"
                            style={buttonStyle1}
                        >
                            Request Refund
                        </CustomizedButton>
                    </Link>

                    <Link to="/ApprovedRefundsTable">
                        <CustomizedButton
                            onClick={onViewApproved}
                            hoverBackgroundColor="#2ec931"
                            style={buttonStyle2}
                        >
                            Approved Refunds
                        </CustomizedButton>
                    </Link>
                </Box>
        );
    };


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
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Refund Request
                        </Typography>

                    </Box>
                    {loading ? (
                        <PageLoader />
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
                            renderToolbarItems={createToolbarButton}
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

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Refund Request Deleted Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    );
};

export default InventoryRefundRequestsTable;
