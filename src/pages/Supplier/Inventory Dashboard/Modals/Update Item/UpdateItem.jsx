import * as React from 'react';
import './UpdateItem.css';
import CenteredModal from "../../../../../components/Modal/modal";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import {useEffect, useState} from "react";
import axios from "axios";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import FormControl from "@mui/material/FormControl";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";
import dayjs from "dayjs";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";
import CustomizedAlert from "../../../../../components/Alert/alert";

function UpdateItem(props) {

    const [formData, setFormData] = useState({
        supplierId: '',
        itemName: '',
        itemDesc: '',
        category: '',
        brand: '',
        manufacturedDate: '',
        color: '',
        quantity: '',
        price: '',
        image: ''

    });

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    useEffect(() => {
        // Fetch item data from backend and set form data
        async function fetchItemData(id) {
            try {
                const response = await axios.get(`http://localhost:9000/inventory/getItem/${id}`);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        }

        fetchItemData();
    }, []);

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:9000/inventory/update/${id}`, {
                sellerId: formData.supplierId,
                productName: formData.itemName,
                productDescription: formData.itemDesc,
                productCategory: formData.category,
                productBrand: formData.brand,
                productManufacturer: formData.manufacturedDate,
                productColour: formData.color,
                productQuantity: formData.quantity,
                productUnitPrice: formData.price,
                // productImage: formData.image
            });

            const response = await axios.get('http://localhost:9000/inventory/getAll');
            const updatedInventory = response.data;

            props.onInventoryAdded(updatedInventory);
            handleClickSuccess();
            props.onClose(false);
        } catch (error) {
            console.error('Error adding Item:', error);
            handleClickError();
        }

    };

    const options = [
        {value: 'Building Material', label: 'Building Material'},
        {value: 'Hardware and Tools', label: 'Hardware and Tools'},
        {value: 'Safety Equipments', label: 'Safety Equipments'},
        {value: 'Electrical Supplies', label: 'Electrical Supplies'},
        {value: 'Plumbing Supplies', label: 'Plumbing Supplies'},
        {value: 'Interior Finishes', label: 'Interior Finishes'},
        {value: 'Landscaping Products', label: 'Landscaping Products'},
        {value: 'Construction Chemicals', label: 'Construction Chemicals'}
    ];

    return (
        <CenteredModal>
            <FormControl onSubmit={handleSubmit}>
                <div className="updateSupplierItemOuter">
                    <div className="updateSupplierItemModel">
                        <h2>Update Item</h2>
                        <div className="updateSupplierItemForm">
                            <div className="updateSupplierItemformField">
                                <div className="updateSupplierItemidField">
                                    <h5>Supplier Id:</h5>
                                </div>
                                <div className="updateSupplierItemidInput">
                                    <BasicTextField
                                        name="supplierId"
                                        type="text"
                                        size='small'
                                        value={formData.supplierId}
                                        onChange={(e) => handleChange("supplierId", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="updateSupplierItemformField">
                                <div className="updateSupplierItemidField">
                                    <h5>Item Name:</h5>
                                </div>
                                <div className="updateSupplierItemidInput">
                                    <BasicTextField
                                        name="itemName"
                                        type="text"
                                        size='small'
                                        onChange={(e) => handleChange("itemName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="updateSupplierItemformField">
                                <div className="updateSupplierItemidField">
                                    <h5>Item Description:</h5>
                                </div>
                                <div className="updateSupplierItemInput">
                                    <BasicTextField
                                        name="itemDesc"
                                        type="text"
                                        size='small'
                                        onChange={(e) => handleChange("itemDesc", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="customRow">
                                <div className="updateSupplierItemformField">
                                    <div className="updateSupplierItemidField">
                                        <h5>Category:</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <ComboBox
                                            name="category"
                                            onChange={(e) => handleChange("category", e.target.value)}
                                            style={{
                                                width: '10.5em',
                                                height: '2em',
                                                marginRight: '0.5em',
                                                border: '1px solid white'
                                            }}
                                            options={options}
                                            size="small"
                                        />
                                    </div>
                                </div>

                                <div className="updateSupplierItemformField">
                                    <div className="updateSupplierItemidField">
                                        <h5>Brand:</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <BasicTextField
                                            name="brand"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("brand", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="customRow">
                                <div className="updateSupplierItemformField">
                                    <div className="updateSupplierItemidField">
                                        <h5>Manufactured Date</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <CustomDatePicker
                                            name="manufacturedDate"
                                            slotProps={{textField: {size: 'small', width: '10em'}}}
                                            required
                                            onChange={(date) => {
                                                const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                console.log(formattedDate);
                                                handleChange("manufacturedDate", formattedDate);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="updateSupplierItemformField">
                                    <div className="updateSupplierItemidField">
                                        <h5>Color:</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <BasicTextField
                                            name="color"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("color", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="customRow">
                                <div className="updateSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Quantity:</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <BasicTextField
                                            name="quantity"
                                            type="number"
                                            size='small'
                                            onChange={(e) => handleChange("quantity", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>

                                <div className="updateSupplierItemformField">
                                    <div className="updateSupplierItemidField">
                                        <h5>Offering Price:</h5>
                                    </div>
                                    <div className="updateSupplierItemidInput">
                                        <BasicTextField
                                            name="price"
                                            type="number"
                                            size='small'
                                            onChange={(e) => handleChange("price", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="updateSupplierItemformField">
                                <div className="updateSupplierItemidField">
                                    <h5>Item Image:</h5>
                                </div>
                                <FileUpload/>
                            </div>

                            <div className="updateSupplierItemformFieldButtons">
                                <CustomizedButton
                                    onClick={handleSubmit}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        margin: '0 1em 1.25em 0'
                                    }}>
                                    Update Item
                                </CustomizedButton>

                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        margin: '0 0 1.25em 1em'
                                    }}>
                                    Cancel
                                </CustomizedButton>

                            </div>
                        </div>
                    </div>
                </div>
            </FormControl>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Item Updated Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </CenteredModal>
    )
}

export default UpdateItem;