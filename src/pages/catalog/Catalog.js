import React, { useState } from 'react';
import "./Catalog.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MultiActionAreaCard from '../../components/catalogCard/catalogCard';
import { Button } from '@mui/material';




function Catalog() {
    
    return (
        
        <div class = "Catalogouter">
            <div className="sidebar">
                gg
            </div>
            <div class = "grid">
            <div class = "card" >
                <MultiActionAreaCard/>
            </div>
            <div class = "card">
                <MultiActionAreaCard/>
            </div>
            <div class = "card">
                <MultiActionAreaCard/>
            </div>
            <div class = "card">
                <MultiActionAreaCard/>
            </div>
            <div class = "card">
                <MultiActionAreaCard/>
            </div>
            <div class = "card">
                <MultiActionAreaCard/>
            </div>
        </div>

        </div>
        
    );
}

export default Catalog;