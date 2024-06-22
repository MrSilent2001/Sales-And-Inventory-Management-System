import React, {forwardRef, useState} from "react";
import "./addSupplier.css";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import CustomizedButton from "../../../../../components/Button/button";
import CenteredModal from "../../../../../components/Modal/modal";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import CustomizedAlert from "../../../../../components/Alert/alert";
import BasicTextArea from "../../../../../components/Form Inputs/textArea";

const AddSupplier = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        username: '',
        address: '',
        email: '',
        contactNo: '',
        nic: '',
    });

    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('accessToken');

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.username) {
            validationErrors.username = " *This Field is required";
        }
        if (!formData.address) {
            validationErrors.address = " *This Field is required";
        }
        if (!formData.email) {
            validationErrors.email = " *This Field is required";
        }
        if (!formData.contactNo) {
            validationErrors.contactNo = " *This Field is required";
        }
        if (!formData.nic) {
            validationErrors.nic = " *This Field is required";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {

                await axios.post('http://localhost:9000/supplier/create', {
                    username: formData.username,
                    email: formData.email,
                    address: formData.address,
                    contactNo: formData.contactNo,
                    nic: formData.nic,
                    role: 'supplier',
                    password: formData.username,
                    profilePicture: 'https://th.bing.com/th/id/OIP.IQqAakFVSW2T6n9Kibpe2AAAAA?rs=1&pid=ImgDetMain'
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                //Send Credentials to the supplier
                const credentials = axios.post('http://localhost:9000/email/send/supplierCredentials',{
                    receiverName: formData.username,
                    emailSubject: "Tradeasy Account Credentials!",
                    emailBody: `Thank you for joining with Tradeasy Pvt. Ltd. The credentials for your account are sent below.Please do not disclose these information with anyone else. Username: ${formData.username} and password: ${formData.username}`,
                    receiverEmail: formData.email
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch the updated list of suppliers
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
                                        size="small"
                                        onChange={(e) => handleChange("username", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.username && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.username}</span>}


                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextArea
                                        id="outlined-textarea"
                                        size="small"
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.address && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.address}</span>}


                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        type="email"
                                        onChange={(e) => handleChange("email", e.target.value)}

                                    />
                                </div>
                            </div>
                            {errors.email && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.email}</span>}


                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>Contact Number:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        type="number"
                                        onChange={(e) => handleChange("contactNo", e.target.value)}

                                    />
                                </div>
                            </div>
                            {errors.contactNo && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.contactNo}</span>}


                            <div className="addSupplierformField">
                                <div className="addSupplieridField">
                                    <h5>NIC:</h5>
                                </div>
                                <div className="addSupplieridInput">
                                    <BasicTextField
                                        id="outlined-required"
                                        size="small"
                                        type="number"
                                        onChange={(e) => handleChange("nic", e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.nic && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.nic}</span>}

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
                                        padding: '0.5em 0.625em',
                                        marginTop: '0.625em',
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
    );
});

export default AddSupplier;
