import React, { useEffect, useState } from 'react'
import ListCard from './ListCard'
import Card from './Card';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { app } from '../Firebase';
import Loading from '../assets/Loading.gif';

export default function SideBar() {
    const [songs, setSongs] = useState([]);

    const storage = getStorage(app);
    const firestore = getFirestore(app);

    useEffect(() => {
      async function fetchData() {
        try {
          const allSongsSnapshot = await getDocs(collection(firestore, "songs"));
          const allSongsData = allSongsSnapshot.docs.map(song => song);
          setSongs(allSongsData);
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
      }
      
      fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
    // console.log(songs);
  return (
    <>
        <div className="rounded-lg overflow-x-auto w-[24rem] ml-5">
        <ul className="menu bg-base-200 rounded-box">
            <h1 className='text-xl px-4 py-2 font-bold'>Recommend songs</h1>
            {songs.length > 0? songs.map((song, index) => (
                <ListCard key={index} id={song.id} {...song.data()}/>
            )):<img className='mx-auto h-[5rem] my-auto' src={Loading} />}
        </ul>
        </div>
    </>
  )
}
