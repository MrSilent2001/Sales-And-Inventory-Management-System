import React, {useState, useEffect, useMemo} from 'react';
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
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../../../components/Table/customizedTable2";

const PurchaseOrderDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
    const [viewOrderVisible, setViewOrderVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('');
    const [purchasedOrders, setPurchasedOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [inProgressOrders, setInProgressOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const columns = useMemo(() => [
        { accessorKey: 'supplier', header: 'Supplier ID', size: 70, align: 'center' },
        { accessorKey: 'Address', header: 'Address', size: 150, align: 'center' },
        { accessorKey: 'mail', header: 'Email', size: 120, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact', size: 100, align: 'center' }
    ], []);


    const token = localStorage.getItem('accessToken');

    const fetchItems = async (query) => {
        try {
            const response = await axios.get(`http://localhost:9000/purchaseOrder/search?keyword=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurchasedOrders(response.data);
        } catch (error) {
            console.error('Error fetching Items:', error);
        }
    };

    useEffect(() => {
        const fetchPurchasedOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPurchasedOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };

        const fetchCurrentMonthName = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getCurrentMonthName', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCurrentMonth(response.data);
            } catch (error) {
                console.error('Error fetching current month name:', error);
            }
        };

        const fetchOrderCounts = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/total', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const inProgressResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/pending', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const completedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/completed', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTotalOrders(totalResponse.data);
                setInProgressOrders(inProgressResponse.data);
                setCompletedOrders(completedResponse.data);
            } catch (error) {
                console.error('Error fetching order counts:', error);
            }
        };

        fetchPurchasedOrders();
        fetchCurrentMonthName();
        fetchOrderCounts();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:9000/purchaseOrder/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurchasedOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setViewOrderVisible(true);
    };

    const createActions = (row) => {
        const buttonStyle = (backgroundColor) => ({
            color: 'white',
            backgroundColor,
            width: '7em',
            height: '2.75em',
            fontSize: '0.75em',
            fontFamily: 'inter',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '550',
            marginTop: '0.625em',
            textTransform: 'none',
            textAlign: 'center',
        });

        return (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => handleViewOrder(row)}
                    hoverBackgroundColor="#242F9B"
                    style={{ ...buttonStyle('#242F9B'), marginRight: '2.5em', marginLeft: '2.5em' }}
                >
                    View
                </CustomizedButton>

                <CustomizedButton
                    onClick={() => handleCancelOrder(row.id)}
                    hoverBackgroundColor="#960505"
                    style={{ ...buttonStyle('#960505'), marginRight: '1.5em' }}
                >
                    Cancel
                </CustomizedButton>
            </div>
        );
    };


    const mappedData = purchasedOrders.map(row => ({
        id: row.id,
        supplier: row.supplier,
        Address: row.Address,
        mail: row.mail,
        contact_number: row.contact_number,
        actions: createActions
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
                        <PlaceOrder onClose={() => setPlaceOrderVisible(false)} />
                    </Modal>
                </Box>

                {/* Main Content */}
                <Container maxWidth={false} sx={{ bgcolor: '#DBDFFD', height: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 7, paddingBottom: 7 }}>
                        {/*<SearchBar*/}
                        {/*    label="Search Orders"*/}
                        {/*    onKeyPress={fetchItems}*/}
                        {/*/>*/}
                    </Box>
                    <div >
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={mappedData}
                                createActions={createActions}
                                includeProfile={false}
                            />
                        )}
                    </div>

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
