import React, { useState, useEffect } from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../../src/components/Cards/catalogCard';
import Checkboxes from '../../../components/Form Inputs/checkbox';
import Footer from "../../../layout/footer/footer";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";

// Array of products
const products = [
    // Product data here...
    {
        "id": 1,
        "title": "Item 1",
        "price": 10,
        "img": "https://www.jtc.lk/wp-content/uploads/2021/10/Clow-Hammer-F-H-0.25kg-American-Type.png",
        "amount": 1
    },
    {
        "id": 2,
        "title": "108 Panchatantra Stories",
        "author": "by Maple Press  | 1 September 2020",
        "price": 98,
        "img": "https://m.media-amazon.com/images/I/71rmxx8P2qL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 3,
        "title": "Amazing Questions & Answers Science",
        "author": "by Om Books Editorial Team  | 25 November 2018",
        "price": 143,
        "img": "https://m.media-amazon.com/images/I/81Gbz0XnW7L._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 4,
        "title": "My First Book of Pencil Control",
        "author": "by Wonder House Books | 25 April 2018",
        "price": 57,
        "img": "https://m.media-amazon.com/images/I/81Gbz0XnW7L._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 5,
        "title": "My First 1000 Words",
        "author": "by Wonder House Books  | 1 January 2018",
        "price": 149,
        "img": "https://m.media-amazon.com/images/I/71O-FI7QApL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 6,
        "title": "101 Panchatantra Stories for Children",
        "author": "by Om Books Editorial Team | 30 September 2020",
        "price": 135,
        "img": "https://m.media-amazon.com/images/I/9173YBkMIsL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 7,
        "title": "Pre-School Activities Pack ",
        "author": "by Om Books Editorial Team  | 1 January 2021",
        "price": 693,
        "img": "https://m.media-amazon.com/images/I/913sv4sex3L._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 8,
        "title": "Early Learning Library Pack 1",
        "author": "by Wonder House Books  | 6 December 2020",
        "price": 289,
        "img": "https://m.media-amazon.com/images/I/71xMttNhr7L._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 9,
        "title": "Blossom Moral Story Book for Kids ",
        "author": "by Content Team at Target Publications",
        "price": 80,
        "img": "https://m.media-amazon.com/images/I/7122h3jWvEL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 10,
        "title": "Brain Activity Book for Kids",
        "author": "by Maple Press | 1 September 2021",
        "price": 86,
        "img": "https://m.media-amazon.com/images/I/7175YpTSa7L._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 11,
        "title": "Willy the Silly Panda",
        "author": "by Rebecca Smith  | 14 December 2021",
        "price": 120,
        "img": "https://m.media-amazon.com/images/I/71-ocPGQIJL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    },
    {
        "id": 12,
        "title": "Grandma's Bag of Stories",
        "author": "by Sudha Murty | 1 January 2015",
        "price": 157,
        "img": "https://m.media-amazon.com/images/I/81jv44QdNwL._AC_UY327_FMwebp_QL65_.jpg",
        "amount": 1
    }
];

function ProductCatalog() {
    // State variables
    //const [show, setShow] = useState(true);
    const [cart, setCart] = useState([]);
    //const [warning, setWarning] = useState(false);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        //check if cart is not empty
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    // Function to handle click event on item
    const handleClick = (item) => {
        // const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        const findItemIndex = (cart, targetItemId) => {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === targetItemId) {
                    return i; 
                }
            }
            return -1;
        };
        
        const existingItemIndex = findItemIndex(cart, item.id);
        
        // If item already exists in cart, increase its quantity
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].amount += 1;
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        // If item is not in cart, add it with quantity 1
        else {
            setCart([...cart, { ...item, amount: 1 }]);
            localStorage.setItem("cart", JSON.stringify([...cart, { ...item, amount: 1 }]));
        }
        
    }

    // Render component
    return (
        <>
            <CustomerNavbar />
            <div className="Catalogouter">
                <div className="sidebar">
                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>


                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Checkboxes/>
                        <label>Building Matrial</label>

                    </div>

                    <div className="content">
                        <Link to="/cart">
                            <CustomizedButton
                                hoverBackgroundColor="#2ec931"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#1d8a1f',
                                    width: '7.5em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    fontFamily: 'inter',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    margin: 'auto',
                                    textTransform: 'none',
                                    textAlign: 'center',
                                }}>
                                Go to Cart
                            </CustomizedButton>
                        </Link>
                    </div>


                </div>
                <div className="grid">
                    {products.map((item) => (
                        <div className="card" key={item.id} >
                            <MultiActionAreaCard item={item} handleClick={handleClick} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductCatalog;

