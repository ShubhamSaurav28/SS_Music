import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from './context/FirebaseContext';
import BlockedPath from './pages/BlockedPath';
import SongUploadPage from './pages/SongUploadPage';
import React, { Suspense, useState } from 'react';
import Loading from './assets/Loading.gif';
import SongPage from './pages/SongPage';
import SearchedPage from './pages/SearchedPage';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { app } from './Firebase';
import { getStorage } from 'firebase/storage';

const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

function App() {
  const { currentUser } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const storage = getStorage(app);
  const firestore = getFirestore(app);


  const handleSearch = async (searchQuery) => {
    try {
      const songsRef = collection(firestore,'songs');
      const q = query(songsRef,
        orderBy("songName"),
        where("songName", ">=", searchQuery.trim()),
        where("songName", "<=", searchQuery.trim()+ "\uf8ff")

      )
      const results = await getDocs(q);
      const songResult = results.docs.map(song => song)
      setSearchResults(songResult);
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  }; 

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<img className='mx-auto mt-[40vh]' src={Loading} />}>
          <Routes>
            <Route path='/' element={<Layout handleSearch={handleSearch} />}>
              <Route path='/' element={<HomePage />} />
              {currentUser ? <Route path='/login' element={<BlockedPath />} /> : <Route path='/login' element={<LoginPage />} />}
              {currentUser ? <Route path='/signup' element={<BlockedPath />} /> : <Route path='/signup' element={<SignUpPage />} />}
              <Route path='/upload' element={<SongUploadPage />} />
              {currentUser ? <Route path='/profile' element={<ProfilePage />} /> : <Route path='/profile' element={<BlockedPath />} />}
              <Route path="/song/:songId" element={<SongPage />} />
              <Route path="/search-results" element={<SearchedPage searchResults={searchResults} />} /> {/* Route for displaying search results */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
