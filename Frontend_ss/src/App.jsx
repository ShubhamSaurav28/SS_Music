import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from './context/FirebaseContext';
import BlockedPath from './pages/BlockedPath';
import SongUploadPage from './pages/SongUploadPage';
import React, { Suspense } from 'react';
import Loading from './assets/Loading.gif';
import SongPage from './pages/SongPage';

const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))

function App() {
  const { currentUser } = useAuth();

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<img className='mx-auto mt-[40vh]' src={Loading} />}>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>
      {currentUser ? <Route path='/login' element={<BlockedPath/>}/> : <Route path='/login' element={<LoginPage/>}/>}
      {currentUser ? <Route path='/signup' element={<BlockedPath/>}/> : <Route path='/signup' element={<SignUpPage/>}/>}
      <Route path='/upload' element={<SongUploadPage/>}/>
      {currentUser ? <Route path='/profile' element={<ProfilePage/>}/> : <Route path='/profile' element={<BlockedPath/>}/>}
      <Route path="/song/:songId" element={<SongPage/>}/>
    </Route>
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
