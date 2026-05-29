import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import AdminSidebar from '../components/admin/AdminSidebar.jsx'
import AdminTopBar from '../components/admin/AdminTopBar.jsx'

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col lg:ml-72">
        <AdminTopBar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout