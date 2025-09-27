import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from './components/admin-layout'
import { AdminDashboard } from './pages/admin-dashboard'
import { UserManagement } from './pages/user-management'
import { SystemSettings } from './pages/system-settings'

export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<SystemSettings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  )
}
