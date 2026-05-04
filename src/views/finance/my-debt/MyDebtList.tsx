'use client'

import Link from 'next/link'

import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { toast } from 'react-toastify'

import PageHeader from '@/components/layout/shared/PageHeader'

const MyDebtList = () => {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)
  const currentDebt = 5240.00
  const [paymentAmount, setPaymentAmount] = useState(currentDebt)
  const creditLimit = 50000.00
  const usageRatio = (currentDebt / creditLimit) * 100

  const statements = [
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

  const handlePaymentSubmit = () => {
    toast.success('Yêu cầu thanh toán đã được gửi thành công. Vui lòng chờ kế toán duyệt!')
    setOpenPaymentDialog(false)
  }

  const handleOpenPayment = (amount: number) => {
    setPaymentAmount(amount)
    setOpenPaymentDialog(true)
  }

  return (
    <>
      <PageHeader
        title="Công nợ của tôi (My Debt)"
        description="Kiểm tra hạn mức tín dụng, theo dõi sao kê hàng tháng và thanh toán công nợ đúng hạn để duy trì kết nối dịch vụ."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Kênh Đại lý' }, 
          { label: 'Công nợ của tôi' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='primary' startIcon={<i className='tabler-cash-banknote' />} onClick={() => handleOpenPayment(currentDebt)}>Thanh toán ngay</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20'>
            <CardContent className='p-6 flex flex-col justify-between h-full'>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Tổng Công Nợ Phải Trả</Typography>
                <Typography variant='h3' className='font-black text-error'>
                  {currentDebt.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
              </Box>
              <Typography variant='caption' className='text-slate-600 font-bold mt-2'>Thanh toán trước ngày 15/05/2026</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-6'>
              <Box className='flex justify-between items-end mbe-2'>
                <Box>
                  <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Hạn mức tín dụng (Credit Limit)</Typography>
                  <Typography variant='h4' className='font-black text-primary'>
                    {creditLimit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </Typography>
                </Box>
                <Typography variant='subtitle2' className='font-bold text-slate-500'>
                  Đã dùng {usageRatio.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant='determinate' 
                value={usageRatio} 
                color={usageRatio > 80 ? 'error' : 'primary'} 
                className='bs-3 rounded-full mbe-2' 
              />
              <Typography variant='caption' className='text-slate-400'>
                Hạn mức khả dụng còn lại: {(creditLimit - currentDebt).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. Hệ thống sẽ tự động chặn xuất eSIM nếu công nợ vượt hạn mức.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex justify-between items-center'>
          <Typography variant='h6' className='font-black'>Sao kê hàng tháng (Monthly Statements)</Typography>
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
                <TableCell className='font-black uppercase text-[11px]'>Kỳ Sao kê</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Nợ Đầu Kỳ</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Đơn hàng (Phát sinh)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Đã Thanh Toán</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-error/5 text-error'>Nợ Cuối Kỳ</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Hạn Thanh Toán</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statements.map((stmt) => (
                <TableRow key={stmt.month} hover>
                  <TableCell>
                    <Typography variant='body2' className='font-black'>Tháng {stmt.month}</Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='text-slate-500'>
                      {stmt.opening.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-bold text-error'>
                      +{stmt.purchases.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-bold text-success'>
                      -{stmt.payments.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right bg-error/5'>
                    <Typography variant='subtitle2' className='font-black text-error'>
                      {stmt.closing.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Typography variant='body2' className='text-slate-500 font-bold'>{stmt.dueDate}</Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip label={stmt.status} color={getStatusColor(stmt.status) as any} size='small' variant='tonal' className='font-bold' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                      <Button size='small' variant='outlined' color='secondary' startIcon={<i className='tabler-file-download' />}>Tải Invoice</Button>
                      <Button component={Link} href='/finance/transactions' size='small' variant='tonal' color='primary'>Lịch sử Giao dịch</Button>
                      <Button size='small' variant='contained' color='success' startIcon={<i className='tabler-cash-banknote' />} onClick={() => handleOpenPayment(stmt.closing)} disabled={stmt.closing <= 0}>Thanh toán</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth='sm' fullWidth>
        <DialogTitle className='font-black'>Thanh toán công nợ</DialogTitle>
        <DialogContent className='flex flex-col gap-4 p-6 pt-2'>
          <Typography variant='body2' className='text-slate-500 mbe-2'>
            Vui lòng nhập thông tin thanh toán. Bộ phận kế toán sẽ đối soát và cập nhật công nợ cho bạn.
          </Typography>
          
          <TextField 
            label='Số tiền thanh toán (USD)' 
            type='number' 
            fullWidth 
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              }
            }}
          />
          
          <TextField 
            select 
            label='Phương thức thanh toán' 
            fullWidth 
            defaultValue='bank_transfer'
          >
            <MenuItem value='bank_transfer'>Chuyển khoản ngân hàng</MenuItem>
            <MenuItem value='cash'>Tiền mặt</MenuItem>
          </TextField>

          <TextField 
            label='Mã tham chiếu / Ghi chú' 
            placeholder='Nhập mã giao dịch hoặc nội dung CK' 
            fullWidth 
            multiline
            rows={2}
          />

          <Box className='p-4 bg-primary/5 rounded-lg border border-primary/20 mt-2'>
            <Typography variant='subtitle2' className='font-bold text-primary mbe-1'>Thông tin chuyển khoản:</Typography>
            <Typography variant='body2' className='text-slate-700'>Ngân hàng: <strong>Vietcombank</strong></Typography>
            <Typography variant='body2' className='text-slate-700'>Số TK: <strong>0123456789</strong></Typography>
            <Typography variant='body2' className='text-slate-700'>Chủ TK: <strong>CONG TY TNHH ESIM MARKET</strong></Typography>
            <Typography variant='body2' className='text-slate-700 mt-1 text-xs text-slate-500'>Nội dung CK: THANH TOAN CONG NO [TÊN ĐẠI LÝ]</Typography>
          </Box>

        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={() => setOpenPaymentDialog(false)}>Hủy bỏ</Button>
          <Button variant='contained' color='primary' startIcon={<i className='tabler-send' />} onClick={handlePaymentSubmit}>
            Xác nhận thanh toán
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MyDebtList
