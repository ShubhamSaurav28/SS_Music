import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { app } from '../Firebase';




export default function SongUploadPage() {
    const [songFile, setSongFile] = useState(null);
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const { currentUser } = getAuth();

    const handleFileChange = (e) => {
        setSongFile(e.target.files[0]);
      };
    
      const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!songFile || !songName || !artistName || !description || !imageFile) {
          alert('Please fill in all fields');
          return;
        }
    
        // Initialize Firebase Storage
        const storage = getStorage(app);
        const firestore = getFirestore(app);
    
        // Create a storage reference for the song file
        const songRef = ref(storage, `songs/${Date.now()}-${songFile.name}`);
    
        // Create a storage reference for the image file
        const imageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    
        try {
          // Upload song file and image file to Firebase Storage
          const uploadsong = await uploadBytes(songRef, songFile)
          const uploadimage = await uploadBytes(imageRef, imageFile)
          const docref = await addDoc(collection( firestore, 'songs'),{
            songName,
            artistName,
            description,
            imageURL: uploadimage.ref.fullPath,
            songURL: uploadsong.ref.fullPath,
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL
          });
          console.log(docref);
          alert('Song uploaded successfully!');
          // Clear form fields
          setSongFile(null);
          setSongName('');
          setArtistName('');
          setDescription('');
          setImageFile(null);
          navigate('/')
        } catch (error) {
          console.error('Error uploading song:', error);
          alert('Error uploading song. Please try again.');
        }
      };

  return (
    <>
        <div className='w-[80vw] mx-auto mb-5 mt-3'>
              <form onSubmit={handleSubmit} className=" w-full gap-4">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Song Name</span>
                  </label>
                  <input value={songName} onChange={(e)=>setSongName(e.target.value)} type="name" placeholder="Song Name" className="input input-bordered" required />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Artist Name</span>
                  </label>
                  <input value={artistName} onChange={(e)=>setArtistName(e.target.value)} type="artistname" placeholder="Artistname" className="input input-bordered" required />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type="description" placeholder="Description" className="textarea textarea-bordered textarea-lg w-full px-3 py-2" required />
                </div>
                
                <div className="form-control flex flex-row mt-2">
                    <div className='w-[40vw]'>
                        <label className="label">
                        <span className="label-text">Choose the Song</span>
                        </label>
                        <input type="file" onChange={handleFileChange} accept="audio/*" className='file-input file-input-bordered' required />
                    </div>
                    <div className='w-[40vw]'>
                    <label className="label">
                        <span className="label-text">Choose the Image</span>
                        </label>
                        <input type="file" onChange={handleImageChange} accept="image/*" className='file-input file-input-bordered' required />
                    </div>
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleSubmit} className="btn btn-primary">Upload</button>
                </div>
              </form>
              </div>
    </>
  )
}
