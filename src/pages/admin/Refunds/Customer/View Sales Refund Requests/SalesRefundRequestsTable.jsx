import React from 'react';
import {Box, Container, Paper, Typography} from '@mui/material';
import Footer from "../../../../../layout/footer/footer";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import viewRefunds from "../../../../../context/data.json";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";


const SalesRefundRequestsTable = ({onViewApproved}) => {
    const handleStatusButtonClick = requestId => {
        console.log('Button for request ID', requestId, 'was clicked');
    };

    const columns=[
        { id: 'name', label: 'Name', minWidth: 70,align: 'center'  },
        { id: 'requestId', label: 'Request Id', minWidth: 150,align: 'center'  },
        { id: 'orderId', label: 'Order Id', minWidth: 120,align: 'center'  },
        { id: 'actions', label:'', minWidth: 200,align: 'center'  }
    ];

    const rows = viewRefunds.viewRefunds || [];

    const mappedData = rows.map(row => ({
        name: row.name,
        requestId: row.requestId,
        orderId: row.orderId,
        actions: (
            <Link to="/SalesViewRequest">
                <CustomizedButton
                    onClick={() => handleStatusButtonClick}
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
                        <CustomizedTable
                            columns={columns}
                            rows={mappedData}
                        />
                    </Paper>
                </Box>
            </Container>
            <Footer/>
        </>
    );
};

export default SalesRefundRequestsTable;
