import React, {useState} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {Navigate, NavLink} from "react-router-dom";
import {MdLogout} from "react-icons/md";

function SalesNavbar(){
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
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} onClick={handleClick} />
            </div>
            <div className="navigation">
                <NavLink to="/pendingOrders">Sales</NavLink>
                <NavLink to="/paymentdashboard">Payments</NavLink>
                <NavLink to="/customerdashboard">Customers</NavLink>
                <NavLink to="/viewRefundRequests">Refunds</NavLink>
                <NavLink to="/discountdashboard">Discounts</NavLink>
                <NavLink
                    to="/"
                    name="logout"
                    className={`navLink ${selectedNavLink === "logout" ? "selected" : ""}`}
                    onClick={handleNavLinkClick}
                >
                    <MdLogout style={{width:'18px', height:'18px'}}/>
                </NavLink>
            </div>
        </div>
    )
}

export default SalesNavbar;