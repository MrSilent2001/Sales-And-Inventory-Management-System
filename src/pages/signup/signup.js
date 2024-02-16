import React from 'react'
import './signup.css'
import { TextField } from '@mui/material'


 const Signup = () => {
  return (
    <div className='container'>
          <div className='wrapper1'>
                <form action="" >
                    <h1>Sign UP</h1>
                    <div className="input-box">
                    <TextField id="filled-basic" label = 'Username' variant="filled" />
                    </div>
                    <div className="input-box">
                    <TextField id="filled-basic" label = 'email' variant="filled" />
                    </div>
                    <div className="input-box">
                        <input type="tel" placeholder='Contact Number' required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Confirm Password' required />
                    </div>

                    <div className='login'><button type="submit">Sign up</button></div>

                    <div className="register-link">
                        <p>Already Registered- <a href="#"> Log in</a></p>
                    </div>

                </form>
            </div>
    </div>
  )
}

export default Signup;