import React, {useState} from 'react';
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import {useLocation, useNavigate} from "react-router-dom";
// import {useAuth} from "../../services/auth";

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const navigate = useNavigate();
    //
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // //const auth = useAuth();
    // const location = useLocation();
    // const redirectPath = location.state?.path || "/inventoryLanding";
    //
    // const handleLogin = () => {
    //     //auth.login(username);
    //     navigate(redirectPath, {replace:true});
    // }

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
                                    //onChange={(e) => setUsername(e.target.value)}
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
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                //onChange={(e) => setPassword(e.target.value)}
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
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Category01">Admin</MenuItem>
                                    <MenuItem value="Category02">Customer</MenuItem>
                                    <MenuItem value="Category03">Supplier</MenuItem>
                                </Select>
                            </div>


                            <div className="btn-row">
                                <Button
                                    className="btn"
                                    variant="contained"
                                    //onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </div>

                            <div>
                                <p>Don't you have an Account? <a href="#">Sign Up</a></p>
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;