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
import CustomizedAlert from "../../../components/Alert/alert";

function ProductCatalog() {
    const navigate = useNavigate();

    //add to cart Alert Variables
    const [addToCartOpenSuccess, setAddToCartOpenSuccess] = useState(false);

    //data fetching error Alert Variables
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);

    //quantity error Alert Variables
    const [quantityErrorOpenSuccess, setQuantityErrorOpenSuccess] = useState(false);

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
    const [offers, setOffers] = useState([]);
    const token = localStorage.getItem('accessToken');
    const [productsWithOffers, setProductsWithOffers] = useState([]);

    // Fetch products and offers from the server and merge them
    useEffect(() => {
        const fetchProductsWithOffers = async () => {
            try {
                const responseProducts = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProducts(responseProducts.data);

                const responseOffers = await axios.get('http://localhost:9000/discounts/getAll', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOffers(responseOffers.data);

                const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

                // Merge products with offers
                const mergedProducts = responseProducts.data.map(product => {
                    const offer = responseOffers.data.find(offer =>
                        parseInt(offer.productId) === product.id &&
                        offer.startDate <= today &&
                        offer.endDate >= today
                    );
                    const discountRate = offer ? offer.discountRate : null;
                    return { ...product, discountRate };
                });

                setProductsWithOffers(mergedProducts);
            } catch (error) {
                console.error('Error fetching products with offers:', error);
                dataErrorHandleClickSuccess();
            }
        };

        fetchProductsWithOffers();
    }, [token]);

    // Load cart data from local storage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                } else {
                    console.error("Parsed cart data is not an array:", parsedCart);
                }
            } catch (error) {
                console.error("Error parsing cart data from localStorage:", error);
            }
        }
    }, []);

    // Handle adding items to the cart
    const handleAddToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        const updatedCart = [...cart];

        if (existingItemIndex !== -1) {
            // If item already exists in cart, check if adding 1 will exceed product quantity
            if (updatedCart[existingItemIndex].amount + 1 <= item.productQuantity) {
                updatedCart[existingItemIndex].amount += 1;
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                addToCartHandleClickSuccess();
            } else {
                quantityErrorHandleClickSuccess();
            }
        } else {
            // If item is not in cart, check if adding 1 will exceed product quantity
            if (item.productQuantity >= 1) {
                const newCart = [...updatedCart, { ...item, amount: 1 }];
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
                addToCartHandleClickSuccess();
            } else {
                quantityErrorHandleClickSuccess();
            }
        }
    };


    // Navigate to product detail page
    const handleBodyClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`);
    };

    // Handle checkbox state changes
    const handleCheckboxChange = (event, name) => {
        const isChecked = event.target.checked;
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: isChecked
        }));
    };

    // Handle search query input changes
    const handleSearchKeyPress = (query) => {
        setSearchQuery(query);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    // Filter products based on category, search query, and productStatus
    const filteredProducts = productsWithOffers
        .filter(product => {
            const matchesCategory = Object.entries(checkedItems).every(([category, checked]) =>
                !checked || product.productCategory.includes(category)
            );

            const matchesSearchQuery = product.productName.toLowerCase().includes(searchQuery.toLowerCase());

            const isApproved = product.productStatus === "Approved";

            return matchesCategory && matchesSearchQuery && isApproved;
        })
        .sort((a, b) => a.id - b.id); // Sort by id in ascending order



    //Handle add to cart Alert Variable
    const addToCartHandleCloseSuccess = () => {
        setAddToCartOpenSuccess(false);
    };

    const addToCartHandleClickSuccess = () => {
        setAddToCartOpenSuccess(true);
    };

    //Handle Data Error Alert Variable
    const dataErrorHandleCloseSuccess = () => {
        setDataErrorOpenSuccess(false);
    };

    const dataErrorHandleClickSuccess = () => {
        setDataErrorOpenSuccess(true);
    };

    //Handle Quantity Error Alert Variable
    const quantityErrorHandleCloseSuccess = () => {
        setQuantityErrorOpenSuccess(false);
    };

    const quantityErrorHandleClickSuccess = () => {
        setQuantityErrorOpenSuccess(true);
    };

    return (
        <>
            <div className="productCatalogBody">
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
                                    }}
                                >
                                    Go to Cart
                                </CustomizedButton>
                            </Link>
                        </div>
                    </div>
                    <div className="productCatalogRight">
                        <div className="search-bar-container">
                            <SearchBar
                                onKeyPress={handleSearchKeyPress}
                                onChange={handleSearchChange}
                                width={'20.5em'}
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

                <CustomizedAlert
                    open={addToCartOpenSuccess}
                    onClose={addToCartHandleCloseSuccess}
                    severity="success"
                    message="Item added to the cart!"
                />

                <CustomizedAlert
                    open={dataErrorOpenSuccess}
                    onClose={dataErrorHandleCloseSuccess}
                    severity="error"
                    message="Error Fetching Data!"
                />

                <CustomizedAlert
                    open={quantityErrorOpenSuccess}
                    onClose={quantityErrorHandleCloseSuccess}
                    severity="warning"
                    message="Can't add more item due to the stock avaliability!"
                />


                <Footer />
            </div>
        </>
    );
}

export default ProductCatalog;
