import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { app } from '../Firebase';
import Loading from '../assets/Loading.gif';


export default function CardSwiper() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

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
            <div className="w-[69.5vw] h-[25rem] carousel rounded-box gap-3">
                {/* Use songs.map() to render Card components */}
                {songs.length > 0? songs.map((song, index) => (
                    // Make sure to return the Card component here
                    <Card key={index} id={song.id} {...song.data()} />
                )):<img className='mx-auto h-[5rem] my-auto' src={Loading} />}
            </div>
        </>
    );
}
