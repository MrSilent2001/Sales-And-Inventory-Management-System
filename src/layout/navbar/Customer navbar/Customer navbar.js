import React from "react";
import "./Customer navbar.css";

function CustomerNavbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <h5>Tradeasy</h5>
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