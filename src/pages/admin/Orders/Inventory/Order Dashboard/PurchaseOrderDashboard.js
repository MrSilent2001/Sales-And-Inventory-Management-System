import React, { useState,useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Modal
} from '@mui/material';
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import PlaceOrder from "../../../Orders/Inventory/Modals/Place Order/placeOrder";
import ViewOrder from "../../../Orders/Inventory/Modals/View Order/viewOrder";
import CustomizedButton from "../../../../../components/Button/button";
import SearchBar from "../../../../../components/search bar/search bar";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";

const PurchaseOrderDashboard = () => {

    const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
    const [viewOrderVisible, setViewOrderVisible] = useState(false);

    const [purchasedOrders, setPurchasedOrders] = useState([]);
    

    useEffect(() => {
        const fetchpurchasedOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getAll');
                setPurchasedOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching refund requests:', error);
            }
        };
        fetchpurchasedOrders();
    }, []);


   const columns=[
    
    { id: 'supplier', label: 'Supplier ID', minWidth: 70,align: 'center'  },
    { id: 'Address', label: 'Address', minWidth: 150,align: 'center'  },
    { id: 'mail', label: 'Email', minWidth: 120,align: 'center'  },
    { id: 'contact_number', label: 'Contact', minWidth: 100,align: 'center'  },
    { id: 'actions', label:'', minWidth: 200,align: 'center'  }
];

  


        const mappedData = purchasedOrders.map(row => ({
            supplier: row.supplier,
            Address: row.Address,
            mail: row.mail,
            contact_number: row.contact_number,
        
        
        actions: (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => setViewOrderVisible(true)}
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
                        marginTop: '0.625em',
                        marginRight: '2.5em',
                        marginLeft:'2.5em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    View
                </CustomizedButton>

                <CustomizedButton
                    onClick={() => setPlaceOrderVisible(true)}
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
                        marginTop: '0.625em',
                        marginRight: '1.5em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    Cancel
                </CustomizedButton>
            </div>
        )
    }));


    return (
        <>
            <InventoryNavbar />
            <Box sx={{ display: 'flex', height: '47rem' }}>
                {/* Sidebar */}
                <Box sx={{ width: '15%', height: 'auto', bgcolor: '#646FD4', color: 'white', p: 2 }}>
                    <CustomizedButton
                        onClick={() => setPlaceOrderVisible(true)}
                        hoverBackgroundColor="#0aaf0b"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#057007',
                            width: '11.5em',
                            height: '2.75em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            padding: '0.5em 0.625em',
                            borderRadius: '0.625em',
                            fontWeight: '550',
                            border: 'none',
                            marginTop: '5em',
                            marginBottom: '2em',
                            textTransform: 'none',
                            textAlign: 'center',
                        }}>
                        Place Order
                    </CustomizedButton>

                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>December</Typography>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>15</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>December</Typography>
                            <Typography variant="h6">In-Progress</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>5</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>December</Typography>
                            <Typography variant="h6">Completed</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>10</Typography>
                        </CardContent>
                    </Card>


                    <Modal open={placeOrderVisible}>
                        <PlaceOrder onClose={(value) => { setPlaceOrderVisible(false) }} />
                    </Modal>

                </Box>

                {/* Main Content */}
                <Container maxWidth={false} sx={{ bgcolor: '#DBDFFD', height:'auto' }}>
                   <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingTop:7,paddingBottom:7}}>
                     <SearchBar />
                    </Box>
                    <div style={{ overflow: 'auto', maxHeight: '50vh' }}> 
                    <CustomizedTable
                      style={{ width: '100%', overflowY: 'auto' }} 
                      columns={columns}
                      rows={mappedData}
                    />
                    </div>


                    <Modal open={viewOrderVisible}>
                        <ViewOrder onClose={(value) => { setViewOrderVisible(false) }} />
                    </Modal>

                </Container>
            </Box>
            <Footer />
        </>

    );
};

export default PurchaseOrderDashboard;
