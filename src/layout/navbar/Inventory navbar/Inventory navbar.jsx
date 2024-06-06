import React, {useState} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {Navigate, NavLink} from "react-router-dom";
import { MdLogout } from "react-icons/md";

function InventoryNavbar(){
    const [selectedNavLink, setSelectedNavLink] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const handleNavLinkClick = (event) => {
        setSelectedNavLink(event.target.name);
        localStorage.clear();
    };

    const handleClick = () =>{
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to="/adminDashboard"/>
    }

    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} onClick={handleClick}/>
            </div>
            <div className="navigation">
                <NavLink
                    to="/viewInventory"
                    name="viewInventory"
                    className={`navLink ${selectedNavLink === "viewInventory" ? "selected" : ""}`}
                >
                    Inventory
                </NavLink>
                <NavLink
                    to="/viewSupplier"
                    name="viewSupplier"
                    className={`navLink ${selectedNavLink === "viewSupplier" ? "selected" : ""}`}
                >
                    Supplier
                </NavLink>

                <NavLink
                    to="/purchasedOrder"
                    name="purchasedOrder"
                    className={`navLink ${selectedNavLink === "purchasedOrder" ? "selected" : ""}`}
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/InventoryRefundRequestsTable"
                    name="InventoryRefundRequestsTable"
                    className={`navLink ${selectedNavLink === "InventoryRefundRequestsTable" ? "selected" : ""}`}
                >
                    Refunds
                </NavLink>

                <NavLink
                    to="/inventoryPayments"
                    name="inventoryPayments"
                    className={`navLink ${selectedNavLink === "inventoryPayments" ? "selected" : ""}`}
                >
                    Payment
                </NavLink>

                <NavLink
                    to="/admin"
                    name="logout"
                    className={`navLink ${selectedNavLink === "logout" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <MdLogout style={{width:'18px', height:'14px'}}/>
                </NavLink>
            </div>
        </div>
    )
}

export default InventoryNavbar;