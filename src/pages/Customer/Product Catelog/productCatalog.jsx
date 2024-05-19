import React, { useState, useEffect } from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../components/Cards/catalogCard';
import Checkboxes from '../../../components/Form Inputs/checkbox';
import Footer from "../../../layout/footer/footer";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Link, useNavigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";

function ProductCatalog() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    //fetcting all products from backend
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/getAllProducts');
                setProducts(response.data);
                console.log(products);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchProducts();
    }, []);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    // Function to handle click event on item
    const handleAddToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

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

    const handleBodyClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleImageClick = (item) => {
        // Handle image click logic here, if different from body click
        navigate(`/product/${item.id}`);
    };

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
                <div className="customerItemGrid">
                    {products.map((item) => (
                        <div className="card" key={item.id} >
                            <MultiActionAreaCard
                                item={item}
                                handleClick={handleAddToCart}
                                handleBodyClick={handleBodyClick}
                                handleImageClick={handleImageClick}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductCatalog;

