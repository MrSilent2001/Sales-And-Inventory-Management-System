import React, { useState } from 'react';
import "./Catalog.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MultiActionAreaCard from '../../components/catalogCard/catalogCard';
import { Button } from '@mui/material';




function Catalog() {
    
    return (
        
        <div className = "Catalogouter">
            <div className="sidebar">
                gg
            </div>
            <div className = "grid">
            <div className = "card" >
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
            <div className = "card">
                <MultiActionAreaCard/>
            </div>
        </div>

        </div>
        
    );
}

export default Catalog;