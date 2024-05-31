import React, { useState } from 'react';
import './login.css';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const { customerLogin, supplierLogin } = useAuth();
    const [activeTab, setActiveTab] = useState('customer');
    const [showPassword, setShowPassword] = useState(true);
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

    const handleSubmitCustomer = async (e) => {
        e.preventDefault();
        console.log(customerData);
        try {
            const response = await customerLogin(customerData.username, customerData.password);
            navigate("/customerHome");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSubmitSupplier = async (e) => {
        e.preventDefault();
        console.log(supplierData);

        try {
            const response = await supplierLogin(supplierData.username, supplierData.password);
            navigate("/supplierHome");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="adminLoginContainer">
            <div className="tabPanel">
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
                <CustomizedButton
                    className={`nav-link ${activeTab === 'supplier' ? 'active' : ''}`}
                    onClick={() => setActiveTab('supplier')}
                    style={{
                        width: '7.5em',
                        padding: '1.25em 1em',
                        marginRight: '1em',
                        backgroundColor: activeTab === 'supplier' ? '#007bff' : '#ffffff',
                        color: activeTab === 'supplier' ? '#ffffff' : '#007bff',
                        border: '1px solid #007bff',
                        borderRadius: '0.25em'
                    }}
                >
                    Supplier
                </CustomizedButton>
            </div>

            <div className="bodyContainer-admin">
                <div className={`tab-pane ${activeTab === 'customer' ? 'active' : ''}`} id="pills-login">
                    <form onSubmit={handleSubmitCustomer}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    style={{ width: '17.25em', height: '2em' }}
                                    onChange={(e) => handleChangeCustomer("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-password"
                                    style={{ width: '17.25em', marginLeft: '0.2em', height: '2em' }}
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

                <div className={`tab-pane ${activeTab === 'supplier' ? 'active' : ''}`} id="pills-register">
                    <form onSubmit={handleSubmitSupplier}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    style={{ width: '17.25em', height: '2em' }}
                                    id="outlined-required"
                                    onChange={(e) => handleChangeSupplier("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-password"
                                    style={{ width: '17.25em', marginLeft: '0.2em', height: '2em' }}
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
