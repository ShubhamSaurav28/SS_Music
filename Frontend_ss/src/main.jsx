import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/FirebaseContext.jsx'
import { AudioPlayerProvider } from './context/AudioPlayerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AudioPlayerProvider>
        <App />
      </AudioPlayerProvider>
    </AuthProvider>
  </React.StrictMode>,
)
