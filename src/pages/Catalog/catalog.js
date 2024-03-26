import React, {useState, useEffect} from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../src/components/Catalog Card/catalogCard';
import Checkboxes from '../../components/checkbox/checkbox';
import Footer from "../../layout/footer/footer";
import CustomerNavbar from "../../layout/navbar/Customer navbar/Customer navbar";
import products from "../productStore";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Catalog() {

    const [show, setShow] = useState(true);
    const [cart , setCart] = useState([]);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []); // Load cart from local storage on component mount

    const handleClick = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].amount += 1;
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
            setCart([...cart, { ...item, amount: 1 }]);
            localStorage.setItem("cart", JSON.stringify([...cart, { ...item, amount: 1 }]));
        }
    }

    return (
        <>
            <CustomerNavbar/>
            <div className = "Catalogouter">
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
                        <Button
                            color="success"
                            variant="contained"
                        >
                            Goto Cart
                        </Button>
                    </div>

                    
                </div>
                <div className = "grid">
                    {products.map((item)=>(
                        <div className = "card" key={item.id} >
                            <MultiActionAreaCard item={item}  handleClick={handleClick}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Catalog;
