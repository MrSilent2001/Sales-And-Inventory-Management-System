import React from "react";
import "./Inventory navbar.css";
import logo from "../logo.png";
function InventoryNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <a href="#">Inventory</a>
                <a href="#">Supplier</a>
                <a href="#">Orders</a>
                <a href="#">Refunds</a>
                <a href="#">Payment</a>
                <a href="#" className="lastNavLink">Logout</a>
            </div>
        </div>
    )
}

export default InventoryNavbar;