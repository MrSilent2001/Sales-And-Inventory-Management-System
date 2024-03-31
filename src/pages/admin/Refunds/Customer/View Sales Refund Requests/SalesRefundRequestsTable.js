import React, {useEffect, useState} from 'react';
import {Box, Container, Paper, Typography} from '@mui/material';
import Footer from "../../../../../layout/footer/footer";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import DefaultTable from "../../../../../components/Table/Default Table/defaultTable";

const fetchRequests = () => {
    return Promise.resolve([
        {name: 'John Doe', requestId: '0771112224', orderId: 'J0002'},
        {name: 'John Doe', requestId: '0771112224', orderId: 'I0002'},
        {name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003'},
        {name: 'John Doe', requestId: '0771112224', orderId: 'J0002'},
        {name: 'John Doe', requestId: '0771112224', orderId: 'I0002'},
        {name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003'}
    ]);
};

const SalesRefundRequestsTable = ({onViewApproved}) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests().then(data => {
            setRequests(data);
        });
    }, []);

    const handleStatusButtonClick = requestId => {
        console.log('Button for request ID', requestId, 'was clicked');
    };

    // Transform data to match the ReusableTable format
    const transformedData = requests.map(request => ({
        Name: request.name,
        "Request ID": request.requestId,
        "Order ID": request.orderId,
        Status: (
            <Box display="flex" justifyContent="flex-end">
                <Link to="/SalesViewRequest">
                    <CustomizedButton
                        onClick={() => handleStatusButtonClick(request.requestId)}
                        hoverBackgroundColor="#2d3ed2"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
                            width: '6em',
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
                        View
                    </CustomizedButton>
                </Link>
            </Box>
        )
    }));

    return (
        <>
            <SalesNavbar/>
            <Container maxWidth="90%" style={{backgroundColor: '#DBDFFD', height: '37.5em'}}>
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
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            Refund Request
                        </Typography>
                        <Box>
                            <Link to="/ApprovedRefundsTable">
                                <CustomizedButton
                                    onClick={onViewApproved}
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
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Approved Refunds
                                </CustomizedButton>
                            </Link>

                        </Box>
                    </Box>
                    <Paper>
                        <DefaultTable data={transformedData}/>
                    </Paper>
                </Box>
            </Container>
            <Footer/>
        </>
    );
};

export default SalesRefundRequestsTable;
