import React, { useEffect, useMemo, useState } from 'react';
import "./supplierOrders.css";
import Footer from "../../../layout/footer/footer";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";
import { useNavigate } from "react-router-dom";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import ComboBox from "../../../components/Form Inputs/comboBox";

function SupplierOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    const columns = useMemo(() => [
        { accessorKey: 'customerName', header: 'Customer Name', size: 75 },
        { accessorKey: 'mail', header: 'Email', size: 25 },
        { accessorKey: 'contact_number', header: 'Contact', size: 25 },
        { accessorKey: 'Address', header: 'Address', size: 100 },
        { accessorKey: 'createdDate', header: 'Ordered Date', size: 75 },
        { accessorKey: 'items', header: 'Order Details', size: 100 }
    ], []);

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

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const supplierResponse = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const orderResponse = await axios.get('http://localhost:9000/purchaseOrder/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredOrders = orderResponse.data.filter(order => order.supplierId === id);
                setOrders(filteredOrders);
            } catch (error) {
                handleClickError();
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [token, id]);

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'In-Processing', label: 'In-Processing' }
    ];

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            await axios.put(`http://localhost:9000/purchaseOrder/update/${orders[0].id}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            const order = orders.find(order => order.id === orderId);
            await axios.post('http://localhost:9000/email/send/purchaseOrderStatus', {
                receiverName: "Tradeasy Pvt Ltd",
                emailSubject: "Order Status Update!",
                emailBody: `Your order under the Order Id: ${orders[0].id} has been ${newStatus}. Thank You!`,
                receiverEmail: orders[0].mail
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            handleClickSuccess();
        } catch (error) {
            handleClickError();
            console.error('Error updating order status:', error);
        }
    };

    const createActionButtons = (row, order) => {
        const orderStatus = order ? order.status : 'Pending';
        return (
            <div>
                <ComboBox
                    onChange={(event) => handleStatusChange(event, row.id)}
                    style={{ width: '10em' }}
                    options={options}
                    label="Status"
                    size="small"
                    defaultValue={orderStatus}
                />
            </div>
        );
    };

    return (
        <>
            <SupplierNavbar />
            <div className="supplierOrderManagementOuter">
                <div className="supplierOrderManagementInner">
                    <h2 className="supplierOrderManagement-title">Orders</h2>
                    <div className="supplierOrderManagement">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={orders}
                                createActions={(row) => createActionButtons(row, orders.find(order => order.id === row.id))}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Order status updated successfully!"
            />
            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Error updating order status."
            />
        </>
    );
}

export default SupplierOrders;
