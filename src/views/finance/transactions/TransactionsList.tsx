'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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

import PageHeader from '@/components/layout/shared/PageHeader'

const TransactionsList = () => {
  const transactions = [
    { id: 'TRX-10293', agent: 'TravelConnect', agentCode: 'TC', type: 'Charge', typeLabel: 'Phát sinh (Mua eSIM)', amount: -12.50, status: 'Completed', date: '2026-04-25T14:20:00Z' },
    { id: 'TRX-10294', agent: 'Global eSIM Hub', agentCode: 'GE', type: 'Payment', typeLabel: 'Thanh toán', amount: 500.00, status: 'Completed', date: '2026-04-25T14:15:00Z' },
    { id: 'TRX-10295', agent: 'CheapData Agency', agentCode: 'CD', type: 'Charge', typeLabel: 'Phát sinh (Mua eSIM)', amount: -4.50, status: 'Pending', date: '2026-04-25T14:00:00Z' },
    { id: 'TRX-10296', agent: 'Nomad Partner', agentCode: 'NP', type: 'CreditNote', typeLabel: 'Giảm trừ (Credit Note)', amount: 9.00, status: 'Completed', date: '2026-04-25T13:45:00Z' },
    { id: 'TRX-10297', agent: 'Asia Roaming', agentCode: 'AR', type: 'DebitNote', typeLabel: 'Truy thu (Debit Note)', amount: -150.00, status: 'Failed', date: '2026-04-24T10:30:00Z' },
    { id: 'TRX-10298', agent: 'TravelConnect', agentCode: 'TC', type: 'Payment', typeLabel: 'Thanh toán', amount: 1000.00, status: 'Completed', date: '2026-04-23T09:15:00Z' },
    { id: 'TRX-10299', agent: 'TravelConnect', agentCode: 'TC', type: 'Charge', typeLabel: 'Phát sinh (Mua eSIM)', amount: -25.00, status: 'Completed', date: '2026-04-23T10:00:00Z' },
    { id: 'TRX-10300', agent: 'Global eSIM Hub', agentCode: 'GE', type: 'Charge', typeLabel: 'Phát sinh (Mua eSIM)', amount: -50.00, status: 'Completed', date: '2026-04-23T11:20:00Z' },
  ]

  const totalIn = transactions.filter(t => t.amount > 0 && t.status === 'Completed').reduce((acc, t) => acc + t.amount, 0)
  const totalOut = transactions.filter(t => t.amount < 0 && t.status === 'Completed').reduce((acc, t) => acc + Math.abs(t.amount), 0)
  const totalPending = transactions.filter(t => t.status === 'Pending').reduce((acc, t) => acc + Math.abs(t.amount), 0)
  const totalCount = transactions.length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'Pending': return 'warning'
      case 'Failed': return 'error'
      default: return 'primary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Charge': return 'tabler-file-invoice'
      case 'Payment': return 'tabler-cash-banknote'
      case 'CreditNote': return 'tabler-receipt-refund'
      case 'DebitNote': return 'tabler-receipt-tax'
      default: return 'tabler-receipt'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Charge': return 'error'
      case 'Payment': return 'success'
      case 'CreditNote': return 'info'
      case 'DebitNote': return 'warning'
      default: return 'primary'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <>
      <PageHeader
        title="Lịch sử Thanh toán & Phát sinh"
        description="Ghi nhận toàn bộ giao dịch thanh toán công nợ, mua hàng và các chứng từ điều chỉnh (Credit Note / Debit Note)."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài chính' }, { label: 'Giao dịch' }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='primary' startIcon={<i className='tabler-download' />}>Xuất Báo cáo</Button>
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>Tạo Giao dịch Thủ công</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-primary/10 text-primary bs-[48px] is-[48px]'>
                <i className='tabler-receipt-2 text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Tổng Số Giao Dịch</Typography>
                <Typography variant='h4' className='font-black'>{totalCount}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-success/20 text-success bs-[48px] is-[48px]'>
                <i className='tabler-arrow-up-right text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-success uppercase'>Tổng Thanh Toán Nhận Được</Typography>
                <Typography variant='h4' className='font-black text-success'>{formatCurrency(totalIn)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-error/20 text-error bs-[48px] is-[48px]'>
                <i className='tabler-arrow-down-right text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Tổng Phát Sinh (Công Nợ)</Typography>
                <Typography variant='h4' className='font-black text-error'>{formatCurrency(totalOut)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Card className='border-none shadow-sm bg-warning/5 border-warning/20'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-warning/20 text-warning bs-[48px] is-[48px]'>
                <i className='tabler-clock text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-warning uppercase'>Đang Xử Lý</Typography>
                <Typography variant='h4' className='font-black text-warning'>{formatCurrency(totalPending)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex flex-wrap justify-between items-center gap-4'>
          <Grid2 container spacing={4} className='w-full lg:w-3/4'>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField 
                fullWidth 
                placeholder='Mã giao dịch...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Loại Giao dịch'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='charge'>Phát sinh (Charge)</MenuItem>
                <MenuItem value='payment'>Thanh toán (Payment)</MenuItem>
                <MenuItem value='creditnote'>Giảm trừ (Credit Note)</MenuItem>
                <MenuItem value='debitnote'>Truy thu (Debit Note)</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Trạng thái'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='completed'>Thành công</MenuItem>
                <MenuItem value='pending'>Đang xử lý</MenuItem>
                <MenuItem value='failed'>Thất bại</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField 
                type="date" 
                fullWidth 
                size='small' 
                label='Từ ngày'
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
          </Grid2>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='bg-slate-50'>
                <TableCell className='font-black uppercase text-[11px] whitespace-nowrap'>Mã GD & Thời gian</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Đại lý</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Loại Giao Dịch</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Số tiền</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => {
                const isPositive = t.amount > 0;
                const typeColor = getTypeColor(t.type) as any;
                
                return (
                  <TableRow key={t.id} hover className='transition-colors'>
                    <TableCell>
                      <Box className='flex flex-col'>
                        <Typography variant='body2' className='font-mono font-bold text-primary'>{t.id}</Typography>
                        <Typography variant='caption' className='text-slate-500'>{formatDate(t.date)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <Avatar variant='rounded' className='bg-slate-100 text-slate-700 font-black is-8 bs-8 text-xs'>
                          {t.agentCode}
                        </Avatar>
                        <Typography variant='body2' className='font-bold'>{t.agent}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className='flex items-center gap-2'>
                        <Avatar variant='rounded' className={`bg-${typeColor}/10 text-${typeColor} is-8 bs-8`}>
                          <i className={`${getTypeIcon(t.type)} text-lg`} />
                        </Avatar>
                        <Typography variant='body2' className='font-bold'>{t.typeLabel}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Typography variant='body2' className={`font-black ${isPositive ? 'text-success' : 'text-error'}`}>
                        {isPositive ? '+' : ''}{formatCurrency(t.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell className='text-center'>
                      <Chip 
                        label={t.status} 
                        color={getStatusColor(t.status) as any} 
                        size='small' 
                        variant='tonal' 
                        className='font-bold'
                      />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Tooltip title="Xem chi tiết">
                        <IconButton size='small' color='primary'>
                          <i className='tabler-eye' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Tải biên lai">
                        <IconButton size='small' color='secondary'>
                          <i className='tabler-download' />
                        </IconButton>
                      </Tooltip>
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

export default TransactionsList
