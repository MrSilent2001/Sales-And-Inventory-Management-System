import * as React from 'react';
import './Update Item.css';
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import {useEffect, useState} from "react";
import axios from "axios";

function UpdateItem(props){

    const [inventoryItem, setInventoryItem] = useState([]);

    const getInventoryItem = (id) => {
        axios.get(`http://localhost:9000/inventory/get/${id}`).then(res=> {
            setInventoryItem(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getInventoryItem(props.selectedRow)
    }, []);

    return(
        <CenteredModal>
            <div className="updateItemOuter">
                <div className="updateItemModel">
                    <h2>Update Item</h2>
                    <div className="updateItemForm">
                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Inventory Id</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.id}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Description</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.itemDescription}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.itemCategory}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.itemQuantity}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.itemUnitPrice}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Manufacture Dated</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.manufacturedDate}/>
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Expire Date</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField value={inventoryItem.expireDate}/>
                            </div>
                        </div>

                        <div className="updateItemformFieldButtons">

                            <div className="updateItemcancelButton">
                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '10em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
                                    }}>
                                    Cancel
                                </CustomizedButton>
                            </div>

                            <div className="updateItemupdateButton">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '10em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em'
                                    }}>
                                    Update Item
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default UpdateItem;