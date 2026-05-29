import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar.jsx'
import Footer from '../components/common/Footer.jsx'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout