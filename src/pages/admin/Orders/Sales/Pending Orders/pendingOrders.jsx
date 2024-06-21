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

function PendingOrders() {
    const [activeButton, setActiveButton] = useState(null);
    const [rows, setRows] = useState([]);

    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);

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
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/order/getAllOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                dataErrorHandleClickSuccess();
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatus = async (orderId, orderStatus, orderCancelReason = '') => {
        try {
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus, orderCancelReason }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            sendOrderStatusEmail(orderId, token);

            const updatedRows = rows.map(row => {
                if (row.orderId === orderId) {
                    return { ...row, orderStatus };
                }
                return row;
            });
            setRows(updatedRows);
            if (orderStatus === "Accepted") {
                handleClickAccept();
            }

            if (orderStatus === "Rejected") {
                handleClickReject();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            updateErrorHandleClickSuccess();
        }
    };

    const columns = useMemo(() => [
        { accessorKey: 'order_id', header: 'Id', size: 170 },
        { accessorKey: 'customer_name', header: 'Customer Name', size: 170 },
        {
            accessorKey: 'amount',
            header: 'Amount(\u20A8.)',
            size: 170,
            cellRenderer: ({ renderedCellValue }) => renderedCellValue.toLocaleString('en-US'),
        },
        {
            accessorKey: 'actions',
            header: '',
            size: 200,
            cellRenderer: ({ row }) => (
                <div style={{ display: 'flex' }}>
                    <CustomizedButton
                        onClick={() => handleOrderStatus(row.original.order_id, "Accepted")}
                        hoverBackgroundColor="#2d3ed2"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
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
                    </CustomizedButton>
                    <CustomizedButton
                        onClick={() => handleOrderStatus(row.original.order_id, "Rejected")}
                        hoverBackgroundColor="#f11717"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#960505',
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
                    </CustomizedButton>
                </div>
            ),
        }
    ], []);

    const mappedData = useMemo(() => rows
        .filter(row => row.orderStatus === 'Pending')
        .sort((a, b) => a.orderId - b.orderId)
        .map(row => ({
            order_id: row.orderId,
            customer_name: row.orderReceiverName,
            amount: row.orderPrice,
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
