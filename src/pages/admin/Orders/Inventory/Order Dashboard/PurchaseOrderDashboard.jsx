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
    const [currentMonth, setCurrentMonth] = useState('');
    const [purchasedOrders, setPurchasedOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [inProgressOrders, setInProgressOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);


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

        const fetchCurrentMonthName = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getCurrentMonthName');
                setCurrentMonth(response.data);
            } catch (error) {
                console.error('Error fetching current month name:', error);
            }
        };

        const fetchOrderCounts = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/total');
                const inProgressResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/pending');
                const completedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/completed');

                setTotalOrders(totalResponse.data);
                setInProgressOrders(inProgressResponse.data);
                setCompletedOrders(completedResponse.data);
            } catch (error) {
                console.error('Error fetching order counts:', error);
            }
        };

        fetchpurchasedOrders();
        fetchCurrentMonthName();
        fetchOrderCounts();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:9000/purchaseOrder/delete/${orderId}`);
            setPurchasedOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setViewOrderVisible(true);
    };
    
   const columns=[
    
    { columId: 'supplier', label: 'Supplier ID', minWidth: 70,align: 'center'  },
    { columId: 'Address', label: 'Address', minWidth: 150,align: 'center'  },
    { columId: 'mail', label: 'Email', minWidth: 120,align: 'center'  },
    { columId: 'contact_number', label: 'Contact', minWidth: 100,align: 'center'  },
    { columId: 'actions', label:'', minWidth: 200,align: 'center'  }
];

  


        const mappedData = purchasedOrders.map(row => ({
            id: row.id,
            supplier: row.supplier,
            Address: row.Address,
            mail: row.mail,
            contact_number: row.contact_number,
        
        
        actions: (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => handleViewOrder(row.id)}
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
                    onClick={() => handleCancelOrder(row.id)}
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
                   
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">In-Progress</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{inProgressOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Completed</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{completedOrders}</Typography>
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


                    {/*<Modal open={viewOrderVisible}>*/}
                    {/*   <ViewOrder order={selectedOrder} onClose={(value) => { setViewOrderVisible(false) }} />*/}
                    {/*</Modal>*/}

                    <Modal open={viewOrderVisible}>
                        <ViewOrder order={selectedOrder} onClose={() => setViewOrderVisible(false)} />
                    </Modal>

                </Container>
            </Box>
            <Footer />
        </>

    );
};

export default PurchaseOrderDashboard;
