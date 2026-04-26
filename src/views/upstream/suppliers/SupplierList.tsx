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

import PageHeader from '@/components/layout/shared/PageHeader'
import AddSupplierModal from './AddSupplierModal'

const SupplierList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const suppliers = [
    {
      id: '1',
      name: 'Airalo Global',
      code: 'AIRALO',
      status: 'active',
      connectionStatus: 'Connected',
      packagesCount: 450,
      lastSync: '2 giờ trước',
      color: 'primary'
    },
    {
      id: '2',
      name: 'Nomad API',
      code: 'NOMAD',
      status: 'active',
      connectionStatus: 'Connected',
      packagesCount: 1200,
      lastSync: '15 phút trước',
      color: 'info'
    },
    {
      id: '3',
      name: 'GoMoWorld',
      code: 'GOMO',
      status: 'inactive',
      connectionStatus: 'Disconnected',
      packagesCount: 0,
      lastSync: 'N/A',
      color: 'error'
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
            <Card className='h-full border-none shadow-sm hover:shadow-md transition-shadow'>
              <CardContent>
                <Box className='flex justify-between items-start mbe-4'>
                  <Avatar 
                    variant='rounded' 
                    className={`bg-${supplier.color}/10 text-${supplier.color} w-[48px] h-[48px]`}
                  >
                    <i className='tabler-world text-2xl' />
                  </Avatar>
                  <Box className='flex gap-1'>
                    <Tooltip title="Cài đặt">
                      <IconButton size='small' component={Link} href={`/upstream/suppliers/${supplier.code.toLowerCase()}`}>
                        <i className='tabler-settings' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đồng bộ ngay">
                      <IconButton size='small' color='primary'><i className='tabler-refresh' /></IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Typography variant='h5' className='font-black mbe-1'>{supplier.name}</Typography>
                <Typography variant='body2' className='text-slate-400 mbe-4'>{supplier.code}</Typography>

                <Box className='flex flex-col gap-3'>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='caption'>Trạng thái API:</Typography>
                    <Chip 
                      label={supplier.connectionStatus} 
                      size='small' 
                      variant='tonal' 
                      color={supplier.connectionStatus === 'Connected' ? 'success' : 'error'}
                      className='font-bold'
                    />
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='caption'>Gói cước đang có:</Typography>
                    <Typography variant='body2' className='font-bold'>{supplier.packagesCount}</Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='caption'>Lần đồng bộ cuối:</Typography>
                    <Typography variant='caption' className='font-mono'>{supplier.lastSync}</Typography>
                  </Box>
                </Box>

                <Box className='mt-6 pt-4 border-t border-slate-100 flex gap-2'>
                  <Button fullWidth variant='tonal' size='small' color='secondary'>Mapping</Button>
                  <Button fullWidth variant='outlined' size='small'>Lịch sử Log</Button>
                </Box>
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
