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
      {/* Bộ chuyển đổi vai trò (Demo) */}
      <Box className='flex justify-end mbe-4 gap-2'>
        <Typography variant='caption' className='flex items-center text-slate-400'>Chế độ xem (Demo):</Typography>
        <Button 
          variant={role === 'admin' ? 'contained' : 'tonal'} 
          size='small' 
          onClick={() => setRole('admin')}
          color='primary'
        >
          Quản trị 3M
        </Button>
        <Button 
          variant={role === 'agent' ? 'contained' : 'tonal'} 
          size='small' 
          onClick={() => setRole('agent')}
          color='secondary'
        >
          Đại lý
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

