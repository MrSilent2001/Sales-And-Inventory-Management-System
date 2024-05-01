import React from 'react';
import "./signup.css";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../components/Button/button";
import PasswordField from "../../../components/Form Inputs/passwordField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import {useLocation, useNavigate} from "react-router-dom";
// import {useAuth} from "../../services/auth";

const Notify=() =>  toast("SignUP is SUCCESSFUL!");


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
        
        <div className='S-MainContainer'>

        <div className='S-LeftContainer'>
        <h2 className='mainSignTitle'>TRADEASY</h2>
        <img src="https://miro.medium.com/v2/resize:fit:740/1*PZK0jq9cUFpgRLZcs_aqwg.jpeg" alt="System image" className='SystemImage' />

            </div>
            <div className='S-RightContainer'>
                <div className="SignupForm">
                    <h2 id="Signup">SignUp</h2>
                    <form >
                        <div className="SignupInnerContainer">
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
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
                            </div>


                            <div className="row">
                                <label style={{paddingRight: "5px"}}>Confirm Password: </label>
                                <PasswordField
                                    placeholder="Password"
                                    style={{width:'15.25em', marginLeft: '1em'}}
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
                            </div>


                            <div className="btn-row">
                                <CustomizedButton onClick={Notify}
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
                                        marginLeft:'5.5em',
                                    }}>
                                    Sign Up
                                </CustomizedButton>
                                <ToastContainer
                                  position="top-center"
                                  autoClose={5000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="dark"
                                  
                                />
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