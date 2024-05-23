import React, {useEffect, useState} from 'react';
import "./orderStatus.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";

let columns = [
    {columnId: 'id', label: 'Id', minWidth: 170, align: 'center'},
    {columnId: 'name', label: 'Customer Name', minWidth: 170, align: 'center'},
    {
        columnId: 'amount',
        label: 'Amount(\u20A8.)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        columnId: 'status',
        label: '',
        minWidth: 100,
        align: 'center',

    }
];


function OrderStatus() {
    const [activeButton, setActiveButton] = useState(null);

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const [orderStatusRows, setOrderStatusRows] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/order/getAllOrders' ,  {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrderStatusRows(response.data);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchOrders();
    }, []);

    //array of states to manage status for each row
    const [statuses, setStatuses] = useState(orderStatusRows.map(() => ""));

    // Handler to update status for a specific row
    const handleChange = async (event, orderId, index) => {
        const newStatuses = [...statuses];
        newStatuses[index] = event.target.value;
        setStatuses(newStatuses);
        try {
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus: event.target.value } ,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },}
            );
            handleClickSuccess();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

        // Options to dropdown
    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'In-Processing', label: 'In-Processing' },
        { value: 'Departed', label: 'Departed' },
        { value: 'Cancelled', label: 'Cancelled' },
        
     
    ];

    const mappedData = orderStatusRows
        .filter(row => row.orderStatus === 'Accepted' || row.orderStatus === 'In-Processing' || row.orderStatus === 'Departed' || row.orderStatus === 'Rejected' || row.orderStatus === 'Cancelled')
        .sort((a, b) => a.orderId - b.orderId)
        .map((row, index) => ({
        id: row.orderId,
        name: row.orderReceiverName,
        amount: row.orderPrice,
        status: (
            <div>
                <ComboBox
                    value={statuses[index]}
                    onChange={(event) => handleChange(event, row.orderId, index)}
                    style={{width: '14em'}}
                    options={options}
                    label="Category"
                    size="small"
                    defaultValue={row.orderStatus}
                />
            </div>
        )
    }));

    return (
        <>
            <SalesNavbar/>
            <div className="orderStatusOuter">
                <div className="body">
                    <div className="orderStatusFilter">
                        <SalesOrderSidebar/>
                    </div>
                    <div className="orderStatusInner">
                        <CustomizedTable
                            columns={columns}
                            rows={mappedData}
                        />
                    </div>
                </div>
            </div>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Order Status Updated!"
            />
            <Footer/>
        </>
    );
}

export default OrderStatus;
