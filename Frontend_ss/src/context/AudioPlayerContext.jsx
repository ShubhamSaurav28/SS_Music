// AudioPlayerContext.js
import React, { createContext, useState, useContext } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../Firebase';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
    const [currentSongURL, setCurrentSongURL] = useState(null);
    const [currentImageURL, setCurrentImageURL] = useState(null);
    const [currentSongData, setCurrentSongData] = useState(null);
    const [songId, setsongId] = useState(null);

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [audio] = useState(new Audio());
    const storage = getStorage(app);
    const firestore = getFirestore(app);
    // console.log(currentSongData)
    // console.log(currentSongURL);

    const firstPlay = (songURL, songData,imgURL,songId) => {
        try {
          setsongId(songId);
          setCurrentSongURL(songURL);
          setCurrentImageURL(imgURL);
          setCurrentSongData(songData);
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing song:', error);
        }
      };

//   const playSong = () => {
//     try {
//       audio.play();
//       setIsPlaying(true);
//     } catch (error) {
//       console.error('Error playing song:', error);
//     }
//   };

//   const pauseSong = () => {
//     try {
//         audio.pause();
//         setIsPlaying(false);
//       } catch (error) {
//         console.error('Error playing song:', error);
//       }
//   };

  return (
    <AudioPlayerContext.Provider value={{ currentSongURL, currentSongData, currentImageURL, firstPlay,songId }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};
