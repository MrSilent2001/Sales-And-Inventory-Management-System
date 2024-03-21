import React, { useState } from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../src/components/Catalog Card/catalogCard';
import Checkboxes from '../../components/checkbox/checkbox';
import Footer from "../../layout/footer/footer";
import CustomerNavbar from "../../layout/navbar/Customer navbar/Customer navbar";

function Catalog() {
    const [cartItems, setCartItems] = useState([]);

    const products = [
        { id: 1, name: 'Product 1', price: 10.99, quantity: 2, image: 'product1.jpg' },
        { id: 2, name: 'Product 2', price: 19.99, quantity: 1, image: 'product2.jpg' },
        // Add more products as needed
    ];

    const handleAddToCart = (item) => {
        // Add the item to cartItems state
        setCartItems(prevCartItems => [...prevCartItems, item]);
    };

    return (
        <>
            <CustomerNavbar/>
            <div className="Catalogouter">
                <div className="sidebar">
                    {products.map((product) => (
                        <div className="content" key={product.id}>
                            <Checkboxes/>
                            <label>{product.name}</label>
                        </div>
                    ))}
                </div>
                <div className="grid">
                    {products.map((product) => (
                        <div className="card" key={product.id}>
                            <MultiActionAreaCard
                                item={product}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Catalog;
