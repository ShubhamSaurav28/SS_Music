import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from './context/FirebaseContext';
import BlockedPath from './pages/BlockedPath';


function App() {
  const { currentUser } = useAuth();

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>
      {currentUser ? <Route path='/login' element={<BlockedPath/>}/> : <Route path='/login' element={<LoginPage/>}/>}
      {currentUser ? <Route path='/signup' element={<BlockedPath/>}/> : <Route path='/signup' element={<SignUpPage/>}/>}
    </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
