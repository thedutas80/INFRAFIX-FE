import React, { ReactElement, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/landingpage/Header'
import MainContent from './components/landingpage/MainContent'
import Footer from './components/landingpage/Footer'
import Register from './pages/Register'
import Login from './pages/Login'

interface Data {
  appName: string
  favicon: string
  footer: {
    logo: string
    address: {
      street: string
      city: string
      province: string
      country: string
    }
    contact: {
      email: string
      phone: string
    }
    socialMedia: {
      facebook: string
      twitter: string
      instagram: string
      linkedin: string
    }
  }
}

function App(): ReactElement {
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data.json')
        const jsonData: Data = await response.json()
        setData(jsonData)

        // Update favicon
        const faviconLink = document.getElementById(
          'favicon-link'
        ) as HTMLLinkElement
        if (faviconLink) {
          faviconLink.href = jsonData.favicon
        }

        // Update document title
        document.title = jsonData.appName
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  if (!data) {
    return <div>Loading...</div> // Or a more sophisticated loading component
  }

  return (
    <div className="font-sans antialiased text-gray-800">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer data={data.footer} />
    </div>
  )
}

export default App
