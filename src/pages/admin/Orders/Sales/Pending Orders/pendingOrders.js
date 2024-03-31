import React, { useState } from 'react';
import "./pendingOrders.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import CustomizedTable from "../../../../../components/Table/Customized Table/customizedTable";
import pendingOrders from "../../../../../data/data.json";


const columns = [
    { id: 'order_id', label: 'Id', minWidth: 170, align: 'center' },
    { id: 'customer_name', label: 'Customer Name', minWidth: 170, align: 'center' },
    {
        id: 'amount',
        label: 'Amount(\u20A8.)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: '',
        minWidth: 200,
        align: 'center',
        format: (accept, reject) => (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => { alert("Order has been Accepted") }}
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

const rows = pendingOrders.pendingOrders || [];

const mappedData = rows.map(row => ({
    order_id: row.order_id,
    customer_name: row.customer_name,
    amount: row.amount,
    actions: (
        <div style={{ display: 'flex' }}>
            <CustomizedButton
                hoverBackgroundColor="#transparent"
                style={{
                    color: '#242F9B',
                    backgroundColor: 'transparent',
                    border: '1px solid #242F9B',
                    width: '7.5em',
                    height: '2.75em',
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
                hoverBackgroundColor="transparent"
                style={{
                    color: '#960505',
                    backgroundColor: 'transparent',
                    border: '1px solid #960505',
                    width: '7.5em',
                    height: '2.75em',
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
                Reject
            </CustomizedButton>
        </div>
    )
}));


function PendingOrders() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
       <>
           <SalesNavbar/>
           <div className="PendingordersOuter">
               <div className="body">
                   <div className="PendingOrdersFilter">
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
                   <div className="PendingOrdersInner">
                       <div className="table1">
                           <CustomizedTable
                               columns={columns}
                               rows={mappedData}
                           />
                       </div>
                   </div>
               </div>
           </div>
           <Footer/>
       </>
    );
}

export default PendingOrders;