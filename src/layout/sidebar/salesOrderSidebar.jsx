import {Link} from "react-router-dom";
import CustomizedButton from "../../components/Button/button";
import React, {useState} from "react";


function SalesOrderSidebar(){
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };
    return (
        <div className="sales-order-sidebar">
            <div className="Button1">
                <Link to="/pendingOrders">
                    <CustomizedButton
                        children="Pending Orders"
                        defaultTextColor="#646FD4"
                        onClick={() => handleButtonClick("Button 1")}
                        variant="contained"
                        size="large"
                        style={{
                            color: '#646FD4',
                            backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
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
                        }}/>
                </Link>

            </div>

            <div className="Button1">
                <Link to="/orderStatus">
                    <CustomizedButton
                        children="Update Order Status"
                        defaultTextColor="#646FD4"
                        onClick={() => handleButtonClick("Button 1")}
                        variant="contained"
                        size="large"
                        style={{
                            color: '#646FD4',
                            backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
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
                        }}/>
                </Link>

            </div>

            <div className="Button1">
                <Link to="/orderDetails">
                    <CustomizedButton
                        children="Update Order Details"
                        defaultTextColor="#646FD4"
                        onClick={() => handleButtonClick("Button 1")}
                        variant="contained"
                        size="large"
                        style={{
                            color: '#646FD4',
                            backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
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
                        }}/>
                </Link>

            </div>

            <div className="Button1">
                <Link to="/cancelOrders">
                    <CustomizedButton
                        children="Cancel Order"
                        onClick={() => handleButtonClick("Button 1")}
                        defaultTextColor="#646FD4"
                        variant="contained"
                        size="large"
                        style={{
                            color: '#646FD4',
                            backgroundColor: activeButton === "Button 1" ? 'lightblue' : 'white',
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
                        }}/>
                </Link>

            </div>
        </div>
    )

}

export default SalesOrderSidebar;