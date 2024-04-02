import React, {useState} from 'react';
import "./login.css";
import TextField from "@mui/material/TextField";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";
import ComboBox from "../../../components/Form Inputs/comboBox";
// import {useLocation, useNavigate} from "react-router-dom";
// import {useAuth} from "../../services/auth";


const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' },
        { value: 'supplier', label: 'Supplier' },
    ];

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    //const auth = useAuth();
    const location = useLocation();
    const redirectPath = location.state?.path || "/login";

    const handleLogin = () => {
        //auth.login(username);
        navigate(redirectPath, {replace:true});

        if (username === "admin" && password === "12345" && role === "admin") {
            console.log(username+" "+ password+" "+role);
            // Redirect to admin dashboard
            navigate("/salesLanding", { replace: true });
        } else if (username === "customer" && password === "12345" && role === "customer") {
            console.log(username+" "+ password+" "+role);
            // Redirect to customer dashboard
            navigate("/customerHome", { replace: true });
        } else if (username === "supplier" && password === "12345" && role === "supplier") {
            console.log(username+" "+ password+" "+role);
            // Redirect to supplier dashboard
            navigate("/supplierDashboard", { replace: true });
        } else {
            console.log(username+" "+ password+" "+role);
            console.log("Invalid username, password, or role");
    }
}

    return (
        <div className='MainContainer'>
        <div className='LeftContainer'>
            
                <h2 className='mainTitle'>TRADEASY</h2>
            
               
                <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System image" className='image' />
           
            </div>
            <div className='RightContainer'>
                <div className="loginForm">
                    <h2 id="login">Login</h2>
                    <form >
                        <div className="loginInnerContainer">
                            <div className="row">
                                <label> Username: </label>
                                <TextField
                                    className="loginInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="row">
                                <label>Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width: '14em', marginLeft: '2em'}}
                                    onChange={(e) => setPassword(e.target.value)}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
                            </div>


                            <div className="row">
                                <label style={{paddingRight: "50px"}}>Role: </label>
                                <ComboBox
                                    className="loginInput"
                                    value={role}
                                    onChange={handleChange}
                                    style={{width: '14em'}}
                                    options={options}
                                    label="Category"
                                    size="small"
                                />
                            </div>

                            <div className="btn-row">
                                <CustomizedButton
                                    onClick={handleLogin}
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
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default Login;