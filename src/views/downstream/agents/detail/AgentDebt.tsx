'use client'

import { useState } from 'react'
import Link from 'next/link'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentDebt = ({ id }: { id: string }) => {
  const agentName = id.toUpperCase() === 'A001' ? 'TravelConnect Solutions' : 'Global eSIM Hub'

  const debtCycles = [
    { month: '04/2026', opening: 1000.00, purchases: 4240.00, payments: 0, closing: 5240.00, status: 'Chưa chốt', dueDate: '15/05/2026' },
    { month: '03/2026', opening: 0.00, purchases: 3500.00, payments: 2500.00, closing: 1000.00, status: 'Nợ tồn đọng', dueDate: '15/04/2026' },
    { month: '02/2026', opening: 500.00, purchases: 2000.00, payments: 2500.00, closing: 0.00, status: 'Đã thanh toán', dueDate: '15/03/2026' },
    { month: '01/2026', opening: 0.00, purchases: 1500.00, payments: 1000.00, closing: 500.00, status: 'Đã thanh toán', dueDate: '15/02/2026' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã thanh toán': return 'success'
      case 'Chưa chốt': return 'warning'
      case 'Nợ tồn đọng': return 'error'
      default: return 'default'
    }
  }

  return (
    <>
      <PageHeader
        title={`Đối soát Công nợ: ${agentName}`}
        description="Quản lý và chốt công nợ (B2B Settlement) theo từng tháng. Tính toán số dư đầu kỳ, phát sinh và số tiền đã thanh toán."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Đại lý', href: '/downstream/agents' }, 
          { label: agentName, href: `/downstream/agents/${id}` },
          { label: 'Công nợ hàng tháng' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary' component={Link} href={`/downstream/agents/${id}`}>Quay lại</Button>
            <Button variant='contained' color='primary' startIcon={<i className='tabler-cash' />}>Ghi nhận Thanh toán</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Tổng Nợ Phải Thu (Tất cả kỳ)</Typography>
              <Typography variant='h3' className='font-black text-error'>$5,240.00</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Hạn mức tín dụng (Credit Limit)</Typography>
              <Typography variant='h3' className='font-black'>$50,000.00</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Hạn thanh toán tiếp theo</Typography>
              <Typography variant='h3' className='font-black text-primary'>15/05/2026</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex justify-between items-center'>
          <Typography variant='h6' className='font-black'>Bảng Đối Soát Hàng Tháng</Typography>
          <TextField 
            size='small'
            placeholder='Tìm kiếm kỳ...' 
            InputProps={{
              startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
            }}
          />
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Kỳ đối soát</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Nợ Đầu Kỳ</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Phát Sinh (Mua)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Đã Thanh Toán</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-error/5'>Nợ Cuối Kỳ</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Hạn Thu Tiền</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debtCycles.map((cycle) => (
                <TableRow key={cycle.month} hover>
                  <TableCell>
                    <Typography variant='body2' className='font-black'>Tháng {cycle.month}</Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='text-slate-500'>
                      {cycle.opening.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-bold text-error'>
                      +{cycle.purchases.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-bold text-success'>
                      -{cycle.payments.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right bg-error/5'>
                    <Typography variant='subtitle2' className='font-black text-error'>
                      {cycle.closing.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='text-slate-500'>{cycle.dueDate}</Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip label={cycle.status} color={getStatusColor(cycle.status) as any} size='small' variant='tonal' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                      <Button size='small' variant='outlined' color='secondary' startIcon={<i className='tabler-file-download' />}>PDF</Button>
                      <Button size='small' variant='tonal' color='primary'>Chi tiết</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default AgentDebt
