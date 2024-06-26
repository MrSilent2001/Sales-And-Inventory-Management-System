import './Admin Order History.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import SalesNavbar from '../../../layout/navbar/Sales navbar/sales navbar';
import Footer from "../../../layout/footer/footer";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";

function AdminOrderHistory() {
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem('accessToken');

    const columns = React.useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 170, Cell: ({ cell }) => <div style={{ textAlign: 'center' }}>{cell.getValue()}</div> },
        { accessorKey: 'orderItems', header: 'Items Ordered', size: 100, Cell: ({ cell }) => <div style={{ textAlign: 'center' }}>{cell.getValue()}</div> },
        {
            accessorKey: 'orderPrice',
            header: 'Total Amount',
            size: 170,
            Cell: ({ cell }) => <div style={{ textAlign: 'center' }}>{cell.getValue().toLocaleString('en-US')}</div>
        },
        {
            accessorKey: 'orderDate',
            header: 'Date',
            size: 170,
            Cell: ({ cell }) => <div style={{ textAlign: 'center' }}>{cell.getValue().toLocaleString('en-US')}</div>
        },
        {
            accessorKey: 'orderStatus',
            header: 'Status',
            size: 170,
            Cell: ({ cell }) => <div style={{ textAlign: 'center' }}>{cell.getValue().toLocaleString('en-US')}</div>
        }
    ], []);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/order/getAllOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Filter orders by orderCustomerId
                const filteredOrders = response.data.filter(order => order.orderCustomerId === id);
                console.log(filteredOrders)
                setOrder(filteredOrders);

            } catch (error) {
                console.error('Error fetching users:', error);
            }finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    return (
        <>
            <SalesNavbar/>
            <div className="AdminOrdersOuter">
                <div className="AdminOrdersInner">
                    <div className="AdminOrdersTopicWithTextfield">
                        <div className="AdminOrdersTopic">
                            <h2>Orders</h2>
                        </div>
                    </div>

                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={order}
                                includeProfile={false}
                            />
                        )}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default AdminOrderHistory;
