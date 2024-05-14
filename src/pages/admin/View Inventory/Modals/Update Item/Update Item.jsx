import * as React from 'react';
import './Update Item.css';
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import {useEffect, useState} from "react";
import axios from "axios";
import ComboBox from "../../../../../components/Form Inputs/comboBox";

function UpdateItem(props){

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expireDate, setExpireDate] = useState('');

    const [inventoryItem, setInventoryItem] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const getInventoryItem = (id) => {
        axios.get(`http://localhost:9000/inventory/get/${id}`).then(res=> {
            setInventoryItem(res.data);
            setSelectedCategory(res.data.itemCategory);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getInventoryItem(props.selectedRow)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            itemDescription: description,
            itemCategory: category,
            itemQuantity: quantity,
            itemUnitPrice: unitPrice,
            manufacturedDate : manufacturedDate,
            expireDate : expireDate
        };

        axios.post('http://localhost:9000/inventory/add',newItem).then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })

        // Clear the form fields after submission
        /*setInventoryId('');
        setDescription('');
        setCategory('');
        setQuantity('');
        setUnitPrice('');*/


    }

    const options = [
        {value: 'Category 02', label: 'Category 02'},
        {value: 'Building Material', label: 'Building Material'},
        {value: 'Category 03', label: 'Category 03'}
    ];

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
                                <BasicTextField
                                    name="Desc"
                                    value={inventoryItem.itemDescription}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Item Category</h5>
                            </div>
                            <div className="updateItemidInput">
                                <ComboBox
                                    name="category"
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                    style={{
                                        width: '17.5em',
                                        height: '2em',
                                        marginRight: '0.5em',
                                        border: '1px solid white'
                                    }}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Qty"
                                    value={inventoryItem.itemQuantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Unit Price</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="Price"
                                    value={inventoryItem.itemUnitPrice}
                                    onChange={(e) => {
                                        setUnitPrice(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Manufacture Dated</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="manufacturedDate"
                                    value={inventoryItem.manufacturedDate}
                                    onChange={(e) => {
                                        setManufacturedDate(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="updateItemformField">
                            <div className="updateItemidField">
                                <h5>Expire Date</h5>
                            </div>
                            <div className="updateItemidInput">
                                <BasicTextField
                                    name="expireDate"
                                    value={inventoryItem.expireDate}
                                    onChange={(e) => {
                                        setExpireDate(e.target.value);
                                    }}
                                />
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