import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
