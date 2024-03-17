import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../Firebase';
import Loading from '../assets/Loading.gif';
import Play from '../assets/play.png';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useAuth } from '../context/FirebaseContext';

export default function SongPage() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const [imgURL, setImageURL] = useState(null);
  const [songURL, setSongURL] = useState(null); // State to store the song URL

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  const getimageURL = async (path) => {
    return await getDownloadURL(ref(storage, path))
  }

  const { currentUser } = useAuth();

  const { firstPlay } = useAudioPlayer();

  const handlePlay = () => {
    if(currentUser){
      if (songURL) {
        firstPlay(songURL,song,imgURL); // Pass the song URL to playSong function
      } else {
        console.error("Song URL is not available.");
      }
    }
    else{
      alert("Please Login to listen to songs")
    }
    
  };

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const docRef = doc(firestore, 'songs', songId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const songData = docSnap.data();
          setSong(songData);

          const imageURL = await getimageURL(songData.imageURL);
          setImageURL(imageURL);

          // Fetch song URL from Firebase Storage
          const songURL = await getDownloadURL(ref(storage, songData.songURL));
          setSongURL(songURL);
          console.log(songURL);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };

    fetchSongData();
  }, [songId]); // Ensure useEffect runs whenever songId changes

  if (!song) {
    return <img className='mx-auto h-[7rem] my-[25vh]' src={Loading} />;
  }

  return (
    <div>
      <div className='flex h-[full]'>
        {imgURL ?
          <img className='ml-[4rem] mt-[3rem] h-full rounded-md shadow-2xl' src={imgURL} alt={song.songName} /> : <img className='h-[20px]' src={Loading} />
        }
        <div className='ml-[3rem] py-[4rem] '>
          <h1 className='font-bold text-3xl'>{song.songName}</h1>
          <p className='py-5'>{song.description}</p>
          <h2><b>Artist:</b> {song.artistName}</h2>
        </div>
      </div>
      <div className='h-[10rem]'>
        <button className=' float-end mr-[8rem] btn btn-success' onClick={handlePlay}>Play <img className='h-full py-2' src={Play} alt="play" /></button>
      </div>
    </div>
  );
}
