// import React, { useState } from 'react';
// import "./login.css";
// import TextField from "@mui/material/TextField";
// import { Link, useNavigate } from "react-router-dom";
// import CustomizedButton from "../../../components/Button/button";
// import PasswordField from "../../../components/Form Inputs/passwordField";
// import FormControl from "@mui/material/FormControl";
// import { useAuth } from '../../../context/AuthContext';
//
// const Login = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();
//
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     });
//
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };
//
//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
//
//     const handleChange = (name, value) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { id, role } = await login(formData.username, formData.password);
//
//             // Navigate based on user role
//             if (role === "admin") {
//                 navigate("/adminDashboard");
//             } else if (role === "customer") {
//                 navigate("/customerHome");
//             } else if (role === "supplier") {
//                 navigate("/supplierDashboard");
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//         }
//     };
//
//     return (
//         <div className='MainContainer'>
//             <div className='LeftContainer'>
//                 <h2 className='mainTitle'>TRADEASY</h2>
//                 <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System" className='image' />
//             </div>
//             <div className='RightContainer'>
//                 <div className="loginForm">
//                     <h2 id="login">Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <FormControl fullWidth>
//                             <div className="loginInnerContainer">
//                                 <div className="row">
//                                     <label> Username: </label>
//                                     <TextField
//                                         className="loginInput"
//                                         size="small"
//                                         id="outlined-required"
//                                         label="Username"
//                                         style={{ width: '14em', marginLeft: '2em', marginBottom: '1em' }}
//                                         onChange={(e) => handleChange("username", e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="row">
//                                     <label>Password: </label>
//                                     <PasswordField
//                                         placeholder="Password"
//                                         style={{ width: '14em', marginLeft: '2em', marginBottom: '1em' }}
//                                         onChange={(e) => handleChange("password", e.target.value)}
//                                         showPassword={showPassword}
//                                         handleClickShowPassword={handleClickShowPassword}
//                                         handleMouseDownPassword={handleMouseDownPassword}
//                                     />
//                                 </div>
//                                 <div className="btn-row">
//                                     <CustomizedButton
//                                         type="submit"
//                                         hoverBackgroundColor="#2d3ed2"
//                                         style={{
//                                             color: '#ffffff',
//                                             backgroundColor: '#242F9B',
//                                             width: '11.5em',
//                                             height: '2.75em',
//                                             fontSize: '0.95em',
//                                             fontFamily: 'inter',
//                                             padding: '0.5em 0.625em',
//                                             borderRadius: '0.625em',
//                                             fontWeight: '550',
//                                             border: 'none',
//                                             marginTop: '0.625em'
//                                         }}>
//                                         Login
//                                     </CustomizedButton>
//                                 </div>
//                                 <div>
//                                     <p>Don't you have an Account?
//                                         <Link to="/signup">Sign Up</Link>
//                                     </p>
//                                     <a href="/">Forgot Password?</a>
//                                 </div>
//                             </div>
//                         </FormControl>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Login;

