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
import Avatar from "@mui/material/Avatar";
import {uploadFileToBlob} from "../../productBlobStorage";

function UpdateItem(props) {
    const { itemData, onClose, onInventoryUpdated } = props;
    const [formData, setFormData] = useState({
        itemName: '',
        itemDesc: '',
        category: '',
        brand: '',
        productManufacturer: '',
        color: '',
        quantity: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        if (itemData) {
            setFormData({
                itemName: itemData.productName || '',
                itemDesc: itemData.productDescription || '',
                category: itemData.productCategory || '',
                brand: itemData.productBrand || '',
                productManufacturer: itemData.productManufacturer || '',
                color: itemData.productColour || '',
                quantity: itemData.productQuantity || '',
                price: itemData.productUnitPrice || '',
                image: itemData.productImage || ''
            });
        }
    }, [itemData]);

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const handleFileChange = async (file) => {
        setProductImages(file);
        const imageUrl = await uploadFileToBlob(file);
        setFormData(prevState => ({
            ...prevState,
            image: imageUrl
        }));
    }

    const [errors, setErrors] = useState({});
    const [productImages, setProductImages] = useState(null);
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

    const token = localStorage.getItem('accessToken');

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
        if (!formData.productManufacturer) {
            validationErrors.productManufacturer = " *This Field is required";
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
        if (!formData.image) {
            validationErrors.image = " *This Field is required";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                let imageUrl = formData.image;
                if (productImages) {
                    imageUrl = await uploadFileToBlob(productImages);
                }

                await axios.put(`http://localhost:9000/inventory/update/${itemData.id}`, {
                    productName: formData.itemName,
                    productDescription: formData.itemDesc,
                    productCategory: formData.category,
                    productBrand: formData.brand,
                    productManufacturer: formData.productManufacturer,
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
                const updatedInventory = response.data;

                onInventoryUpdated(updatedInventory);
                handleClickSuccess();
                onClose(false);
            } catch (error) {
                console.error('Error adding Item:', error);
                handleClickError();
            }
        } else {
            console.log("Validation errors");
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
            <FormControl onSubmit={handleSubmit}>
                <div className="updateSupplierItemOuter">
                    <div className="updateSupplierItemInner">
                        <div className="item-image">
                            <Avatar
                                src={formData.image}
                                sx={{width: 375, height: 375, borderRadius: 5, border: 2, borderColor: '#000'}}
                            />
                            <div className='uploadButton'>
                                <FileUpload
                                    text={"replace image"}
                                    style={{width: "15em", top: "2em"}}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="item-details">
                            <div className="item-form-field" style={{marginTop: '1em'}}>
                                <div className="item-form-field-label">
                                    <h5>Item Name:</h5>
                                </div>
                                <div className="item-input-field">
                                    <BasicTextField
                                        name="itemName"
                                        type="text"
                                        size='small'
                                        value={formData.itemName}
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
                                        value={formData.itemDesc}
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
                                            width: '12.5em',
                                            height: '2em',
                                            marginLeft: '0.5em',
                                            border: '1px solid white'
                                        }}
                                        value={formData.category}
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
                                        value={formData.brand}
                                        onChange={(e) => handleChange("brand", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.brand && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.brand}</span>}

                            <div className="item-form-field">
                                <div className="item-form-field-label">
                                    <h5>Manufacturer:</h5>
                                </div>
                                <div className="item-input-field">
                                    <div className="item-input-field">
                                        <BasicTextField
                                            name="productManufacturer"
                                            type="text"
                                            size='small'
                                            value={formData.productManufacturer}
                                            onChange={(e) => handleChange("productManufacturer", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errors.productManufacturer && <span
                                style={{
                                    color: 'red',
                                    fontSize: '0.8em',
                                    padding: '0 0 0.5em 0.5em'
                            }}>{errors.productManufacturer}</span>}

                            <div className="item-form-field">
                                <div className="item-form-field-label">
                                    <h5>Color:</h5>
                                </div>
                                <div className="item-input-field">
                                    <BasicTextField
                                        name="color"
                                        type="text"
                                        size='small'
                                        value={formData.color}
                                        onChange={(e) => handleChange("color", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.color && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.color}</span>}

                            <div className="item-form-field">
                                <div className="item-form-field-label">
                                    <h5>Quantity:</h5>
                                </div>
                                <div className="item-input-field">
                                    <BasicTextField
                                        name="quantity"
                                        type="number"
                                        size='small'
                                        value={formData.quantity}
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
                                    <h5>Offering Price:</h5>
                                </div>
                                <div className="item-input-field">
                                    <BasicTextField
                                        name="price"
                                        type="number"
                                        size='small'
                                        value={formData.price}
                                        onChange={(e) => handleChange("price", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="updateItemButtons">
                                <CustomizedButton
                                    onClick={handleSubmit}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em'
                                    }}>
                                    Update
                                </CustomizedButton>

                                <CustomizedButton
                                    onClick={() => props.onClose(false)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.8em'
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
    );
}

export default UpdateItem;
