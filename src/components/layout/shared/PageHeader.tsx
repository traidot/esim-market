import type { ReactNode } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
  variant?: 'h4' | 'h5' | 'h6'
  breadcrumbs?: BreadcrumbItem[]
}

const PageHeader = ({
  title,
  description,
  actions,
  className = '',
  variant = 'h5',
}: PageHeaderProps) => {
  return (
    <Box className={`flex flex-col items-start justify-between gap-4 md:flex-row md:items-center ${className}`}>
      <Box className='flex flex-col gap-1'>
        <Typography variant={variant} className='font-semibold tracking-normal'>
          {title}
        </Typography>
        {description && (
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box className='flex items-center gap-2'>{actions}</Box>}
    </Box>
  )
}

export default PageHeader
