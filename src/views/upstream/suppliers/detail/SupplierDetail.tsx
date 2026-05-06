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
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import PageHeader from '@/components/layout/shared/PageHeader'

const SupplierDetail = ({ id }: { id: string }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  // Giả lập dữ liệu cho demo
  const supplier = {
    id,
    name: id.toUpperCase() === 'AIRALO' ? 'Airalo Global' : 'Nomad API',
    logo: id.toUpperCase() === 'AIRALO' ? 'A' : 'N',
    color: id.toUpperCase() === 'AIRALO' ? 'primary.main' : 'info.main',
    status: 'Connected',
    type: id.toUpperCase() === 'AIRALO' ? 'postpaid' : 'prepaid',
    balance: id.toUpperCase() === 'AIRALO' ? 3150.20 : 5000.00,
    limit: 10000,
    ordersThisMonth: 850,
    successRate: 99.2
  }

  const quotaPercent = (supplier.balance / supplier.limit) * 100

  const alerts = [
    { type: 'warning', title: 'Giá vốn thay đổi', msg: 'Gói Japan 10GB vừa tăng giá từ $8.00 lên $8.50. Vui lòng cập nhật giá bán Marketplace.' },
    { type: 'error', title: 'Sản phẩm ngừng cung cấp', msg: 'Gói Europe Discover đã bị NCC gỡ bỏ. Hệ thống đã tự động ẩn gói này trên Chợ.' }
  ]

  const quickLinks = [
    { title: 'Danh sách gói', desc: 'Quản lý kho hàng eSIM', icon: 'tabler-packages', href: `/upstream/suppliers/${id}/packages`, color: 'primary' },
    { title: 'Cấu hình API', desc: 'Thông số kỹ thuật & Keys', icon: 'tabler-settings-automation', href: `/upstream/suppliers/${id}/config`, color: 'info' },
    { title: 'Đối soát Giao dịch', desc: 'Nhật ký mua hàng & nợ', icon: 'tabler-receipt-2', href: `/upstream/transactions?supplier=${id}`, color: 'success' }
  ]

  return (
    <>
      <PageHeader
        title={`Dashboard: ${supplier.name}`}
        description="Quản lý hiệu năng, công nợ và cảnh báo hệ thống Upstream"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung', href: '/upstream/suppliers' }, { label: supplier.name }]}
        actions={
          <Stack direction='row' spacing={2}>
            {supplier.type === 'postpaid' ? (
              <Button variant='tonal' color='primary' startIcon={<i className='tabler-credit-card' />}>Thanh toán Nợ</Button>
            ) : (
              <Button variant='tonal' color='success' startIcon={<i className='tabler-wallet' />}>Nạp tiền ví</Button>
            )}
            <Button variant='contained' startIcon={<i className='tabler-refresh' />}>Đồng bộ API</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* STATS & QUOTA */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          {supplier.type === 'postpaid' ? (
            <Card className='border-none shadow-sm bg-primary/5 border-primary/20 h-full'>
              <CardContent className='p-8'>
                <Box className='flex justify-between items-start mbe-2'>
                  <Typography variant='subtitle2' className='font-black uppercase text-primary'>Công nợ hiện tại (Postpaid)</Typography>
                  <Chip label="Hợp đồng đối soát" size="small" color="primary" variant="tonal" className="font-bold" />
                </Box>
                <Typography variant='h2' className='font-black mbe-4 text-slate-900'>${supplier.balance.toLocaleString()}</Typography>
                
                <Box className='mbe-2 flex justify-between'>
                  <Typography variant='caption' className='font-bold text-slate-500'>Sử dụng hạn mức</Typography>
                  <Typography variant='caption' className='font-black'>{quotaPercent.toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant='determinate' 
                  value={quotaPercent} 
                  color={quotaPercent > 80 ? 'error' : 'primary'} 
                  className='bs-2 rounded-full mbe-2' 
                />
                <Typography variant='caption' className='text-slate-400'>Hạn mức tối đa: ${supplier.limit.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          ) : (
            <Card className='border-none shadow-sm bg-success/5 border-success/20 h-full'>
              <CardContent className='p-8'>
                <Box className='flex justify-between items-start mbe-2'>
                  <Typography variant='subtitle2' className='font-black uppercase text-success'>Số dư ví (Prepaid)</Typography>
                  <Chip label="Trừ tiền ví" size="small" color="success" variant="tonal" className="font-bold" />
                </Box>
                <Typography variant='h2' className='font-black mbe-4 text-slate-900'>${supplier.balance.toLocaleString()}</Typography>
                
                <Box className='flex items-center gap-2 mt-6'>
                  <Button variant="contained" color="success" size="small" startIcon={<i className='tabler-plus' />}>
                    Nạp tiền vào ví
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-8'>
              <Box className='flex justify-between items-center mbe-4'>
                <Box>
                  <Typography variant='subtitle2' className='font-black uppercase text-slate-500'>Sản phẩm đang bán</Typography>
                  <Typography variant='h3' className='font-black'>450</Typography>
                </Box>
                <Avatar variant='rounded' className='bg-info/10 text-info w-12 h-12'>
                  <i className='tabler-packages text-2xl' />
                </Avatar>
              </Box>
              <Button fullWidth variant='outlined' size='small' component={Link} href={`/upstream/suppliers/${id}/packages`}>Quản lý sản phẩm</Button>
            </CardContent>
          </Card>
        </Grid2>

        {/* SMART ALERTS */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant='h5' className='font-black mbe-4 flex items-center gap-2'>
            <i className='tabler-bell-ringing text-warning' /> Cảnh báo Thông minh
          </Typography>
          <Stack spacing={4}>
            {alerts.map((alert, i) => (
              <Alert key={i} severity={alert.type as any} variant='standard' className='border-none shadow-sm'>
                <AlertTitle className='font-black'>{alert.title}</AlertTitle>
                {alert.msg}
                <Box className='mt-2'>
                  <Button size='small' color='inherit' className='font-black'>Xử lý ngay</Button>
                </Box>
              </Alert>
            ))}
          </Stack>
        </Grid2>

        {/* QUICK NAVIGATION */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant='h5' className='font-black mbe-4'>Điều hướng nhanh</Typography>
          <Stack spacing={4}>
            {quickLinks.map((link) => (
              <Card 
                key={link.title} 
                component={Link} 
                href={link.href}
                className='border-none shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20'
              >
                <CardContent className='flex items-center gap-4 p-4'>
                  <Avatar variant='rounded' sx={{ bgcolor: `${link.color}.main`, width: 44, height: 44 }}>
                    <i className={`${link.icon} text-xl`} />
                  </Avatar>
                  <Box>
                    <Typography variant='body1' className='font-black'>{link.title}</Typography>
                    <Typography variant='caption' className='text-slate-500'>{link.desc}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </>
  )
}

export default SupplierDetail
