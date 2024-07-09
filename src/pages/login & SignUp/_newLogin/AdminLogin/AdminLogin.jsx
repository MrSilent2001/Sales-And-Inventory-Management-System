import React, { useState } from "react";
import * as Components from "../Component";
import LoginImage from "./Image.jpg"; // Ensure the path is correct
import "../styles.css";
import LoginAppBar from "../LoginAppbar/LoginAppBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../../../components/Form Inputs/passwordField";
import CustomizedAlert from "../../../../components/Alert/alert";

// Validation schema for sign-in
const signInSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

export function AdminLogin() {
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => setOpenSuccess(true);
    const handleClickError = () => setOpenError(true);
    const handleCloseSuccess = () => setOpenSuccess(false);
    const handleCloseError = () => setOpenError(false);

    // Login
    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: signInSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await adminLogin(values.username, values.password);
                navigate("/adminDashboard");
                resetForm();
            } catch (error) {
                console.error('Login error:', error);
                // Display error message to user
                handleClickError();
            }
        }
    });


    return (
        <>
            <LoginAppBar />
            <div className="login-signup-page-container">
                <Components.Container>
                    <Components.SignInContainer signingIn>
                        <Components.Form onSubmit={loginFormik.handleSubmit}>
                            <Components.Title>Sign in as Admin</Components.Title>
                            <Components.Input
                                className="input-field"
                                type="text"
                                placeholder="Username"
                                {...loginFormik.getFieldProps("username")}
                            />
                            {loginFormik.touched.username && loginFormik.errors.username ? (
                                <div className="error-message">{loginFormik.errors.username}</div>
                            ) : null}
                            <PasswordInput
                                className="input-field"
                                placeholder="Password"
                                {...loginFormik.getFieldProps('password')}
                            />
                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                <div className="error-message">{loginFormik.errors.password}</div>
                            ) : null}
                            <Components.Button type="submit">
                                Sign In
                            </Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="right-overlay-panel">
                                <img src={LoginImage} alt="Login" style={{
                                    width: "40%",
                                    height: "auto",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: "10%",
                                    left: "55%",
                                }}/>
                            </div>
                        </div>
                    </div>
                </Components.Container>
            </div>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="You've signed-up Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Login failed. Please check your credentials."
            />
        </>
    );
}
