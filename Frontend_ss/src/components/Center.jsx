import React from 'react'
import CardSwiper from './CardSwiper'

export default function Center() {
  return (
    <>
      <div className='float w-full mr-7 right-0 bg-base-200 px-4 pb-4 rounded-xl'>
        <div>
            <h1 className='text-2xl font-bold py-4'>Recommended Playlists</h1>
            <CardSwiper/>
        </div>
        <div>
        <h1 className='text-2xl font-bold py-4'>Recommended Artists</h1>
            <CardSwiper/>
        </div>
      </div>
    </>
  )
}
