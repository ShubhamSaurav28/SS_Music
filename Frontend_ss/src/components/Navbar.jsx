import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FirebaseContext';
import { logoutUser } from '../Firebase';
import userimg from '../assets/userimg.png';


export default function Navbar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { currentUser } = useAuth()

    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      if(currentUser){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [currentUser]);
  
    const handleLogout = async () => {
      try {
        await logoutUser();
        navigate('/')
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    
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
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/upload'>Upload Song</Link></li>
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
        {
          isLoggedIn ? (<>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" m-1"><div className="avatar">
            <div className="w-[3rem] rounded-full">
              <img src={currentUser.photoURL?currentUser.photoURL:userimg} />
            </div>
          </div></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-1">
              <li><Link to='/profile' className='p-2'>Profile</Link></li>
              <li><a className='p-2' onClick={handleLogout} >Logout</a></li>
            </ul>
          </div>
            </>
        ) : ( <><Link to='/login'>
        <button className="btn btn-outline">Login</button>
        </Link>
        <Link to='/signup'>
        <button className="btn btn-outline">SignUp</button>
        </Link></>)
        }
          </div>
      </div>
    </>
  )
}
