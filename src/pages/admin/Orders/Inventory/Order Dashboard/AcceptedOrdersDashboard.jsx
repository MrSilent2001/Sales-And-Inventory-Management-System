import React, { useState, useEffect, useMemo } from 'react';
import {Box, Button, Container} from '@mui/material';
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import DynamicTable from '../../../../../components/Table/customizedTable2';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageLoader from "../../../../../components/Page Loader/pageLoader";
import BackArrow from "../../../../../components/Icons/backArrow";


const AcceptedOrdersDashboard = () => {

    const [departedOrders, setDepartedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchDepartedOrders();
    }, []);

    const fetchDepartedOrders = async () => {
        try {
            const response = await axios.get('http://localhost:9000/purchaseOrder/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const filteredOrders = response.data.filter(order => order.status === 'Received' || order.status === 'Departed', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDepartedOrders(filteredOrders);
            //setIsLoading(true);
        } catch (error) {
            console.error('Error fetching departed orders:', error);
        }
    };

    const handleMarkAsReceived = async (id) => {
        try {
            await axios.put(`http://localhost:9000/purchaseOrder/markAsReceived/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchDepartedOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'supplierName', header: 'Supplier', size: 50, align: 'center' },
        { accessorKey: 'Address', header: 'Address', size: 175, align: 'center' },
        { accessorKey: 'mail', header: 'Email', size: 60, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact', size: 50, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 120, align: 'center' }
    ], []);

    const dataWithActions = departedOrders.map(row => ({
        id: row.id,
        supplierName: row.supplierName,
        Address: row.Address,
        mail: row.mail,
        contact_number: row.contact_number,

        actions: row.status === 'Received' ? (
            <CheckCircleIcon style={{ color: 'green', fontSize: '2em' }} />
        ) : (
            <CustomizedButton
                onClick={() => handleMarkAsReceived(row.id)}
                hoverBackgroundColor="#242F9B"
                style={{
                    color: 'white',
                    backgroundColor: '#242F9B',
                    width: '11em',
                    height: '2.75em',
                    fontSize: '0.8em',
                    padding: '0.5em 0.625em',
                    marginTop: '0.625em',
                    marginRight: '0.75em'
                }}
            >
                Mark as Received
            </CustomizedButton>
        )
    }));


    return (
        <>
            <InventoryNavbar />
            <Box sx={{display: 'flex', height: '47em'}}>
                <Container maxWidth={false}
                           sx={{bgcolor: '#DBDFFD', height: 'auto', padding: '1.5em 0', position: 'relative',paddingTop:'3em'}}>
                    <div className="searchContainer">
                        <Link to="/purchasedOrder">
                            <Button
                                startIcon={<BackArrow/>}
                                size="large"
                                style={{
                                    color: "black",
                                    fontWeight: 'bold',
                                    textTransform: "none",
                                    fontSize: '1.25em'
                                }}
                            >
                                Accepted Orders
                            </Button>
                        </Link>
                    </div> <br/>
                    {isLoading ? (
                        <PageLoader/>
                    ) : (
                       
                        <DynamicTable
                            columns={columns}
                            data={dataWithActions}
                            includeProfile={false}
                            tableWidth="100%"
                            enableFilters={false}
                            initialShowGlobalFilter={true}
                        />
                    )}

                </Container>
            </Box>
            <Footer/>
        </>
    );
};

export default AcceptedOrdersDashboard;

