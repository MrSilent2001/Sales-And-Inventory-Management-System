import React, { useState } from 'react';
import './login.css';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function Login() {
    const { adminLogin } = useAuth();
    const [activeTab, setActiveTab] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [customerData, setCustomerFormData] = useState({
        username: '',
        password: ''
    });

    const [supplierData, setSupplierFormData] = useState({
        username: '',
        password: ''
    });

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

    const customerLogin = async (username, password) => {
        const response = await axios.post('http://localhost:9000/auth/customer/login', {
            username,
            password
        });
        return response.data;
    };

    const supplierLogin = async (username, password) => {
        const response = await axios.post('http://localhost:9000/auth/supplier/login', {
            username,
            password
        });
        return response.data;
    };

    const handleSubmitCustomer = async (e) => {
        e.preventDefault();
        console.log(customerData);
        try {
            const { id, role } = await customerLogin(customerData.username, customerData.password);
            navigate("/customerHome");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSubmitSupplier = async (e) => {
        e.preventDefault();
        console.log(supplierData);

        try {
            const { id, role } = await supplierLogin(supplierData.username, supplierData.password);
            navigate("/supplierDashboard");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="adminLoginContainer">
            <div className="tabPanel">
                <div>
                    <button
                        className={`nav-link ${activeTab === 'customer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customer')}
                    >
                        Customer
                    </button>
                </div>
                <div>
                    <button
                        className={`nav-link ${activeTab === 'supplier' ? 'active' : ''}`}
                        onClick={() => setActiveTab('supplier')}
                    >
                        Supplier
                    </button>
                </div>
            </div>

            <div className="bodyContainer">
                <div className={`tab-pane ${activeTab === 'customer' ? 'active' : ''}`} id="pills-login">
                    <form onSubmit={handleSubmitCustomer}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeCustomer("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-password"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeCustomer("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>

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
                                Login
                            </CustomizedButton>
                            <div>
                                <p>Don't Have an Account? <Link to="/signup">SignUp Now</Link></p>
                            </div>
                        </FormControl>
                    </form>
                </div>

                {/*==========================SIGN-UP===================================*/}
                <div className={`tab-pane ${activeTab === 'supplier' ? 'active' : ''}`} id="pills-register">
                    <form onSubmit={handleSubmitSupplier}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeSupplier("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-password"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeSupplier("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>

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
                                Login
                            </CustomizedButton>
                            <div>
                                <p>Don't Have an Account? <Link to="/signup">SignUp Now</Link></p>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
