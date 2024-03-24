import React, {useState} from 'react';
import "./signup.css";
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
import {Link} from "react-router-dom";


const SignUpButtons = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '11em',
        height: '2em'
    },
    fontSize: '0.95em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em',
   
}));


// import {useLocation, useNavigate} from "react-router-dom";
// import {useAuth} from "../../services/auth";

const SignUp = () => {

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
        <div className='signupOuter'>
            <div className='signupInner'>
                <div className="signupForm">
                    <h2 id="signup">SignUp</h2>
                    <form >
                        <div className="signup Container">
                            <div className="row">
                                <label style={{paddingRight: "60px"}}> Username: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Username"
                                    //onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>



                            <div className="row">
                                <label style={{paddingRight: "90px"}}> Email: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Email"
                                    type="email"
                                    //onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>


                            <div className="row">
                                <label style={{paddingRight: "50px"}}> Contact No: </label>
                                <TextField
                                    className="signupInput"
                                    size="small"
                                    id="outlined-required"
                                    label="Contact No"
                                    type="number"
                                    //onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="row">
                                <label style={{paddingRight: "65px"}}>Password: </label>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    className="signupInput"
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
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    label="confirmPassword"
                                    className="signupInput"
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


                            <div className="btn-row">
                                <SignUpButtons>
                                    SignUp
                                </SignUpButtons>
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