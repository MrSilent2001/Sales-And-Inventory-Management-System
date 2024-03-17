
import React, { useState } from 'react';
import "./shoppingCart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../../components/Card/card';
import { Button } from '@mui/material';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";

function Cart() {

    return (
        <>
            <CustomerNavbar/>
            <div className="cartOuter">

                <div className="cardspace">
                    <MediaControlCard/>
                    <MediaControlCard/>
                    <MediaControlCard/>
                </div>

                <div className="cartInner">

                    <div className="arrow">
                        <ArrowBackIosIcon/>
                    </div>

                    <div className="totalText">
                        <p>Total Amount</p>
                        <p className = "amount ">Rs 12,000.00</p>
                        <Button variant="contained" color="success">
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}
export default Cart;
