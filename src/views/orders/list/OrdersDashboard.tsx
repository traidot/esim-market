'use client'

import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'

import PageHeader from '@/components/layout/shared/PageHeader'

const OrdersDashboard = () => {
  // Mock Data focused on the "Digital Item" / eSIM Operations aspect
  const orders = [
    { 
      id: 'ORD-8241', 
      iccid: '898412345678901234',
      agent: 'TravelConnect', 
      product: 'Japan 10GB / 7 Days', 
      supplier: 'Airalo (KDDI)',
      status: 'Active', 
      date: '28/04/2026',
      dataUsed: 4.5,
      dataTotal: 10,
      expiry: '05/05/2026'
    },
    { 
      id: 'ORD-8240', 
      iccid: '893200987654321098',
      agent: 'Global eSIM Hub', 
      product: 'Thailand 5GB / 5 Days', 
      supplier: 'Nomad (AIS)',
      status: 'Not Installed', 
      date: '28/04/2026',
      dataUsed: 0,
      dataTotal: 5,
      expiry: 'Bắt đầu từ lúc quét mã'
    },
    { 
      id: 'ORD-8239', 
      iccid: '898400001111222233',
      agent: 'TravelConnect', 
      product: 'Global 1GB / 30 Days', 
      supplier: 'KeepGo',
      status: 'Expired', 
      date: '25/03/2026',
      dataUsed: 1,
      dataTotal: 1,
      expiry: '24/04/2026'
    },
    { 
      id: 'ORD-8238', 
      iccid: '898433334444555566',
      agent: 'Nomad Partner', 
      product: 'Vietnam 20GB / 15 Days', 
      supplier: 'Airalo (Viettel)',
      status: 'Revoked', 
      date: '27/04/2026',
      dataUsed: 0,
      dataTotal: 20,
      expiry: 'Đã bị thu hồi'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Not Installed': return 'warning'
      case 'Expired': return 'secondary'
      case 'Revoked': return 'error'
      default: return 'primary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return 'tabler-wifi'
      case 'Not Installed': return 'tabler-qrcode'
      case 'Expired': return 'tabler-clock-x'
      case 'Revoked': return 'tabler-ban'
      default: return 'tabler-sim-card'
    }
  }

  return (
    <>
      <PageHeader
        title="Quản lý Vận hành eSIM (Digital Orders)"
        description="Quản lý vòng đời eSIM: Mã ICCID, kiểm tra dung lượng data, trạng thái kết nối mạng và gia hạn."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng' }, { label: 'Quản lý eSIM' }]}
        className='mbe-6'
      />

      {/* Operations Quick Stats */}
      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-primary/10 text-primary bs-[48px] is-[48px]'>
                <i className='tabler-sim-card text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Tổng Số eSIM Đã Cấp</Typography>
                <Typography variant='h4' className='font-black'>24,592</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-success/20 text-success bs-[48px] is-[48px]'>
                <i className='tabler-wifi text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-success uppercase'>Đang Hoạt Động (Active)</Typography>
                <Typography variant='h4' className='font-black text-success'>8,210</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-warning/5 border-warning/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-warning/20 text-warning bs-[48px] is-[48px]'>
                <i className='tabler-qrcode text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-warning uppercase'>Chưa Quét Mã</Typography>
                <Typography variant='h4' className='font-black text-warning'>1,452</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-error/20 text-error bs-[48px] is-[48px]'>
                <i className='tabler-alert-triangle text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Cảnh Báo Lỗi / Thu Hồi</Typography>
                <Typography variant='h4' className='font-black text-error'>48</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex flex-wrap justify-between items-center gap-4'>
          <Grid2 container spacing={4} className='w-full lg:w-3/4'>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField 
                fullWidth 
                placeholder='Tìm Mã Đơn hoặc ICCID...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Trạng thái Network'>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='active'>Active (Đang có sóng)</MenuItem>
                <MenuItem value='not_installed'>Not Installed (Chưa quét QR)</MenuItem>
                <MenuItem value='expired'>Expired (Đã hết hạn/hết dung lượng)</MenuItem>
                <MenuItem value='revoked'>Revoked (Bị thu hồi)</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Nguồn cung (Supplier)'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='airalo'>Airalo</MenuItem>
                <MenuItem value='nomad'>Nomad</MenuItem>
                <MenuItem value='keepgo'>KeepGo</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='bg-slate-50'>
                <TableCell className='font-black uppercase text-[11px] whitespace-nowrap'>Mã Đơn / ICCID</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Sản Phẩm & Nguồn Cung</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Đại lý</TableCell>
                <TableCell className='font-black uppercase text-[11px] w-48'>Trạng thái & Dung lượng</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Hạn sử dụng</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Hỗ trợ (CSKH)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => {
                const isDataUsed = o.dataTotal > 0;
                const usagePercent = isDataUsed ? (o.dataUsed / o.dataTotal) * 100 : 0;
                const progressColor = usagePercent > 90 ? 'error' : usagePercent > 70 ? 'warning' : 'primary';

                return (
                  <TableRow key={o.id} hover className='transition-colors'>
                    <TableCell>
                      <Box className='flex flex-col'>
                        <Typography variant='body2' className='font-mono font-bold text-slate-800'>{o.id}</Typography>
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                          <i className='tabler-sim-card text-[14px] text-slate-400' />
                          <Typography variant='caption' className='font-mono text-slate-500'>{o.iccid}</Typography>
                        </Stack>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box className='flex flex-col'>
                        <Typography variant='body2' className='font-bold'>{o.product}</Typography>
                        <Typography variant='caption' className='text-slate-500'>Nguồn: {o.supplier}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box className='flex items-center gap-2'>
                        <Avatar variant='rounded' className='bg-slate-100 text-slate-700 font-black is-6 bs-6 text-[10px]'>
                          {o.agent[0]}
                        </Avatar>
                        <Typography variant='body2' className='font-bold text-slate-700'>{o.agent}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box className='mbe-2'>
                        <Chip 
                          icon={<i className={getStatusIcon(o.status)} />}
                          label={o.status} 
                          size='small' 
                          color={getStatusColor(o.status) as any} 
                          variant='tonal' 
                          className='font-bold h-6 text-[11px]'
                        />
                      </Box>
                      {o.status !== 'Not Installed' && o.status !== 'Revoked' && (
                        <Box>
                          <Box className='flex justify-between items-center mbe-1'>
                            <Typography variant='caption' className='font-bold text-slate-600'>
                              {o.dataUsed} GB <span className='text-slate-400 font-normal'>/ {o.dataTotal} GB</span>
                            </Typography>
                            <Typography variant='caption' className='text-slate-400 font-mono'>
                              {usagePercent.toFixed(0)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant='determinate' 
                            value={usagePercent} 
                            color={progressColor} 
                            className='bs-1.5 rounded-full' 
                          />
                        </Box>
                      )}
                    </TableCell>

                    <TableCell>
                      <Box className='flex flex-col'>
                        <Typography variant='body2' className='font-bold text-slate-700'>{o.expiry}</Typography>
                        <Typography variant='caption' className='text-slate-400'>Ngày mua: {o.date}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell className='text-right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Tooltip title="Refresh Data Usage">
                          <IconButton size='small' color='primary' className='bg-primary/10'>
                            <i className='tabler-refresh' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem mã QR">
                          <IconButton size='small' color='secondary' className='bg-secondary/10'>
                            <i className='tabler-qrcode' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Thao tác nâng cao (Reset Network, Revoke, Extend)">
                          <IconButton size='small' color='secondary' className='bg-slate-100'>
                            <i className='tabler-dots-vertical' />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default OrdersDashboard
