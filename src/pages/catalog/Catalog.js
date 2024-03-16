import React, { useState } from 'react';
import "./Catalog.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Button } from '@mui/material';
import MultiActionAreaCard from '../../components/CatalogCard/catalogCard';
import Checkboxes from '../../components/checkbox/checkbox';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Catalog() {
    
    return (
        
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
                <Checkboxes/> 
                <label>Building Matrial</label>

                </div>
                
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