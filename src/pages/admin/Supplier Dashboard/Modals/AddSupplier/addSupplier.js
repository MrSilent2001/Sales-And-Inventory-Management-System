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
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

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

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'Category 01', label: 'Category 01' },
        { value: 'Category 02', label: 'Category 02' },
        { value: 'Category 03', label: 'Category 03' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.post('http://localhost:3001/supplier/create', {
                supplierName: supplierName,
                supplierEmail: email,
                supplierAddress: address,
                supplierContact: contact,
                supplierPassword: category
            });

            console.log('Supplier added successfully');
            handleClickSuccess();

            // Close the modal
            console.log("Attempting to close modal.");
            props.onClose(false);

        } catch (error) {
            console.error('Error adding user:', error);
            handleClickError();
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
                                        size="small"
                                        value={supplierName}
                                        onChange={(e) => {
                                            setSupplierName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-textarea"
                                        size="small"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Contact Number:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        value={contact}
                                        onChange={(e) => {
                                            setContact(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Category:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <ComboBox
                                        value={category}
                                        onChange={(event) => handleChange(event)}
                                        style={{ width: '17.5em', marginRight: '0.5em' }}
                                        options={options}
                                        label="Category"
                                        size="small"
                                    />
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
