import React, { useState } from 'react';
import "./cancelOrders.css";
import { Button } from '@mui/material';
import BasicTextFields from '../../../../../components/forms/textfield';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";

const CustomButton = ({ buttonText, isActive, handleClick }) =>{

    return (
        <Button
            variant="contained"
            size="large"
            style={{
                padding: '2.2em 2.2em',
                width : '11.8em',
                height : '3em',
                backgroundColor: isActive ? 'lightblue' : 'white',
                color: '#646FD4',
                textTransform: 'none',
                lineHeight: '1.4em',
            }}
            onClick={handleClick}
        >
            {buttonText}
        </Button>
    );
};

function CancelOrder() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <>
            <SalesNavbar/>
            <div className="cancelOrderOuter">
                <div className="body">
                    <div className="cancelOrderFilter">
                        <div className="Button1">
                            <Link to="/pendingOrders">
                                <CustomButton
                                    buttonText="Pending Orders"
                                    isActive={activeButton === "Button 1"}
                                    handleClick={() => handleButtonClick("Button 1")}
                                />
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/orderStatus">
                                <CustomButton
                                    buttonText="Update Order Status"
                                    isActive={activeButton === "Button 2"}
                                    handleClick={() => handleButtonClick("Button 2")}
                                />
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/orderDetails">
                                <CustomButton
                                    buttonText="Update Order Details"
                                    isActive={activeButton === "Button 3"}
                                    handleClick={() => handleButtonClick("Button 3")}
                                />
                            </Link>

                        </div>

                        <div className="Button1">
                            <Link to="/cancelOrders">
                                <CustomButton
                                    buttonText="Cancel Order"
                                    isActive={activeButton === "Button 4"}
                                    handleClick={() => handleButtonClick("Button 4")}
                                />
                            </Link>

                        </div>
                    </div>
                    <div className="orderDetailsInner">

                        <div className="formbox">
                            <form>
                                <div className="textSection">

                                    <label className='label'>Order Id</label>

                                    <BasicTextFields></BasicTextFields>

                                </div>

                                <div className="textSection">

                                    <label className='label'>Receiver</label>

                                    <BasicTextFields></BasicTextFields>

                                </div>

                                <div className="textSection">

                                    <label className='label'>Items</label>

                                    <BasicTextFields></BasicTextFields>

                                </div>

                                <div className="textSection">

                                    <label className='label'>Amount</label>

                                    <BasicTextFields></BasicTextFields>

                                </div>

                                <div className="textSection">

                                    <label className='label'>Reasons</label>

                                    <BasicTextFields></BasicTextFields>

                                </div>



                                <div className="formButtons">
                                    <CustomizedButton
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '6em',
                                            height: '2.5em',
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight: '1.5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Go Back
                                    </CustomizedButton>

                                    <CustomizedButton
                                        onClick={() =>{alert("Order has been Cancelled")}}
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#960505',
                                            width: '6em',
                                            height: '2.5em',
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight: '1.5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Cancel
                                    </CustomizedButton>

                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default CancelOrder;