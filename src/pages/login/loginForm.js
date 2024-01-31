import React from 'react'
import "./loginForm.css"

const LoginForm = () => {
    return (
        <div className='container'>
            <div className='wrapper1'>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                    </div>

                    <div className='login'><button type="submit">Log In</button></div>

                    <div className="register-link">
                        <p>Create New Account- <a href="#"> Sign Up</a></p>
                    </div>

                    <div className="remember-forgot">

                        <a href="#"> Forgot Password</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
