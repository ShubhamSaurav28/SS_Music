import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage'; // Import necessary Firebase storage functions
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../Firebase';


export default function Card(props) {
    const descriptionWords = props.description.split(' ');
    const truncatedDescription = descriptionWords.slice(0, 12).join(' ');
    const [imgURL, setImageURL] = useState(null);
    const storage = getStorage(app);


    const getimageURL = async (path) => {
        return await getDownloadURL(ref(storage,path))
      }

    useEffect(() => {
        const fetchImageURL = async () => {
            try {
                const imageURL = await getimageURL(props.imageURL); // Call the passed getimageURL function
                setImageURL(imageURL);
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };
        fetchImageURL();
    }, [getimageURL, props.imageURL]); // Include getimageURL and props.imageURL in the dependency array

    return (
        <Link to={`/song/${props.id}`}>
        <div className="carousel-item w-64 cursor-pointer hover:opacity-75 duration-300 rounded-md">
            <div className="card h-full w-96 bg-base-100 shadow-xl">
                <img className='h-48 rounded-md' src={imgURL} alt={props.name} />
                <div className="card-body h-48">
                    <h2 className="card-title text-xl">{props.songName}</h2>
                    <p>{truncatedDescription}...</p>
                </div>
            </div>
        </div>
        </Link>
    );
}
