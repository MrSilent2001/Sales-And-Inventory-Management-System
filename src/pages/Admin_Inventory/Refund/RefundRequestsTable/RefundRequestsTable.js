import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Paper, Typography} from '@mui/material';

import ReusableTable from '../../../../components/Reusable Table/Reusable Table';
import {styled} from '@mui/system';
import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";


const StyledPaper = styled(Paper)(({theme}) => ({
    '& .MuiTableCell-root': {
        textAlign: 'center',
        paddingleft: '19rem',


    },
}));
const fetchRequests = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                // Mock data, adjust as per your requirement
                {name: 'John Doe', requestId: '1', orderId: 'A1', amount: '100.00', status: 'Pending'},
                {name: 'Jane Doe', requestId: '2', orderId: 'A2', amount: '200.00', status: 'Pending'},
                {name: 'John Doe', requestId: '1', orderId: 'A1', amount: '100.00', status: 'Pending'},
                {name: 'Jane Doe', requestId: '2', orderId: 'A2', amount: '200.00', status: 'Pending'},
                {name: 'John Doe', requestId: '1', orderId: 'A1', amount: '100.00', status: 'Pending'},
                {name: 'Jane Doe', requestId: '2', orderId: 'A2', amount: '200.00', status: 'Pending'},
                {name: 'John Doe', requestId: '1', orderId: 'A1', amount: '100.00', status: 'Pending'},
                {name: 'Jane Doe', requestId: '2', orderId: 'A2', amount: '200.00', status: 'Pending'}
            ]);
        }, 1000);
    });
};

const RefundRequestsTable = ({onViewApproved}) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests().then(data => {
            setRequests(data);
        });
    }, []);

    const handleStatusButtonClick = requestId => {
        console.log('Button for request ID', requestId, 'was clicked');
    };

    const transformedData = requests.map(request => ({
        Name: request.name,
        "Request ID": request.requestId,
        "Order ID": request.orderId,
        Amount: request.amount,
        Status: request.status === 'Pending' ? (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleStatusButtonClick(request.requestId)}
            >
                View
            </Button>
        ) : (
            <Typography variant="body2" style={{color: 'gray'}}>
                {request.status}
            </Typography>
        ),
    }));

    return (
        <>
            <InventoryNavbar/>
            <Container className='inner_container' maxWidth="90%" sx={{backgroundColor: '#DBDFFD'}}>
                <Box sx={{my: 4}}>
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
                            <Link to="/InventoryRefundRequest">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                    }} // Implement the logic for this button
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: "#FF0000",
                                        textTransform: "none",
                                        color: 'white',
                                        marginRight: 1,
                                    }}
                                >
                                    Refunds Request
                                </Button>
                            </Link>

                            <Link to="/ApprovedRefundsTable">
                                <Button
                                    variant="contained"
                                    onClick={onViewApproved}
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: "#242F9B",
                                        textTransform: "none",
                                    }}
                                >
                                    Approved Refunds
                                </Button>
                            </Link>

                        </Box>
                    </Box>
                    <StyledPaper>
                        <ReusableTable data={transformedData}/>

                    </StyledPaper>
                    <br/><br/>
                </Box>
            </Container>
            <Footer/>
        </>
    );
};

export default RefundRequestsTable;
