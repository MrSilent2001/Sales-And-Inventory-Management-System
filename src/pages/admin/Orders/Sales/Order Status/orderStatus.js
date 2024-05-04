import React, {useEffect, useState} from 'react';
import "./orderStatus.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import orderStatus from "../../../../../data/data.json";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import axios from "axios";

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

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const [orderStatusRows, setOrderStatusRows] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/order/getAllOrders');
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
            await axios.put(`http://localhost:9000/order/update/${orderId}`, { orderStatus: event.target.value });
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
                        <div className="Button1">
                            <Link to="/pendingOrders">
                                <CustomizedButton
                                    children="Pending Orders"
                                    onClick={() => handleButtonClick("Button 1")}
                                    variant="contained"
                                    size="large"
                                    style={{
                                        color: '#646FD4',
                                        backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
                                        width: '11.8em',
                                        height: '3em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '1.5em',
                                        marginBottom: '2em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        padding: '2.2em 2.2em',
                                        lineHeight: '1.4em',
                                    }}/>
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/orderStatus">
                                <CustomizedButton
                                    children="Update Order Status"
                                    onClick={() => handleButtonClick("Button 1")}
                                    variant="contained"
                                    size="large"
                                    style={{
                                        color: '#646FD4',
                                        backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
                                        width: '11.8em',
                                        height: '3em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.005em',
                                        marginBottom: '2em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        padding: '2.2em 2.2em',
                                        lineHeight: '1.4em',
                                    }}/>
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/orderDetails">
                                <CustomizedButton
                                    children="Update Order Details"
                                    onClick={() => handleButtonClick("Button 1")}
                                    variant="contained"
                                    size="large"
                                    style={{
                                        color: '#646FD4',
                                        backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
                                        width: '11.8em',
                                        height: '3em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.005em',
                                        marginBottom: '2em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        padding: '2.2em 2.2em',
                                        lineHeight: '1.4em',
                                    }}/>
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/cancelOrders">
                                <CustomizedButton
                                    children="Cancel Order"
                                    onClick={() => handleButtonClick("Button 1")}
                                    variant="contained"
                                    size="large"
                                    style={{
                                        color: '#646FD4',
                                        backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
                                        width: '11.8em',
                                        height: '3em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.005em',
                                        marginBottom: '2em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        padding: '2.2em 2.2em',
                                        lineHeight: '1.4em',
                                    }}/>
                            </Link>

                        </div>
                    </div>
                    <div className="orderStatusInner">
                        <CustomizedTable
                            columns={columns}
                            rows={mappedData}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default OrderStatus;
