import React, { forwardRef, useState } from "react";
import "./addSupplier.css";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import ComboBox from "../../../../../components/Form Inputs/comboBox";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import FileUpload from "../../../../../components/Form Inputs/fileUpload";

const AddSupplier = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        supplierName: '',
        address: '',
        category: '',
        email: '',
        contact: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        console.log("Success message should be displayed.");
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        console.log("Success message should be closed.");
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const options = [
        { value: 'Category 01', label: 'Category 01' },
        { value: 'Category 02', label: 'Category 02' },
        { value: 'Category 03', label: 'Category 03' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.supplierName) {
            validationErrors.supplierName = " *Supplier Name is required";
        }
        if (!formData.address) {
            validationErrors.address = " *Address is required";
        }
        if (!formData.email) {
            validationErrors.email = " *Email is required";
        }
        if (!formData.contact) {
            validationErrors.contact = " *Contact Number is required";
        }
        if (!formData.category) {
            validationErrors.category = " *Category is required";
        }

        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            try {

                await axios.post('http://localhost:9000/supplier/create', {
                    supplierName: formData.supplierName,
                    supplierEmail: formData.email,
                    supplierAddress: formData.address,
                    supplierContact: formData.contact,
                    supplierPassword: formData.category
                });

                // Fetch the updated list of suppliers
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers');
                const updatedSuppliers = response.data;

                // Update the state of suppliers in the ViewSupplier component
                props.onSupplierAdded(updatedSuppliers);

                console.log('Supplier added successfully');
                handleClickSuccess();

                // Close the modal
                console.log("Attempting to close modal.");
                props.onClose(false);

            } catch (error) {
                console.error('Error adding user:', error);
                handleClickError();
            }
        }

    };

    return (
        <CenteredModal>
            <FormControl onSubmit={handleSubmit}>
                <div className="addSupplierOuter">
                    <div className="addSupplierModel">
                        <h2>Add Supplier</h2>
                        <div className="addSupplierForm">
                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Supplier Name:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="supplierName"
                                        size="small"
                                        onChange={handleChange}
                                    />
                                    {errors.supplierName && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.supplierName}</span>}
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-textarea"
                                        name="address"
                                        size="small"
                                        onChange={handleChange}
                                    />
                                    {errors.address && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.address}</span>}
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="email"
                                        size="small"
                                        type="email"
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.email}</span>}
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Contact Number:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        name="contact"
                                        size="small"
                                        onChange={handleChange}
                                    />
                                    {errors.contact && <span style={{ color: 'red', fontSize: '0.8em', padding:'0 0 1.5em 0.5em'}}>{errors.contact}</span>}
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Category:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <ComboBox
                                        name="category"
                                        onChange={handleChange}
                                        style={{ width: '17.5em', marginRight: '0.5em' }}
                                        options={options}
                                        label="Category"
                                    />
                                    {errors.category && <p style={{ color: 'red', fontSize: '0.8em', padding:'0 0 0.5em 0.5em'}}>{errors.category}</p>}
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Photo:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <FileUpload style={{ width: "20em", left: "-.5em" }}/>
                                </div>
                            </div>


                            <div className="addSupplierformFieldButtons">
                                <div className="addSupplierButton">
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
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight: '1.5em',
                                        }}>
                                        Add Supplier
                                    </CustomizedButton>
                                </div>

                                <div className="addSuppliercancelButton">
                                    <CustomizedButton
                                        onClick={() => props.onClose(false)}
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            backgroundColor: '#960505',
                                            width: '9.5em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '500',
                                            marginTop: '0.625em',
                                        }}>
                                        Cancel
                                    </CustomizedButton>
                                </div>
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
    );
});

export default AddSupplier;
