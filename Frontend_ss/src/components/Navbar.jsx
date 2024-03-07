import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle the dropdown state
    const toggleDropdown = () => {
      setIsDropdownOpen(prevState => !prevState);
    };
  
    // Function to close the dropdown when clicked outside
    const handleOutsideClick = (event) => {
      if (event.target.closest('.navbar-start') === null) {
        setIsDropdownOpen(false);
      }
    };
  
    // Add event listener to close dropdown on outside click
    // This will be executed only once when the component mounts
    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);
  
  return (
    <>
      <div className="navbar bg-base-100 relative">
        <div className="navbar-start">
            <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <label htmlFor="my-drawer-4" className="drawer-button btn  btn-circle mx-2"><svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg></label>
            <div className="drawer-side z-20">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center relative">
          <Link to='/' className="font-bold text-3xl cursor-pointer text-gradient">SS Music</Link>
        </div>
        <div className="navbar-end flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">Filter</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[7rem]">
            <li><a>Songs</a></li>
            <li><a>Artist</a></li>
            <li><a>Playlist</a></li>
          </ul>
        </div>
        <Link to='/login'>
        <button className="btn btn-outline">Login</button>
        </Link>
        <Link to='/signup'>
        <button className="btn btn-outline">SignUp</button>
        </Link>
          {/* <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div> */}
          </div>
      </div>
    </>
  )
}
