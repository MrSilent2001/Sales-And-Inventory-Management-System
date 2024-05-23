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
    {columnId: 'orderId', label: 'OrderId', minWidth: 170, align: 'center'},
    {columnId: 'orderItems', label: 'Ordered Items', minWidth: 100, align: 'center'},
    {
        columnId: 'orderPrice',
        label: 'Bill Amount',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //     columnId: 'totalAmount',
    //     label: 'Total Amount',
    //     minWidth: 170,
    //     align: 'center',
    //     format: (value) => value.toLocaleString('en-US'),
    // }
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
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:9000/order/findOrder/${id}` ,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPreviousOrders(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            }finally {
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
                            <h2>Previous Orders</h2>
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
                                rows={rows}
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