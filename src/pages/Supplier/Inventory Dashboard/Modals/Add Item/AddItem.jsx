import * as React from 'react';
import './AddItem.css';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import { useState } from "react";
import axios from "axios";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";
import { uploadFileToBlob } from '../../productBlobStorage';
import Avatar from "@mui/material/Avatar";

function AddSupplierInventoryItem(props) {

    const [formData, setFormData] = useState({
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

    const [errors, setErrors] = useState({});
    const [productImages, setProductImages] = useState(null);
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = async (file) => {
        setProductImages(file);
        const imageUrl = await uploadFileToBlob(file);
        setFormData(prevState => ({
            ...prevState,
            image: imageUrl
        }));
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.itemName) {
            validationErrors.itemName = " *This Field is required";
        }
        if (!formData.itemDesc) {
            validationErrors.itemDesc = " *This Field is required";
        }
        if (!formData.category) {
            validationErrors.category = " *This Field is required";
        }
        if (!formData.brand) {
            validationErrors.brand = " *This Field is required";
        }
        if (!formData.manufacturedDate) {
            validationErrors.manufacturedDate = " *This Field is required";
        }
        if (!formData.color) {
            validationErrors.color = " *This Field is required";
        }
        if (!formData.quantity) {
            validationErrors.quantity = " *This Field is required";
        }
        if (!formData.price) {
            validationErrors.price = " *This Field is required";
        }
        if (!productImages) {
            validationErrors.image = " *This Field is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                let imageUrl = formData.image;
                if (productImages) {
                    imageUrl = await uploadFileToBlob(productImages);
                    handleChange("image", imageUrl);
                }

                await axios.post('http://localhost:9000/inventory/add', {
                    sellerId: id,
                    productName: formData.itemName,
                    productDescription: formData.itemDesc,
                    productCategory: formData.category,
                    productBrand: formData.brand,
                    productManufacturer: formData.manufacturedDate,
                    productColour: formData.color,
                    productQuantity: formData.quantity,
                    productUnitPrice: formData.price,
                    productImage: [imageUrl]
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const response = await axios.get('http://localhost:9000/inventory/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const addInventory = response.data;
                console.log(addInventory);

                props.onInventoryAdded(addInventory);
                handleClickSuccess();
                props.onClose(false);
            } catch (error) {
                console.error('Error adding Item:', error);
                handleClickError();
            }
        } else {
            console.log("error");
        }
    };

    const options = [
        { value: 'Building Material', label: 'Building Material' },
        { value: 'Hardware and Tools', label: 'Hardware and Tools' },
        { value: 'Safety Equipments', label: 'Safety Equipments' },
        { value: 'Electrical Supplies', label: 'Electrical Supplies' },
        { value: 'Plumbing Supplies', label: 'Plumbing Supplies' },
        { value: 'Interior Finishes', label: 'Interior Finishes' },
        { value: 'Landscaping Products', label: 'Landscaping Products' },
        { value: 'Construction Chemicals', label: 'Construction Chemicals' }
    ];

    return (
        <CenteredModal>
            <form onSubmit={handleSubmit}>
                <div className="addSupplierItemOuter">
                    <div className="addSupplierItemInner">
                    <div className="item-image">
                        <Avatar
                            src={formData.image}
                            sx={{ width: 230, height: 230, border: 2 }}
                        />
                        <div className='uploadButton'>
                            <FileUpload
                                style={{ width: "15em", top: "2em" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="item-details">
                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Item Name:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="itemName"
                                    type="text"
                                    size='small'
                                    onChange={(e) => handleChange("itemName", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.itemName && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.itemName}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Item Description:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="itemDesc"
                                    type="text"
                                    size='small'
                                    onChange={(e) => handleChange("itemDesc", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.itemDesc && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.itemDesc}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Category:</h5>
                            </div>
                            <div className="item-input-field">
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
                        {errors.category && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.category}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Brand:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="brand"
                                    type="text"
                                    size='small'
                                    onChange={(e) => handleChange("brand", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.brand && <span
                            style={{color: 'red', fontSize: '0.8em', padding: '0 0 0.5em 0.5em'}}>{errors.brand}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Manufactured Date:</h5>
                            </div>
                            <div className="item-input-field">
                                <CustomDatePicker
                                    name="manufacturedDate"
                                    slotProps={{textField: {size: 'small'}}}
                                    onChange={(date) => handleChange("manufacturedDate", date)}
                                />
                            </div>
                        </div>
                        {errors.manufacturedDate && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.manufacturedDate}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Color:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="color"
                                    type="text"
                                    size='small'
                                    onChange={(e) => handleChange("color", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.color && <span
                            style={{color: 'red', fontSize: '0.8em', padding: '0 0 0.5em 0.5em'}}>{errors.color}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="quantity"
                                    type="number"
                                    size='small'
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.quantity && <span style={{
                            color: 'red',
                            fontSize: '0.8em',
                            padding: '0 0 0.5em 0.5em'
                        }}>{errors.quantity}</span>}

                        <div className="item-form-field">
                            <div className="item-form-field-label">
                                <h5>Price:</h5>
                            </div>
                            <div className="item-input-field">
                                <BasicTextField
                                    name="price"
                                    type="number"
                                    size='small'
                                    onChange={(e) => handleChange("price", e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.price && <span
                            style={{color: 'red', fontSize: '0.8em', padding: '0 0 0.5em 0.5em'}}>{errors.price}</span>}

                        <div className="addItemButtons">
                            <CustomizedButton
                                type="submit"
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '8em',
                                    height: '2.5em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    margin: '0 1em 1.25em 5em'
                                }}>
                                Add
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
            </form>

            <CustomizedAlert
                open={openSuccess}
                message="Item Added Successfully!"
                severity="success"
                onClose={handleCloseSuccess}
            />

            <CustomizedAlert
                open={openError}
                message="Error Adding Item!"
                severity="error"
                onClose={handleCloseError}
            />
        </CenteredModal>
    );
}

export default AddSupplierInventoryItem;
