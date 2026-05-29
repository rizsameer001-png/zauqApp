import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, MoreVertical, Ban, UserCheck, Shield,
  Mail, Calendar, Download, ChevronLeft, ChevronRight
} from 'lucide-react'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2024-01-15', lastActive: '2 min ago', subscription: 'Premium' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'creator', status: 'active', joined: '2024-02-20', lastActive: '1 hour ago', subscription: 'Creator' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'suspended', joined: '2024-03-10', lastActive: '3 days ago', subscription: 'Free' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'admin', status: 'active', joined: '2023-12-01', lastActive: 'Just now', subscription: 'Creator' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'user', status: 'active', joined: '2024-04-05', lastActive: '5 hours ago', subscription: 'Premium' },
]

const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])

  const filteredUsers = users.filter(user => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filterRole !== 'all' && user.role !== filterRole) return false
    if (filterStatus !== 'all' && user.status !== filterStatus) return false
    return true
  })

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-500">Manage users, roles, and subscriptions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="creator">Creator</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
        <button className="btn-primary inline-flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        if (selectedUsers.includes(user.id)) {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        } else {
                          setSelectedUsers([...selectedUsers, user.id])
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'creator' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' :
                      user.status === 'suspended' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.subscription}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                        <UserCheck className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                        <Ban className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                        <Shield className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Showing 1 to {filteredUsers.length} of {filteredUsers.length} results</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">1</button>
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage