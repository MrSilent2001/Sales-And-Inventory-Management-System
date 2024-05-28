import './customerOrderHistory.css';
import * as React from 'react';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import SearchBar from "../../../components/search bar/search bar";
import PageLoader from "../../../components/Page Loader/pageLoader";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import {useEffect, useState} from "react";
import axios from "axios";


const columns = [
    // {columnId: 'orderId', label: 'OrderId', minWidth: 170, align: 'center'},
    {columnId: 'orderItems', label: 'Ordered Items', minWidth: 100, align: 'center'},
    {
        columnId: 'orderPrice',
        label: 'Bill Amount',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'orderDate',
        label: 'Date',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

    {
        columnId: 'orderStatus',
        label: 'Order Status',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }

];


function CustomerOrderHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    let rows =[];

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPreviousOrders = async () => {
            const id = localStorage.getItem('id');
            const role = localStorage.getItem('role');

            if (role !== 'customer') {
                console.error('Error: Only customers can fetch previous orders.');
                return;
            }

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
                const ordersWithNamesAndFormattedItems = filteredOrders.map(order => {
                    const orderItemsWithName = order.orderItems.map(itemId => products[itemId]);
                    const formattedOrderItems = orderItemsWithName.join(', ');
                    return { ...order, orderItems: formattedOrderItems };
                });

                // Sort orders by date (latest to oldest)
                const sortedOrders = ordersWithNamesAndFormattedItems.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

                console.log(sortedOrders);
                setPreviousOrders(sortedOrders);
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

                        <div className="customerOrdersTextField">
                            <SearchBar/>
                        </div>
                    </div>
                    <div className='orderHistory'>
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <CustomizedTable
                                columns={columns}
                                rows={previousOrders}
                            />
                        )}
                    </div>

                </div>
            </div>

            <Footer/>
        </>
    );
}

export default CustomerOrderHistory;