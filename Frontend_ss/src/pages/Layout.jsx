import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SongDashboard from '../components/SongDashboard'
import { useAuth } from '../context/FirebaseContext'

export default function Layout() {
  const { currentUser } = useAuth();
  return (
    <>
        <Navbar/>
        <Outlet/> 
        {/* <Footer/> */}
        {currentUser?<SongDashboard/>:<div></div>}
    </>
  )
}
