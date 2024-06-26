import React, { useState } from 'react'
import { loginUser, loginWithGoogle } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import search from '../assets/search.png'


export default function LoginPage() {
  const [ email,setEmail ] = useState();
  const [ password,setPassword ] = useState();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
        const userId = await loginWithGoogle();
        console.log('Google sign-up triggered', userId);
        navigate('/');
    } catch (error) {
        // Handle error if Google sign-up fails
        console.error('Google sign-up error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call loginUser function to sign in user
      const userId = await loginUser(email, password);
      // console.log('User logged in with UID:', userId);
      navigate('/');
      // Handle successful login (e.g., redirect to home page)
    } catch (error) {
      // Handle login error (e.g., display error message to user)
      console.error('Login error:', error);
    }
  };

  return (
    <>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-[3rem] z-20">
        <h1 className='mx-auto text-2xl font-bold mt-3'>Login</h1>
              <form onSubmit={handleLogin} className="card-body w-full">
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
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleLogin} className="btn btn-primary">Login</button>
                </div>
              </form>
              <h1 className='mx-auto font-semibold'>OR</h1>
              <div className="px-8 mt-6 mb-4">
                  <button className="bg-white text-black text-xl w-full flex items-center font-semibold rounded-md hover:bg-slate-100" onClick={handleGoogle}><img src={search} className='h-[2rem] px-6 my-2'/>Login with Google</button>
              </div>
            </div> 
    </>
  )
}
