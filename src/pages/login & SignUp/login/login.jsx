import React, { useState } from 'react';
import "./login.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id, role } = await login(formData.username, formData.password);

            // Navigate based on user role
            if (role === "admin") {
                navigate("/adminDashboard");
            } else if (role === "customer") {
                navigate("/customerHome");
            } else if (role === "supplier") {
                navigate("/supplierDashboard");
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='MainContainer'>
            <div className='LeftContainer'>
                <h2 className='mainTitle'>TRADEASY</h2>
                <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System" className='image' />
            </div>
            <div className='RightContainer'>
                <div className="loginForm">
                    <h2 id="login">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <div className="loginInnerContainer">
                                <div className="row">
                                    <label> Username: </label>
                                    <TextField
                                        className="loginInput"
                                        size="small"
                                        id="outlined-required"
                                        label="Username"
                                        style={{ width: '14em', marginLeft: '2em', marginBottom: '1em' }}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <label>Password: </label>
                                    <PasswordField
                                        placeholder="Password"
                                        style={{ width: '14em', marginLeft: '2em', marginBottom: '1em' }}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        showPassword={showPassword}
                                        handleClickShowPassword={handleClickShowPassword}
                                        handleMouseDownPassword={handleMouseDownPassword}
                                    />
                                </div>
                                <div className="btn-row">
                                    <CustomizedButton
                                        type="submit"
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            width: '11.5em',
                                            height: '2.75em',
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.625em',
                                            fontWeight: '550',
                                            border: 'none',
                                            marginTop: '0.625em'
                                        }}>
                                        Login
                                    </CustomizedButton>
                                </div>
                                <div>
                                    <p>Don't you have an Account?
                                        <Link to="/signup">Sign Up</Link>
                                    </p>
                                    <a href="/">Forgot Password?</a>
                                </div>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;