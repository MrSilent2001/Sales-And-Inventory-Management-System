import React, {useState} from 'react';
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

    const handleClick = (item) => {
        console.log(item);
        setCart([...cart, item]);
        localStorage.setItem("cart", JSON.stringify([...cart, item]));
        // console.log(cart);
        console.log(JSON.stringify(cart, null, 2));
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
                    ))};
                </div>

            </div>

            <Footer/>
        </>
    );
}

export default Catalog;