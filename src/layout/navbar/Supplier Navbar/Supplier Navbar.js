import React, {useState} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {MdLogout} from "react-icons/md";

function SupplierNavbar(){
    const [selectedNavLink, setSelectedNavLink] = useState(null);
    const handleNavLinkClick = (event) => {
        setSelectedNavLink(event.target.name);
    };
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/supplierDashboard">Inventory</NavLink>
                <NavLink to="/supplierProfile">Profile</NavLink>
                <NavLink
                    to="/logout"
                    name="logout"
                    className={`navLink ${selectedNavLink === "logout" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <MdLogout style={{width:'32px'}}/>
                </NavLink>
            </div>
        </div>
    )
}

export default SupplierNavbar;