import React, { useState } from 'react';
import "./signup.css";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";
import Validation from '../validation';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import ComboBox from "../../../components/Form Inputs/comboBox";

function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contactNo: '',
        password: '',
        role: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [errors,setErrors] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, role: event.target.value });
    };


    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' },
        { value: 'supplier', label: 'Supplier' },
    ];

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // const handleValidation = (e) => {
    //     const validationErrors = Validation(formData);
    //     setErrors(validationErrors);
    //     if (Object.keys(validationErrors).length === 0) {
    //         // Proceed with form submission
    //         console.log("Form submitted successfully!");
    //     } else {
    //         console.log("Form validation failed!");
    //     }
    // };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/auth/signup', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                contactNo: formData.contactNo,
                role: formData.role
            });

            console.log(formData.role);

            navigate("/login");


        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            throw error;
        }
    }

    return (
        <div className='S-MainContainer'>

            <div className='S-LeftContainer'>
                <h2 className='mainSignTitle'>TRADEASY</h2>
                <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System" className='SystemImage' />

            </div>
            <div className='S-RightContainer'>
                <div className="SignupForm">
                    <h2 id="Signup">SignUp</h2>

                    <FormControl onSubmit={handleSubmit} >
                        <div className="SignupInnerContainer">
                            <div className="row">
                                <label style={{paddingRight: "60px"}}> Username: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    style={{marginBottom:'0.4em'}}
                                    name="username"
                                    onChange={handleInput}
                                />
                            </div>
                            {errors.username && <p className= "displayError" style={{color:"red"}}>{errors.username}</p>}

                            <div className="row">
                                <label style={{paddingRight: "90px"}}> Email: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Email"
                                    style={{marginBottom:'0.4em'}}
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                />
                            </div>
                            {errors.email && <p className= "displayError" style={{color:"red"}}>{errors.email}</p>}

                            <div className="row">
                                <label style={{paddingRight: "50px"}}> Contact No: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Contact No"
                                    style={{marginBottom:'0.4em'}}
                                    type="number"
                                    name="contactNo"
                                    onChange={handleInput}
                                />
                            </div>
                            {errors.contactNo && <p className= "displayError" style={{color:"red"}}>{errors.contactNo}</p>}

                            <div className="row">
                                <label>Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'15.25em', marginLeft: '0.85em',marginBottom:'0'}}
                                    name="password"
                                    onChange={handleInput}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                />

                            </div>
                            {errors.password && <p  className= "displayError"style={{color:"red"}}>{errors.password}</p>}


                            <div className="row">
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="ConfirmPassword"
                                    style={{width:'15.25em', marginLeft: '0.85em',marginBottom:'0'}}
                                    name="confirmPassword"
                                    onChange={handleInput}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                />

                            </div>
                            {errors.confirmPassword && <p className= "displayError" style={{color:"red"}}>{errors.confirmPassword}</p>}

                            <div className="row">
                                <label style={{paddingRight: "50px",marginBottom:'1em'}}>Role: </label>
                                <ComboBox
                                    className="loginInput"
                                    onChange={handleChange}
                                    style={{width: '14em'}}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>

                            <div className="btn-row">
                                <CustomizedButton
                                    onClick={handleSubmit}
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
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        hoverBackgroundColor:'#2d3ed2'
                                    }}>
                                    Sign Up
                                </CustomizedButton>
                            </div>

                            <div>
                                <p>Already have an Account?
                                    <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default SignUp;