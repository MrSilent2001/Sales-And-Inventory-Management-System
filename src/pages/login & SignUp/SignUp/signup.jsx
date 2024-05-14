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
import {Navigate} from "react-router-dom";

function SignUp() {
    const [navigate, setNavigate] = useState(false);

    const [values, setValues] = useState({
        username: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword:'',
        role: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [errors,setErrors] = useState({});

    if(navigate){
        return <Navigate to="/login"/>
    }

    const handleChange = (e) => {
        setValues({ ...values, role: e.target.value });
    };


    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' },
        { value: 'supplier', label: 'Supplier' },
    ];

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        console.log(values)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    

    const handleValidation = async (e) =>{
        e.preventDefault();

        const validationErrors = Validation(values);
        setErrors(validationErrors);

        try {
            console.log("beforesubmmit", values)
            const response = await axios.post('http://localhost:9000/auth/signup', {
                username: values.username,
                password: values.password,
                confirmPassword:values.confirmPassword,
                email: values.email,
                contactNo: values.contactNo,
                role: values.role
            });

            console.log(values.role);

            setNavigate(true);


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

                    <FormControl onSubmit={handleValidation} >
                        <div className="SignupInnerContainer">
                            <div className="row">
                                <label style={{paddingRight: "70px"}}> Username: </label>
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
                                <label style={{paddingRight: "100px"}}> Email: </label>
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
                                <label style={{paddingRight: "60px"}}> Contact No: </label>
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
                                <label style={{paddingRight: "80px"}}>Password: </label>
                                <PasswordField
                                    label="Password"
                                    placeholder="Password"
                                    style={{width:'17.25em', marginLeft: '-1.1em',marginBottom:'0'}}
                                    name="password"
                                    onChange={handleInput}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                />

                            </div>
                            {errors.password && <p  className= "displayError"style={{color:"red"}}>{errors.password}</p>}


                            <div className="row">
                                <label style={{paddingRight: "50px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="ConfirmPassword"
                                    style={{width:'17.25em',marginLeft:'-2em',marginBottom:'0'}}
                                    name="confirmPassword"
                                    onChange={handleInput}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                />

                            </div>
                            {errors.confirmPassword && <p className= "displayError" style={{color:"red"}}>{errors.confirmPassword}</p>}

                            <div className="row">
                                <label style={{paddingRight: "110px",marginBottom:'1em'}}>Role: </label>
                                <ComboBox
                                    className="loginInput"
                                    onChange={handleChange}
                                    style={{width: '17.25em'}}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>

                            <div className="btn-row">
                                <CustomizedButton
                                    onClick={handleValidation}
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