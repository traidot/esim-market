'use client'

// React Imports
import { useState, useEffect } from 'react'

// Component Imports
import AdminDashboard from '@/views/dashboard/AdminDashboard'
import AgentDashboard from '@/views/dashboard/AgentDashboard'

// Role Hook Import
import { useRole } from '@/contexts/RoleContext'

/**
 * Dashboard Page Component
 * - Main dashboard screen of the eSIM Market
 * - Supports switching between 3M (Admin) and Agent roles for demonstration
 */
const DashboardPage = () => {
  const { role, setRole } = useRole()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return null

  return (
    <Box>
      {role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
    </Box>
  )
}

// MUI Import for the Box in the return
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default DashboardPage

