import React, { useState } from 'react';
import './adminLogin.css';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function AdminLogin() {
    const { adminLogin } = useAuth();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: ''
    });

    const [signupFormData, setSignupFormData] = useState({
        username: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword:''
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeLogin = (name, value) => {
        setLoginFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSignUp = (name, value) => {
        setSignupFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log(loginFormData);
        try {
            const { id, role } = await adminLogin(loginFormData.username, loginFormData.password);
            navigate("/adminDashboard");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        console.log(signupFormData);

        try {
            const response = await axios.post('http://localhost:9000/auth/signup', {
                username: signupFormData.username,
                password: signupFormData.password,
                confirmPassword:signupFormData.confirmPassword,
                email: signupFormData.email,
                contactNo: signupFormData.contactNo,
                role: 'admin'
            });

            setActiveTab('login');

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };


    return (
        <div className="adminLoginContainer">
            <div className="tabPanel">
                <div>
                    <button
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                </div>
                <div>
                    <button
                        className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign-Up
                    </button>
                </div>
            </div>

            <div className="bodyContainer">
                <div className={`tab-pane ${activeTab === 'login' ? 'active' : ''}`} id="pills-login">
                    <form onSubmit={handleSubmitLogin}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    className="loginInput"
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em', marginBottom: '1em'}}
                                    onChange={(e) => handleChangeLogin("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    style={{width: '14em', marginLeft: '2em', marginBottom: '1em'}}
                                    onChange={(e) => handleChangeLogin("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>

                            <CustomizedButton
                                type="submit"
                                hoverBackgroundColor="#2d3ed2"
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
                                    marginTop: '0.625em'
                                }}>
                                Login
                            </CustomizedButton>

                            <div className="text-center">
                                <p>Not a member? <a href="#!" onClick={() => setActiveTab('signup')}>Sign-Up</a></p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </FormControl>
                    </form>
                </div>

                {/*==========================SIGN-UP===================================*/}
                <div className={`tab-pane ${activeTab === 'signup' ? 'active' : ''}`} id="pills-register">
                    <form onSubmit={handleSubmitSignup}>
                        <FormControl fullWidth>
                            <div className="form-outline">
                                <label> Username: </label>
                                <BasicTextField
                                    size="small"
                                    type="text"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeSignUp("username", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline">
                                <label style={{paddingRight: "100px"}}> Email: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    type="email"
                                    onChange={(e) => handleChangeSignUp("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline">
                                <label style={{paddingRight: "60px"}}> Contact No: </label>
                                <BasicTextField
                                    size="small"
                                    id="outlined-required"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    type="text"
                                    onChange={(e) => handleChangeSignUp("contactNo", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label> Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-password"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeSignUp("password", e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    required
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label> Confirm Password: </label>
                                <PasswordField
                                    size="small"
                                    id="outlined-adornment-confirm-password"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => handleChangeSignUp("confirmPassword", e.target.value)}
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
                                Sign Up
                            </CustomizedButton>

                            <div>
                                <p>Already Have an Account? <a href="#!" onClick={() => setActiveTab('login')}>Login</a></p>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
