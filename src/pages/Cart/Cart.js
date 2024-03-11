import React, { useState } from 'react';
import "./Cart.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MediaControlCard from '../../components/cards/card';
import { Button } from '@mui/material';




function Cart() {
    
    return (
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
    );
}

export default Cart;