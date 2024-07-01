import { Link } from "react-router-dom";
import CustomizedButton from "../../components/Button/button";
import React, { useState, useEffect } from "react";

function SalesOrderSidebar() {
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const storedActiveButton = localStorage.getItem("activeButton");
        if (storedActiveButton) {
            setActiveButton(storedActiveButton);
        }
    }, []);

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
        localStorage.setItem("activeButton", buttonText);
    };

    return (
        <div className="sales-order-sidebar">
            <div className="Button1">
                <Link to="/pendingOrders">
                    <CustomizedButton
                        children="Pending Orders"
                        onClick={() => handleButtonClick("Button 1")}
                        defaultTextColor={activeButton === "Button 1" ? 'white' : '#1565bf'}
                        variant="contained"
                        size="large"
                        style={{
                            color: activeButton === "Button 1" ? 'white' : '#1565bf',
                            backgroundColor: activeButton === "Button 1" ? '#1565bf' : 'white',
                            width: '11.8em',
                            height: '3em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            borderRadius: '0.625em',
                            fontWeight: '550',
                            border: 'none',
                            marginTop: '1em',
                            marginBottom: '1em',
                            textTransform: 'none',
                            textAlign: 'center',
                            padding: '2.2em 2.2em',
                            lineHeight: '1.4em',
                        }} />
                </Link>
            </div>

            <div className="Button1">
                <Link to="/orderStatus">
                    <CustomizedButton
                        children="Update Order Status"
                        onClick={() => handleButtonClick("Button 2")}
                        defaultTextColor={activeButton === "Button 2" ? 'white' : '#1565bf'}
                        variant="contained"
                        size="large"
                        style={{
                            color: activeButton === "Button 2" ? 'white' : '#1565bf',
                            backgroundColor: activeButton === "Button 2" ? '#1565bf' : 'white',
                            width: '11.8em',
                            height: '3em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            borderRadius: '0.625em',
                            fontWeight: '550',
                            border: 'none',
                            marginTop: '0.005em',
                            marginBottom: '1em',
                            textTransform: 'none',
                            textAlign: 'center',
                            padding: '2.2em 2.2em',
                            lineHeight: '1.4em',
                        }} />
                </Link>
            </div>

            <div className="Button1">
                <Link to="/orderDetails">
                    <CustomizedButton
                        children="Update Order Details"
                        onClick={() => handleButtonClick("Button 3")}
                        defaultTextColor={activeButton === "Button 3" ? 'white' : '#1565bf'}
                        variant="contained"
                        size="large"
                        style={{
                            color: activeButton === "Button 3" ? 'white' : '#1565bf',
                            backgroundColor: activeButton === "Button 3" ? '#1565bf' : 'white',
                            width: '11.8em',
                            height: '3em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            borderRadius: '0.625em',
                            fontWeight: '550',
                            border: 'none',
                            marginTop: '0.005em',
                            marginBottom: '1em',
                            textTransform: 'none',
                            textAlign: 'center',
                            padding: '2.2em 2.2em',
                            lineHeight: '1.4em',
                        }} />
                </Link>
            </div>

            <div className="Button1">
                <Link to="/cancelOrders">
                    <CustomizedButton
                        children="Cancel Order"
                        onClick={() => handleButtonClick("Button 4")}
                        defaultTextColor={activeButton === "Button 4" ? 'white' : '#1565bf'}
                        variant="contained"
                        size="large"
                        style={{
                            color: activeButton === "Button 4" ? 'white' : '#1565bf',
                            backgroundColor: activeButton === "Button 4" ? '#1565bf' : 'white',
                            width: '11.8em',
                            height: '3em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            borderRadius: '0.625em',
                            fontWeight: '550',
                            border: 'none',
                            marginTop: '0.005em',
                            marginBottom: '1em',
                            textTransform: 'none',
                            textAlign: 'center',
                            padding: '2.2em 2.2em',
                            lineHeight: '1.4em',
                        }} />
                </Link>
            </div>
        </div>
    )
}

export default SalesOrderSidebar;
