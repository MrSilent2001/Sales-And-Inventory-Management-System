import React, { useState } from 'react';
import "./orderStatus.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import orderStatus from "../../../../../data/data.json";
import ComboBox from "../../../../../components/Form Inputs/comboBox";

let columns = [
    {id: 'id', label: 'Id', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Customer Name', minWidth: 170, align: 'center'},
    {
        id: 'amount',
        label: 'Amount(\u20A8.)',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
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

    const rows = orderStatus.orderStatus || [];

    //array of states to manage status for each row
    const [statuses, setStatuses] = useState(rows.map(() => ""));

    // Handler to update status for a specific row
    const handleChange = (event, rowIndex) => {
        const newStatuses = [...statuses];
        newStatuses[rowIndex] = event.target.value;
        setStatuses(newStatuses);
    };

    const options = [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'In-Processing', label: 'In-Processing' },
        { value: 'Departed', label: 'Departed' },
    ];

    const mappedData = rows.map((row, index) => ({
        id: row.id,
        name: row.name,
        amount: row.amount,
        status: (
            <div>
                <ComboBox
                    value={statuses[index]}
                    onChange={(event) => handleChange(event, index)}
                    style={{width: '14em'}}
                    options={options}
                    label="Category"
                    size="small"
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
