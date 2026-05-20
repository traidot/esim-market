'use client'

import React, { useState } from 'react'
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
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'
import { formatVND } from '@/lib/format'

const SupplierDebtsList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const suppliers = [
    { id: 'airalo', name: 'Airalo API', code: 'AI', totalSpend: 85240.00, debt: 15240.00, balance: 0, status: 'Active', dueDate: '15/05/2026' },
    { id: '1global', name: '1Global (Truphone)', code: '1G', totalSpend: 45000.00, debt: 0, balance: 5000.00, status: 'Active', dueDate: '-' },
    { id: 'redtea', name: 'Redtea Mobile', code: 'RT', totalSpend: 12500.00, debt: 500.00, balance: 0, status: 'Active', dueDate: '10/05/2026' },
    { id: 'esimgo', name: 'eSIM Go', code: 'EG', totalSpend: 32500.00, debt: 12500.00, balance: 0, status: 'Warning', dueDate: '20/05/2026' },
  ]

  // Global metrics focusing on Spend
  const totalGlobalSpend = suppliers.reduce((acc, curr) => acc + curr.totalSpend, 0)
  const totalWalletBalance = suppliers.reduce((acc, curr) => acc + curr.balance, 0)
  const totalCurrentPayable = suppliers.reduce((acc, curr) => acc + curr.debt, 0)
  const filteredSuppliers = suppliers.filter(supplier => {
    const keyword = searchTerm.trim().toLowerCase()

    if (!keyword) return true

    return (
      supplier.name.toLowerCase().includes(keyword) ||
      supplier.code.toLowerCase().includes(keyword) ||
      supplier.id.toLowerCase().includes(keyword)
    )
  })

  return (
    <>
      <PageHeader
        title="Quản lý Tài chính Nhà cung cấp (Upstream)"
        description="Theo dõi tổng chi tiêu và số dư công nợ/ví đối với các đối tác cung cấp nguồn eSIM."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Tài chính' }, 
          { label: 'Tài chính NCC' }
        ]}
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm bg-primary/5 border-primary/20 h-full'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <i className='tabler-shopping-cart-up text-2xl text-white' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-primary uppercase'>Tổng Chi Tiêu Toàn Hệ Thống</Typography>
                <Typography variant='h2' className='font-black' sx={{ color: 'text.primary' }}>
                  {formatVND(totalGlobalSpend)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20 h-full'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                <i className='tabler-wallet text-2xl text-white' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-success uppercase'>Số dư</Typography>
                <Typography variant='h2' className='font-black text-success'>
                  {formatVND(totalWalletBalance)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20 h-full'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' sx={{ bgcolor: 'error.main', width: 56, height: 56 }}>
                <i className='tabler-credit-card text-2xl text-white' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Công nợ hiện tại</Typography>
                <Typography variant='h2' className='font-black text-error'>
                  {formatVND(totalCurrentPayable)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be'>
          <TextField 
            fullWidth 
            placeholder='Tìm nhà cung cấp (Tên, Mã, ID)...' 
            size='small'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
              }
            }}
          />
        </Box>
        
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 980 }}>
            <TableHead>
              <TableRow className='bg-slate-50'>
                <TableCell className='font-black uppercase text-[11px]'>Nhà Cung Cấp</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Tổng Chi Tiêu (All-time)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Công nợ</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Số dư</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Hạn Thanh Toán</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box className='flex flex-col items-center gap-2 py-12 text-slate-400'>
                      <i className='tabler-database-off text-4xl' />
                      <Typography variant='body2' className='font-semibold'>Không có dữ liệu</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id} hover>
                  <TableCell>
                    <Box className='flex items-center gap-3'>
                      <Avatar variant='rounded' className='bg-primary/10 text-primary font-black'>
                        {supplier.code}
                      </Avatar>
                      <Box>
                        <Typography variant='body2' className='font-black'>{supplier.name}</Typography>
                        <Typography variant='caption' className='text-slate-400 uppercase text-[10px]'>ID: {supplier.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body1' className='font-black text-slate-700'>
                      {formatVND(supplier.totalSpend)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='subtitle1' className={`font-black ${supplier.debt > 0 ? 'text-error' : 'text-slate-300'}`}>
                      {formatVND(supplier.debt)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='subtitle1' className={`font-black ${supplier.balance > 0 ? 'text-success' : 'text-slate-300'}`}>
                      {formatVND(supplier.balance)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Typography variant='body2' className='font-bold'>
                      {supplier.dueDate}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button 
                      size='small' 
                      variant='tonal' 
                      color='primary' 
                      component={Link} 
                      href={`/3m/finance/supplier-debts/${supplier.id}`}
                      startIcon={<i className='tabler-eye' />}
                      className='font-black'
                    >
                      Chi tiết
                    </Button>
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

export default SupplierDebtsList
