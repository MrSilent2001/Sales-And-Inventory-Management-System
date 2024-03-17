import React, { useState } from 'react';
import "./pendingOrders.css";
import Button from '@mui/material/Button';
import OrderTable from "../../components/inventoryLandingCard/Order Table/orderTable";
import SalesNavbar from "../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../layout/footer/footer";
import {Link} from "react-router-dom";

const CustomButton = ({ buttonText, isActive, handleClick }) =>{

    return (
        <Button
            variant="contained"
            size="large"
            style={{
                padding: '2.2em 2.2em',
                width : '11.8em',
                height : '3em',
                backgroundColor: isActive ? 'lightblue' : 'white',
                color: '#646FD4',
                textTransform: 'none',
                lineHeight: '1.4em',
            }}
            onClick={handleClick}
        >
            {buttonText}
        </Button>
    );
};

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
                               <CustomButton
                                   buttonText="Pending Orders"
                                   isActive={activeButton === "Button 1"}
                                   handleClick={() => handleButtonClick("Button 1")}
                               />
                           </Link>

                       </div>

                       <div className="Button1">
                           <Link to="/orderStatus">
                               <CustomButton
                                   buttonText="Update Order Status"
                                   isActive={activeButton === "Button 2"}
                                   handleClick={() => handleButtonClick("Button 2")}
                               />
                           </Link>

                       </div>

                       <div className="Button1">
                           <Link to="/orderDetails">
                               <CustomButton
                                   buttonText="Update Order Details"
                                   isActive={activeButton === "Button 3"}
                                   handleClick={() => handleButtonClick("Button 3")}
                               />
                           </Link>

                       </div>

                       <div className="Button1">
                           <Link to="/cancelOrders">
                               <CustomButton
                                   buttonText="Cancel Order"
                                   isActive={activeButton === "Button 4"}
                                   handleClick={() => handleButtonClick("Button 4")}
                               />
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