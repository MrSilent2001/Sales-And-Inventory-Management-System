import React, { useState } from 'react';
import "./pendingOrders.css";
import Button from '@mui/material/Button';
import OrderTable from "../../components/inventoryLandingCard/orderTable/oderTable";

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

function PendingOrders() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <div className="PendingordersOuter">
            <div className="body">
                <div className="PendingOrdersFilter">
                    <div className="Button1">
                    <CustomButton
                            buttonText="Pending Orders"
                            isActive={activeButton === "Button 1"}
                            handleClick={() => handleButtonClick("Button 1")}
                        />

                    </div>

                    <div className="Button1">
                    <CustomButton
                            buttonText="Update Order Status"
                            isActive={activeButton === "Button 2"}
                            handleClick={() => handleButtonClick("Button 2")}
                        />

                    </div>

                    <div className="Button1">
                    <CustomButton
                            buttonText="Update Order Details"
                            isActive={activeButton === "Button 3"}
                            handleClick={() => handleButtonClick("Button 3")}
                        />

                    </div>

                    <div className="Button1">
                    <CustomButton
                            buttonText="Cancel Order"
                            isActive={activeButton === "Button 4"}
                            handleClick={() => handleButtonClick("Button 4")}
                        />

                    </div>
                </div>
                <div className="PendingOrdersInner">
                    <div className="table1">
                        <OrderTable />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PendingOrders;