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
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Divider from '@mui/material/Divider'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentDetail = ({ id }: { id: string }) => {
  // Mock data
  const agent = {
    id: id.toUpperCase(),
    name: id === 'a001' ? 'TravelConnect Solutions' : 'Global eSIM Hub',
    email: 'contact@travelconnect.vn',
    tier: 'PLATINUM',
    color: 'primary',
    type: id.toLowerCase() === 'a001' ? 'postpaid' : 'prepaid',
    balance: id.toLowerCase() === 'a001' ? 5240.00 : 15000.00,
    limit: 50000,
    totalSales: 125000,
    ordersThisMonth: 1240,
    markupProfitThisMonth: 4500.50,
    status: 'Active',
    nextTierTarget: 150000,
  }

  const progressToNextTier = (agent.totalSales / agent.nextTierTarget) * 100

  const quickLinks = [
    { title: 'Quản lý Chiết khấu', desc: 'Định giá & Markup riêng', icon: 'tabler-cash', href: `/downstream/agents/${id.toLowerCase()}/pricing`, color: 'success' },
    { title: 'API & Webhooks', desc: 'Kết nối B2B', icon: 'tabler-plug-connected', href: `/downstream/agents/${id.toLowerCase()}/api-config`, color: 'info' },
    { title: 'Nhật ký Giao dịch', desc: 'Lịch sử mua/bán chi tiết', icon: 'tabler-receipt-2', href: `/downstream/agents/${id.toLowerCase()}/transactions`, color: 'warning' },
    { title: 'Đối soát Công nợ', desc: 'Chốt công nợ hàng tháng', icon: 'tabler-file-invoice', href: `/downstream/agents/${id.toLowerCase()}/debt`, color: 'error' }
  ]

  return (
    <>
      <PageHeader
        title={`Dashboard: ${agent.name}`}
        description={`Quản lý tài khoản, doanh thu và cấu hình phân phối cho đại lý (${agent.id})`}
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối', href: '/downstream/agents' }, { label: agent.name }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='error' startIcon={<i className='tabler-ban' />}>Khóa Đại lý</Button>
            {agent.type === 'postpaid' ? (
              <Button variant='contained' startIcon={<i className='tabler-cash' />}>Thu nợ</Button>
            ) : (
              <Button variant='contained' color='success' startIcon={<i className='tabler-wallet' />}>Nạp tiền</Button>
            )}
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* WALLET BALANCE / ACCRUED DEBT CARD */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          {agent.type === 'postpaid' ? (
            <Card className='border-none shadow-sm bg-error/5 border-error/20 h-full'>
              <CardContent className='p-8 flex flex-col justify-center h-full text-center'>
                <Box className='flex justify-between items-start mbe-2'>
                  <Typography variant='subtitle2' className='font-black uppercase text-error'>Công nợ hiện tại</Typography>
                  <Chip label="Dùng Công nợ" size="small" color="error" variant="tonal" className="font-bold" />
                </Box>
                <Typography variant='h2' className='font-black mbe-4 text-slate-900'>${agent.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</Typography>
                
                <Box className='mbe-2 flex justify-between'>
                  <Typography variant='caption' className='font-bold text-slate-500'>Sử dụng hạn mức</Typography>
                  <Typography variant='caption' className='font-black'>{(agent.balance / agent.limit * 100).toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant='determinate' 
                  value={(agent.balance / agent.limit) * 100} 
                  color={(agent.balance / agent.limit) * 100 > 80 ? 'error' : 'primary'} 
                  className='bs-2 rounded-full mbe-2' 
                />
                <Typography variant='caption' className='text-slate-400'>Hạn mức tín dụng: ${agent.limit.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          ) : (
            <Card className='border-none shadow-sm bg-success/5 border-success/20 h-full'>
              <CardContent className='p-8 flex flex-col justify-center h-full text-center'>
                <Box className='flex justify-between items-start mbe-2'>
                  <Typography variant='subtitle2' className='font-black uppercase text-success'>Số dư ví</Typography>
                  <Chip label="Dùng Ví" size="small" color="success" variant="tonal" className="font-bold" />
                </Box>
                <Typography variant='h2' className='font-black mbe-4 text-slate-900'>${agent.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</Typography>
                <Typography variant='caption' className='text-slate-400'>Số dư khả dụng hiện tại.</Typography>
                
                <Box className='mt-4'>
                  <Button variant="contained" color="success" size="small" startIcon={<i className='tabler-plus' />}>
                    Nạp thêm tiền
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid2>

        {/* SALES PERFORMANCE */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-8'>
              <Typography variant='subtitle2' className='font-black uppercase mbe-4 text-slate-500'>Doanh số (Tháng này)</Typography>
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='h4' className='font-black text-primary mbe-1'>{agent.ordersThisMonth}</Typography>
                  <Typography variant='caption' className='text-slate-500 font-bold'>Đơn hàng</Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='h4' className='font-black text-success mbe-1'>${agent.markupProfitThisMonth.toLocaleString()}</Typography>
                  <Typography variant='caption' className='text-slate-500 font-bold'>Lợi nhuận gộp</Typography>
                </Grid2>
              </Grid2>
              <Divider className='my-4' />
              <Button fullWidth variant='text' size='small'>Xem báo cáo chi tiết</Button>
            </CardContent>
          </Card>
        </Grid2>

        {/* TIER PROGRESS */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-8 flex flex-col justify-center h-full'>
              <Box className='flex justify-between items-center mbe-2'>
                <Typography variant='subtitle2' className='font-black uppercase text-slate-500'>Cấp bậc hiện tại</Typography>
                <Chip label={agent.tier} color='primary' size='small' className='font-black' />
              </Box>
              <Typography variant='h3' className='font-black mbe-4'>${agent.totalSales.toLocaleString()} <span className='text-sm text-slate-400'>/ ${agent.nextTierTarget.toLocaleString()}</span></Typography>
              <Box className='mbe-2 flex justify-between'>
                <Typography variant='caption' className='font-bold text-slate-500'>Tiến độ lên cấp</Typography>
                <Typography variant='caption' className='font-black'>{progressToNextTier.toFixed(1)}%</Typography>
              </Box>
              <LinearProgress 
                variant='determinate' 
                value={progressToNextTier} 
                color='primary'
                className='bs-2 rounded-full' 
              />
            </CardContent>
          </Card>
        </Grid2>

        {/* QUICK NAVIGATION */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant='h5' className='font-black mbe-4'>Trung tâm Quản trị</Typography>
          <Grid2 container spacing={4}>
            {quickLinks.map((link) => (
              <Grid2 key={link.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card 
                  component={Link} 
                  href={link.href}
                  className='border-none shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20 h-full'
                >
                  <CardContent className='flex flex-col items-center gap-2 p-6 text-center'>
                    <Avatar variant='rounded' sx={{ bgcolor: `${link.color}.main`, width: 48, height: 48, mb: 2 }}>
                      <i className={`${link.icon} text-2xl`} />
                    </Avatar>
                    <Typography variant='body1' className='font-black'>{link.title}</Typography>
                    <Typography variant='caption' className='text-slate-500'>{link.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* RECENT ACTIVITY / METRICS */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant='h5' className='font-black mbe-4'>Lịch sử Thanh toán gần nhất</Typography>
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Stack spacing={4}>
                {[
                  { date: '28/04/2026', amount: '-$1,000.00', method: 'Bank Transfer' },
                  { date: '25/04/2026', amount: '-$500.00', method: 'Credit Card' },
                  { date: '12/04/2026', amount: '-$2,500.00', method: 'USDT' },
                ].map((tx, i) => (
                  <Box key={i} className='flex justify-between items-center'>
                    <Box>
                      <Typography variant='body2' className='font-bold'>{tx.method}</Typography>
                      <Typography variant='caption' className='text-slate-400'>{tx.date}</Typography>
                    </Box>
                    <Typography variant='body2' className='font-black text-success'>{tx.amount}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

      </Grid2>
    </>
  )
}

export default AgentDetail
