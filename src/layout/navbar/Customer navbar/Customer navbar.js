import React from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {FiPower} from "react-icons/fi";
import CustomTooltip from "../../../components/Tooltip/tooltip";
function CustomerNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/customerHome">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/customerProfile">Profile</NavLink>
                <NavLink to="/refundRequests">Refunds</NavLink>
                <CustomTooltip title="Logout">
                    <NavLink to="/logout" className="lastNavLink">
                        <FiPower style={{fontSize: '14px'}}/>
                    </NavLink>
                </CustomTooltip>
            </div>
        </div>
    )
}

export default CustomerNavbar;