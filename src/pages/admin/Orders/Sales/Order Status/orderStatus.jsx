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
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

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

let columns = [
    { accessorKey: 'id', header: 'ID', size: 70 },
    { accessorKey: 'name', header: 'NAME', size: 70 },
    {
        accessorKey: 'amount',
        header: 'AMOUNT(\u20A8.)',
        size: 70,
        cellRenderer: ({ renderedCellValue }) => renderedCellValue.toLocaleString('en-US'),
    },
    {
        accessorKey: 'items',
        header: 'ORDERED ITEMS',
        size: 70,
    },

    // {
    //     accessorKey: 'items',
    //     header: 'ORDERED ITEMS',
    //     size: 100,
    //     cellRenderer: ({ row }) => {
    //         const orderItems = row.original.orderItems.map(itemStr => {
    //             const item = JSON.parse(itemStr);
    //             const productName = products[item.id];
    //             return `${productName} (${item.id}) x ${item.amount}`;
    //         });
    //         return (
    //             <LightTooltip title={orderItems.join(', ')}>
    //                 <CustomButton>View items</CustomButton>
    //             </LightTooltip>
    //         );
    //     }
    // },

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
        { value: 'Pending', label: 'Pending', rgb: '100, 110, 211' },
        { value: 'Accepted', label: 'Accepted', rgb: '76, 175, 80' },
        { value: 'In-Processing', label: 'In-Processing', rgb: '255, 193, 7' },
        { value: 'Departed', label: 'Departed', rgb: '233, 30, 99' },
        // { value: 'Cancelled', label: 'Cancelled', rgb: '244, 67, 54' },
        // { value: 'Rejected', label: 'Rejected', rgb: '233, 30, 99' },
    ];

    const mappedData = orderStatusRows
        .filter(row => ['Accepted', 'In-Processing', 'Departed', 'Rejected'].includes(row.orderStatus))
        .sort((a, b) => a.orderId - b.orderId)
        .map((row, index) => ({
            id: row.orderId,
            name: row.orderReceiverName,
            amount: row.orderPrice,
            items: (
                <LightTooltip title={row.items}>
                    <CustomButton>View items</CustomButton>
                </LightTooltip>
            ),
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
