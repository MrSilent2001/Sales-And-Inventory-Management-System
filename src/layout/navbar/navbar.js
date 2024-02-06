import React from "react";
import "./navbar.css";


function navbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src="./logo.png" alt="Logo" />
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

export default navbar;