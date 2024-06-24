import React, { useEffect, useState } from 'react';
import "./supplierOrders.css";
import Footer from "../../../layout/footer/footer";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";
import DynamicTable from "../../../components/Table/customizedTable2";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import ComboBox from "../../../components/Form Inputs/comboBox";

const columns = [
    { accessorKey: 'mail', header: 'Email', size: 25 },
    { accessorKey: 'contact_number', header: 'Contact', size: 25 },
    { accessorKey: 'Address', header: 'Address', size: 200 },
    { accessorKey: 'createdDate', header: 'Ordered Date', size: 50 },
    { accessorKey: 'items', header: 'Order Details', size: 75 },
    { accessorKey: 'status', header: 'Order Status', size: 100 }
];

function SupplierOrders() {
    const [orders, setOrders] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

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


                const filteredOrders = orderResponse.data.filter(order => String(order.supplierId) === String(id));
                setOrders(filteredOrders);
                setStatuses(filteredOrders.map(order => order.status));
            } catch (error) {
                setOpenError(true);
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [token, id]);

    const handleStatusChange = async (event, orderId, index) => {
        const newStatus = event.target.value;
        const newStatuses = [...statuses];
        newStatuses[index] = newStatus;
        setStatuses(newStatuses);

        try {
            await axios.put(`http://localhost:9000/purchaseOrder/update/${orderId}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            await axios.put(`http://localhost:9000/purchaseOrder/update/${orderId}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const order = orders.find(order => order.id === orderId);
            axios.post('http://localhost:9000/email/send/purchaseOrderStatus', {
                receiverName: "Tradeasy Pvt Ltd",
                emailSubject: "Order Status Update!",
                emailBody: `Your order under the Order Id: ${orderId} has been ${newStatus}. Thank You!`,
                receiverEmail: 'tradeasy.official01@gmail.com'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpenSuccess(true);
        } catch (error) {
            setOpenError(true);
            console.error('Error updating order status:', error);
        }
    };

    const options = [
        { value: 'Pending', label: 'Pending', backgroundColor: 'orange' },
        { value: 'Accepted', label: 'Accepted', backgroundColor: 'blue' },
        { value: 'Rejected', label: 'Rejected', backgroundColor: 'red' },
        { value: 'In-Processing', label: 'In-Processing', backgroundColor: 'green' },
        { value: 'Departed', label: 'Departed', backgroundColor: 'yellow' }
    ];

    const mappedData = orders.map((order, index) => ({
        ...order,
        status: (
            <ComboBox
                value={statuses[index]}
                onChange={(event) => handleStatusChange(event, order.id, index)}
                style={{ width: '10em' }}
                options={options}
                label="Status"
                size="small"
                defaultValue={order.status}
            />
        )
    }));

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
                                data={mappedData}
                                initialShowGlobalFilter={true}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <CustomizedAlert
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                severity="success"
                message="Order status updated successfully!"
            />
            <CustomizedAlert
                open={openError}
                onClose={() => setOpenError(false)}
                severity="error"
                message="Error updating order status."
            />
        </>
    );
}

export default SupplierOrders;
