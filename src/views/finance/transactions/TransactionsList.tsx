'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'

import PageHeader from '@/components/layout/shared/PageHeader'

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const
const DEMO_TODAY = '2026-04-25'
const DEFAULT_ADVANCED_FILTERS = {
  agent: 'all',
  supplier: 'all',
  fromDate: '',
  toDate: '',
  amountFrom: '',
  amountTo: ''
}

const TransactionsList = () => {
  const pathname = usePathname()
  const isAdmin = pathname.includes('/3m/')
  
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTx, setSelectedTx] = useState<any>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [timeRange, setTimeRange] = useState('all')
  const [status, setStatus] = useState('all')
  const [agentFilter, setAgentFilter] = useState('all')
  const [supplierFilter, setSupplierFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [amountFrom, setAmountFrom] = useState('')
  const [amountTo, setAmountTo] = useState('')
  const [draftAdvancedFilters, setDraftAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS)

  const handleOpenDetail = (tx: any) => {
    setSelectedTx(tx)
    setOpenDialog(true)
  }

  // Mock Transactions for view
  const transactions = [
    { id: 'TRX-10293', agent: 'TravelConnect', supplier: 'Singtel', type: 'Purchase', typeLabel: 'Mua eSIM (Japan Travel)', amount: 12.50, flow: 'out', status: 'Completed', date: '2026-04-25T14:20:00Z', reference: 'ORD-99812', description: 'Gói 10GB - 30 Ngày' },
    { id: 'TRX-10294', agent: 'Global eSIM Hub', supplier: '-', type: 'Payment', typeLabel: 'Thanh toán nợ công nợ', amount: 500.00, flow: 'in', status: 'Completed', date: '2026-04-25T14:15:00Z', reference: 'PAY-1122', description: 'Thanh toán qua Chuyển khoản' },
    { id: 'TRX-10295', agent: 'CheapData Agency', supplier: 'AIS', type: 'Purchase', typeLabel: 'Mua eSIM (Thailand Unlimited)', amount: 6.20, flow: 'out', status: 'Pending', date: '2026-04-25T14:00:00Z', reference: 'ORD-99810', description: 'Gói Unlimited - 7 Ngày' },
    { id: 'TRX-10296', agent: 'Nomad Partner', supplier: '-', type: 'Payment', typeLabel: 'Thanh toán nợ công nợ', amount: 200.00, flow: 'in', status: 'Completed', date: '2026-04-25T12:00:00Z', reference: 'PAY-1123', description: 'Thanh toán qua Ví điện tử' },
    { id: 'TRX-10297', agent: 'TravelConnect', supplier: 'Orange FR', type: 'Purchase', typeLabel: 'Mua eSIM (Europe Roaming)', amount: 9.00, flow: 'out', status: 'Completed', date: '2026-04-24T10:30:00Z', reference: 'ORD-99808', description: 'Gói 5GB - 15 Ngày' },
    { id: 'TRX-10298', agent: 'Global eSIM Hub', supplier: '-', type: 'Adjustment', typeLabel: 'Điều chỉnh số dư', amount: 50.00, flow: 'in', status: 'Completed', date: '2026-04-24T09:00:00Z', reference: 'ADJ-001', description: 'Hoàn tiền lỗi hệ thống' },
  ]

  const advancedFilterCount = [
    isAdmin && agentFilter !== 'all',
    isAdmin && supplierFilter !== 'all',
    fromDate || toDate,
    amountFrom || amountTo
  ].filter(Boolean).length

  const hasAnyFilter = searchTerm.trim().length > 0 || timeRange !== 'all' || status !== 'all' || advancedFilterCount > 0

  const filteredTransactions = transactions.filter(t => {
    const isPurchase = t.type === 'Purchase' || (t.type === 'Adjustment' && t.flow === 'in' && activeTab === 0)
    const isPayment = t.type === 'Payment'
    
    if (activeTab === 0 && !isPurchase) return false
    if (activeTab === 1 && !isPayment) return false

    const keyword = searchTerm.trim().toLowerCase()
    const txDate = t.date.slice(0, 10)
    
    const matchSearch =
      !keyword ||
      t.id.toLowerCase().includes(keyword) ||
      t.reference.toLowerCase().includes(keyword) ||
      t.typeLabel.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
    
    const matchStatus = status === 'all' || t.status.toLowerCase() === status.toLowerCase()
    const amountValue = Math.abs(t.amount)
    const minAmount = amountFrom ? Number(amountFrom) : null
    const maxAmount = amountTo ? Number(amountTo) : null
    const matchTime =
      timeRange === 'all' ||
      (timeRange === 'today' && txDate === DEMO_TODAY) ||
      (timeRange === 'week' && txDate >= '2026-04-21' && txDate <= '2026-04-27') ||
      (timeRange === 'month' && txDate.startsWith('2026-04'))
    const matchDateRange = (!fromDate || txDate >= fromDate) && (!toDate || txDate <= toDate)
    const matchAmountRange =
      (minAmount === null || amountValue >= minAmount) &&
      (maxAmount === null || amountValue <= maxAmount)
    
    // Role based filtering
    if (isAdmin) {
      const matchAgent = agentFilter === 'all' || t.agent === agentFilter
      const matchSupplier = supplierFilter === 'all' || t.supplier === supplierFilter
      return matchSearch && matchStatus && matchTime && matchDateRange && matchAmountRange && matchAgent && matchSupplier
    }
    
    return matchSearch && matchStatus && matchTime && matchDateRange && matchAmountRange
  })

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize))
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize)

  const totalPurchase = transactions.filter(t => t.type === 'Purchase' && t.status === 'Completed').reduce((acc, t) => acc + t.amount, 0)
  const totalPayment = transactions.filter(t => t.type === 'Payment' && t.status === 'Completed').reduce((acc, t) => acc + t.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'Pending': return 'warning'
      case 'Failed': return 'error'
      default: return 'primary'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const openAdvancedFilters = () => {
    setDraftAdvancedFilters({ agent: agentFilter, supplier: supplierFilter, fromDate, toDate, amountFrom, amountTo })
    setAdvancedOpen(true)
  }

  const resetAdvancedDraft = () => {
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

  const applyAdvancedFilters = () => {
    setAgentFilter(draftAdvancedFilters.agent)
    setSupplierFilter(draftAdvancedFilters.supplier)
    setFromDate(draftAdvancedFilters.fromDate)
    setToDate(draftAdvancedFilters.toDate)
    setAmountFrom(draftAdvancedFilters.amountFrom)
    setAmountTo(draftAdvancedFilters.amountTo)
    setPage(1)
    setAdvancedOpen(false)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setTimeRange('all')
    setStatus('all')
    setAgentFilter('all')
    setSupplierFilter('all')
    setFromDate('')
    setToDate('')
    setAmountFrom('')
    setAmountTo('')
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
    setPage(1)
  }

  return (
    <>
      <PageHeader
        title="Lịch sử Giao dịch"
        description={isAdmin ? "Theo dõi chi tiết các giao dịch mua hàng và thanh toán công nợ của hệ thống." : "Theo dõi chi tiết các giao dịch mua hàng và thanh toán ví của bạn."}
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài chính' }, { label: 'Giao dịch' }]}
        actions={
          <Button variant='tonal' color='secondary' startIcon={<i className='tabler-download' />}>Xuất Sao kê</Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20 h-full'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-error/20 text-error bs-[48px] is-[48px]'>
                <i className='tabler-shopping-cart text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Tổng Tiền Mua eSIM</Typography>
                <Typography variant='h3' className='font-black text-error'>{formatCurrency(totalPurchase)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20 h-full'>
            <CardContent className='p-6 flex items-center gap-4'>
              <Avatar variant='rounded' className='bg-success/20 text-success bs-[48px] is-[48px]'>
                <i className='tabler-cash-banknote text-[28px]' />
              </Avatar>
              <Box>
                <Typography variant='caption' className='font-bold text-success uppercase'>{isAdmin ? 'Tổng Tiền Đã Thanh Toán' : 'Tổng Tiền Đã Nạp'}</Typography>
                <Typography variant='h3' className='font-black text-success'>{formatCurrency(totalPayment)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='border-be'>
          <Tabs 
            value={activeTab} 
            onChange={(_, val) => {
              setActiveTab(val)
              setPage(1)
            }}
            className='px-6 pt-2'
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label="1. Lịch sử mua eSIM" className='font-black' />
            <Tab label="2. Lịch sử thanh toán & nạp tiền" className='font-black' />
          </Tabs>
        </Box>

        <Box className='p-4 bg-white border-be'>
          <Grid2 container spacing={3} alignItems='flex-end'>
            <Grid2 size={{ xs: 12, md: isAdmin ? 4 : 4.6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                placeholder='Tìm mã giao dịch, reference, diễn giải...'
                size='small'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                className='bg-white'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: isAdmin ? 2 : 2.4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Thời gian
              </Typography>
              <Select
                fullWidth
                size='small'
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả thời gian</MenuItem>
                <MenuItem value='today'>Hôm nay</MenuItem>
                <MenuItem value='week'>Tuần này</MenuItem>
                <MenuItem value='month'>Tháng này</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: isAdmin ? 2 : 2.4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Trạng thái
              </Typography>
              <Select
                fullWidth
                size='small'
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='completed'>Thành công</MenuItem>
                <MenuItem value='pending'>Đang xử lý</MenuItem>
                <MenuItem value='failed'>Thất bại</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 6, md: isAdmin ? 1.8 : 1.5 }}>
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

            <Grid2 size={{ xs: 6, md: isAdmin ? 1.6 : 1.1 }}>
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
          </Grid2>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='bg-slate-50'>
                <TableCell className='font-black uppercase text-[11px] whitespace-nowrap'>Mã GD & Thời gian</TableCell>
                {isAdmin && <TableCell className='font-black uppercase text-[11px]'>Đại lý / NCC</TableCell>}
                <TableCell className='font-black uppercase text-[11px]'>Nội dung / Diễn giải</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Reference</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Số tiền</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.length > 0 ? paginatedTransactions.map((t) => (
                <TableRow key={t.id} hover className='transition-colors'>
                  <TableCell>
                    <Box className='flex flex-col'>
                      <Typography variant='body2' className='font-mono font-bold text-primary'>{t.id}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{formatDate(t.date)}</Typography>
                    </Box>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Box>
                        <Typography variant='body2' className='font-black'>{t.agent}</Typography>
                        <Typography variant='caption' className='text-primary font-bold'>{t.supplier}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell>
                    <Box>
                      <Typography variant='body2' className='font-black'>{t.typeLabel}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{t.description}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-mono text-slate-600'>{t.reference}</Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className={`font-black ${t.flow === 'in' ? 'text-success' : 'text-error'}`}>
                      {t.flow === 'in' ? '+' : '-'}{formatCurrency(t.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip 
                      label={t.status === 'Completed' ? 'Thành công' : t.status === 'Pending' ? 'Đang xử lý' : 'Thất bại'} 
                      color={getStatusColor(t.status) as any} 
                      size='small' 
                      variant='tonal' 
                      className='font-bold text-[10px]'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Tooltip title="Xem chi tiết">
                      <IconButton size='small' color='primary' onClick={() => handleOpenDetail(t)}>
                        <i className='tabler-eye' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 7 : 6} align='center' className='p-12'>
                    <Typography variant='body2' className='text-slate-400 italic'>Không tìm thấy giao dịch nào phù hợp.</Typography>
                  </TableCell>
                </TableRow>
              )}
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
                setPageSize(Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
                setPage(1)
              }}
              sx={{ fontSize: '0.75rem', minWidth: 70 }}
            >
              {PAGE_SIZE_OPTIONS.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
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

      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h6' className='font-black'>
              Tìm kiếm nâng cao
            </Typography>
            <Typography variant='body2' className='text-slate-500'>
              Lọc thêm theo khoảng ngày, khoảng số tiền giao dịch{isAdmin ? ', đại lý và nhà cung cấp.' : '.'}
            </Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            {isAdmin && (
              <>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Đại lý</Typography>
                  <Select
                    fullWidth
                    size='small'
                    value={draftAdvancedFilters.agent}
                    onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, agent: e.target.value }))}
                  >
                    <MenuItem value='all'>Tất cả đại lý</MenuItem>
                    <MenuItem value='TravelConnect'>TravelConnect</MenuItem>
                    <MenuItem value='Global eSIM Hub'>Global eSIM Hub</MenuItem>
                    <MenuItem value='CheapData Agency'>CheapData Agency</MenuItem>
                    <MenuItem value='Nomad Partner'>Nomad Partner</MenuItem>
                  </Select>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Nhà cung cấp</Typography>
                  <Select
                    fullWidth
                    size='small'
                    value={draftAdvancedFilters.supplier}
                    onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, supplier: e.target.value }))}
                  >
                    <MenuItem value='all'>Tất cả NCC</MenuItem>
                    <MenuItem value='Singtel'>Singtel</MenuItem>
                    <MenuItem value='AIS'>AIS</MenuItem>
                    <MenuItem value='Orange FR'>Orange FR</MenuItem>
                    <MenuItem value='Viettel'>Viettel</MenuItem>
                  </Select>
                </Grid2>
              </>
            )}
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
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Số tiền từ</Typography>
              <TextField
                fullWidth
                type='number'
                size='small'
                placeholder='0'
                value={draftAdvancedFilters.amountFrom}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, amountFrom: e.target.value }))}
                inputProps={{ min: 0, step: '0.01' }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Số tiền đến</Typography>
              <TextField
                fullWidth
                type='number'
                size='small'
                placeholder='0'
                value={draftAdvancedFilters.amountTo}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, amountTo: e.target.value }))}
                inputProps={{ min: 0, step: '0.01' }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='border-ts p-6'>
          <Button variant='tonal' color='secondary' onClick={resetAdvancedDraft}>
            Đặt lại
          </Button>
          <Button variant='contained' onClick={applyAdvancedFilters}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='font-black flex justify-between items-center'>
          <span>Chi tiết Giao dịch</span>
          <IconButton onClick={() => setOpenDialog(false)} size='small'><i className='tabler-x' /></IconButton>
        </DialogTitle>
        <DialogContent dividers className='p-6'>
          {selectedTx && (
            <Stack spacing={4}>
              <Box className='flex justify-between items-center bg-slate-50 p-5 rounded-xl border border-slate-100'>
                <Box>
                  <Typography variant='caption' className='text-slate-500 uppercase font-black tracking-wider'>Transaction ID</Typography>
                  <Typography variant='h5' className='font-mono font-black text-primary'>{selectedTx.id}</Typography>
                </Box>
                <Chip 
                  label={selectedTx.status === 'Completed' ? 'Thành công' : 'Đang xử lý'} 
                  color={getStatusColor(selectedTx.status) as any} 
                  variant='tonal'
                  className='font-black' 
                />
              </Box>
              
              <Grid2 container spacing={6}>
                {isAdmin && (
                  <>
                    <Grid2 size={{ xs: 6 }}>
                      <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Đại lý</Typography>
                      <Typography variant='body1' className='font-black'>{selectedTx.agent}</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
                      <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Nhà cung cấp (Upstream)</Typography>
                      <Typography variant='body1' className='font-black text-primary'>{selectedTx.supplier}</Typography>
                    </Grid2>
                  </>
                )}
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Loại giao dịch</Typography>
                  <Typography variant='body1' className='font-black'>{selectedTx.typeLabel}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Số Reference</Typography>
                  <Typography variant='body1' className='font-mono font-bold'>{selectedTx.reference}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Thời gian</Typography>
                  <Typography variant='body2' className='font-medium'>{formatDate(selectedTx.date)}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                  <Typography variant='caption' className='text-slate-500 font-bold uppercase text-[10px]'>Diễn giải</Typography>
                  <Typography variant='body2' className='font-medium'>{selectedTx.description}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Divider />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Box className='p-5 rounded-xl bg-primary/5 border border-primary/10 flex justify-between items-center'>
                    <Typography variant='subtitle1' className='font-black text-slate-700'>Số tiền giao dịch</Typography>
                    <Typography variant='h4' className={`font-black ${selectedTx.flow === 'in' ? 'text-success' : 'text-error'}`}>
                      {selectedTx.flow === 'in' ? '+' : '-'}{formatCurrency(selectedTx.amount)}
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Stack>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={() => setOpenDialog(false)} fullWidth>Đóng</Button>
          <Button variant='contained' startIcon={<i className='tabler-file-text' />} fullWidth>Xem Chứng từ</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TransactionsList
