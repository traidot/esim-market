'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import PageHeader from '@/components/layout/shared/PageHeader'
import { formatVND, formatDate } from '@/lib/format'

const SupplierDebtDetail = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const suppliersMock = [
    { id: 'airalo', name: 'Airalo API', code: 'AI', balance: 15240.00, status: 'Active', dueDate: '2026-05-15', type: 'postpaid', email: 'finance@airalo.com', phone: '+1 234 567 890', joinDate: '2024-10-12', currency: 'USD' },
    { id: '1global', name: '1Global (Truphone)', code: '1G', balance: 5000.00, status: 'Active', dueDate: '-', type: 'prepaid', email: 'billing@1global.com', phone: '+44 888 999 000', joinDate: '2024-11-05', currency: 'USD' },
    { id: 'redtea', name: 'Redtea Mobile', code: 'RT', balance: 500.00, status: 'Active', dueDate: '2026-05-10', type: 'postpaid', email: 'ops@redteamobile.com', phone: '+852 1122 3344', joinDate: '2025-01-20', currency: 'JPY' },
    { id: 'esimgo', name: 'eSIM Go', code: 'EG', balance: 12500.00, status: 'Warning', dueDate: '2026-05-20', type: 'postpaid', email: 'support@esimgo.com', phone: '+44 123 456 789', joinDate: '2025-02-15', currency: 'VND' },
  ]

  const supplier = suppliersMock.find(s => s.id === id) || suppliersMock[0]

  const transactions = [
    { id: 'SUP-9901', type: 'order_sync', description: 'Đơn hàng đồng bộ tự động', amount: 450.50, balance: 15240.00, date: '2026-04-28 14:15:22' },
    { id: 'SUP-9882', type: 'payment', description: 'Thanh toán nợ định kỳ T3/2026', amount: -10000.00, balance: 14789.50, date: '2026-04-25 10:30:00' },
    { id: 'SUP-9875', type: 'order_sync', description: 'Đơn hàng đồng bộ tự động', amount: 120.00, balance: 24789.50, date: '2026-04-24 16:12:05' },
    { id: 'SUP-9860', type: 'deposit', description: 'Nạp tiền vào ví NCC', amount: -5000.00, balance: 24669.50, date: '2026-04-20 09:45:00' },
  ]

  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize))
  const paginatedTransactions = transactions.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <PageHeader
        title={supplier.type === 'postpaid' ? `Quản lý Công nợ: ${supplier.name}` : `Quản lý Ví: ${supplier.name}`}
        description={supplier.type === 'postpaid' ? "Theo dõi lịch sử đơn hàng và thanh toán công nợ định kỳ." : "Quản lý số dư ví, nạp tiền và chi tiêu từ ví nhà cung cấp."}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tài chính' },
          { label: 'Phải trả (NCC)', href: '/finance/supplier-debts' },
          { label: supplier.name }
        ]}
        actions={
          <Stack direction='row' spacing={3}>
            {supplier.type === 'postpaid' ? (
              <>
                <Button variant='tonal' color='secondary' startIcon={<i className='tabler-file-download' />}>Xuất sao kê</Button>
                <Button variant='contained' color='error' startIcon={<i className='tabler-receipt' />}>Thanh toán nợ</Button>
              </>
            ) : (
              <>
                <Button variant='tonal' color='secondary' startIcon={<i className='tabler-file-download' />}>Xuất báo cáo ví</Button>
                <Button variant='contained' color='success' startIcon={<i className='tabler-plus' />}>Nạp tiền NCC</Button>
              </>
            )}
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Left Side: Supplier Info */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack spacing={6}>
            <Card className='border-none shadow-sm overflow-hidden'>
              <Box className={`h-24 ${supplier.type === 'postpaid' ? 'bg-warning/10' : 'bg-success/10'}`} />
              <CardContent className='relative pbs-0'>
                <Box className='flex justify-center -mbs-12 mbe-4'>
                  <Avatar 
                    variant='rounded' 
                    sx={{ width: 100, height: 100, fontSize: '40px', fontWeight: 900, bgcolor: supplier.type === 'postpaid' ? 'warning.main' : 'success.main', border: '5px solid white', boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)' }}
                  >
                    {supplier.code}
                  </Avatar>
                </Box>
                <Box className='text-center mbe-6'>
                  <Typography variant='h5' className='font-black'>{supplier.name}</Typography>
                  <Typography variant='caption' className='font-bold text-slate-500 uppercase text-[10px]'>ID: {supplier.id} • {supplier.type.toUpperCase()}</Typography>
                  <Box className='flex justify-center gap-2 mbs-2'>
                    <Chip label="API Partner" size='small' color='primary' variant='tonal' className='font-bold' />
                    <Chip label={supplier.status} size='small' color={supplier.status === 'Warning' ? 'warning' : 'success'} variant='tonal' className='font-bold' />
                  </Box>
                </Box>

                <Stack spacing={4} className='border-ts pts-6'>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='body2' className='font-bold text-slate-500'>Email</Typography>
                    <Typography variant='body2' className='font-black text-right'>{supplier.email}</Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='body2' className='font-bold text-slate-500'>Số điện thoại</Typography>
                    <Typography variant='body2' className='font-black'>{supplier.phone}</Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='body2' className='font-bold text-slate-500'>Ngày gia nhập</Typography>
                    <Typography variant='body2' className='font-black'>{formatDate(supplier.joinDate)}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>

        {/* Right Side: Metrics & Transactions */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Stack spacing={6}>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Card className={`border-none shadow-sm ${supplier.type === 'postpaid' ? 'bg-error/5 border-error/10' : 'bg-success/5 border-success/10'}`}>
                  <CardContent className='p-6'>
                    <Typography variant='caption' className={`font-bold uppercase text-[10px] ${supplier.type === 'postpaid' ? 'text-error' : 'text-success'}`}>
                      {supplier.type === 'postpaid' ? 'Dư nợ hiện tại' : 'Số dư ví'}
                    </Typography>
                    <Typography variant='h3' className={`font-black ${supplier.type === 'postpaid' ? 'text-error' : 'text-success'}`}>
                      {formatVND(supplier.balance)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Card className='border-none shadow-sm bg-slate-50'>
                  <CardContent className='p-6'>
                    <Typography variant='caption' className='font-bold text-slate-500 uppercase text-[10px]'>Tổng chi tiêu (Tháng này)</Typography>
                    <Typography variant='h3' className='font-black text-slate-800'>
                      {formatVND(28450)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>

            <Card className='border-none shadow-sm overflow-hidden'>
              <Box className='p-5 border-be bg-slate-50/50 flex justify-between items-center'>
                <Typography variant='h6' className='font-black'>Lịch sử Biến động Tài chính</Typography>
                <Button variant='text' size='small' color='primary' className='font-black uppercase text-[11px]'>Tải Excel</Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead className='bg-slate-50'>
                    <TableRow>
                      <TableCell className='font-black uppercase text-[11px]'>Mã GD</TableCell>
                      <TableCell className='font-black uppercase text-[11px]'>Nội dung</TableCell>
                      <TableCell className='font-black uppercase text-[11px] text-right'>Số tiền</TableCell>
                      <TableCell className='font-black uppercase text-[11px] text-right'>Số dư sau GD</TableCell>
                      <TableCell className='font-black uppercase text-[11px] text-right text-slate-400'>Thời gian</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTransactions.map((tx) => (
                      <TableRow key={tx.id} hover>
                        <TableCell>
                          <Typography variant='body2' className='font-black text-primary'>{tx.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-3'>
                            <Avatar variant='rounded' sx={{ width: 32, height: 32, bgcolor: tx.type === 'order_sync' ? 'primary.light' : 'success.light' }}>
                              <i className={`tabler-${tx.type === 'order_sync' ? 'refresh' : 'cash'} text-sm text-white`} />
                            </Avatar>
                            <Box>
                              <Typography variant='body2' className='font-bold'>{tx.description}</Typography>
                              <Typography variant='caption' className='text-slate-400 uppercase text-[10px]'>{tx.type}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Typography variant='body2' className={`font-black ${tx.amount > 0 ? 'text-warning' : 'text-success'}`}>
                            {tx.amount > 0 ? '+' : '-'}{formatVND(Math.abs(tx.amount))}
                          </Typography>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Typography variant='body2' className='font-black'>{formatVND(tx.balance)}</Typography>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Typography variant='caption' className='font-bold text-slate-400'>{tx.date}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className='p-5 border-ts bg-slate-50/30 flex justify-between items-center'>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Typography variant='caption' className='text-slate-500'>
                    Hiển thị
                  </Typography>
                  <Select
                    size='small'
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value))
                      setPage(1)
                    }}
                    sx={{ fontSize: '0.75rem', minWidth: 70 }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                  <Typography variant='caption' className='text-slate-500'>
                    hàng / trang
                  </Typography>
                </Stack>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, v) => setPage(v)}
                  color='primary'
                  shape='rounded'
                  size='small'
                />
              </Box>
            </Card>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  )
}

export default SupplierDebtDetail
