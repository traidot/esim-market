'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const TransactionsList = () => {
  const transactions = [
    { id: 'T001', agent: 'TravelConnect', type: 'Purchase', amount: '-$12.50', status: 'Completed', date: '2026-04-25 14:20' },
    { id: 'T002', agent: 'Global eSIM Hub', type: 'Top-up', amount: '+$500.00', status: 'Completed', date: '2026-04-25 14:15' },
    { id: 'T003', agent: 'CheapData Agency', type: 'Purchase', amount: '-$4.50', status: 'Pending', date: '2026-04-25 14:00' },
    { id: 'T004', agent: 'Nomad Partner', type: 'Refund', amount: '+$9.00', status: 'Completed', date: '2026-04-25 13:45' }
  ]

  return (
    <>
      <PageHeader
        title="Lịch sử Giao dịch"
        description="Toàn bộ lịch sử biến động số dư, nạp tiền và mua hàng trên toàn hệ thống"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài chính' }, { label: 'Giao dịch' }]}
        actions={
          <Button variant='tonal' startIcon={<i className='tabler-download' />}>Xuất Báo cáo</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6 flex-wrap gap-4'>
            <TextField
              size='small'
              placeholder='Tìm theo Mã giao dịch hoặc Đại lý...'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }
              }}
              className='max-sm:is-full min-is-[300px]'
            />
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[800px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã Giao dịch</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Đại lý</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Loại</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Số tiền</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày giờ</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'><Typography variant='body2' className='font-mono font-bold text-primary'>{t.id}</Typography></td>
                    <td className='p-4'><Typography variant='body2' className='font-bold'>{t.agent}</Typography></td>
                    <td className='p-4'>
                      <Chip 
                        label={t.type} 
                        size='small' 
                        variant='tonal' 
                        color={t.type === 'Top-up' ? 'success' : t.type === 'Refund' ? 'info' : 'secondary'} 
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Typography variant='body2' className={`font-black ${t.amount.startsWith('+') ? 'text-success' : 'text-error'}`}>
                        {t.amount}
                      </Typography>
                    </td>
                    <td className='p-4'><Typography variant='caption'>{t.date}</Typography></td>
                    <td className='p-4'>
                      <Chip label={t.status} size='small' color={t.status === 'Completed' ? 'success' : 'warning'} variant='tonal' className='font-bold' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default TransactionsList
