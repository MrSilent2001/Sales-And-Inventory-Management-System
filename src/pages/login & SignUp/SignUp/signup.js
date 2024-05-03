import React, { useState } from 'react';
import "./signup.css";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";
import Validation from './validation';
 
function SignUp() {

const [values, setValues] = useState({
    username: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword:''
});

const [errors,setErrors] = useState({});

const handleInput = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
}


    const handleValidation = (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            console.log("Form submitted successfully!");
        } else {
            console.log("Form validation failed!");
        }
    };

    return (
        <div className='S-MainContainer'>

        <div className='S-LeftContainer'>
        <h2 className='mainSignTitle'>TRADEASY</h2>
        <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System" className='SystemImage' />

            </div>
            <div className='S-RightContainer'>
                <div className="SignupForm">
                    <h2 id="Signup">SignUp</h2>
                {/*{Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in Successfully!</div>
                ): (
                    <pre>{JSON.stringify(formValues,undefined,2)}</pre>  
                )}*/}
                    
                    <form onSubmit={handleValidation}>
                        <div className="SignupInnerContainer">
                            <div className="row">
                                <label style={{paddingRight: "60px"}}> Username: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    name="username"
                                    onChange={handleInput}
                                />
                                {errors.username && <p style={{color:"red"}}>{errors.username}</p>}
                            </div>
                            

                            <div className="row">
                                <label style={{paddingRight: "90px"}}> Email: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                />
                                {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
                            </div>
                            

                            <div className="row">
                                <label style={{paddingRight: "50px"}}> Contact No: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Contact No"
                                    type="number"
                                    name="contactNo"
                                    onChange={handleInput}
                                />
                                {errors.contactNo && <p style={{color:"red"}}>{errors.contactNo}</p>}
                            </div>
                            

                            <div className="row">
                                <label>Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                    name="password" 
                                    onChange={handleInput}
                                />
                                {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                            </div>
                            


                            <div className="row">
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="ConfirmPassword"
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                    name="confirmPassword"
                                    onChange={handleInput}
                                />
                                {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword}</p>}
                            </div>
                            
                            <div className="btn-row">
                                <CustomizedButton
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
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;