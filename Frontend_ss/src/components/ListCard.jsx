import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { getDownloadURL, getStorage, ref } from 'firebase/storage'; // Import necessary Firebase storage functions
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../Firebase';

export default function ListCard(props) {
    const [imgURL, setImageURL] = useState(null);
    const storage = getStorage(app);

    const getimageURL = async (path) => {
        return await getDownloadURL(ref(storage,path))
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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
        <div>
            <div className="gap-4 py-2 flex px-6 avatar hover:opacity-80">
                <Link to={`/song/${props.id}`}>
                    <div className='flex items-center gap-3'>
                    <div className="w-10 items-center">
                        <img src={imgURL} alt="Song" />
                    </div>
                    <h1 className='text-lg'>{capitalizeFirstLetter(props.songName)}</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}
