import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FirebaseContext';
import { logoutUser } from '../Firebase';
import userimg from '../assets/userimg.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest('.navbar-start') === null) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 relative flex justify-between items-center">
      <div className="navbar-start">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle mx-2">
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
          <div className="drawer-side z-20">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/upload">Upload Song</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="font-bold text-3xl cursor-pointer text-gradient">
          SS Music
        </Link>
      </div>
      <div className="navbar-end flex items-center">
        <div className="form-control hidden md:block">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-hover hidden md:block">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter
          </div>
          <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-24 md:w-auto">
            <li>
              <a>Songs</a>
            </li>
            <li>
              <a>Artist</a>
            </li>
            <li>
              <a>Playlist</a>
            </li>
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <div className="avatar">
                <div className="w-[3rem] rounded-full">
                  <img src={currentUser ? (currentUser.photoURL ? currentUser.photoURL : userimg) : userimg} alt="User Avatar" />
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-36 md:w-52 gap-1">
              <li>
                <Link to="/profile" className="p-2">
                  Profile
                </Link>
              </li>
              <li>
                <a className="p-2" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline">SignUp</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
