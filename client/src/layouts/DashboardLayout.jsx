import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar.jsx'
import TopBar from '../components/common/TopBar.jsx'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout