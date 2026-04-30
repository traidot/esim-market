'use client'

import { useState } from 'react'
import Link from 'next/link'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentsList = () => {
  const agents = [
    { id: 'A001', name: 'TravelConnect Solutions', email: 'contact@travelconnect.vn', tier: 'PLATINUM', balance: '$5,240.00', status: 'Active', orders: 1240, color: 'primary' },
    { id: 'A002', name: 'Global eSIM Hub', email: 'hub@globale.sim', tier: 'GOLD', balance: '$1,120.50', status: 'Active', orders: 850, color: 'warning' },
    { id: 'A003', name: 'CheapData Agency', email: 'sales@cheapdata.com', tier: 'SILVER', balance: '$15.00', status: 'Low Balance', orders: 45, color: 'secondary' },
    { id: 'A004', name: 'Nomad Partner', email: 'partner@nomad.com', tier: 'GOLD', balance: '$0.00', status: 'Inactive', orders: 0, color: 'error' }
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

      <Grid2 container spacing={6}>
        {agents.map((agent) => (
          <Grid2 key={agent.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className='h-full border-none shadow-sm hover:shadow-md transition-all group border-2 border-transparent hover:border-primary/20'>
              <CardContent className='p-6'>
                <Box className='flex justify-between items-start mbe-4'>
                  <Box className='flex items-center gap-3'>
                    <Avatar 
                      variant='rounded' 
                      className={`bg-${agent.color}/10 text-${agent.color} w-[56px] h-[56px] font-black`}
                    >
                      {agent.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant='h5' className='font-black line-clamp-1'>{agent.name}</Typography>
                      <Typography variant='body2' className='text-slate-400'>{agent.id} • {agent.email}</Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={agent.status} 
                    size='small' 
                    color={agent.status === 'Active' ? 'success' : agent.status === 'Low Balance' ? 'error' : 'default'}
                    variant='tonal'
                    className='font-black uppercase text-[10px]'
                  />
                </Box>

                <Divider className='mbe-4 border-dashed' />

                <Grid2 container spacing={4} className='mbe-6'>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Cấp bậc</Typography>
                    <Typography variant='body2' className={`font-black text-${agent.color}`}>{agent.tier}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Đơn (Tổng)</Typography>
                    <Typography variant='body2' className='font-black'>{agent.orders.toLocaleString()}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Công nợ (Nợ)</Typography>
                    <Typography variant='body2' className='font-black text-error'>{agent.balance}</Typography>
                  </Grid2>
                </Grid2>

                <Button 
                  fullWidth 
                  variant='contained' 
                  className='shadow-none group-hover:shadow-lg transition-all py-2.5'
                  startIcon={<i className='tabler-user-cog' />}
                  component={Link}
                  href={`/downstream/agents/${agent.id.toLowerCase()}`}
                >
                  Chi tiết Đại lý
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  )
}

export default AgentsList
