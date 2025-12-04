import React, { ReactElement, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/landingpage/Header'
import MainContent from './components/landingpage/MainContent'
import Footer from './components/landingpage/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Assignments from './pages/Assignments'
import Categories from './pages/Categories'
import Audit from './pages/Audit'
import Notifications from './pages/Notifications'
import Progress from './pages/Progress'
import Ratings from './pages/Ratings'
import Report from './pages/Report'
import { DashboardHomeContent } from './pages/Dashboard' // Import DashboardHomeContent from Dashboard.tsx
import NotFound from './pages/NotFound'

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
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/src/data.json')
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
      <Routes>
        <Route path="/" element={
          <>
            {/* Only show Header and Footer on landing page */}
            {location.pathname === '/' && (
              <>
                <Header appName={data.appName} />
                <MainContent appName={data.appName} />
                <Footer data={data.footer} />
              </>
            )}
            {location.pathname !== '/' && <Dashboard />}
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHomeContent />} /> {/* This will be the main dashboard content */}
          <Route path="assignments" element={<Assignments />} />
          <Route path="categories" element={<Categories />} />
          <Route path="audit" element={<Audit />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="progress" element={<Progress />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="report" element={<Report />} />
          {/* Add other dashboard sub-routes here */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
