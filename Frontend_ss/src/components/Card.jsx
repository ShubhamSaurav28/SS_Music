import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage'; // Import necessary Firebase storage functions

export default function Card({ song, getimageURL }) {
    const descriptionWords = song.description.split(' ');
    const truncatedDescription = descriptionWords.slice(0, 12).join(' ');
    const [imgURL, setImageURL] = useState(null);

    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                const imageURL = await getimageURL(song.imageURL); // Call the passed getimageURL function
                console.log(song.imageURL)
                setImageURL(imageURL);
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };
        fetchImageURL();
    }, [getimageURL, song.imageURL]); // Include getimageURL and song.imageURL in the dependency array

    return (
        <div className="carousel-item w-64 cursor-pointer hover:opacity-75 duration-300 rounded-md">
            <div className="card h-full w-96 bg-base-100 shadow-xl">
                <img className='h-48 rounded-md' src={imgURL} alt={song.name} />
                <div className="card-body h-48">
                    <h2 className="card-title text-xl">{song.songName}</h2>
                    <p>{truncatedDescription}...</p>
                </div>
            </div>
        </div>
    );
}
