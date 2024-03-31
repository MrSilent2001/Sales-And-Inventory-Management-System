import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Modal
} from '@mui/material';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import PlaceOrder from "../../../Orders/Inventory/Modals/Place Order/placeOrder";
import ViewOrder from "../../../Orders/Inventory/Modals/View Order/viewOrder";
import CustomizedButton from "../../../../../components/Button/button";
import purchasedOrders from "../../../../../data/data.json";
import SearchBar from "../../../../../components/search bar/search bar";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";

const PurchaseOrderDashboard = () => {

    const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
    const [viewOrderVisible, setViewOrderVisible] = useState(false);

    const rows = purchasedOrders.purchasedOrders || [];

    // Map your data to the format ReusableTable expects
    const mappedData = rows.map(row => ({
        id: row.supplierId,
        address: row.address,
        email: row.email,
        contact: row.contact,
        category: row.category,
        actions: (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => setPlaceOrderVisible(true)}
                    hoverBackgroundColor="#transparent"
                    style={{
                        color: '#242F9B',
                        backgroundColor: 'transparent',
                        border: '1px solid #242F9B',
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
                    View
                </CustomizedButton>

                <CustomizedButton
                    onClick={() => setPlaceOrderVisible(true)}
                    hoverBackgroundColor="transparent"
                    style={{
                        color: '#960505',
                        backgroundColor: 'transparent',
                        border: '1px solid #960505',
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
            <Box sx={{ display: 'flex', height: '100vh' }}>
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
                <Container maxWidth="xl" sx={{ bgColor: 'white', flexGrow: 1, p: 4 }}>
                    <SearchBar />
                    <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px - 4em)' }}>
                        <CustomizedTable
                            columns={[
                                { id: 'id', label: 'Supplier ID', minWidth: 100 },
                                { id: 'address', label: 'Address', minWidth: 200 },
                                { id: 'email', label: 'Email', minWidth: 200 },
                                { id: 'contact', label: 'Contact', minWidth: 150 },
                                { id: 'category', label: 'Category', minWidth: 150 },
                                { id: 'actions', label: 'Actions', minWidth: 200 }
                            ]}
                            data={mappedData}
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
