import React, { useEffect, useState, useMemo } from 'react';
import "./pendingOrders.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import DynamicTable from "../../../../../components/Table/customizedTable2";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";
import sendOrderStatusEmail from "../_Component/orderStatusChangedEmailSend";
import {useNavigate} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


function PendingOrders() {
    const [activeButton, setActiveButton] = useState(null);
    const [rows, setRows] = useState([]);
    const [products, setProducts] = useState({});
    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);
    const navigate = useNavigate();

    const handleClickAccept = () => {
        setOpenAccept(true);
    };

    const handleClickReject = () => {
        setOpenReject(true);
    };

    const handleCloseAccept = () => {
        setOpenAccept(false);
    };

    const handleCloseReject = () => {
        setOpenReject(false);
    };

    const dataErrorHandleCloseSuccess = () => {
        setDataErrorOpenSuccess(false);
    };

    const dataErrorHandleClickSuccess = () => {
        setDataErrorOpenSuccess(true);
    };

    const updateErrorHandleCloseSuccess = () => {
        setUpdateErrorOpenSuccess(false);
    };

    const updateErrorHandleClickSuccess = () => {
        setUpdateErrorOpenSuccess(true);
    };

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                const [orderResponse, productResponse] = await Promise.all([
                    axios.get('http://localhost:9000/order/getAllOrders', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('http://localhost:9000/product/getAllProducts', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ]);

                const products = productResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});

                setRows(orderResponse.data);
                setProducts(products);
            } catch (error) {
                console.error('Error fetching data:', error);
                dataErrorHandleClickSuccess();
            }
        };

        fetchOrdersAndProducts();
    }, [token]);

    const handleOrderStatus = async (orderId, orderStatus, orderCancelReason = '') => {
        try {
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus, orderCancelReason }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedRows = rows.map(row => {
                if (row.orderId === orderId) {
                    return { ...row, orderStatus };
                }
                return row;
            });
            setRows(updatedRows);
            if (orderStatus === "Accepted") {
                sendOrderStatusEmail(orderId, token);
                handleClickAccept();

            }

            // if (orderStatus === "Rejected") {
            //     // handleClickReject();
            //     navigate('/cancelOrders');
            // }
        } catch (error) {
            console.error('Error updating order status:', error);
            updateErrorHandleClickSuccess();
        }
    };

    const handleReject = () => {
            // handleClickReject();
            navigate('/cancelOrders');

    }

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 13,
        },
    }));

    const CustomButton = styled(Button)(({ theme }) => ({
        color: '#646ed3',
        backgroundColor: 'rgba(100,110,211,0.11)',
        border: '1px solid #646ed3',
        width: '7em',
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
        '&:hover': {
            backgroundColor: '#e0e0e0',
        },
    }));

    const columns = useMemo(() => [
        { accessorKey: 'order_id', header: 'ID', size: 10 },
        { accessorKey: 'customer_name', header: 'NAME', size: 70 },
        {
            accessorKey: 'items',
            header: 'ORDERED ITEMS',
            size: 100,
            cellRenderer: ({ row }) => {
                const orderItems = row.original.orderItems.map(itemStr => {
                    const item = JSON.parse(itemStr);
                    const productName = products[item.id];
                    return `${productName} (${item.id}) x ${item.amount}`;
                });
                return (
                    <LightTooltip title={orderItems.join(', ')}>
                        <CustomButton>View items</CustomButton>
                    </LightTooltip>
                );
            }
        },
        {
            accessorKey: 'amount',
            header: 'AMOUNT(\u20A8.)',
            size: 170,
            cellRenderer: ({ renderedCellValue }) => renderedCellValue.toLocaleString('en-US'),
        },
        {
            accessorKey: 'actions',
            header: '',
            size: 200,
            cellRenderer: ({ row }) => (
                <div style={{ display: 'flex' }}>
                    <CustomButton
                        onClick={() => handleOrderStatus(row.original.order_id, "Accepted")}
                        style={{
                            color: '#42b631',
                            backgroundColor: 'rgba(66,182,49,0.10)',
                            border: '1px solid #42b631',
                            width: '6em',
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
                        Accept
                    </CustomButton>
                    <CustomButton
                        onClick={() => handleReject()}
                        style={{
                            color: '#f5665f',
                            backgroundColor: 'rgba(245,102,95,0.10)',
                            border: '1px solid #f5665f',
                            width: '6em',
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
                        Reject
                    </CustomButton>
                </div>
            ),
        }
    ], [products]);


    const mappedData = useMemo(() => rows
        .filter(row => row.orderStatus === 'Pending')
        // .sort((a, b) => a.orderId - b.orderId)
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .map(row => ({
            order_id: row.orderId,
            customer_name: row.orderReceiverName,
            amount: row.orderPrice,
            orderItems: row.orderItems,
            actions: null, // Actions are handled in columns configuration
        })), [rows]);

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <>
            <SalesNavbar />
            <div className="PendingordersOuter">
                <div className="body">
                    <div className="PendingOrdersFilter">
                        <SalesOrderSidebar />
                    </div>
                    <div className="PendingOrdersInner">
                        <div className="table1">
                            <DynamicTable
                                columns={columns}
                                data={mappedData}
                                enableFilters={true}
                                enableSorting={true}
                                initialShowFilters={false}
                                initialShowGlobalFilter={true}
                                rowsPerPageOptions={[7, 14, 21]}
                                onRowClick={(row) => {
                                    console.log('Row clicked:', row);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CustomizedAlert
                open={openAccept}
                onClose={handleCloseAccept}
                severity="success"
                message="Order Accepted!"
            />

            <CustomizedAlert
                open={openReject}
                onClose={handleCloseReject}
                severity="error"
                message="Order Rejected!"
            />

            <CustomizedAlert
                open={dataErrorOpenSuccess}
                onClose={dataErrorHandleCloseSuccess}
                severity="error"
                message="Error Fetching Data!"
            />

            <CustomizedAlert
                open={updateErrorOpenSuccess}
                onClose={updateErrorHandleCloseSuccess}
                severity="error"
                message="Error Occurs!"
            />

            <Footer />
        </>
    );
}

export default PendingOrders;
