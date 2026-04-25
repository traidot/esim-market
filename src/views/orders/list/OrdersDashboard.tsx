'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const OrdersDashboard = () => {
  const orders = [
    { id: 'ORD-8241', agent: 'TravelConnect', product: 'Japan 10GB (Viettel)', amount: '$12.50', status: 'Success', date: '2026-04-25 14:20' },
    { id: 'ORD-8240', agent: 'Global eSIM Hub', product: 'Thailand 5GB (AIS)', amount: '$5.50', status: 'Success', date: '2026-04-25 14:15' },
    { id: 'ORD-8239', agent: 'TravelConnect', product: 'Global 1GB (Multi)', amount: '$9.00', status: 'Failed', date: '2026-04-25 14:05' },
    { id: 'ORD-8238', agent: 'Nomad Partner', product: 'Vietnam 20GB (Vinaphone)', amount: '$15.00', status: 'Processing', date: '2026-04-25 13:50' }
  ]

  return (
    <>
      <PageHeader
        title="Quản lý Đơn hàng"
        description="Theo dõi toàn bộ trạng thái cấp phát eSIM và lịch sử mua hàng từ các đại lý"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng' }, { label: 'Danh sách' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6 flex-wrap gap-4'>
            <TextField
              size='small'
              placeholder='Tìm theo Mã đơn, Đại lý hoặc Sản phẩm...'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }
              }}
              className='max-sm:is-full min-is-[350px]'
            />
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[900px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã Đơn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Đại lý</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Giá trị</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày mua</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'><Typography variant='body2' className='font-mono font-bold text-primary'>{o.id}</Typography></td>
                    <td className='p-4'><Typography variant='body2' className='font-bold'>{o.agent}</Typography></td>
                    <td className='p-4'><Typography variant='body2'>{o.product}</Typography></td>
                    <td className='p-4 text-right'><Typography variant='body2' className='font-black'>{o.amount}</Typography></td>
                    <td className='p-4'>
                      <Chip 
                        label={o.status} 
                        size='small' 
                        variant='tonal' 
                        color={o.status === 'Success' ? 'success' : o.status === 'Failed' ? 'error' : 'warning'} 
                        className='font-bold'
                      />
                    </td>
                    <td className='p-4'><Typography variant='caption'>{o.date}</Typography></td>
                    <td className='p-4 text-right'>
                      <Button size='small' variant='text'>Chi tiết</Button>
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

export default OrdersDashboard
