import React, { useState } from 'react';
import './signup.css';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [activeTab, setActiveTab] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [customerData, setCustomerFormData] = useState({
        username: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
        address: ''
    });

    const [supplierData, setSupplierFormData] = useState({
        username: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
        nic: '',
        paymentDetails: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeCustomer = (name, value) => {
        setCustomerFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSupplier = (name, value) => {
        setSupplierFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateCustomerForm = () => {
        const newErrors = {};
        if (!customerData.username) newErrors.username = 'Username is required';
        if (!customerData.email) newErrors.email = 'Email is required';
        if (!customerData.contactNo) newErrors.contactNo = 'Contact number is required';
        if (!customerData.address) newErrors.address = 'Address is required';
        if (!customerData.password) newErrors.password = 'Password is required';
        if (customerData.password !== customerData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSupplierForm = () => {
        const newErrors = {};
        if (!supplierData.username) newErrors.username = 'Username is required';
        if (!supplierData.email) newErrors.email = 'Email is required';
        if (!supplierData.contactNo) newErrors.contactNo = 'Contact number is required';
        if (!supplierData.nic) newErrors.nic = 'NIC is required';
        if (!supplierData.paymentDetails) newErrors.paymentDetails = 'Payment details are required';
        if (!supplierData.password) newErrors.password = 'Password is required';
        if (supplierData.password !== supplierData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitCustomer = async (e) => {
        e.preventDefault();
        if (!validateCustomerForm()) return;
        try {
            const response = await axios.post('http://localhost:9000/auth/signup', {
                username: customerData.username,
                password: customerData.password,
                email: customerData.email,
                contactNo: customerData.contactNo,
                address: customerData.address,
                role: 'customer'
            });

            setActiveTab('login');

        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    };

    const handleSubmitSupplier = async (e) => {
        e.preventDefault();
        if (!validateSupplierForm()) return;
        try {
            const response = await axios.post('http://localhost:9000/auth/signup', {
                username: supplierData.username,
                password: supplierData.password,
                email: supplierData.email,
                contactNo: supplierData.contactNo,
                nic: supplierData.nic,
                paymentDetails: supplierData.paymentDetails,
                role: 'supplier'
            });

            setActiveTab('login');

        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    };

    return (
        <div className="adminLoginContainer">
            <div className="tabPanel">
                <div>
                    <CustomizedButton
                        className={`nav-link ${activeTab === 'customer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customer')}
                        style={{
                            width: '7.5em',
                            padding: '1.25em 1em',
                            marginRight: '1em',
                            backgroundColor: activeTab === 'customer' ? '#007bff' : '#ffffff',
                            color: activeTab === 'customer' ? '#ffffff' : '#007bff',
                            border: '1px solid #007bff',
                            borderRadius: '0.25em'
                        }}
                    >
                        Customer
                    </CustomizedButton>


                </div>

                <div>
                    <CustomizedButton
                        className={`nav-link ${activeTab === 'customer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customer')}
                        style={{
                            width: '7.5em',
                            padding: '1.25em 1em',
                            marginRight: '1em',
                            backgroundColor: activeTab === 'customer' ? '#007bff' : '#ffffff',
                            color: activeTab === 'customer' ? '#ffffff' : '#007bff',
                            border: '1px solid #007bff',
                            borderRadius: '0.25em'
                        }}
                    >
                        Supplier
                    </CustomizedButton>
                </div>
            </div>

            <div className="bodyContainer-signup">
                <div className={`tab-pane ${activeTab === 'customer' ? 'active' : ''}`} id="pills">
                    <form onSubmit={handleSubmitCustomer}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    onChange={(e) => handleChangeCustomer("username", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.username && <div className="error-message">{errors.username}</div>}

                            <div className="form-outline">
                                <label> Email: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="email"
                                    onChange={(e) => handleChangeCustomer("email", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && <div className="error-message">{errors.email}</div>}

                            <div className="form-outline">
                                <label> Contact No: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="text"
                                    onChange={(e) => handleChangeCustomer("contactNo", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}

                            <div className="form-outline">
                                <label> Address: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="text"
                                    onChange={(e) => handleChangeCustomer("address", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.address && <div className="error-message">{errors.address}</div>}

                            <div className="form-outline">
                                <label> Password: </label>
                                <PasswordField
                                    style={{width: '17.25em', marginLeft: '0.2em', height: '2em'}}
                                    size="small"
                                    id="outlined-adornment-password"
                                    onChange={(e) => handleChangeCustomer("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>
                            {errors.password && <div className="error-message">{errors.password}</div>}

                            <div className="form-outline">
                                <label> Confirm Password: </label>
                                <PasswordField
                                    style={{width: '17.25em', marginLeft: '0.2em', height: '2em'}}
                                    size="small"
                                    id="outlined-adornment-confirm-password"
                                    onChange={(e) => handleChangeCustomer("confirmPassword", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

                            <div className="buttonContainer">
                                <CustomizedButton
                                    type="submit"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        width: '11.5em',
                                        height: '2.75em',
                                        fontSize: '0.95em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.625em',
                                        hoverBackgroundColor: '#2d3ed2'
                                    }}>
                                    Sign Up
                                </CustomizedButton>
                            </div>
                            <div>
                                <p>Already Have an Account? <Link to="/login">Login</Link></p>
                            </div>
                        </FormControl>
                    </form>
                </div>

                <div className={`tab-pane ${activeTab === 'supplier' ? 'active' : ''}`} id="pills">
                    <form onSubmit={handleSubmitSupplier}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    onChange={(e) => handleChangeSupplier("username", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.username && <div className="error-message">{errors.username}</div>}

                            <div className="form-outline">
                                <label> Email: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="email"
                                    onChange={(e) => handleChangeSupplier("email", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && <div className="error-message">{errors.email}</div>}

                            <div className="form-outline">
                                <label> Contact No: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="text"
                                    onChange={(e) => handleChangeSupplier("contactNo", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}

                            <div className="form-outline">
                                <label> Password: </label>
                                <PasswordField
                                    style={{width: '17.25em', marginLeft: '0.2em', height: '2em'}}
                                    size="small"
                                    id="outlined-adornment-password"
                                    onChange={(e) => handleChangeSupplier("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>
                            {errors.password && <div className="error-message">{errors.password}</div>}

                            <div className="form-outline">
                                <label> Confirm Password: </label>
                                <PasswordField
                                    style={{width: '17.25em', marginLeft: '0.2em', height: '2em'}}
                                    size="small"
                                    id="outlined-adornment-confirm-password"
                                    onChange={(e) => handleChangeSupplier("confirmPassword", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}


                            <div className="form-outline">
                                <label> NIC: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="text"
                                    onChange={(e) => handleChangeSupplier("nic", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.nic && <div className="error-message">{errors.nic}</div>}

                            <div className="form-outline">
                                <label> Payment Details: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    type="text"
                                    onChange={(e) => handleChangeSupplier("paymentDetails", e.target.value)}
                                    required
                                />
                            </div>
                            {errors.paymentDetails && <div className="error-message">{errors.paymentDetails}</div>}

                            <div className="buttonContainer">
                                <CustomizedButton
                                    type="submit"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        width: '11.5em',
                                        height: '2.75em',
                                        fontSize: '0.95em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.625em',
                                        fontWeight: '550',
                                        border: 'none',
                                        marginTop: '0.625em',
                                        hoverBackgroundColor: '#2d3ed2'
                                    }}>
                                    Sign Up
                                </CustomizedButton>
                            </div>
                            <div>
                                <p>Already Have an Account? <Link to="/login">Login</Link></p>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