// import React, { useState } from 'react';
// import "./signup.css";
// import TextField from "@mui/material/TextField";
// import {Link} from "react-router-dom";
// import CustomizedButton from "../../../components/Button/button";
// import PasswordField from "../../../components/Form Inputs/passwordField";
// import Validation from '../validation';
// import axios from "axios";
// import FormControl from "@mui/material/FormControl";
// import ComboBox from "../../../components/Form Inputs/comboBox";
// import {Navigate} from "react-router-dom";
//
// function SignUp() {
//     const [navigate, setNavigate] = useState(false);
//
//     const [values, setValues] = useState({
//         username: '',
//         email: '',
//         contactNo: '',
//         password: '',
//         confirmPassword:'',
//         role: ''
//     });
//
//     const [showPassword, setShowPassword] = React.useState(false);
//     const [errors,setErrors] = useState({});
//
//     if(navigate){
//         return <Navigate to="/login"/>
//     }
//
//     const handleChange = (e) => {
//         setValues({ ...values, role: e.target.value });
//     };
//
//
//     const options = [
//         { value: 'admin', label: 'Admin' },
//         { value: 'customer', label: 'Customer' },
//         { value: 'supplier', label: 'Supplier' },
//     ];
//
//     const handleInput = (e) => {
//         setValues({...values, [e.target.name]: e.target.value});
//         console.log(values)
//     }
//
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };
//
//
//
//     const handleValidation = async (e) =>{
//         e.preventDefault();
//
//         const validationErrors = Validation(values);
//         setErrors(validationErrors);
//
//         try {
//             console.log("beforesubmmit", values)
//             const response = await axios.post('http://localhost:9000/auth/signup', {
//                 username: values.username,
//                 password: values.password,
//                 confirmPassword:values.confirmPassword,
//                 email: values.email,
//                 contactNo: values.contactNo,
//                 role: values.role
//             });
//
//             console.log(values.role);
//
//             setNavigate(true);
//
//
//         } catch (error) {
//             // Handle login error
//             console.error('Login error:', error);
//             throw error;
//         }
//     }
//
//     return (
//         <div className='S-MainContainer'>
//
//             <div className='S-LeftContainer'>
//                 <h2 className='mainSignTitle'>TRADEASY</h2>
//                 <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System" className='SystemImage' />
//
//             </div>
//             <div className='S-RightContainer'>
//                 <div className="SignupForm">
//                     <h2 id="Signup">SignUp</h2>
//
//                     <FormControl onSubmit={handleValidation} >
//                         <div className="SignupInnerContainer">
//                             <div className="row">
//                                 <label style={{paddingRight: "70px"}}> Username: </label>
//                                 <TextField
//                                     className="signupInput"
//                                     size="small"
//                                     id="outlined-required"
//                                     label="Username"
//                                     style={{marginBottom:'0.4em'}}
//                                     name="username"
//                                     onChange={handleInput}
//                                 />
//                             </div>
//                             {errors.username && <p className= "displayError" style={{color:"red"}}>{errors.username}</p>}
//
//                             <div className="row">
//                                 <label style={{paddingRight: "100px"}}> Email: </label>
//                                 <TextField
//                                     className="signupInput"
//                                     size="small"
//                                     id="outlined-required"
//                                     label="Email"
//                                     style={{marginBottom:'0.4em'}}
//                                     type="email"
//                                     name="email"
//                                     onChange={handleInput}
//                                 />
//                             </div>
//                             {errors.email && <p className= "displayError" style={{color:"red"}}>{errors.email}</p>}
//
//                             <div className="row">
//                                 <label style={{paddingRight: "60px"}}> Contact No: </label>
//                                 <TextField
//                                     className="signupInput"
//                                     size="small"
//                                     id="outlined-required"
//                                     label="Contact No"
//                                     style={{marginBottom:'0.4em'}}
//                                     type="number"
//                                     name="contactNo"
//                                     onChange={handleInput}
//                                 />
//                             </div>
//                             {errors.contactNo && <p className= "displayError" style={{color:"red"}}>{errors.contactNo}</p>}
//
//                             <div className="row">
//                                 <label style={{paddingRight: "80px"}}>Password: </label>
//                                 <PasswordField
//                                     label="Password"
//                                     placeholder="Password"
//                                     style={{width:'17.25em', marginLeft: '-1.1em',marginBottom:'0'}}
//                                     name="password"
//                                     onChange={handleInput}
//                                     showPassword={showPassword}
//                                     handleClickShowPassword={handleClickShowPassword}
//                                 />
//
//                             </div>
//                             {errors.password && <p  className= "displayError"style={{color:"red"}}>{errors.password}</p>}
//
//
//                             <div className="row">
//                                 <label style={{paddingRight: "50px"}}>Confirm Password: </label>
//                                 <PasswordField
//                                     placeholder="ConfirmPassword"
//                                     style={{width:'17.25em',marginLeft:'-2em',marginBottom:'0'}}
//                                     name="confirmPassword"
//                                     onChange={handleInput}
//                                     showPassword={showPassword}
//                                     handleClickShowPassword={handleClickShowPassword}
//                                 />
//                             </div>
//                             {errors.confirmPassword && <p className= "displayError" style={{color:"red"}}>{errors.confirmPassword}</p>}
//
//                             <div className="row">
//                                 <label style={{paddingRight: "110px",marginBottom:'1em'}}>Role: </label>
//                                 <ComboBox
//                                     className="loginInput"
//                                     onChange={handleChange}
//                                     style={{width: '17.25em'}}
//                                     options={options}
//                                     label="Category"
//                                     size="small"
//                                 />
//                             </div>
//
//                             <div className="btn-row">
//                                 <CustomizedButton
//                                     onClick={handleValidation}
//                                     style={{
//                                         color: '#ffffff',
//                                         backgroundColor: '#242F9B',
//                                         width: '11.5em',
//                                         height: '2.75em',
//                                         fontSize: '0.95em',
//                                         padding: '0.5em 0.625em',
//                                         borderRadius: '0.625em',
//                                         fontWeight: '550',
//                                         border: 'none',
//                                         marginTop: '0.625em',
//                                         hoverBackgroundColor:'#2d3ed2'
//
//                                     }}>
//                                     Sign Up
//                                 </CustomizedButton>
//                             </div>
//
//                             <div>
//                                 <p>Already have an Account?
//                                     <Link to="/login">Login</Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </FormControl>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default SignUp;

import React, { useState } from 'react';
import './login.css';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
        setLoginFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSupplier = (name, value) => {
        setSignupFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

