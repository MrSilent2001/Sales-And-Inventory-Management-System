import * as React from 'react';
import './Add Item.css';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

function AddItem(props) {

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [manufacturedDate, setManufacturedDate] = useState('');
    const [expireDate, setExpireDate] = useState('');

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
        {value: 'Building Material', label: 'Building Material'},
        {value: 'Category 02', label: 'Category 02'},
        {value: 'Category 03', label: 'Category 03'}
    ];

    // const options2 = [
    //     {value: 'In-Stock', label: 'In-Stock'},
    //     {value: 'Out-Of-Stock', label: 'Out-Of-Stock'}
    // ];

    return (
        <CenteredModal>
            <FormControl onSubmit={handleSubmit}>
                <div className="addItemOuter">
                    <div className="addItemModel">
                        <h2>Add Item</h2>
                        <div className="addItemForm">

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Item Description</h5>
                                </div>
                                <div className="addItemidInput">
                                    <BasicTextField
                                        name="Desc"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Item Category</h5>
                                </div>
                                <div className="addItemidInput">
                                    <ComboBox
                                        name="category"
                                        value={category}
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

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Quantity</h5>
                                </div>
                                <div className="addItemidInput">
                                        <BasicTextField
                                            name="Qty"
                                            value={quantity}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                </div>
                            </div>

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Unit Price</h5>
                                </div>
                                <div className="addItemidInput">
                                    <BasicTextField
                                        name="Price"
                                        value={unitPrice}
                                        onChange={(e) => {
                                            setUnitPrice(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            {/*<div className="addItemformField">*/}
                            {/*    <div className="addItemidField">*/}
                            {/*        <h5>Inventory Status</h5>*/}
                            {/*    </div>*/}
                            {/*    <div className="addItemidInput">*/}
                            {/*        <ComboBox*/}
                            {/*            value={inventoryStatus}*/}
                            {/*            onChange={(e) => setInventoryStatus(e.target.value)}*/}
                            {/*            style={{*/}
                            {/*                width: '17.5em',*/}
                            {/*                height: '2em',*/}
                            {/*                marginRight: '0.5em',*/}
                            {/*                border: '1px solid white'*/}
                            {/*            }}*/}
                            {/*            options={options2}*/}
                            {/*            label="Category"*/}
                            {/*            size="small"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Manufactured Date</h5>
                                </div>
                                <div className="addItemidInput">
                                    <BasicTextField
                                        name="manufacturedDate"
                                        value={manufacturedDate}
                                        onChange={(e) => {
                                            setManufacturedDate(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addItemformField">
                                <div className="addItemidField">
                                    <h5>Expire Date</h5>
                                </div>
                                <div className="addItemidInput">
                                    <BasicTextField
                                        name="expireDate"
                                        value={expireDate}
                                        onChange={(e) => {
                                            setExpireDate(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addItemformFieldButtons">

                                <div className="addItemcancelButton">
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

                                <div className="addItemButton">
                                    <CustomizedButton
                                        onClick={handleSubmit}
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
                                        Add Item
                                    </CustomizedButton>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </FormControl>
        </CenteredModal>
    )
}

export default AddItem;
