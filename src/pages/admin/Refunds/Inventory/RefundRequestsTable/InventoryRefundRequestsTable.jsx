import React, {useState, useEffect, useMemo} from 'react';
import {Box, Container, Modal,Typography} from '@mui/material';
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import InventoryRefundRequest from "../../../../../pages/admin/Refunds/Inventory/Modal/InventoryRefundRequest";
import CustomizedButton from "../../../../../components/Button/button";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../../../components/Table/customizedTable2";


const InventoryRefundRequestsTable = ({onViewApproved}) => {
    const [visible,setVisible] = useState(false)
    const [refundRequests, setRefundRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const columns = useMemo(() => [
        { accessorKey: 'name', header: 'Name', size: 70, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact Number', size: 150, align: 'center' },
        { accessorKey: 'inventory_id', header: 'Refund Id', size: 120, align: 'center' },
        { accessorKey: 'amount', header: 'Price', size: 200, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 200, align: 'center' },
    ], []);

    useEffect(() => {
        const fetchRefundRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9000/refund/inventoryRefund/getAll');
                setRefundRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching refund requests:', error);
                setError('Failed to fetch refund requests. Please try again later.');
            }
        };
        fetchRefundRequests();
    }, []);

    const mappedData = refundRequests.map(row => ({
        name: row.supplier,
        contact_number: row.phone,
        inventory_id: row.inventory_id,
        amount: row.price,
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
                        height: '47em'
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
                    <br/>
                    <br/>
                    {isLoading ? (
                        <PageLoader />
                    ) : (

                        <DynamicTable
                            columns={columns}
                            data={refundRequests}
                            includeProfile={false}
                        />
                    )}
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
