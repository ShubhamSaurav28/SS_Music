import React from 'react'
import { useAuth } from '../context/FirebaseContext';
import userimg from '../assets/userimg.png'


export default function ProfilePage() {
    const { currentUser } = useAuth();
    console.log(currentUser)
    const nulled = 'Null';
  return (
    <>
      <div className="mt-8 w-[80%] mx-auto">
  <div className="flex-col">
    <img src={currentUser.photoURL?currentUser.photoURL:userimg} className="w-[10rem] rounded-lg shadow-2xl" alt='No image found' />
    <div className='mt-3'>
      <h1 className="text-4xl font-bold">Name: {currentUser.displayName}</h1>
      <h1 className="text-2xl font-semibold mt-2">Email: {currentUser.email}</h1>
      <h1 className="text-2xl font-semibold mt-2">Phone: {currentUser.phoneNumber? currentUser.phoneNumber:nulled}</h1>
      <button className="mt-3 btn btn-info px-7 text-xl">Edit</button>
    </div>
  </div>
</div>
    </>
  )
}
