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
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'

import PageHeader from '@/components/layout/shared/PageHeader'
import AddSupplierModal from './AddSupplierModal'

const SupplierList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const suppliers = [
    {
      id: '1',
      name: 'Airalo Global',
      code: 'AIRALO',
      balance: '$1,245.50',
      status: 'active',
      connectionStatus: 'Connected',
      packagesCount: 450,
      lastSync: '2 giờ trước',
      color: 'primary',
      icon: 'tabler-square-rounded-letter-a'
    },
    {
      id: '2',
      name: 'Nomad API',
      code: 'NOMAD',
      balance: '$850.00',
      status: 'active',
      connectionStatus: 'Connected',
      packagesCount: 1200,
      lastSync: '15 phút trước',
      color: 'info',
      icon: 'tabler-square-rounded-letter-n'
    },
    {
      id: '3',
      name: 'GoMoWorld',
      code: 'GOMO',
      balance: '$0.00',
      status: 'inactive',
      connectionStatus: 'Disconnected',
      packagesCount: 0,
      lastSync: 'N/A',
      color: 'error',
      icon: 'tabler-square-rounded-letter-g'
    }
  ]

  return (
    <>
      <PageHeader
        title="Nhà cung cấp Toàn cầu (Upstream)"
        description="Kết nối và quản lý API từ các nhà cung cấp eSIM gốc trên toàn thế giới"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Nhà cung cấp' }]}
        actions={
          <Button 
            variant='contained' 
            startIcon={<i className='tabler-plus' />}
            onClick={() => setIsModalOpen(true)}
          >
            Thêm Nhà cung cấp
          </Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {suppliers.map((supplier, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className='h-full border-none shadow-sm hover:shadow-md transition-all group border-2 border-transparent hover:border-primary/20'>
              <CardContent className='p-6'>
                <Box className='flex justify-between items-start mbe-4'>
                  <Box className='flex items-center gap-3'>
                    <Avatar 
                      variant='rounded' 
                      className={`bg-${supplier.color}/10 text-${supplier.color} w-[56px] h-[56px]`}
                    >
                      <i className={`${supplier.icon} text-3xl`} />
                    </Avatar>
                    <Box>
                      <Typography variant='h5' className='font-black'>{supplier.name}</Typography>
                      <Typography variant='body2' className='text-slate-400'>{supplier.code}</Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={supplier.connectionStatus} 
                    size='small' 
                    color={supplier.connectionStatus === 'Connected' ? 'success' : 'default'}
                    variant='tonal'
                    className='font-black uppercase text-[10px]'
                  />
                </Box>

                <Divider className='mbe-4 border-dashed' />

                <Grid2 container spacing={4} className='mbe-6'>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Đơn (Tháng)</Typography>
                    <Typography variant='body2' className='font-black text-primary'>{supplier.id === '3' ? 0 : 850}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Tổng Gói</Typography>
                    <Typography variant='body2' className='font-black'>{supplier.packagesCount}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 4 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1 text-[10px]'>Tổng Tiền (Nợ)</Typography>
                    <Typography variant='body2' className='font-black text-error'>{supplier.id === '3' ? '$0.00' : '$3,150.20'}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1'>Lần đồng bộ cuối</Typography>
                    <Box className='flex items-center gap-1'>
                      <i className='tabler-clock text-slate-400 text-sm' />
                      <Typography variant='caption' className='font-bold text-slate-600'>{supplier.lastSync}</Typography>
                    </Box>
                  </Grid2>
                </Grid2>

                <Button 
                  fullWidth 
                  variant='contained' 
                  className='shadow-none group-hover:shadow-lg transition-all py-2.5'
                  startIcon={<i className='tabler-layout-dashboard' />}
                  component={Link}
                  href={`/upstream/suppliers/${supplier.code.toLowerCase()}`}
                >
                  Truy cập Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <AddSupplierModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default SupplierList
