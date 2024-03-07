import React from 'react'

export default function SignUpPage() {
  return (
    <>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-[4rem] z-20">
            <h1 className='mx-auto text-2xl font-bold mt-3'>Sign Up</h1>
              <form className="card-body w-full">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input type="name" placeholder="username" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input type="password" placeholder="confirm password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div> 
    </>
  )
}
