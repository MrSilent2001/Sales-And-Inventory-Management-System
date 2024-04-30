import React from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {FiPower} from "react-icons/fi";
import CustomTooltip from "../../../components/Tooltip/tooltip";


function SalesNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/pendingOrders">Sales</NavLink>
                <NavLink to="/paymentdashboard">Payments</NavLink>
                <NavLink to="/customerdashboard">Customers</NavLink>
                <NavLink to="/viewRefundRequests">Refunds</NavLink>
                <NavLink to="/discountdashboard">Discounts</NavLink>
                <NavLink to="/inventoryLanding">Inventory</NavLink>
                <CustomTooltip title="Logout">
                    <NavLink to="/logout" className="lastNavLink">
                        <FiPower style={{fontSize: '14px'}}/>
                    </NavLink>
                </CustomTooltip>
            </div>
        </div>
    )
}

export default SalesNavbar;