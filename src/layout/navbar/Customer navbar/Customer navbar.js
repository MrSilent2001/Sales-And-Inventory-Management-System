import React, {useState,useEffect} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartElement } from "@stripe/react-stripe-js";


function CustomerNavbar(){
    const [selectedNavLink, setSelectedNavLink] = useState(null);
    const handleNavLinkClick = (event) => {
        setSelectedNavLink(event.target.name);
    };

    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCartItemCount(storedCart.length); // Update item count when cart is loaded
        }
    }, []);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            padding: '0 4px',

        },
    }));



    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"30px", margin:"10px"}} />
            </div>
            <div className="navigation">
                <NavLink to="/customerHome">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/customerProfile">Profile</NavLink>
                <NavLink to="/refundRequests">Refunds</NavLink>
                <NavLink to="/cart">
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartItemCount} color="primary">
                            <ShoppingCartIcon sx={{color:'white'}} />
                        </StyledBadge>
                    </IconButton>
                </NavLink>
                <NavLink
                    to="/logout"
                    name="logout"
                    className={'navLink ${selectedNavLink === "logout" ? "selected" : ""}'}
                    onClick={handleNavLinkClick}
                >
                    <MdLogout />
                </NavLink>
            </div>
        </div>
    )
}

export default CustomerNavbar;