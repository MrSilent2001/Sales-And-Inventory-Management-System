import React from "react";
import "./Supplier Navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";


function SalesNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/inventoryDashboard">Inventory</NavLink>
                <NavLink to="/supplierProfile">Profile</NavLink>
                <NavLink to="/logout" className="lastNavLink">Logout</NavLink>
            </div>
        </div>
    )
}

export default SalesNavbar;