import React, { useState } from 'react';
import "./pendingOrders.css";
import OrderTable from "../../../../../components/inventoryLandingCard/Order Table/orderTable";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";

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
                           <OrderTable />
                       </div>
                   </div>
               </div>
           </div>
           <Footer/>
       </>
    );
}

export default PendingOrders;