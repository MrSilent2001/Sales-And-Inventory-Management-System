import React from 'react';
import "./signup.css";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";

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
                                <label>Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'16.85em', marginLeft: '-0.95em'}}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
                            </div>


                            <div className="row">
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'16.85em', marginLeft: '-0.95em'}}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
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