import React from "react";
import "./Inventory navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {FiPower} from "react-icons/fi";
import CustomTooltip from "../../../components/Tooltip/tooltip";

function InventoryNavbar() {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width: "30px", margin: "10px"}}/>
            </div>
            <div className="navigation">
                <NavLink to="/viewInventory">
                    Inventory
                </NavLink>

                <NavLink to="/viewSupplier">
                    Supplier
                </NavLink>

                <NavLink to="/purchasedOrder">
                    Orders
                </NavLink>

                <NavLink to="/InventoryRefundRequestsTable">
                    Refunds
                </NavLink>

                <NavLink to="/paymentdashboard">
                    Payment
                </NavLink>

                <NavLink to="/salesLanding">
                    Sales
                </NavLink>

                <CustomTooltip title="Logout">
                    <NavLink to="/logout" className="lastNavLink">
                        <FiPower style={{fontSize: '14px'}}/>
                    </NavLink>
                </CustomTooltip>
            </div>
        </div>
    )
}

export default InventoryNavbar;