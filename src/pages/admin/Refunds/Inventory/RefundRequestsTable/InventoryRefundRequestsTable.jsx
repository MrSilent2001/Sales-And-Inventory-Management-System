import React, {useState} from 'react';
import {Box, Container, Modal,Typography} from '@mui/material';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import InventoryRefundRequest from "../Modal/InventoryRefundRequest";
import CustomizedButton from "../../../../../components/Button/button";
import inventoryRefunds from "../../../../../data/data.json";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";


const InventoryRefundRequestsTable = ({onViewApproved}) => {
    const [visible,setVisible] = useState(false)


    const columns=[
        { id: 'name', label: 'Name', minWidth: 70,align: 'center'  },
        { id: 'requestId', label: 'Request Id', minWidth: 150,align: 'center'  },
        { id: 'orderId', label: 'Order Id', minWidth: 120,align: 'center'  },
        { id: 'amount', label:'Amount', minWidth: 200,align: 'center'  },
        { id: 'status', label:'Status', minWidth: 200,align: 'center'  }
    ];

    const rows = inventoryRefunds.inventoryRefunds || [];

    const mappedData = rows.map(row => ({
        name: row.name,
        requestId: row.requestId,
        orderId: row.orderId,
        amount: row.amount,
        status: row.status
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
                        height: '40em'
                    }
                }
            >
                <Box sx={{}}>
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

                    <CustomizedTable
                        columns={columns}
                        rows={mappedData}
                    />
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
