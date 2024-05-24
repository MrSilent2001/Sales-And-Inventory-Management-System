import React, { useState, useEffect } from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../components/Cards/catalogCard';
import Checkboxes from '../../../components/Form Inputs/checkbox';
import Footer from "../../../layout/footer/footer";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import { Link, useNavigate } from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import axios from "axios";
import SearchBar from "../../../components/search bar/search bar";


function ProductCatalog() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [checkedItems, setCheckedItems] = useState({
        "Building Material": false,
        "Hardware and Tools": false,
        "Safety Equipments": false,
        "Electrical Supplies": false,
        "Plumbing Supplies": false,
        "Interior Finishes": false,
        "Landscaping Products": false,
        "Construction Chemicals": false
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    const handleAddToCart = (item) => {
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
    };

    const handleBodyClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleCheckboxChange = (event, name) => {
        const isChecked = event.target.checked;
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: isChecked
        }));
    };

    const handleSearchKeyPress = (query) => {
        setSearchQuery(query);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = Object.entries(checkedItems).every(([category, checked]) => {
            return !checked || product.productCategory.includes(category);
        });

        const matchesSearchQuery = product.productName.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearchQuery;
    });

    return (
        <>
            <CustomerNavbar />
            <div className="Catalogouter">
                <div className="sidebar">
                    {Object.keys(checkedItems).map((name) => (
                        <div className="content" key={name}>
                            <Checkboxes
                                checked={checkedItems[name]}
                                onChange={(event) => handleCheckboxChange(event, name)}
                            />
                            <label>{name}</label>
                        </div>
                    ))}
                    <div className="content-cart-button">
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
                <div className="prodcutDetailRight">
                    <div className="search-bar-container">
                        <SearchBar
                            onKeyPress={handleSearchKeyPress}
                            onChange={handleSearchChange}
                            width = {'20.5em'}
                        />
                    </div>
                    <div className="customerItemGrid">
                        {filteredProducts.map((item) => (
                            <div className="card" key={item.id}>
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
            </div>
            <Footer/>
        </>
    );
}

export default ProductCatalog;
