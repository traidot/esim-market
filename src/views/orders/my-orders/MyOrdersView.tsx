'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Pagination from '@mui/material/Pagination'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import Grid2 from '@mui/material/Grid2'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'
import { toast } from 'react-toastify'

import PageHeader from '@/components/layout/shared/PageHeader'

const MyOrdersView = () => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleOpenDetail = (order: any) => {
    setSelectedOrder(order)
    setOpenDetailDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDetailDialog(false)
    setTimeout(() => setSelectedOrder(null), 300)
  }

  const handleSendEmail = () => {
    toast.success('Đã gửi thông tin đơn hàng qua email thành công!')
    handleCloseDialog()
  }

  const baseOrders = [
    { product: 'Japan Travel eSIM', data: '10GB', validity: '30 Days', price: 12.5 },
    { product: 'Thailand Explorer', data: 'Unlimited', validity: '7 Days', price: 6.2 },
    { product: 'Europe Roaming', data: '5GB', validity: '15 Days', price: 9.0 },
    { product: 'USA Premium', data: '20GB', validity: '30 Days', price: 22.0 },
    { product: 'Vietnam Local', data: '20GB', validity: '30 Days', price: 5.5 }
  ]

  const myOrders = Array.from({ length: 15 }).map((_, i) => {
    const base = baseOrders[i % baseOrders.length]
    const qty = (i % 3) + 1
    const statuses = ['Success', 'Success', 'Success', 'Pending', 'Failed']
    const status = statuses[i % 5]
    
    return {
      id: `ORD-82${40 - i}`,
      product: base.product,
      data: base.data,
      validity: base.validity,
      qty,
      amount: `$${(base.price * qty).toFixed(2)}`,
      iccid: status === 'Success' ? `898401${Math.floor(Math.random() * 1000000000000).toString().padStart(13, '0')}` : '-',
      status,
      date: `2026-05-${String((i % 4) + 1).padStart(2, '0')} 14:${String((i * 7) % 60).padStart(2, '0')}`,
      remarks: i % 4 === 0 ? `Client ${i}` : ''
    }
  })

  return (
    <>
      <PageHeader
        title="Lịch sử Mua hàng"
        description="Quản lý chi tiết các đơn hàng eSIM đã mua, kiểm tra trạng thái và tải xuống mã QR Code"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng' }, { label: 'Danh sách' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent className='p-0'>
          {/* Tabs & Filters */}
          <Box className='border-b border-slate-200 px-4 pt-2'>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="Tất cả đơn hàng (42)" className='font-bold' />
              <Tab label="Thành công (35)" className='font-bold' />
              <Tab label="Đang chờ (5)" className='font-bold' />
              <Tab label="Thất bại (2)" className='font-bold' />
            </Tabs>
          </Box>

          <Box className='p-4 bg-slate-50/50 border-b border-slate-200'>
            <Box className='flex flex-wrap gap-4 items-center'>
              <TextField
                size='small'
                placeholder='Tìm mã đơn, ICCID...'
                slotProps={{ input: { startAdornment: <InputAdornment position='start'><i className='tabler-search text-slate-400' /></InputAdornment> } }}
                className='min-is-[250px] bg-white'
              />
              <TextField select size='small' defaultValue="all" className='min-is-[200px] bg-white'>
                <MenuItem value="all">Tất cả thời gian</MenuItem>
                <MenuItem value="today">Hôm nay</MenuItem>
                <MenuItem value="week">Tuần này</MenuItem>
                <MenuItem value="month">Tháng này</MenuItem>
              </TextField>
              <Button 
                variant={showFilters ? 'contained' : 'tonal'} 
                color='primary' 
                startIcon={<i className='tabler-filter' />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Lọc nâng cao
              </Button>
              <Box className='flex-grow' />
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-download' />}>Xuất Excel</Button>
            </Box>

            <Collapse in={showFilters}>
              <Box className='pt-4 mt-4 border-t border-slate-200'>
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth select size='small' label='Quốc gia' defaultValue='all' className='bg-white'>
                      <MenuItem value='all'>Tất cả quốc gia</MenuItem>
                      <MenuItem value='jp'>Nhật Bản</MenuItem>
                      <MenuItem value='kr'>Hàn Quốc</MenuItem>
                      <MenuItem value='th'>Thái Lan</MenuItem>
                      <MenuItem value='us'>Hoa Kỳ</MenuItem>
                    </TextField>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth type='date' size='small' label='Từ ngày' slotProps={{ inputLabel: { shrink: true } }} className='bg-white' />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth type='date' size='small' label='Đến ngày' slotProps={{ inputLabel: { shrink: true } }} className='bg-white' />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth select size='small' label='Dung lượng' defaultValue='all' className='bg-white'>
                      <MenuItem value='all'>Tất cả</MenuItem>
                      <MenuItem value='1gb'>1GB / Ngày</MenuItem>
                      <MenuItem value='2gb'>2GB / Ngày</MenuItem>
                      <MenuItem value='total5gb'>Tổng 5GB</MenuItem>
                      <MenuItem value='unlimited'>Không giới hạn</MenuItem>
                    </TextField>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth select size='small' label='Thời hạn (Ngày)' defaultValue='all' className='bg-white'>
                      <MenuItem value='all'>Tất cả</MenuItem>
                      <MenuItem value='3'>3 Ngày</MenuItem>
                      <MenuItem value='5'>5 Ngày</MenuItem>
                      <MenuItem value='7'>7 Ngày</MenuItem>
                      <MenuItem value='15'>15 Ngày</MenuItem>
                    </TextField>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField fullWidth size='small' label='Tên khách / Ghi chú' placeholder='Nhập tên...' className='bg-white' />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }} className='flex items-end justify-end gap-2'>
                    <Button variant='tonal' color='secondary'>Xóa bộ lọc</Button>
                    <Button variant='contained' color='primary'>Áp dụng</Button>
                  </Grid2>
                </Grid2>
              </Box>
            </Collapse>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[1000px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã Đơn / Ngày</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ghi chú khách</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>ICCID</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Số lượng</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Tổng tiền</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((o) => (
                  <tr key={o.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono font-bold text-primary'>{o.id}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{o.date}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{o.product}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{o.data} • {o.validity}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='text-slate-600'>{o.remarks || '-'}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono text-xs'>{o.iccid}</Typography>
                    </td>
                    <td className='p-4 text-right'>
                      <Typography variant='body2' className='font-medium'>{o.qty}</Typography>
                    </td>
                    <td className='p-4 text-right'>
                      <Typography variant='body2' className='font-black text-slate-700'>{o.amount}</Typography>
                    </td>
                    <td className='p-4 text-center'>
                      <Chip 
                        label={o.status === 'Success' ? 'Thành công' : o.status === 'Failed' ? 'Thất bại' : 'Đang chờ'} 
                        size='small' 
                        variant='tonal' 
                        color={o.status === 'Success' ? 'success' : o.status === 'Failed' ? 'error' : 'warning'} 
                        className='font-bold text-[10px]'
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex justify-end gap-1'>
                        <Tooltip title='Chi tiết'>
                          <IconButton size='small' color='secondary' onClick={() => handleOpenDetail(o)}>
                            <i className='tabler-eye' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          <Box className='p-4 flex justify-between items-center border-t border-slate-200'>
            <Typography variant='body2' className='text-slate-500'>Hiển thị 1 đến 15 của 42 đơn hàng</Typography>
            <Pagination count={3} color='primary' shape='rounded' />
          </Box>
        </CardContent>
      </Card>

      {/* Unified Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleCloseDialog} maxWidth='md' fullWidth>
        <DialogTitle className='flex items-center justify-between'>
          <Typography variant='h5' component='span' className='font-black'>Chi tiết đơn hàng</Typography>
          <IconButton onClick={handleCloseDialog} size='small'><i className='tabler-x' /></IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedOrder && (
            <Grid2 container spacing={6}>
              {/* Left Column: General Info */}
              <Grid2 size={{ xs: 12, md: selectedOrder.status === 'Success' ? 7 : 12 }}>
                <Box className='flex flex-col h-full'>
                  <Typography variant='subtitle1' className='font-bold uppercase text-slate-500 mbe-4'>1. Thông tin chung</Typography>
                  <Box className='p-5 bg-slate-50 rounded-xl border border-slate-100 flex-grow'>
                    <Box className='flex justify-between items-center mbe-6'>
                      <Typography variant='h6' className='font-black text-primary'>{selectedOrder.id}</Typography>
                      <Chip 
                        label={selectedOrder.status === 'Success' ? 'Thành công' : selectedOrder.status === 'Failed' ? 'Thất bại' : 'Đang chờ'} 
                        size='small' 
                        color={selectedOrder.status === 'Success' ? 'success' : selectedOrder.status === 'Failed' ? 'error' : 'warning'} 
                        variant='tonal'
                      />
                    </Box>
                    
                    <Grid2 container spacing={4}>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Sản phẩm</Typography>
                        <Typography variant='body1' className='font-bold'>{selectedOrder.product}</Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Dung lượng / Thời hạn</Typography>
                        <Typography variant='body1' className='font-bold'>{selectedOrder.data} / {selectedOrder.validity}</Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Ngày mua</Typography>
                        <Typography variant='body1' className='font-medium'>{selectedOrder.date}</Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Tổng tiền</Typography>
                        <Typography variant='body1' className='font-black text-xl text-slate-800'>{selectedOrder.amount}</Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12 }}>
                        <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Số lượng</Typography>
                        <Typography variant='body1' className='font-medium'>{selectedOrder.qty} eSIM</Typography>
                      </Grid2>
                      {selectedOrder.remarks && (
                        <Grid2 size={{ xs: 12 }}>
                          <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Ghi chú</Typography>
                          <Typography variant='body1' className='bg-white p-3 rounded border border-slate-200 m-t-1'>{selectedOrder.remarks}</Typography>
                        </Grid2>
                      )}
                    </Grid2>
                  </Box>
                </Box>
              </Grid2>

              {/* Right Column: QR Info and Email Form (Only for Success) */}
              {selectedOrder.status === 'Success' && (
                <Grid2 size={{ xs: 12, md: 5 }}>
                  <Box className='flex flex-col gap-6'>
                    {/* QR Info Section */}
                    <Box>
                      <Typography variant='subtitle1' className='font-bold uppercase text-slate-500 mbe-4'>2. Thông tin QR</Typography>
                      <Box className='p-5 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-sm'>
                        <Box className='bg-slate-50 p-3 rounded-lg mbe-4'>
                          <i className='tabler-qrcode text-[120px] text-slate-800' />
                        </Box>
                        <Typography variant='body2' className='text-slate-500 mbe-1 uppercase tracking-wider text-[10px]'>ICCID</Typography>
                        <Typography variant='body1' className='font-mono font-bold mbe-4'>{selectedOrder.iccid}</Typography>
                        <Button variant='contained' color='primary' startIcon={<i className='tabler-download' />} fullWidth>
                          Tải QR Code
                        </Button>
                      </Box>
                    </Box>

                    {/* Email Form Section */}
                    <Box>
                      <Typography variant='subtitle1' className='font-bold uppercase text-slate-500 mbe-4'>3. Gửi cho khách hàng</Typography>
                      <Box className='p-5 bg-slate-50 rounded-xl border border-slate-100'>
                        <Typography variant='body2' className='text-slate-600 mbe-3'>Nhập email để gửi thông tin và mã QR trực tiếp cho khách hàng.</Typography>
                        <Box className='flex flex-col gap-3'>
                          <TextField 
                            fullWidth 
                            size='small' 
                            placeholder='Email người nhận...' 
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position='start'><i className='tabler-mail text-slate-400' /></InputAdornment>
                              }
                            }}
                            className='bg-white'
                          />
                          <Button 
                            variant='tonal' 
                            color='primary' 
                            startIcon={<i className='tabler-send' />}
                            onClick={handleSendEmail}
                          >
                            Gửi Email
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid2>
              )}
            </Grid2>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0 border-t border-slate-100 mt-2'>
          <Button variant='tonal' color='secondary' onClick={handleCloseDialog} className='px-8'>Đóng lại</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MyOrdersView
