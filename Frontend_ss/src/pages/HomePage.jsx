import React from 'react'
import SideBar from '../components/SideBar'
import Center from '../components/Center'

export default function HomePage() {
  return (
    <>
        <div className='mb-4 mt-2 flex'>
            <SideBar/>
            <Center/>
        </div> 
    </>
  )
}
