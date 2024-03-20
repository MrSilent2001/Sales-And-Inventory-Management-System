import React from "react";
import "./Customer navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";


function CustomerNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/customerHome">Home</NavLink>
                <NavLink to="/CustomerHome">Products</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/customerProfile">Profile</NavLink>
                <NavLink to="/refundRequests">Refunds</NavLink>
                <NavLink to="/logout" className="lastNavLink">Logout</NavLink>
            </div>
        </div>
    )
}

export default CustomerNavbar;