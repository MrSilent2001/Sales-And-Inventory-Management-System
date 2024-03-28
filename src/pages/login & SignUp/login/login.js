import React, {useState} from 'react';
import "./login.css";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Link, useLocation, useNavigate} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
// import {useLocation, useNavigate} from "react-router-dom";
// import {useAuth} from "../../services/auth";


const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
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
        <div className='loginOuter'>
            <div className='loginInner'>
                <div className="loginForm">
                    <h2 id="login">Login</h2>
                    <form >
                        <div className="login Container">
                            <div className="row">
                                <label> Username: </label>
                                <TextField
                                    className="loginInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="row">
                                <label>Password: </label>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    className="loginInput"
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </div>


                            <div className="row">
                                <label style={{paddingRight: "50px"}}>Role: </label>
                                <Select
                                    className="loginInput"
                                    id="demo-select-small"
                                    size="small"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="supplier">Supplier</MenuItem>
                                </Select>
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
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;