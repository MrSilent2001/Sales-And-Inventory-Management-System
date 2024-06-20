import React, { useState, useEffect,useMemo } from 'react';
import { Box, Container, Typography, Tooltip } from '@mui/material';
import axios from 'axios';
import Footer from "../../../../../layout/footer/footer";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import { Link } from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import WarningIcon from '@mui/icons-material/Warning';
import CustomizedAlert from '../../../../../components/Alert/alert';
import DynamicTable from '../../../../../components/Table/customizedTable2';

const SalesRefundRequestsTable = ({ onViewApproved }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [refundRequests, setRefundRequests] = useState([]);
    const [error, setError] = useState('');
    const [hasOverdue, setHasOverdue] = useState(false);

    useEffect(() => {
        const fetchRefundRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/customerRefund/getRefundByStatus', {
                    params: {
                        refundStatus: 'pending'
                    }
                });
                const currentDate = new Date();
                const dataWithWarning = response.data.map(request => {
                    const createdDate = new Date(request.createdDate);
                    const timeDifference = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
                    const warning = timeDifference > 5;
                    if (warning) {
                        setHasOverdue(true);
                    }
                    return {
                        ...request,
                        warning,
                        daysPending: timeDifference
                    };
                });
                setRefundRequests(dataWithWarning);
                console.log(dataWithWarning);
            } catch (error) {
                console.error('Error fetching refund requests:', error);
                setError('Failed to fetch refund requests. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRefundRequests();
    }, []);

    const columns = useMemo(() => [
        { accessorKey: 'customerName', header: 'Name', size: 70, align: 'center' },
        { accessorKey: 'id', header: 'Request Id', size: 100, align: 'center' },
        { accessorKey: 'orderId', header: 'Order Id', size: 100, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 150, align: 'center' }
    ], []);

    const dataWithActions = refundRequests.map(row => ({
        id: row.id,
        customerName: row.customerName,
        orderId: row.orderId,
        actions: (
            <Box key={row.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to={`/SalesViewRequest/${row.id}`} key={row.id}>
                    <CustomizedButton
                        hoverBackgroundColor="#2d3ed2"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
                            width: '6em',
                            height: '2.5em',
                            fontSize: '0.95em',
                            padding: '0.5em 0.625em',
                            borderRadius: '0.35em',
                            marginTop: '0.625em'
                        }}>
                        View
                    </CustomizedButton>
                </Link>
                {row.warning && (
                    <Tooltip title={`Overdue by ${row.daysPending - 5} days`}>
                        <WarningIcon style={{ color: 'red', marginLeft: '0.5em' }} />
                    </Tooltip>
                )}
            </Box>
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
            backgroundColor: '#242F9B',
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
                <Link to="/SalesApprovedRefundsTable">
                <CustomizedButton
                    onClick={onViewApproved}
                    hoverBackgroundColor="#2d3ed2"
                    style={buttonStyle1}
                >
                    Approved Refunds
                </CustomizedButton>
                </Link>

                <Link to="/SalesRejectedRefundsTable">
                <CustomizedButton
                    onClick={onViewApproved}
                    hoverBackgroundColor="#2d3ed2"
                    style={buttonStyle2}
                >
                    Rejected Refunds
                </CustomizedButton>
                </Link>
            </Box>
        );
    };


    return (
        <>
            <SalesNavbar />
            <Container maxWidth="90%" style={{ backgroundColor: '#DBDFFD', height: '37.5em' }}>
                {hasOverdue && (
                    <CustomizedAlert
                        onClose={() => {}}
                        open={hasOverdue}
                        message="There are overdue refund requests !"
                        severity="warning"
                        style={{ marginBottom: 16 }}
                    />
                )}
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
                    {isLoading ? (
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
            <Footer />
        </>
    );
};

export default SalesRefundRequestsTable;
