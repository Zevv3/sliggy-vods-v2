import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
// import { FirebaseAppProvider } from 'reactfire'
// import { firebaseConfig } from './FirebaseConfig.ts'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);