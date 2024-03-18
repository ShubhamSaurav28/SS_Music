import React, { useRef } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Link } from 'react-router-dom';

export default function SongDashboard() {
    const { currentSongURL, currentSongData,currentImageURL,songId} = useAudioPlayer();
    const audioRef = useRef(null);

    return (
        <div className='border-t-2 aud shadow-2xl fixed z-40 bg-[#282a36] bottom-0 flex flex-wrap md:flex-nowrap justify-center items-center  w-full'>
            <Link className='flex mt-3 mb-3 gap-4 items-center' to={`/song/${songId}`}>
            {currentSongData && <h2 className='font-semibold pl-5'>{currentSongData.songName}</h2>}
            {currentSongData &&  <div className="w-10 items-center">
                        <img src={currentImageURL} alt={currentSongData.songName} />
            </div>}
            </Link>
           
            <audio className='w-full' ref={audioRef} src={currentSongURL} controls controlsList="nodownload" autoPlay></audio>
        </div>
    );
}
