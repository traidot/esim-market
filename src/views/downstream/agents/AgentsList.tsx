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
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentsList = () => {
  const agents = [
    { id: 'A001', name: 'TravelConnect Solutions', email: 'contact@travelconnect.vn', tier: 'PLATINUM', balance: '$5,240.00', status: 'Active', orders: 1240 },
    { id: 'A002', name: 'Global eSIM Hub', email: 'hub@globale.sim', tier: 'GOLD', balance: '$1,120.50', status: 'Active', orders: 850 },
    { id: 'A003', name: 'CheapData Agency', email: 'sales@cheapdata.com', tier: 'SILVER', balance: '$15.00', status: 'Low Balance', orders: 45 },
    { id: 'A004', name: 'Nomad Partner', email: 'partner@nomad.com', tier: 'GOLD', balance: '$0.00', status: 'Inactive', orders: 0 }
  ]

  return (
    <>
      <PageHeader
        title="Quản lý Đại lý (Agents)"
        description="Quản lý mạng lưới phân phối, số dư ví và cấu hình chiết khấu cho từng đối tác"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Đại lý' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>Thêm Đại lý</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6 flex-wrap gap-4'>
            <TextField
              size='small'
              placeholder='Tìm theo tên, email hoặc ID...'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }
              }}
              className='max-sm:is-full min-is-[300px]'
            />
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[1000px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Đại lý</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Cấp bậc</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Số dư Ví</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Tổng đơn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Box className='flex items-center gap-3'>
                        <Avatar sx={{ bgcolor: 'primary.main', fontSize: 14 }}>{a.name.substring(0, 2)}</Avatar>
                        <Box>
                          <Typography variant='body2' className='font-black'>{a.name}</Typography>
                          <Typography variant='caption' className='text-slate-400'>{a.email}</Typography>
                        </Box>
                      </Box>
                    </td>
                    <td className='p-4'>
                      <Chip 
                        label={a.tier} 
                        size='small' 
                        color={a.tier === 'PLATINUM' ? 'primary' : a.tier === 'GOLD' ? 'warning' : 'secondary'} 
                        variant='tonal'
                        className='font-black'
                      />
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black text-success'>{a.balance}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-bold'>{a.orders.toLocaleString()}</Typography>
                    </td>
                    <td className='p-4'>
                      <Chip 
                        label={a.status} 
                        size='small' 
                        color={a.status === 'Active' ? 'success' : a.status === 'Low Balance' ? 'error' : 'secondary'} 
                        variant='tonal'
                        className='font-bold'
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex justify-end gap-1'>
                        <Button size='small' variant='text' className='min-is-0 p-1'><i className='tabler-wallet text-lg' /></Button>
                        <Button size='small' variant='text' className='min-is-0 p-1'><i className='tabler-edit text-lg' /></Button>
                        <Button size='small' variant='text' color='error' className='min-is-0 p-1'><i className='tabler-ban text-lg' /></Button>
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

export default AgentsList
