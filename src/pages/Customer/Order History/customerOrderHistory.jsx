import './customerOrderHistory.css';
import * as React from 'react';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import SearchBar from "../../../components/search bar/search bar";
import PageLoader from "../../../components/Page Loader/pageLoader";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import DynamicTable from "../../../components/Table/customizedTable2";
import CustomizedAlert from "../../../components/Alert/alert";


function CustomerOrderHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [openError, setOpenError] = useState(false);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('accessToken');
    console.log(id);
    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 75, align: 'center' },
        { accessorKey: 'orderItems', header: 'Ordered Items', size: 100, align: 'center' },
        {
            accessorKey: 'orderPrice',
            header: 'Bill Amount',
            size: 170,
            align: 'center'
        },
        {
            accessorKey: 'orderDate',
            header: 'Date',
            size: 170,
            align: 'center',
        },
        {
            accessorKey: 'orderStatus',
            header: 'Order Status',
            size: 170,
            align: 'center'
        }
    ], []);



    const handleClickError = () => {
        setOpenError(true);
    };

    let rows =[];

    useEffect(() => {
        const fetchPreviousOrders = async () => {
            setIsLoading(true);
            try {
                // Fetch all products
                const productsResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = productsResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName; // Map product ID to its name
                    return acc;
                }, {});

                const response = await axios.get('http://localhost:9000/order/getAllOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Filter orders by orderCustomerId
                const filteredOrders = response.data.filter(order => order.orderCustomerId === id);

                // Replace item IDs with names and format orderItems
                // const ordersWithNamesAndFormattedItems = filteredOrders.map(order => {
                //     const orderItemsWithName = order.orderItems.map(itemId => products[itemId]);
                //     const formattedOrderItems = orderItemsWithName.join(', ');
                //     return { ...order, orderItems: formattedOrderItems };
                // });
                //
                // // Sort orders by date (latest to oldest)
                // const sortedOrders = ordersWithNamesAndFormattedItems.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

                console.log(filteredOrders);
                setPreviousOrders(filteredOrders);
            } catch (error) {
                handleClickError();
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPreviousOrders();

    }, []);



    rows = rows.map(row => ({ ...row}));

    return (
        <>
            <CustomerNavbar/>
            <div className="CustomerOrdersOuter">
                <div className="CustomerOrdersInner">
                    <div className="customerOrdersTopicWithTextfield">
                        <div className="customerOrdersTopic">
                            <h2>My Orders</h2>
                        </div>
                    </div>
                    <div className='orderHistory'>
                        {isLoading ? (
                            <PageLoader />
                        ) : (

                            <DynamicTable
                                columns={columns}
                                data={previousOrders}
                                includeProfile={false}
                            />
                        )}
                    </div>

                </div>
            </div>
            <Footer/>

            <CustomizedAlert
                open={openError}
                onClose={handleClickError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    );
}

export default CustomerOrderHistory;