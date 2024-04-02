import React from "react";
import "./placeOrder.css";
import CustomizedButton from "../../../../../../components/Button/button";
import CenteredModal from "../../../../../../components/Modal/modal";
import BasicTextField from "../../../../../../components/Form Inputs/textfield";
import ComboBox from "../../../../../../components/Form Inputs/comboBox";

function PlaceOrder(props){
    const [category, setCategory] = React.useState('');

    const options1 = [
        { value: 'Category01', label: 'Primary' },
        { value: 'Category02', label: 'Secondary' },
    ];

    const options2 = [
        { value: 'Item01', label: 'Item01' },
        { value: 'Item02', label: 'Item02' },
        { value: 'Item03', label: 'Item03' },
        { value: 'Item04', label: 'Item04' }
    ];
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const placeOrder = () =>{
        console.log("Order Placed Successfully");
        alert("Order Placed Successfully");
    }

    return(
        <CenteredModal>
            <div className="placeOrderOuter">
                <div className="placeOrderModel">
                    <h2>Inventory Order</h2>
                    <div className="placeOrderForm">
                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Order Id:</h5>
                            </div>
                            <div className="placeOrderidInput">
                                <BasicTextField id="outlined-required" size="small" type="num"/>
                            </div>
                        </div>

                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="placeOrderidInput">
                                <ComboBox
                                    className="supplierInput"
                                    id="demo-select-small"
                                    value={category}
                                    onChange={handleChange}
                                    options={options1}
                                    label="Category"
                                    size="small"
                                    style={{width:"17.5em",left:"-.5em"}}
                                />
                            </div>
                        </div>

                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Delivery Address:</h5>
                            </div>
                            <div className="idInput">
                                <BasicTextField id="outlined-required" size="small" />
                            </div>
                        </div>

                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Email:</h5>
                            </div>
                            <div className="placeOrderidInput">
                                <BasicTextField id="outlined-required" size="small" type="email"/>
                            </div>
                        </div>

                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="placeOrderidInput">
                                <BasicTextField id="outlined-required" size="small" type="number"/>
                            </div>
                        </div>

                        <div className="placeOrderformField">
                            <div className="placeOrderidField">
                                <h5>Items:</h5>
                            </div>
                            <div className="placeOrderidInput" id="items">
                                <div>
                                    <ComboBox
                                        className="supplierInput"
                                        id="demo-select-small"
                                        value={category}
                                        onChange={handleChange}
                                        options={options2}
                                        label="Category"
                                        size="small"
                                        style={{width:"12.25em",left:"-.5em"}}
                                    />
                                </div>
                                <div>
                                    <CustomizedButton
                                        onClick={placeOrder}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '5em',
                                            height: '3.25em',
                                            fontSize: '0.6em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginRight: '1.5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Add Items
                                    </CustomizedButton>
                                </div>
                            </div>
                        </div>
                        <div className="placeOrderformField">
                            <div className="placeOrderidField">

                            </div>
                            <div className="placeOrderidInput">
                                <BasicTextField id="outlined-required" size="small"/>
                            </div>
                        </div>


                        <div className="placeOrderformFieldButtons">
                            <div className="placeOrderBtn">
                                <CustomizedButton
                                    onClick={placeOrder}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '11em',
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
                                    Place Order
                                </CustomizedButton>
                            </div>

                            <div className="placeOrdercancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Cancel
                                </CustomizedButton>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default PlaceOrder;