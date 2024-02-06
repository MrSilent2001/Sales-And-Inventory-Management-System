import React from 'react'
import './signup.css'

 const Signup = () => {
  return (
    <div className='container'>
          <div className='wrapper1'>
                <form action="" method="post">
                    <h1>Sign UP</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required />
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

                    <div className='login'><button type="submit">Log In</button></div>

                    <div className="register-link">
                        <p>Already Registered- <a href="#"> Log in</a></p>
                    </div>

                </form>
            </div>
    </div>
  )
}

export default Signup;