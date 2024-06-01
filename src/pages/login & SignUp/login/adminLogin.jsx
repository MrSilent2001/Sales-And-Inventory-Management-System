import React, { useState } from 'react';
import './adminLogin.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BasicTextField from "../../../components/Form Inputs/textfield";
import PasswordField from "../../../components/Form Inputs/passwordField";
import CustomizedButton from "../../../components/Button/button";
import FormControl from "@mui/material/FormControl";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
});

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    contactNo: Yup.string()
        .required('Contact number is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
});

function AdminLogin() {
    const { adminLogin } = useAuth();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitLogin = async (values, { setSubmitting }) => {
        console.log(values);
        try {
            const response = await adminLogin(values.username, values.password);
            navigate("/adminDashboard");
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitSignup = async (values, { setSubmitting }) => {
        console.log(values);
        try {
            await axios.post('http://localhost:9000/auth/signup', {
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
                email: values.email,
                contactNo: values.contactNo,
                role: 'admin'
            });
            setActiveTab('login');
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="adminLoginContainer">
            <div className="tabPanel">
                <div>
                    <CustomizedButton
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                        style={{
                            width: '7.5em',
                            padding: '1.25em 1em',
                            marginRight: '1em',
                            backgroundColor: activeTab === 'login' ? '#007bff' : 'transparent',
                            color: activeTab === 'login' ? '#ffffff' : '#007bff',
                            border: '1px solid #007bff'
                        }}
                    >
                        Login
                    </CustomizedButton>
                </div>
                <div>
                    <CustomizedButton
                        className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                        style={{
                            width: '7.5em',
                            padding: '1.25em 1em',
                            marginLeft: '1em',
                            backgroundColor: activeTab === 'signup' ? '#007bff' : 'transparent',
                            color: activeTab === 'signup' ? '#007bff' : '#ffffff',
                            border: '1px solid #007bff'
                        }}
                    >
                        Sign Up
                    </CustomizedButton>
                </div>
            </div>

            <div className="bodyContainer">
                <div className={`tab-pane ${activeTab === 'login' ? 'active' : ''}`} id="pills-login">
                    <div className="adminForm">
                        <Formik
                            initialValues={{username: '', password: ''}}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmitLogin}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <FormControl fullWidth>
                                        <div className="form-outline">
                                            <label>Username:</label>
                                            <Field
                                                name="username"
                                                as={BasicTextField}
                                                size="small"
                                                type="text"
                                                className="loginInput"
                                            />
                                        </div>
                                        <ErrorMessage name="username" component="div" className="error-message"/>

                                        <div className="form-outline">
                                            <label>Password:</label>
                                            <Field
                                                name="password"
                                                style={{width: '17.25em', marginLeft: '-1.75em', height: '2em'}}
                                                as={PasswordField}
                                                size="small"
                                                showPassword={showPassword}
                                                handleClickShowPassword={handleClickShowPassword}
                                                handleMouseDownPassword={handleMouseDownPassword}
                                            />
                                        </div>
                                        <ErrorMessage name="password" component="div" className="error-message"/>

                                        <div className="buttonContainer">
                                            <CustomizedButton
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
                                                }}
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Login
                                            </CustomizedButton>
                                        </div>

                                        <div className="text-center">
                                            <p>Not a member? <a href="" onClick={() => setActiveTab('signup')}>Sign-Up</a>
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <a href="">Forgot password?</a>
                                        </div>
                                    </FormControl>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                <div className={`tab-pane ${activeTab === 'signup' ? 'active' : ''}`} id="pills-register">
                    <Formik
                        initialValues={{username: '', email: '', contactNo: '', password: '', confirmPassword: ''}}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmitSignup}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <FormControl fullWidth>
                                    <div className="form-outline">
                                        <label>Username:</label>
                                        <Field
                                            name="username"
                                            as={BasicTextField}
                                            size="small"
                                            type="text"
                                        />
                                    </div>
                                    <ErrorMessage name="username" component="div" className="error-message"/>

                                    <div className="form-outline">
                                        <label>Email:</label>
                                        <Field
                                            name="email"
                                            as={BasicTextField}
                                            size="small"
                                            type="email"
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="error-message"/>

                                    <div className="form-outline">
                                        <label>Contact No:</label>
                                        <Field
                                            name="contactNo"
                                            as={BasicTextField}
                                            size="small"
                                            type="text"
                                        />
                                    </div>
                                    <ErrorMessage name="contactNo" component="div" className="error-message"/>

                                    <div className="form-outline">
                                        <label>Password:</label>
                                        <Field
                                            name="password"
                                            style={{width: '17.25em', marginLeft: '-1.75em', height: '2em'}}
                                            as={PasswordField}
                                            size="small"
                                            showPassword={showPassword}
                                            handleClickShowPassword={handleClickShowPassword}
                                            handleMouseDownPassword={handleMouseDownPassword}
                                        />
                                    </div>
                                    <ErrorMessage name="password" component="div" className="error-message"/>

                                    <div className="form-outline">
                                        <label>Confirm Password:</label>
                                        <Field
                                            name="confirmPassword"
                                            style={{width: '17.25em', marginLeft: '-1.75em', height: '2em'}}
                                            as={PasswordField}
                                            size="small"
                                            showPassword={showPassword}
                                            handleClickShowPassword={handleClickShowPassword}
                                            handleMouseDownPassword={handleMouseDownPassword}
                                        />
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message"/>

                                    <div className="buttonContainer">
                                        <CustomizedButton
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
                                            }}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Sign Up
                                        </CustomizedButton>
                                    </div>

                                    <div className="text-center">
                                        <p>Already Have an Account? <a href=""
                                                                       onClick={() => setActiveTab('login')}>Login</a>
                                        </p>
                                    </div>
                                </FormControl>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
