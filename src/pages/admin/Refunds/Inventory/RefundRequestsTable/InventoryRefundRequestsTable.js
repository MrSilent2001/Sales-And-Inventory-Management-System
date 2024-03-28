import React, {useEffect, useState} from 'react';
import {Box, Container, Modal, Paper, Typography} from '@mui/material';
import ReusableTable from '../../../../../components/Reusable Table/Reusable Table';
import {styled} from '@mui/system';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import InventoryRefundRequest from "../../../../../pages/admin/Refunds/Inventory/Modal/InventoryRefundRequest";
import CustomizedButton from "../../../../../components/Button/button";


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

const InventoryRefundRequestsTable = ({onViewApproved}) => {
    const [requests, setRequests] = useState([]);
    const [visible,setVisible] = useState(false)

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
                    marginRight: '1.5em',
                    textTransform: 'none',
                    textAlign: 'center',
                }}>
                View
            </CustomizedButton>
        ) : (
            <Typography variant="body2" style={{color: 'gray'}}>
                {request.status}
            </Typography>
        ),
    }));

    return (
        <>
            <InventoryNavbar/>
            <Container
                className='inner_container'
                maxWidth="100%"
                sx={
                    {
                        backgroundColor: '#DBDFFD',
                        width: '100%',
                    }
                }
            >
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
                        <div style={{display:'flex'}}>
                            <CustomizedButton
                                onClick={()=>setVisible(true)}
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

                            <Link to="/SalesApprovedRefundsTable">
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
                    <StyledPaper>
                        <ReusableTable data={transformedData}/>

                    </StyledPaper>
                    <br/><br/>
                </Box>
            </Container>
            <Modal open={visible}>
                <InventoryRefundRequest onClose={(value) => { setVisible(false)}}></InventoryRefundRequest>
            </Modal>
            <Footer/>
        </>
    );
};

export default InventoryRefundRequestsTable;
