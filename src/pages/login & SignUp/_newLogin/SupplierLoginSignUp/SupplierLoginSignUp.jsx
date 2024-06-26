import React from "react";
import * as Components from "../Component";
import "../styles.css";
import LoginAppBar from "../LoginAppbar/LoginAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../../context/AuthContext";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";

const signInSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const signUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contactNo: Yup.string().required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    nic: Yup.string().required("NIC is required"),
    paymentDetails: Yup.string().required("Payment details are required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export function SupplierLoginSignUp() {
    const { supplierLogin } = useAuth();
    const { mode } = useParams();  // This will capture the 'mode' parameter from the URL
    const defaultSignIn = mode === 'signup' ? false : true; // Default to true if mode is not 'signup'
    const [signIn, toggle] = React.useState(defaultSignIn);
    const navigate = useNavigate();

    //Login
    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: signInSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await supplierLogin(values.username, values.password);
                navigate("/supplierHome");
                resetForm();
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    });

    //SignUp
    const signUpFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            contactNo: '',
            address: '',
            nic: '',
            paymentDetails: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post('http://localhost:9000/auth/signup', {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    contactNo: values.contactNo,
                    address: values.address,
                    nic: values.nic,
                    paymentDetails: values.paymentDetails,
                    role: 'supplier'
                });
                resetForm();
            } catch (error) {
                console.error('Sign up error:', error);
            }
        }
    });

    React.useEffect(() => {
        // This effect updates the signIn state if the URL parameter changes
        toggle(defaultSignIn);
    }, [mode, defaultSignIn]);


    return (
        <>
            <LoginAppBar />
            <div className="login-signup-page-container">
                <Components.Container>
                    <Components.SignUpContainer signingIn={signIn}>
                        <Components.Form onSubmit={signUpFormik.handleSubmit}>
                            <Components.Title>Create Supplier Account</Components.Title>
                            <Components.Input
                                type="text"
                                placeholder="Username"
                                {...signUpFormik.getFieldProps("username")}
                            />
                            {signUpFormik.touched.username && signUpFormik.errors.username ? (
                                <div className="error-message">{signUpFormik.errors.username}</div>
                            ) : null}
                            <Components.Input
                                type="email"
                                placeholder="Email"
                                {...signUpFormik.getFieldProps("email")}
                            />
                            {signUpFormik.touched.email && signUpFormik.errors.email ? (
                                <div className="error-message">{signUpFormik.errors.email}</div>
                            ) : null}
                            <Components.Input
                                type="number"
                                placeholder="Contact No"
                                {...signUpFormik.getFieldProps("contactNo")}
                            />
                            {signUpFormik.touched.contactNo && signUpFormik.errors.contactNo ? (
                                <div className="error-message">{signUpFormik.errors.contactNo}</div>
                            ) : null}
                            <Components.Input
                                type="text"
                                placeholder="Address"
                                {...signUpFormik.getFieldProps("address")}
                            />
                            {signUpFormik.touched.address && signUpFormik.errors.address ? (
                                <div className="error-message">{signUpFormik.errors.address}</div>
                            ) : null}
                            <Components.Input
                                type="number"
                                placeholder="NIC"
                                {...signUpFormik.getFieldProps("nic")}
                            />
                            {signUpFormik.touched.nic && signUpFormik.errors.nic ? (
                                <div className="error-message">{signUpFormik.errors.nic}</div>
                            ) : null}
                            <Components.Input
                                type="text"
                                placeholder="Payment Details"
                                {...signUpFormik.getFieldProps("paymentDetails")}
                            />
                            {signUpFormik.touched.paymentDetails && signUpFormik.errors.paymentDetails ? (
                                <div className="error-message">{signUpFormik.errors.paymentDetails}</div>
                            ) : null}
                            <Components.Input
                                type="password"
                                placeholder="Password"
                                {...signUpFormik.getFieldProps("password")}
                            />
                            {signUpFormik.touched.password && signUpFormik.errors.password ? (
                                <div className="error-message">{signUpFormik.errors.password}</div>
                            ) : null}
                            <Components.Input
                                type="password"
                                placeholder="Confirm-Password"
                                {...signUpFormik.getFieldProps("confirmPassword")}
                            />
                            {signUpFormik.touched.confirmPassword && signUpFormik.errors.confirmPassword ? (
                                <div className="error-message">{signUpFormik.errors.confirmPassword}</div>
                            ) : null}
                            <Components.Button type="submit">
                                Sign Up
                            </Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>
                    <Components.SignInContainer signingIn={signIn}>
                        <Components.Form onSubmit={loginFormik.handleSubmit}>
                            <Components.Title>Sign in as Supplier</Components.Title>
                            <Components.Input
                                type="text"
                                placeholder="Username"
                                {...loginFormik.getFieldProps("username")}
                            />
                            {loginFormik.touched.username && loginFormik.errors.username ? (
                                <div className="error-message">{loginFormik.errors.username}</div>
                            ) : null}
                            <Components.Input
                                type="password"
                                placeholder="Password"
                                {...loginFormik.getFieldProps("password")}
                            />
                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                <div className="error-message">{loginFormik.errors.password}</div>
                            ) : null}
                            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                            <Components.Button type="submit">
                                Sign In
                            </Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>
                    <Components.OverlayContainer signingIn={signIn}>
                        <Components.Overlay signingIn={signIn}>
                            <Components.LeftOverlayPanel signingIn={signIn}>
                                <Components.Title>Already have an account?</Components.Title>
                                <Components.Paragraph>
                                    then click signup Sign In button to Login
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>
                            <Components.RightOverlayPanel signingIn={signIn}>
                                <Components.Title>Don't have an account?</Components.Title>
                                <Components.Paragraph>
                                    Then click Sign Up button to Sign Up
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
        </>
    );
}
