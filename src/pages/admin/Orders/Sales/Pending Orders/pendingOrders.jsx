import React, {useEffect, useState} from 'react';
import "./pendingOrders.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";
import sendOrderStatusEmail from "../_Component/orderStatusChangedEmailSend";

function PendingOrders() {
    const [activeButton, setActiveButton] = useState(null);
    const [rows, setRows] = useState([]);

    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    //data fetching error Alert Variables
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    //data Update error Alert Variables
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

    //Handle Data Error Alert Variable
    const dataErrorHandleCloseSuccess = () => {
        setDataErrorOpenSuccess(false);
    };

    const dataErrorHandleClickSuccess = () => {
        setDataErrorOpenSuccess(true);
    };

    //Handle Update Data Error Alert Variable
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
                const response = await axios.get('http://localhost:9000/order/getAllOrders' , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },}
                );
                setRows(response.data);
                console.log(rows);
            } catch (error) {
                console.error('Error fetching orders:', error);
                dataErrorHandleClickSuccess();
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatus = async (orderId, orderStatus) => {
        try {
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus } , {
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
            if (orderStatus === "Accepted"){
                handleClickAccept()
            }

            if (orderStatus === "Rejected"){
                handleClickReject()
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            updateErrorHandleClickSuccess();
        }
    };

    const columns = [
        { columnId: 'order_id', label: 'Id', minWidth: 170, align: 'center' },
        { columnId: 'customer_name', label: 'Customer Name', minWidth: 170, align: 'center' },
        {
            columnId: 'amount',
            label: 'Amount(\u20A8.)',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            columnId: 'actions',
            label: '',
            minWidth: 200,
            align: 'center',
            format: (accept, reject) => (
                <div style={{ display: 'flex' }}>
                    <CustomizedButton
                        onClick={() => { alert("Order has been Accepted") }}
                        // onClick={() => handleOrderStatus(orderId, 'Accept')}
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
    ];

    const mappedData = rows
        .filter(row => row.orderStatus === 'Pending')
        .sort((a, b) => a.orderId - b.orderId)
        .map(row => ({
            order_id: row.orderId,
            customer_name: row.orderReceiverName,
            amount: row.orderPrice,
            orderStatus: row.orderStatus,
            actions: (
                <div style={{ display: 'flex' }}>
                    <CustomizedButton
                        onClick={() => handleOrderStatus(row.orderId, "Accepted")}
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
                        onClick={() => handleOrderStatus(row.orderId, "Rejected")}
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
            )
        }));


    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <>
            <SalesNavbar/>
            <div className="PendingordersOuter">
                <div className="body">
                    <div className="PendingOrdersFilter">
                        <SalesOrderSidebar/>
                    </div>
                    <div className="PendingOrdersInner">
                        <div className="table1">
                            <CustomizedTable
                                columns={columns}
                                rows={mappedData.map(row => ({
                                    ...row,
                                    actions: row.actions
                                }))}
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

            <Footer/>
        </>
    );
}

export default PendingOrders;