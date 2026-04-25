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

const MyOrdersView = () => {
  const myOrders = [
    { id: 'ORD-8241', product: 'Japan 10GB (Viettel)', amount: '$12.50', status: 'Success', date: 'Hôm nay, 14:20' },
    { id: 'ORD-8239', product: 'Global 1GB (Multi)', amount: '$9.00', status: 'Failed', date: 'Hôm nay, 14:05' },
    { id: 'ORD-8100', product: 'Europe 5GB (Orange)', amount: '$18.00', status: 'Success', date: '24/04/2026, 09:15' }
  ]

  return (
    <>
      <PageHeader
        title="Lịch sử Mua hàng"
        description="Xem lại các gói eSIM đã mua và tải xuống mã QR Code"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng' }, { label: 'Đơn của tôi' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6'>
            <TextField
              size='small'
              placeholder='Tìm theo mã đơn hoặc gói cước...'
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
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã Đơn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá thanh toán</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày mua</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((o) => (
                  <tr key={o.id} className='border-be last:border-0'>
                    <td className='p-4'><Typography variant='body2' className='font-mono font-bold text-primary'>{o.id}</Typography></td>
                    <td className='p-4'><Typography variant='body2' className='font-black'>{o.product}</Typography></td>
                    <td className='p-4'><Typography variant='body2' className='font-black text-slate-700'>{o.amount}</Typography></td>
                    <td className='p-4'>
                      <Chip 
                        label={o.status} 
                        size='small' 
                        variant='tonal' 
                        color={o.status === 'Success' ? 'success' : 'error'} 
                      />
                    </td>
                    <td className='p-4'><Typography variant='caption'>{o.date}</Typography></td>
                    <td className='p-4 text-right'>
                      <Button size='small' variant='tonal' startIcon={<i className='tabler-qrcode' />} disabled={o.status !== 'Success'}>
                        Lấy QR
                      </Button>
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

export default MyOrdersView
