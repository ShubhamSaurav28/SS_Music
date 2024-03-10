import React, { useState } from 'react';
import { signUpUser } from '../Firebase';
import { useNavigate } from 'react-router-dom';


export default function SignUpPage() {
    const [ username,setUsername ] = useState();
    const [ email,setEmail ] = useState();
    const [ password,setPassword ] = useState();
    const [ confirmpassword,setConfirmpassword ] = useState();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();
      if(confirmpassword==password){
        try {
        // Call signUpUser function to create user account
        const userId = await signUpUser(username, email, password);
        console.log('User signed up with UID:', userId);
        navigate('/');
        // Handle successful sign-up (e.g., redirect to home page)
      } catch (error) {
        // Handle sign-up error (e.g., display error message to user)
        console.error('Sign-up error:', error);
      }
      }
      else{
        console.error('Password mismatch');
      }
    };

  return (
    <>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-[4rem] z-20">
            <h1 className='mx-auto text-2xl font-bold mt-3'>Sign Up</h1>
              <form onSubmit={handleSignUp} className="card-body w-full">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input value={username} onChange={(e)=>setUsername(e.target.value)} type="name" placeholder="username" className="input input-bordered" required maxLength={5}/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} type="password" placeholder="confirm password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleSignUp} className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div> 
    </>
  )
}
