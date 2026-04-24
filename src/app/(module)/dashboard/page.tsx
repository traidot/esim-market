'use client'

// React Imports
import { useState, useEffect } from 'react'

// Component Imports
import AdminDashboard from '@/views/dashboard/AdminDashboard'
import AgentDashboard from '@/views/dashboard/AgentDashboard'

/**
 * Dashboard Page Component
 * - Main dashboard screen of the eSIM Market
 * - Supports switching between 3M (Admin) and Agent roles for demonstration
 */
const DashboardPage = () => {
  // In a real application, this would come from the auth context/session
  const [role, setRole] = useState<'admin' | 'agent'>('admin')
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
      {/* Role Switcher for Demo Purposes */}
      <Box className='flex justify-end mbe-4 gap-2'>
        <Typography variant='caption' className='flex items-center text-slate-400'>Switch Role (Demo):</Typography>
        <Button 
          variant={role === 'admin' ? 'contained' : 'tonal'} 
          size='small' 
          onClick={() => setRole('admin')}
          color='primary'
        >
          3M Admin
        </Button>
        <Button 
          variant={role === 'agent' ? 'contained' : 'tonal'} 
          size='small' 
          onClick={() => setRole('agent')}
          color='secondary'
        >
          Agent
        </Button>
      </Box>

      {role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
    </Box>
  )
}

// MUI Import for the Box in the return
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default DashboardPage

