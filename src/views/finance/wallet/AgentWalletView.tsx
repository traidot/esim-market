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
import Grid2 from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentWalletView = () => {
  const [openDepositDialog, setOpenDepositDialog] = useState(false)
  
  const walletData = {
    balance: 1250.75,
    currency: 'USD',
    status: 'Active',
    lastTopup: '2026-05-01 10:30',
    accountNumber: 'W-99827361'
  }

  const recentTransactions = [
    { id: 'W-TRX-101', type: 'Top-up', method: 'Bank Transfer', amount: 500.00, status: 'Completed', date: '2026-05-01 10:30' },
    { id: 'W-TRX-102', type: 'Purchase', method: 'Wallet Payment', amount: -12.50, status: 'Completed', date: '2026-05-02 14:20', reference: 'ORD-99812' },
    { id: 'W-TRX-103', type: 'Purchase', method: 'Wallet Payment', amount: -6.20, status: 'Completed', date: '2026-05-03 09:15', reference: 'ORD-99815' },
    { id: 'W-TRX-104', type: 'Refund', method: 'System Credit', amount: 15.00, status: 'Completed', date: '2026-05-04 11:00', reference: 'REF-001' }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <>
      <PageHeader
        title="Ví của tôi (My Wallet)"
        description="Quản lý số dư và theo dõi lịch sử biến động số dư ví của bạn."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài chính' }, { label: 'Ví tiền' }]}
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        {/* Main Balance Card */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card className='border-none shadow-sm bg-primary h-full overflow-hidden relative'>
            <Box className='absolute top-0 right-0 p-4 opacity-10'>
              <i className='tabler-wallet text-[180px] -mr-12 -mt-12' />
            </Box>
            <CardContent className='p-8 relative z-10'>
              <Stack spacing={6}>
                <Box className='flex justify-between items-start'>
                  <Box>
                    <Typography variant='subtitle2' className='text-white/70 font-bold uppercase tracking-widest'>Số dư hiện dụng</Typography>
                    <Typography variant='h1' className='text-white font-black mts-2'>{formatCurrency(walletData.balance)}</Typography>
                  </Box>
                  <Chip label="Đang hoạt động" size='small' className='bg-white/20 text-white font-black' />
                </Box>

                <Box className='flex gap-4'>
                  <Box>
                    <Typography variant='caption' className='text-white/60 block uppercase text-[10px]'>Mã định danh Ví</Typography>
                    <Typography variant='body2' className='text-white font-mono font-bold'>{walletData.accountNumber}</Typography>
                  </Box>
                  <Divider orientation='vertical' flexItem className='border-white/20' />
                  <Box>
                    <Typography variant='caption' className='text-white/60 block uppercase text-[10px]'>Cập nhật lần cuối</Typography>
                    <Typography variant='body2' className='text-white font-bold'>{walletData.lastTopup}</Typography>
                  </Box>
                </Box>

                <Box className='flex gap-4'>
                  <Button 
                    variant='contained' 
                    className='bg-white text-primary hover:bg-white/90 font-black px-8'
                    startIcon={<i className='tabler-history' />}
                    component={Link}
                    href='/agent/finance/transactions'
                  >
                    Sao kê chi tiết
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Info Card */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-black mbe-4'>Hướng dẫn nạp tiền</Typography>
              <Stack spacing={4}>
                <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4'>
                  <Avatar variant='rounded' className='bg-primary/10 text-primary'>
                    <i className='tabler-building-bank' />
                  </Avatar>
                  <Box>
                    <Typography variant='caption' className='text-slate-500 block uppercase font-bold text-[10px]'>Ngân hàng (Auto-topup)</Typography>
                    <Typography variant='body2' className='font-black'>Vietcombank - 1018273645</Typography>
                    <Typography variant='caption' className='text-slate-400'>CTK: CONG TY TNHH ESIM MARKET</Typography>
                  </Box>
                  <IconButton size='small' className='mis-auto' onClick={() => navigator.clipboard.writeText('1018273645')}><i className='tabler-copy' /></IconButton>
                </Box>
                
                <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4'>
                  <Avatar variant='rounded' className='bg-success/10 text-success'>
                    <i className='tabler-qrcode' />
                  </Avatar>
                  <Box>
                    <Typography variant='caption' className='text-slate-500 block uppercase font-bold text-[10px]'>Nội dung chuyển khoản</Typography>
                    <Typography variant='body2' className='font-black text-primary uppercase'>{walletData.accountNumber}</Typography>
                    <Typography variant='caption' className='text-slate-400'>Tiền sẽ vào ví tự động sau 1-2 phút</Typography>
                  </Box>
                  <IconButton size='small' className='mis-auto' onClick={() => navigator.clipboard.writeText(walletData.accountNumber)}><i className='tabler-copy' /></IconButton>
                </Box>
                
                <Box className='p-4 bg-warning/5 rounded-xl border border-warning/10'>
                  <Typography variant='body2' className='text-warning-dark font-medium leading-relaxed'>
                    Lưu ý: Vui lòng ghi đúng <strong>Nội dung chuyển khoản</strong> để hệ thống tự động nhận diện và cộng tiền vào ví.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Transaction Table */}
      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex justify-between items-center'>
          <Typography variant='h6' className='font-black'>Biến động số dư gần đây</Typography>
          <Button 
            variant='text' 
            size='small' 
            className='font-bold' 
            endIcon={<i className='tabler-arrow-narrow-right' />}
            component={Link}
            href='/agent/finance/transactions'
          >
            Xem tất cả
          </Button>
        </Box>
        <Box className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50 border-be'>
                <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày & Thời gian</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase'>Loại giao dịch</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase'>Nội dung / Reference</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Biến động</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                  <td className='p-4'>
                    <Typography variant='body2' className='font-medium'>{t.date}</Typography>
                    <Typography variant='caption' className='text-slate-400 font-mono'>{t.id}</Typography>
                  </td>
                  <td className='p-4'>
                    <Box className='flex items-center gap-2'>
                      <Avatar variant='rounded' className={`is-7 bs-7 bg-${t.amount > 0 ? 'success' : 'error'}/10 text-${t.amount > 0 ? 'success' : 'error'}`}>
                        <i className={t.amount > 0 ? 'tabler-arrow-up-right' : 'tabler-arrow-down-left'} />
                      </Avatar>
                      <Typography variant='body2' className='font-bold'>{t.type}</Typography>
                    </Box>
                  </td>
                  <td className='p-4'>
                    <Typography variant='body2' className='font-medium text-slate-700'>{t.method}</Typography>
                    {t.reference && <Typography variant='caption' className='text-slate-500'>Ref: <span className='font-bold'>{t.reference}</span></Typography>}
                  </td>
                  <td className='p-4 text-right'>
                    <Typography variant='body2' className={`font-black ${t.amount > 0 ? 'text-success' : 'text-error'}`}>
                      {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                    </Typography>
                  </td>
                  <td className='p-4 text-center'>
                    <Chip label='Thành công' color='success' size='small' variant='tonal' className='font-bold text-[10px]' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Card>
    </>
  )
}

export default AgentWalletView
