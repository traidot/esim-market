'use client'

import { useSearchParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Pagination from '@mui/material/Pagination'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid2 from '@mui/material/Grid2'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import { toast } from 'react-toastify'

import PageHeader from '@/components/layout/shared/PageHeader'

type OrderStatus = 'Success' | 'Pending' | 'Failed'

const DEFAULT_ADVANCED_FILTERS = {
  esimType: 'all',
  dataLimit: 'all',
  validity: 'all',
  fromDate: '',
  toDate: ''
}

const STATUS_FILTER_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'Success', label: 'Thành công' },
  { value: 'Pending', label: 'Đang xử lý' },
  { value: 'Failed', label: 'Thất bại' }
]

const STATUS_LABELS = STATUS_FILTER_OPTIONS.reduce<Record<string, string>>((acc, option) => {
  acc[option.value] = option.label

  return acc
}, {})

const MyOrdersView = () => {
  const searchParams = useSearchParams()
  const orderIdFromQuery = searchParams.get('orderId') ?? ''
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [search, setSearch] = useState(orderIdFromQuery)
  const [timeRange, setTimeRange] = useState('all')
  const [statusFilters, setStatusFilters] = useState<OrderStatus[]>([])
  const [esimType, setEsimType] = useState('all')
  const [dataLimit, setDataLimit] = useState('all')
  const [validity, setValidity] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [draftAdvancedFilters, setDraftAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS)

  const handleOpenDetail = (order: any) => {
    setSelectedOrder(order)
    setOpenDetailDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDetailDialog(false)
    setTimeout(() => setSelectedOrder(null), 300)
  }

  const handleSendEmail = () => {
    toast.success('Đã gửi thông tin eSIM qua email thành công!')
    handleCloseDialog()
  }

  const baseOrders = [
    { product: 'Japan Travel eSIM', data: '10GB', validity: '30 Days', type: 'Total', price: 12.5 },
    { product: 'Thailand Explorer', data: 'Unlimited', validity: '7 Days', type: 'Daily', price: 6.2 },
    { product: 'Europe Roaming', data: '5GB', validity: '15 Days', type: 'Total', price: 9.0 },
    { product: 'USA Premium', data: '20GB', validity: '30 Days', type: 'Total', price: 22.0 },
    { product: 'Vietnam Local', data: '20GB', validity: '30 Days', type: 'Total', price: 5.5 }
  ]

  const orderIds = [
    'ORD-99812',
    'ORD-99816',
    'ORD-99817',
    'ORD-99818',
    'ORD-99819',
    'ORD-99820',
    'ORD-99815',
    'ORD-99821',
    'ORD-99822',
    'ORD-99823',
    'ORD-99824',
    'ORD-99825',
    'ORD-99826',
    'ORD-99827',
    'ORD-99828'
  ]

  const myOrders = Array.from({ length: 15 }).map((_, i) => {
    const base = baseOrders[i % baseOrders.length]
    const qty = (i % 3) + 1
    const statuses = ['Success', 'Success', 'Success', 'Pending', 'Failed']
    const status = statuses[i % 5]

    const iccids = status === 'Success'
      ? Array.from({ length: qty }).map((__, k) => {
          const seed = (i + 1) * 1000003 + k * 7919

          return `898401${seed.toString().padStart(13, '0').slice(-13)}`
        })
      : []

    return {
      id: `TXN-${8240 - i}`,
      orderId: orderIds[i],
      product: base.product,
      data: base.data,
      validity: base.validity,
      type: base.type,
      qty,
      amount: `$${(base.price * qty).toFixed(2)}`,
      iccids,
      iccid: iccids[0] ?? '-',
      status,
      date: `2026-05-${String((i % 4) + 1).padStart(2, '0')} 14:${String((i * 7) % 60).padStart(2, '0')}`,
      remarks: i % 4 === 0 ? `Client ${i}` : ''
    }
  })

  const advancedFilterCount = [
    esimType !== 'all',
    dataLimit !== 'all',
    validity !== 'all',
    fromDate || toDate
  ].filter(Boolean).length

  const hasAnyFilter = search.trim().length > 0 || timeRange !== 'all' || statusFilters.length > 0 || advancedFilterCount > 0

  const filteredOrders = myOrders.filter(o => {
    const keyword = search.trim().toLowerCase()
    const orderDate = o.date.slice(0, 10)
    const matchKeyword =
      !keyword ||
      o.id.toLowerCase().includes(keyword) ||
      o.orderId.toLowerCase().includes(keyword) ||
      o.product.toLowerCase().includes(keyword) ||
      o.iccids.some(iccid => iccid.toLowerCase().includes(keyword)) ||
      o.iccid.toLowerCase().includes(keyword)

    const matchTime =
      timeRange === 'all' ||
      (timeRange === 'today' && orderDate === '2026-05-01') ||
      (timeRange === 'week' && orderDate >= '2026-05-01' && orderDate <= '2026-05-07') ||
      (timeRange === 'month' && orderDate.startsWith('2026-05'))

    const matchAdvanced =
      (esimType === 'all' || o.type === esimType) &&
      (dataLimit === 'all' || o.data === dataLimit) &&
      (validity === 'all' || o.validity === validity) &&
      (!fromDate || orderDate >= fromDate) &&
      (!toDate || orderDate <= toDate)

    const matchStatus = statusFilters.length === 0 || statusFilters.includes(o.status as OrderStatus)

    return matchKeyword && matchTime && matchAdvanced && matchStatus
  })

  const resetFilters = () => {
    setSearch('')
    setTimeRange('all')
    setStatusFilters([])
    setEsimType('all')
    setDataLimit('all')
    setValidity('all')
    setFromDate('')
    setToDate('')
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

  const openAdvancedFilters = () => {
    setDraftAdvancedFilters({ esimType, dataLimit, validity, fromDate, toDate })
    setAdvancedOpen(true)
  }

  const resetAdvancedDraft = () => {
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

  const applyAdvancedFilters = () => {
    setEsimType(draftAdvancedFilters.esimType)
    setDataLimit(draftAdvancedFilters.dataLimit)
    setValidity(draftAdvancedFilters.validity)
    setFromDate(draftAdvancedFilters.fromDate)
    setToDate(draftAdvancedFilters.toDate)
    setAdvancedOpen(false)
  }

  return (
    <>
      <PageHeader
        title="Lịch sử mua eSIM"
        description="Theo dõi lịch sử mua các gói eSIM, số lượng và trạng thái kích hoạt"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đại lý' }, { label: 'Lịch sử mua eSIM' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent className='p-0'>
          <Box className='p-4 bg-white border-b border-slate-200'>
            <Grid2 container spacing={3} alignItems='flex-end'>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Tìm kiếm</Typography>
                <TextField
                  fullWidth
                  size='small'
                  placeholder='Tìm mã giao dịch, order ID, ICCID, sản phẩm...'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  slotProps={{ input: { startAdornment: <InputAdornment position='start'><i className='tabler-search text-slate-400' /></InputAdornment> } }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Thời gian</Typography>
                <TextField select fullWidth size='small' value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                  <MenuItem value='all'>Tất cả thời gian</MenuItem>
                  <MenuItem value='today'>Hôm nay</MenuItem>
                  <MenuItem value='week'>Tuần này</MenuItem>
                  <MenuItem value='month'>Tháng này</MenuItem>
                </TextField>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 2.2 }}>
                <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Trạng thái</Typography>
                <TextField
                  select
                  fullWidth
                  size='small'
                  value={statusFilters}
                  onChange={e => {
                    const value = e.target.value

                    setStatusFilters(typeof value === 'string' ? value.split(',') as OrderStatus[] : value as OrderStatus[])
                  }}
                  slotProps={{
                    select: {
                      multiple: true,
                      displayEmpty: true,
                      renderValue: selected => {
                        const selectedStatuses = selected as OrderStatus[]

                        if (selectedStatuses.length === 0) {
                          return <Typography component='span' className='text-slate-400'>Tất cả trạng thái</Typography>
                        }

                        return selectedStatuses.map(status => STATUS_LABELS[status]).join(', ')
                      }
                    }
                  }}
                >
                  {STATUS_FILTER_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox size='small' checked={statusFilters.includes(option.value)} className='p-0 mie-2' />
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={{ xs: 6, md: 1.4 }}>
                <Button
                  fullWidth
                  variant='outlined'
                  size='small'
                  startIcon={<i className='tabler-adjustments-horizontal text-[14px]' />}
                  onClick={openAdvancedFilters}
                  sx={{
                    height: 38,
                    borderColor: advancedFilterCount > 0 ? 'primary.main' : 'divider',
                    color: advancedFilterCount > 0 ? 'primary.main' : 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textTransform: 'none'
                  }}
                >
                  Nâng cao
                  {advancedFilterCount > 0 ? (
                    <Chip
                      label={advancedFilterCount}
                      size='small'
                      color='primary'
                      variant='tonal'
                      sx={{ ml: 1, height: 18, minWidth: 18, fontSize: 10, fontWeight: 700 }}
                    />
                  ) : null}
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 6, md: 1.2 }}>
                <Button
                  fullWidth
                  variant='tonal'
                  color='secondary'
                  size='small'
                  disabled={!hasAnyFilter}
                  onClick={resetFilters}
                  startIcon={<i className='tabler-rotate-2 text-[14px]' />}
                  sx={{ height: 38, fontWeight: 700, fontSize: '0.8125rem', textTransform: 'none' }}
                >
                  Đặt lại
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 1.2 }}>
                <Button fullWidth variant='tonal' color='secondary' size='small' startIcon={<i className='tabler-download' />} sx={{ height: 38 }}>
                  Xuất Excel
                </Button>
              </Grid2>
            </Grid2>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[1040px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã giao dịch</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Order ID</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày mua</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm & Gói</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>ICCID</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Số lượng</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Tổng tiền</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono font-bold text-primary'>{o.id.slice(0, 8)}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono font-bold'>{o.orderId}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-medium'>{o.date}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{o.product}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{o.data} • {o.validity}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono text-xs'>{o.iccid}</Typography>
                      {o.iccids.length > 1 && (
                        <Typography variant='caption' className='text-slate-500'>
                          +{o.iccids.length - 1} eSIM khác
                        </Typography>
                      )}
                    </td>
                    <td className='p-4 text-right'>
                      <Typography variant='body2' className='font-bold'>{o.qty}</Typography>
                    </td>
                    <td className='p-4 text-right'>
                      <Typography variant='body2' className='font-black text-primary'>{o.amount}</Typography>
                    </td>
                    <td className='p-4 text-center'>
                      <Chip
                        label={o.status === 'Success' ? 'Thành công' : o.status === 'Failed' ? 'Thất bại' : 'Đang xử lý'}
                        size='small'
                        variant='tonal'
                        color={o.status === 'Success' ? 'success' : o.status === 'Failed' ? 'error' : 'warning'}
                        className='font-bold text-[10px]'
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex justify-end gap-1'>
                        <Tooltip title='Xem chi tiết'>
                          <IconButton size='small' color='primary' onClick={() => handleOpenDetail(o)}>
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
            <Typography variant='body2' className='text-slate-500'>Hiển thị {filteredOrders.length} giao dịch</Typography>
            <Pagination count={3} color='primary' shape='rounded' />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h6' className='font-black'>Tìm kiếm nâng cao</Typography>
            <Typography variant='body2' className='text-slate-500'>Lọc thêm theo loại eSIM, dung lượng, số ngày và khoảng thời gian mua.</Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Loại eSIM</Typography>
              <TextField
                select
                fullWidth
                size='small'
                value={draftAdvancedFilters.esimType}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, esimType: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả loại</MenuItem>
                <MenuItem value='Daily'>Gói Daily (Theo ngày)</MenuItem>
                <MenuItem value='Total'>Gói Total (Tổng dung lượng)</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Dung lượng</Typography>
              <TextField
                select
                fullWidth
                size='small'
                value={draftAdvancedFilters.dataLimit}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, dataLimit: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả dung lượng</MenuItem>
                <MenuItem value='5GB'>5GB</MenuItem>
                <MenuItem value='10GB'>10GB</MenuItem>
                <MenuItem value='20GB'>20GB</MenuItem>
                <MenuItem value='Unlimited'>Không giới hạn</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Số ngày</Typography>
              <TextField
                select
                fullWidth
                size='small'
                value={draftAdvancedFilters.validity}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, validity: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='7 Days'>7 Ngày</MenuItem>
                <MenuItem value='15 Days'>15 Ngày</MenuItem>
                <MenuItem value='30 Days'>30 Ngày</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Từ ngày</Typography>
              <TextField
                fullWidth
                type='date'
                size='small'
                value={draftAdvancedFilters.fromDate}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, fromDate: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Đến ngày</Typography>
              <TextField
                fullWidth
                type='date'
                size='small'
                value={draftAdvancedFilters.toDate}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, toDate: e.target.value }))}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='border-ts p-6'>
          <Button variant='tonal' color='secondary' onClick={resetAdvancedDraft}>Đặt lại</Button>
          <Button variant='contained' onClick={applyAdvancedFilters}>Áp dụng</Button>
        </DialogActions>
      </Dialog>

      {/* Simplified Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleCloseDialog} maxWidth='md' fullWidth>
        <DialogTitle className='flex items-center justify-between'>
          <Typography variant='h5' component='span' className='font-black'>Chi tiết giao dịch mua eSIM</Typography>
          <IconButton onClick={handleCloseDialog} size='small'><i className='tabler-x' /></IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedOrder && (
            <Box className='flex flex-col gap-6'>
              <Box className='p-5 bg-slate-50 rounded-xl border border-slate-100'>
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Order ID</Typography>
                    <Typography variant='body1' className='font-mono font-black'>{selectedOrder.orderId}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Sản phẩm</Typography>
                    <Typography variant='body1' className='font-black'>{selectedOrder.product}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Gói cước</Typography>
                    <Typography variant='body1' className='font-bold'>{selectedOrder.data} / {selectedOrder.validity}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Thời gian</Typography>
                    <Typography variant='body1'>{selectedOrder.date}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Tổng thanh toán</Typography>
                    <Typography variant='h6' className='font-black text-primary'>{selectedOrder.amount}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Typography variant='caption' className='text-slate-500 uppercase tracking-wider'>Số lượng</Typography>
                    <Typography variant='body1' className='font-medium'>{selectedOrder.qty} eSIM</Typography>
                  </Grid2>
                </Grid2>
              </Box>

              {selectedOrder.status === 'Success' && selectedOrder.iccids.length > 0 && (
                <Box className='flex flex-col gap-4'>
                  <Box className='flex items-center justify-between flex-wrap gap-2'>
                    <Box>
                      <Typography variant='subtitle1' className='font-black'>
                        Danh sách mã QR ({selectedOrder.iccids.length} eSIM)
                      </Typography>
                      <Typography variant='caption' className='text-slate-500'>
                        Mỗi eSIM có một mã QR và ICCID riêng. Quét hoặc gửi cho khách hàng tương ứng.
                      </Typography>
                    </Box>
                    {selectedOrder.iccids.length > 1 && (
                      <Box className='flex gap-2'>
                        <Button size='small' variant='tonal' color='primary' startIcon={<i className='tabler-download' />}>
                          Tải tất cả QR
                        </Button>
                        <Button size='small' variant='tonal' color='primary' startIcon={<i className='tabler-mail' />} onClick={handleSendEmail}>
                          Gửi Email tất cả
                        </Button>
                      </Box>
                    )}
                  </Box>

                  <Grid2 container spacing={3}>
                    {selectedOrder.iccids.map((iccid: string, idx: number) => (
                      <Grid2 key={iccid} size={{ xs: 12, sm: selectedOrder.iccids.length === 1 ? 12 : 6 }}>
                        <Box className='p-5 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-sm h-full'>
                          <Chip
                            label={`eSIM #${idx + 1}`}
                            size='small'
                            color='primary'
                            variant='tonal'
                            className='font-bold mbe-3 self-start'
                          />
                          <Box className='bg-slate-50 p-4 rounded-lg mbe-4'>
                            <i className='tabler-qrcode text-[120px] text-slate-800' />
                          </Box>
                          <Typography variant='caption' className='text-slate-500 mbe-1 uppercase tracking-wider'>ICCID</Typography>
                          <Typography variant='body2' className='font-mono font-bold mbe-4 break-all text-center'>{iccid}</Typography>

                          <Box className='flex gap-2 is-full mt-auto'>
                            <Button size='small' variant='contained' color='primary' startIcon={<i className='tabler-download' />} fullWidth>
                              Tải QR
                            </Button>
                            <Button size='small' variant='tonal' color='primary' startIcon={<i className='tabler-mail' />} fullWidth onClick={handleSendEmail}>
                              Gửi Email
                            </Button>
                          </Box>
                        </Box>
                      </Grid2>
                    ))}
                  </Grid2>
                </Box>
              )}

              {selectedOrder.status === 'Failed' && (
                <Box className='p-4 bg-error/10 text-error rounded-lg flex items-center gap-3'>
                  <i className='tabler-alert-circle text-xl' />
                  <Typography variant='body2' color='error' className='font-medium'>
                    Giao dịch thất bại. Vui lòng liên hệ hỗ trợ hoặc kiểm tra lại số dư ví.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={handleCloseDialog} fullWidth>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MyOrdersView
