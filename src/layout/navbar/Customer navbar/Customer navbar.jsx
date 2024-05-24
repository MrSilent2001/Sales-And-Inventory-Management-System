import React, {useState,useEffect} from "react";
import "../navbar.css";
import logo from "../../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function CustomerNavbar(){
    const [selectedNavLink, setSelectedNavLink] = useState(null);
    const handleNavLinkClick = (event) => {
        setSelectedNavLink(event.target.name);
        localStorage.setItem('accessToken', '');
        localStorage.setItem('role', '');
        localStorage.setItem('id', '');
    };

    const [cartItemCount, setCartItemCount] = useState(0);
    const [storedCart, setStoredCart] = useState([]);
    const [cartFromStorage, setcartFromStorage] = useState([]);

    useEffect(() => {
        setcartFromStorage(JSON.parse(localStorage.getItem("cart")));
        if (cartFromStorage) {
            // Calculate total amount for all items in the cart
            const totalAmount = cartFromStorage.reduce((total, item) => total + item.amount, 0);

            // Store total amount in cartItemCount
            setCartItemCount(totalAmount);
            setStoredCart(cartFromStorage);
        }
    }, [cartFromStorage]);



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
                            <ShoppingCartIcon sx={{color:'white',width:'18px', height:'18px'}} />
                        </StyledBadge>
                    </IconButton>
                </NavLink>
                <NavLink
                    to="/logout"
                    name="logout"
                    className={'navLink ${selectedNavLink === "logout" ? "selected" : ""}'}
                    onClick={handleNavLinkClick}
                >
                    <MdLogout style={{width:'18px', height:'18px'}}/>
                </NavLink>
            </div>
        </div>
    )
}

export default CustomerNavbar;