import React, { useState, useEffect } from 'react';
import "./signup.css";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";

 
const SignUp = () => {

const [formValues,setFormValues] = useState({});
const [formErrors, setFormErrors] = useState({});
//const [isSubmit, setIsSubmit] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};


const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
   // setIsSubmit(true);
};

/*useEffect(() => {
    console.log(formErrors);
   if(Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(formValues);
   }
},[formErrors, formValues, isSubmit]);    */

const validate = (values) =>{
  const errors = {};
  const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern= /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/;
  const contactNo_pattern =  /^\d{10}$/;

  if (!values.username){
     errors.username="Username is required!";
  }

  if (!values.email){
    errors.email="Email is required!";
 } else if(!email_pattern.test(values.email)) {
    errors.email="This is not valid email format!";
 }

 if (!values.contactNo){
    errors.contactNo="Contact No is required!";
 } else if(!contactNo_pattern.test(values.contactNo)) {
    errors.contactNo="This is not valid email format!";
 } else if(isNaN(values.contactNo)) {
    errors.contactNo="This is not a valid contact number!";
 }


 if (!values.Password){
    errors.Password="Password is required!";
 } else if(!password_pattern.test(values.password.length)) {
    errors.password="Password is not!";
 } else if(values.password.length < 6) {
    errors.Password="Password must be more than 6 characters";
 } else if(values.password.length > 8) {
    errors.Password="Password cannot exceed more than 8 characters";
 }


 if (!values.confirmPassword){
    errors.confirmPassword="Confirm Password is required!";
 } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match!";
}
  return errors;
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

            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">Signed in Successfully!</div>
            ): (
                <pre>{JSON.stringify(formValues,undefined,2)}</pre>  
            )} */}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="SignupInnerContainer">
                            <div className="row">
                                <label style={{paddingRight: "60px"}}> Username: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    required
                                    value={formValues.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{ formErrors.username}</p>


                            <div className="row">
                                <label style={{paddingRight: "90px"}}> Email: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Email"
                                    type="email"
                                    required
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{ formErrors.email}</p>

                            <div className="row">
                                <label style={{paddingRight: "50px"}}> Contact No: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Contact No"
                                    type="number"
                                    required
                                    value={formValues.contactNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{ formErrors.contactNo}</p>

                            <div className="row">
                                <label>Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                   /* showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword} */
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{ formErrors.password}</p>


                            <div className="row">
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                   /* showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword} */
                                    value={formValues.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{ formErrors.confirmPassword}</p>


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