import React, { useRef } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function SongDashboard() {
    const { currentSongURL, currentSongData,currentImageURL} = useAudioPlayer();
    const audioRef = useRef(null);

    return (
        <div className='border-t-2 aud shadow-2xl absolute bottom-0 flex justify-center gap-4 items-center h-[5rem] w-full'>
            {currentSongData && <h2 className='font-semibold pl-5'>{currentSongData.songName}</h2>}
            {currentSongData &&  <div className="w-10 items-center">
                        <img src={currentImageURL} alt={currentSongData.songName} />
            </div>}

           
            <audio className='w-full' ref={audioRef} src={currentSongURL} controls controlsList="nodownload" autoPlay></audio>
        </div>
    );
}
