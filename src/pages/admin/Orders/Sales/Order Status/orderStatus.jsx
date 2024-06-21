import React, { useEffect, useState } from 'react';
import "./orderStatus.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import DynamicTable from "../../../../../components/Table/customizedTable2";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";
import sendOrderStatusEmail from "../_Component/orderStatusChangedEmailSend";

let columns = [
    { accessorKey: 'id', header: 'Id', size: 170 },
    { accessorKey: 'name', header: 'Customer Name', size: 170 },
    {
        accessorKey: 'amount',
        header: 'Amount(\u20A8.)',
        size: 100,
        cellRenderer: ({ renderedCellValue }) => renderedCellValue.toLocaleString('en-US'),
    },
    {
        accessorKey: 'items',
        header: 'Items',
        size: 300,
    },
    {
        accessorKey: 'status',
        header: '',
        size: 100,
    }
];

function OrderStatus() {
    const [activeButton, setActiveButton] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);
    const [orderStatusRows, setOrderStatusRows] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                const [ordersResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:9000/order/getAllOrders', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:9000/product/getAllProducts', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);

                const products = productsResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});

                const orders = ordersResponse.data.map(order => {
                    const formattedItems = order.orderItems.map(itemStr => {
                        const item = JSON.parse(itemStr);
                        const productName = products[item.id];
                        return `${productName} (${item.id}) x ${item.amount}`;
                    }).join(', ');

                    return {
                        ...order,
                        items: formattedItems,
                    };
                });

                setOrderStatusRows(orders);
            } catch (error) {
                console.error('Error fetching orders or products:', error);
                setDataErrorOpenSuccess(true);
            }
        };

        fetchOrdersAndProducts();
    }, []);

    const [statuses, setStatuses] = useState(orderStatusRows.map(() => ""));

    const handleChange = async (event, orderId, index, orderCancelReason = '') => {
        const newStatuses = [...statuses];
        newStatuses[index] = event.target.value;
        setStatuses(newStatuses);
        try {
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus: event.target.value, orderCancelReason }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpenSuccess(true);
            sendOrderStatusEmail(orderId, token);
        } catch (error) {
            console.error('Error updating order status:', error);
            setUpdateErrorOpenSuccess(true);
        }
    };

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Accepted', label: 'Accepted' },
        // { value: 'Rejected', label: 'Rejected' },
        { value: 'In-Processing', label: 'In-Processing' },
        { value: 'Departed', label: 'Departed' },
        { value: 'Cancelled', label: 'Cancelled' },
    ];

    const mappedData = orderStatusRows
        .filter(row => ['Accepted', 'In-Processing', 'Departed', 'Rejected', 'Cancelled'].includes(row.orderStatus))
        .sort((a, b) => a.orderId - b.orderId)
        .map((row, index) => ({
            id: row.orderId,
            name: row.orderReceiverName,
            amount: row.orderPrice,
            items: row.items,
            status: (
                <ComboBox
                    value={statuses[index]}
                    onChange={(event) => handleChange(event, row.orderId, index)}
                    style={{ width: '14em' }}
                    options={options}
                    label="Category"
                    size="small"
                    defaultValue={row.orderStatus}
                />
            )
        }));

    return (
        <>
            <SalesNavbar />
            <div className="orderStatusOuter">
                <div className="body">
                    <div className="orderStatusFilter">
                        <SalesOrderSidebar />
                    </div>
                    <div className="orderStatusInner">
                        <DynamicTable
                            columns={columns}
                            data={mappedData}
                            initialShowGlobalFilter={true}
                        />
                    </div>
                </div>
            </div>

            <CustomizedAlert
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                severity="success"
                message="Order Status Updated!"
            />

            <CustomizedAlert
                open={dataErrorOpenSuccess}
                onClose={() => setDataErrorOpenSuccess(false)}
                severity="error"
                message="Error Fetching Data!"
            />

            <CustomizedAlert
                open={updateErrorOpenSuccess}
                onClose={() => setUpdateErrorOpenSuccess(false)}
                severity="error"
                message="Failed to Update Order Status!"
            />
            <Footer />
        </>
    );
}

export default OrderStatus;
