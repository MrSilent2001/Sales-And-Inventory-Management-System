import * as React from 'react';
import './AddItem.css';
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import dayjs from "dayjs";
import CustomDatePicker from "../../../../../components/DatePicker/datePicker";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";
import { uploadFileToBlob } from '../../productBlobStorage';

function AddSupplierInventoryItem(props) {

    const [formData, setFormData] = useState({
        supplierId: '',
        itemName: '',
        itemDesc: '',
        category: '',
        brand: '',
        manufacturedDate: '',
        color: '',
        quantity: '',
        price: ''
    });

    const [errors, setErrors] = useState({});
    const [productImages, setProductImages] = useState(null);
    const token = localStorage.getItem('accessToken');

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

    const handleFileChange = (file) => {
        setProductImages(file);
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.supplierId) {
            validationErrors.supplierId = " *This Field is required";
        }
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
        if (!formData.image) {
            validationErrors.image = " *This Field is required";
        }

        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            try {
                let imageUrl = '';
                if(productImages){
                    imageUrl = await uploadFileToBlob(productImages);

                }
                await axios.post('http://localhost:9000/inventory/add', {
                    sellerId: formData.supplierId,
                    productName: formData.itemName,
                    productDescription: formData.itemDesc,
                    productCategory: formData.category,
                    productBrand: formData.brand,
                    productManufacturer: formData.manufacturedDate,
                    productColour: formData.color,
                    productQuantity: formData.quantity,
                    productUnitPrice: formData.price,
                    productImage: [imageUrl]
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const response = await axios.get('http://localhost:9000/inventory/getAll' , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const updatedInventory = response.data;

                props.onInventoryAdded(updatedInventory);
                handleClickSuccess();
                props.onClose(false);
            } catch (error) {
                console.error('Error adding Item:', error);
                handleClickError();
            }
        }else{
            console.log("error");
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
                <div className="addSupplierItemOuter">
                    <div className="addSupplierItemModel">
                        <h2>Add Item</h2>
                        <div className="addSupplierItemForm">

                            <div className="addSupplierItemformField">
                                <div className="addSupplierItemidField">
                                    <h5>Supplier Id:</h5>
                                </div>
                                <div className="addSupplierItemidInput">
                                    <BasicTextField
                                        name="supplierId"
                                        type="text"
                                        size='small'
                                        onChange={(e) => handleChange("supplierId", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.supplierId && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.supplierId}</span>}

                            <div className="addSupplierItemformField">
                                <div className="addSupplierItemidField">
                                    <h5>Item Name:</h5>
                                </div>
                                <div className="addSupplierItemidInput">
                                    <BasicTextField
                                        name="itemName"
                                        type="text"
                                        size='small'
                                        onChange={(e) => handleChange("itemName", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.itemName && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.itemName}</span>}


                            <div className="addSupplierItemformField">
                                <div className="addSupplierItemidField">
                                    <h5>Item Description:</h5>
                                </div>
                                <div className="addSupplierItemInput">
                                    <BasicTextField
                                        name="itemDesc"
                                        type="text"
                                        size='small'
                                        onChange={(e) => handleChange("itemDesc", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.itemDesc && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.itemDesc}</span>}


                            <div className="customRow">
                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Category:</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
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
                                {errors.category && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.category}</span>}


                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Brand:</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
                                        <BasicTextField
                                            name="brand"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("brand", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                                {errors.brand && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.brand}</span>}
                            </div>

                            <div className="customRow">
                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Manufactured Date</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
                                        <CustomDatePicker
                                            name="manufacturedDate"
                                            slotProps={{ textField: { size: 'small', width: '10em' } }}
                                            required
                                            onChange={(date) => {
                                                const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                console.log(formattedDate);
                                                handleChange("manufacturedDate",formattedDate);
                                            }}
                                        />
                                    </div>
                                </div>
                                {errors.manufacturedDate && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.manufacturedDate}</span>}


                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Color:</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
                                        <BasicTextField
                                            name="color"
                                            type="text"
                                            size='small'
                                            onChange={(e) => handleChange("color", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                                {errors.color && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.color}</span>}
                            </div>

                            <div className="customRow">
                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Quantity:</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
                                        <BasicTextField
                                            name="quantity"
                                            type="number"
                                            size='small'
                                            onChange={(e) => handleChange("quantity", e.target.value)}
                                            style={{width: '90%'}}
                                        />
                                    </div>
                                </div>
                                {errors.quantity && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.quantity}</span>}

                                <div className="addSupplierItemformField">
                                    <div className="addSupplierItemidField">
                                        <h5>Offering Price:</h5>
                                    </div>
                                    <div className="addSupplierItemidInput">
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

                            <div className="addSupplierItemformField">
                                <div className="addSupplierItemidField">
                                    <h5>Item Image:</h5>
                                </div>
                                <FileUpload
                                    style={{ margin: '0 0' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            {errors.image && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em' }}>{errors.image}</span>}

                            <div className="addSupplierItemformFieldButtons">
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
                                        borderRadius: '0.35em'
                                    }}>
                                    Add Item
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
                                        borderRadius: '0.35em'
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
                message="Supplier Added Successfully!"
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

export default AddSupplierInventoryItem;
