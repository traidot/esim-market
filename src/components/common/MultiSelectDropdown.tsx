'use client'

import { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'

type MultiSelectDropdownProps = {
  label: string
  options: { value: string; label: string }[]
  value: string[]
  onChange: (value: string[]) => void
}

const MultiSelectDropdown = ({ label, options, value, onChange }: MultiSelectDropdownProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const isActive = value.length > 0

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        onClick={event => setAnchor(event.currentTarget)}
        endIcon={<i className='tabler-chevron-down text-[11px]' />}
        sx={{
          width: '100%',
          height: 38,
          justifyContent: 'space-between',
          borderColor: isActive ? 'primary.main' : 'divider',
          color: isActive ? 'primary.main' : 'text.secondary',
          fontWeight: 500,
          fontSize: '0.8125rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          px: 1.5
        }}
      >
        {label}
        {isActive ? ` (${value.length})` : ''}
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { minWidth: 200, mt: 0.5, boxShadow: 3 } }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            dense
            onClick={() =>
              onChange(
                value.includes(option.value)
                  ? value.filter(item => item !== option.value)
                  : [...value, option.value]
              )
            }
            sx={{ gap: 0.5 }}
          >
            <Checkbox size='small' checked={value.includes(option.value)} disableRipple sx={{ p: 0.5 }} />
            <Typography variant='body2'>{option.label}</Typography>
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

export default MultiSelectDropdown
