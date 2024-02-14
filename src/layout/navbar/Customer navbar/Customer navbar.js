import React from "react";
import "./Customer navbar.css";
import logo from "../../../assets/images/logo.png";


function CustomerNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Cart</a>
                <a href="#">Profile</a>
                <a href="#">Refunds</a>
                <a href="#" className="lastNavLink">Logout</a>
            </div>
        </div>
    )
}

export default CustomerNavbar;