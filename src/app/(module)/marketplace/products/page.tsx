'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const MarketplaceProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    { id: '1', code: 'JP-30D-10GB', name: 'Japan High-Speed', region: 'Japan', data: '10GB', validity: '30 Days', price: '$12.50', status: 'Active' },
    { id: '2', code: 'EU-15D-5GB', name: 'Europe Roaming', region: 'Europe', data: '5GB', validity: '15 Days', price: '$9.00', status: 'Active' },
    { id: '3', code: 'US-30D-20GB', name: 'USA Unlimited', region: 'USA', data: '20GB', validity: '30 Days', price: '$22.00', status: 'Inactive' },
    { id: '4', code: 'GL-07D-1GB', name: 'Global Lite', region: 'Global', data: '1GB', validity: '7 Days', price: '$4.50', status: 'Active' }
  ]

  return (
    <>
      <PageHeader
        title="Marketplace Catalog"
        description="Manage the unified eSIM packages available to your downstream agents"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Marketplace' }, { label: 'Products' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>Create Package</Button>
        }
        className='mbe-6'
      />

      <Card>
        <CardContent>
          <Box className='flex justify-between items-center mbe-4 flex-wrap gap-4'>
            <TextField
              size='small'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search' />
                  </InputAdornment>
                )
              }}
              className='max-sm:is-full'
            />
            <Box className='flex gap-2'>
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-download' />}>Export</Button>
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-filter' />}>Filter</Button>
            </Box>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Code</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Name</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Region</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Data / Validity</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Base Price</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Status</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono font-bold text-primary'>{p.code}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-bold'>{p.name}</Typography>
                    </td>
                    <td className='p-4'>
                      <Chip label={p.region} size='small' variant='tonal' className='font-bold' />
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2'>{p.data} / {p.validity}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{p.price}</Typography>
                    </td>
                    <td className='p-4'>
                      <Chip 
                        label={p.status} 
                        size='small' 
                        color={p.status === 'Active' ? 'success' : 'secondary'} 
                        variant='tonal' 
                        className='font-bold' 
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex justify-end gap-1'>
                        <Button size='small' variant='text' className='min-is-0 p-1'><i className='tabler-edit text-lg' /></Button>
                        <Button size='small' variant='text' color='error' className='min-is-0 p-1'><i className='tabler-trash text-lg' /></Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default MarketplaceProductsPage
