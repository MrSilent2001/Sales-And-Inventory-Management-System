import React, {useState} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {FiPower} from "react-icons/fi";
import CustomTooltip from "../../../components/Tooltip/tooltip";

function InventoryNavbar() {
    const [selectedNavLink, setSelectedNavLink] = useState(null);
    const handleNavLinkClick = (event) => {
        setSelectedNavLink(event.target.name);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width: "30px", margin: "10px"}}/>
            </div>
            <div className="navigation">
                <NavLink
                    to="/viewInventory"
                    name="viewInventory"
                    className={`navLink ${selectedNavLink === "viewInventory" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    Inventory
                </NavLink>

                <NavLink
                    to="/viewSupplier"
                    name="viewSupplier"
                    className={`navLink ${selectedNavLink === "viewSupplier" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    Supplier
                </NavLink>

                <NavLink
                    to="/purchasedOrder"
                    name="purchasedOrder"
                    className={`navLink ${selectedNavLink === "purchasedOrder" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/InventoryRefundRequestsTable"
                    name="InventoryRefundRequestsTable"
                    className={`navLink ${selectedNavLink === "InventoryRefundRequestsTable" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    Refunds
                </NavLink>

                <NavLink
                    to="/paymentdashboard"
                    name="paymentdashboard"
                    className={`navLink ${selectedNavLink === "paymentdashboard" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    Payment
                </NavLink>

                <NavLink
                    to="/salesLanding"
                    name="salesLanding"
                    className={`navLink ${selectedNavLink === "salesLanding" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
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