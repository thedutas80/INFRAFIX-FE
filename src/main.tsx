import React from 'react'
import './App.css'
import App from './App' // App is now the prop-based component
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

// Import the actual landing page components to pass as props
import Header from './components/landingpage/Header'
import MainContent from './components/landingpage/MainContent'
import Footer from './components/landingpage/Footer'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        HeaderComponent={Header}
        MainContentComponent={MainContent}
        FooterComponent={Footer}
      />
    </BrowserRouter>
  </React.StrictMode>
)
