import React, { ReactElement, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Import other components that are still part of App's internal routing
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
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Define props for the landing page components
interface AppProps {
  HeaderComponent: React.ComponentType<{ appName: string }>;
  MainContentComponent: React.ComponentType<{ appName: string }>;
  FooterComponent: React.ComponentType<{ data: any }>;
}

interface Data {
  appName: string;
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

function App({ HeaderComponent, MainContentComponent, FooterComponent }: AppProps): ReactElement {
  const [data, setData] = useState<Data | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data.json')
        const jsonData: Data = await response.json()
        setData(jsonData)

        const faviconLink = document.getElementById(
          'favicon-link'
        ) as HTMLLinkElement
        if (faviconLink) {
          faviconLink.href = jsonData.favicon
        }

        document.title = jsonData.appName
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!data) {
    return <div>Loading...</div>
  }

  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="font-sans antialiased text-gray-800">
      {isDashboardRoute && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="flex">
        {isDashboardRoute && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <main className={`flex-1 pt-16 ${isDashboardRoute ? 'lg:ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={
              <>
                <HeaderComponent appName={data.appName} />
                <MainContentComponent appName={data.appName} />
                <FooterComponent data={data.footer} />
              </>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="assignments" element={<Assignments />} />
              <Route path="categories" element={<Categories />} />
              <Route path="audit" element={<Audit />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="progress" element={<Progress />} />
              <Route path="ratings" element={<Ratings />} />
              <Route path="report" element={<Report />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App
