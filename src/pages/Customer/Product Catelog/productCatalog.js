import React, { useState, useEffect } from 'react';
import "./catalog.css";
import MultiActionAreaCard from '../../../../src/components/Cards/catalogCard';
import Checkboxes from '../../../components/Form Inputs/checkbox';
import Footer from "../../../layout/footer/footer";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";

// Array of products
const products = [
 
    {
        "id": "I001",
        "title": "Steel Hammer",
        "price": 150,
        "img": "https://tigersupplies-15a42.kxcdn.com/imagecache/893d96b3-ff5e-4173-90f9-a69b010d7add/Claw-Hammer---Steel-Shaft---16oz_1000x1000.jpg",
        "amount": 1
    },
    {
        "id": "I002",
        "title": "Wood Material",
        "price": 1000,
        "img": "https://vskills.in/certification/blog/wp-content/uploads/2015/02/timber-as-construction-material.jpg",
        "amount": 1
    },
    {
        "id": "I003",
        "title": "Metal Nails 100g",
        "price": 140,
        "img": "https://southatlanticllc.com/wp-content/uploads/2022/10/galvanized-masonry-nails-south-atlantic.jpg",
        "amount": 1
    },
    {
        "id": "I004",
        "title": "Cement Bag 1Kg",
        "price": 3000,
        "img": "https://www.ehardware.lk/wp-content/uploads/2020/06/cement2.png",
        "amount": 1
    },
    {
        "id": "I005",
        "title": "Showel",
        "price": 1500,
        "img": "https://down-my.img.susercontent.com/file/04c22b7a5e3a5fcb5d36a00636a3a151",
        "amount": 1
    },
    {
        "id": "I006",
        "title": "Block Stone",
        "price": 2000,
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx1ag4WMC4_DIUbbuS0AG6VemDRCODZOk8lg&usqp=CAU",
        "amount": 1
    },
    {
        "id": "I007",
        "title": "WheelBarrow ",
        "price": 2500,
        "img": "https://media.wuerth.com/source/eshop/stmedia/wuerth/images/std.lang.all/resolutions/category/576px/133622211.jpg",
        "amount": 1
    },
    {
        "id": "I008",
        "title": "Screw Drivers Kit",
        "price":6500 ,
        "img": "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2017/04/Types_Of_Screwdrivers.jpg",
        "amount": 1
    },
    {
        "id": "I009",
        "title": "Measuring Tape",
        "price": 1600,
        "img": "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/at%2Farchive%2Fef366ebd17e58621c3b50c31fbf2d6fe81912422",
        "amount": 1
    },
    {
        "id": "I0010",
        "title": "Sand 10kg",
        "price": 5000,
        "img": "https://5.imimg.com/data5/SELLER/Default/2022/1/SK/OE/ON/73706863/river-sand.jpeg",
        "amount": 1
    },
    {
        "id": "I0011",
        "title": "Ceiling Sheets - 1",
        "price": 4500,
        "img": "https://image.made-in-china.com/2f0j00nDckbqYLAuoZ/Best-Seller-PVC-Ceilings-and-Ceiling-Panels-Type-False-Ceiling-Designs.jpg",
        "amount": 1
    },
    {
        "id": "I0012",
        "title": "Metalic Tape",
        "price": 675,
        "img": "https://transasia.lk/img/product/11543/11543-001_720X720.jpg",
        "amount": 1

    
    },

];

function ProductCatalog() {
    // State variables
    //const [show, setShow] = useState(true);
    const [cart, setCart] = useState([]);
    //const [warning, setWarning] = useState(false);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    // Function to handle click event on item
    const handleClick = (item) => {
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
                <div className="grid">
                    {products.map((item) => (
                        <div className="card" key={item.id} >
                            <MultiActionAreaCard item={item} handleClick={handleClick} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductCatalog;

