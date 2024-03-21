import React from 'react'
import Card from '../components/Card'

export default function SearchedPage({searchResults}) {
  return (
    <div className='w-[90vw] mx-auto flex flex-wrap gap-5 mt-5'>
        {searchResults ? searchResults.map((song, index) => (
            // Make sure to return the Card component here
            <Card key={index} id={song.id} {...song.data()} />
        )):<img className='mx-auto h-[5rem] my-auto' src={Loading} />}
    </div>
  )
}
