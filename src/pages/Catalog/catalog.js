import React from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../src/components/Catalog Card/catalogCard';
import Checkboxes from '../../components/checkbox/checkbox';
import Footer from "../../layout/footer/footer";
import CustomerNavbar from "../../layout/navbar/Customer navbar/Customer navbar";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Catalog() {

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

            <Footer/>
        </>
    );
}

export default Catalog;