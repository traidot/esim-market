'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'
import Grid2 from '@mui/material/Grid2'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Pagination from '@mui/material/Pagination'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import PageHeader from '@/components/layout/shared/PageHeader'
import { formatVND } from '@/lib/format'

type FlowStatus = 'success' | 'failed_downstream' | 'failed_upstream'

type DownstreamTransaction = {
  id: string
  traceId: string
  agent: string
  agentKey: string
  supplier: string
  supplierKey: string
  package: {
    name: string
    data: string
    validity: string
    type: string
  }
  action: string
  price: number
  cost: number
  exchangeRate: number
  downstreamStatus: number
  upstreamStatus: number | null
  latency: string
  date: string
}

const transactions: DownstreamTransaction[] = [
  {
    id: 'ORD-7729-10A',
    traceId: 'trace-a1b2c3d4e5f6',
    agent: 'Global eSIM Hub',
    agentKey: 'global',
    supplier: 'Singtel',
    supplierKey: 'singtel',
    package: { name: 'Singapore 10GB', data: '10GB', validity: '30 Ngày', type: 'Total' },
    action: 'Mua',
    price: 12.5,
    cost: 9.8,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 200,
    latency: '450ms',
    date: '28/04/2026 14:15'
  },
  {
    id: 'ORD-7729-10B',
    traceId: 'trace-b2c3d4e5f6a1',
    agent: 'TravelConnect',
    agentKey: 'travel',
    supplier: 'AIS Thailand',
    supplierKey: 'ais',
    package: { name: 'Thailand Unlimited', data: 'Unlimited', validity: '7 Ngày', type: 'Daily' },
    action: 'Mua',
    price: 8,
    cost: 6.2,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 200,
    latency: '320ms',
    date: '28/04/2026 14:12'
  },
  {
    id: 'ORD-7729-10C',
    traceId: 'trace-c3d4e5f6a1b2',
    agent: 'Nomad Partner',
    agentKey: 'nomad',
    supplier: 'Orange FR',
    supplierKey: 'orange',
    package: { name: 'Europe Pro 20GB', data: '20GB', validity: '30 Ngày', type: 'Total' },
    action: 'Huỷ',
    price: 25,
    cost: 18.5,
    exchangeRate: 25450,
    downstreamStatus: 400,
    upstreamStatus: null,
    latency: '110ms',
    date: '28/04/2026 13:55'
  },
  {
    id: 'ORD-7729-10D',
    traceId: 'trace-d4e5f6a1b2c3',
    agent: 'TravelConnect',
    agentKey: 'travel',
    supplier: 'KDDI Japan',
    supplierKey: 'kddi',
    package: { name: 'Japan 5GB', data: '5GB', validity: '15 Ngày', type: 'Total' },
    action: 'Mua',
    price: 14.5,
    cost: 11.2,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 500,
    latency: '820ms',
    date: '28/04/2026 13:45'
  }
]

const DEFAULT_FROM_DATE = '2026-04-01'
const DEFAULT_TO_DATE = '2026-04-28'
const PAGE_SIZE_OPTIONS = [10, 50, 100] as const
const DEFAULT_ADVANCED_FILTERS = {
  supplier: 'all',
  pkgType: 'all',
  dataLimit: 'all',
  validity: 'all',
  fromDate: DEFAULT_FROM_DATE,
  toDate: DEFAULT_TO_DATE,
  salePriceFrom: '',
  salePriceTo: '',
  costPriceFrom: '',
  costPriceTo: ''
}

const TABLE_HEAD_CELL_SX = {
  bgcolor: 'grey.100',
  fontWeight: 900,
  fontSize: 11,
  textTransform: 'uppercase'
}

function transactionDateKey(date: string) {
  const [datePart] = date.split(' ')
  const [day, month, year] = datePart.split('/')

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

function parsePriceFilter(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const parsed = Number(trimmed)

  return Number.isFinite(parsed) ? parsed : null
}

function getFlowStatus(tx: DownstreamTransaction): FlowStatus {
  if (tx.downstreamStatus >= 400) return 'failed_downstream'
  if (tx.upstreamStatus !== null && tx.upstreamStatus >= 400) return 'failed_upstream'
  return 'success'
}

function getStatusChip(status: number | null) {
  if (status === null) return <Chip label='N/A' size='small' variant='tonal' className='font-black' sx={{ opacity: 0.35 }} />
  if (status >= 200 && status < 300) return <Chip label='Thành công' size='small' color='success' variant='tonal' className='font-black' />
  if (status >= 400 && status < 500) return <Chip label='Thất bại' size='small' color='warning' variant='tonal' className='font-black' />

  return <Chip label='Thất bại' size='small' color='error' variant='tonal' className='font-black' />
}

function getAgentColor(agent: string) {
  if (agent === 'Global eSIM Hub') return '#7367F0'
  if (agent === 'TravelConnect') return '#00BAD1'

  return '#FF9F43'
}

function getSupplierColor(supplier: string) {
  if (supplier === 'Singtel') return '#EA5455'
  if (supplier === 'AIS Thailand') return '#28C76F'
  if (supplier === 'Orange FR') return '#FF9F43'

  return '#00BAD1'
}

const TransactionTable = ({ rows }: { rows: DownstreamTransaction[] }) => {
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<DownstreamTransaction | null>(null)

  return (
    <>
      <TableContainer sx={{ height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 1780, borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...TABLE_HEAD_CELL_SX,
                  position: 'sticky',
                  left: 0,
                  zIndex: 4,
                  minWidth: 160,
                  boxShadow: '2px 0 4px rgba(0,0,0,0.06)'
                }}
              >
                Mã đơn hàng
              </TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 180 }}>Đại lý</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 110, textAlign: 'center' }}>Hành động</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 260 }}>Sản phẩm / Chi tiết</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 160 }}>Nhà cung cấp</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150, textAlign: 'center' }}>Đại lý → Chợ</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150, textAlign: 'center' }}>Chợ → NCC</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150, textAlign: 'right' }}>Giá bán</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150, textAlign: 'right' }}>Giá vốn</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 160, textAlign: 'right' }}>Thời gian</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 190 }}>Trace ID</TableCell>
              <TableCell
                sx={{
                  ...TABLE_HEAD_CELL_SX,
                  position: 'sticky',
                  right: 0,
                  zIndex: 4,
                  minWidth: 120,
                  textAlign: 'center',
                  boxShadow: '-2px 0 4px rgba(0,0,0,0.06)'
                }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12}>
                  <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                    <i className='tabler-receipt-off text-[64px]' />
                    <Typography variant='h6' className='font-black'>
                      Không có dữ liệu
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.map(tx => {
              const agentColor = getAgentColor(tx.agent)
              const supplierColor = getSupplierColor(tx.supplier)

              return (
                <TableRow key={tx.id} hover>
                  <TableCell
                    sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}
                  >
                    <Typography variant='body2' className='font-mono font-black text-primary'>
                      {tx.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box className='flex items-center gap-2'>
                      <Avatar
                        variant='rounded'
                        sx={{ backgroundColor: `${agentColor}15`, color: agentColor, width: 28, height: 28, fontSize: '10px', fontWeight: 900 }}
                      >
                        {tx.agent[0]}
                      </Avatar>
                      <Typography variant='body2' className='font-bold' sx={{ color: agentColor }}>
                        {tx.agent}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Typography variant='body2' className='font-black text-slate-600'>{tx.action}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant='body2' className='font-black text-slate-700'>{tx.package.name}</Typography>
                      <Box className='flex items-center gap-1 mbs-0.5'>
                        <Chip label={tx.package.data} size='small' variant='tonal' color='info' sx={{ height: 16, fontSize: '9px', fontWeight: 'bold' }} />
                        <Chip label={tx.package.validity} size='small' variant='tonal' color='secondary' sx={{ height: 16, fontSize: '9px', fontWeight: 'bold' }} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className='flex items-center gap-2'>
                      <Avatar
                        variant='rounded'
                        sx={{ backgroundColor: `${supplierColor}15`, color: supplierColor, width: 28, height: 28, fontSize: '10px', fontWeight: 900 }}
                      >
                        {tx.supplier[0]}
                      </Avatar>
                      <Typography variant='body2' className='font-bold' sx={{ color: supplierColor }}>
                        {tx.supplier}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className='text-center'>
                    {getStatusChip(tx.downstreamStatus)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {getStatusChip(tx.upstreamStatus)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-black text-primary'>
                      {formatUsd(tx.price)}
                    </Typography>
                    <Typography variant='caption' className='font-bold text-slate-400'>
                      {formatVND(tx.price * tx.exchangeRate)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-black text-slate-700'>
                      {formatUsd(tx.cost)}
                    </Typography>
                    <Typography variant='caption' className='font-bold text-slate-400'>
                      {formatVND(tx.cost * tx.exchangeRate)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='caption' className='font-bold text-slate-500'>{tx.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={tx.traceId}>
                      <Typography variant='caption' className='font-mono font-bold text-slate-500 cursor-default'>
                        {tx.traceId.substring(0, 16)}...
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    className='text-center'
                    sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}
                  >
                    <IconButton size='small' color='primary' onClick={() => { setSelectedLog(tx); setIsLogOpen(true) }}>
                      <i className='tabler-route text-[18px]' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isLogOpen} onClose={() => setIsLogOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex items-center justify-between border-be p-6'>
          <Typography variant='h5' component='span' className='font-black'>Chi tiết luồng giao dịch: {selectedLog?.id}</Typography>
          <IconButton onClick={() => setIsLogOpen(false)} size='small'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedLog && (
            <Timeline position='right' sx={{ p: 0 }}>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color={selectedLog.downstreamStatus < 400 ? 'success' : 'error'}>
                    <i className='tabler-arrow-down-left text-white text-[14px]' />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className='pb-8'>
                  <Box className='flex justify-between items-start mbe-2 gap-4'>
                    <Box>
                      <Typography variant='subtitle2' className='font-black uppercase text-primary'>Downstream: Agent → Market</Typography>
                      <Typography variant='caption' className='text-slate-500'>Đại lý gửi yêu cầu mua hàng</Typography>
                    </Box>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Typography variant='caption' className='font-mono'>Latency: 25ms</Typography>
                      {getStatusChip(selectedLog.downstreamStatus)}
                    </Stack>
                  </Box>
                  <Box className='bg-[#1E1E1E] p-4 rounded-lg overflow-x-auto'>
                    <pre className='text-[#9CDCFE] font-mono text-xs m-0'>
{`POST /api/v1/orders
From: ${selectedLog.agent}
Payload: {
  "sku": "${selectedLog.package.name}",
  "agent_ref": "${selectedLog.id}"
}`}
                    </pre>
                  </Box>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color={selectedLog.upstreamStatus === null || selectedLog.upstreamStatus < 400 ? 'success' : 'error'}>
                    <i className='tabler-arrow-up-right text-white text-[14px]' />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Box className='flex justify-between items-start mbe-2 gap-4'>
                    <Box>
                      <Typography variant='subtitle2' className='font-black uppercase text-secondary'>Upstream: Market → Supplier ({selectedLog.supplier})</Typography>
                      <Typography variant='caption' className='text-slate-500'>Hệ thống gọi API nhà cung cấp để lấy mã eSIM</Typography>
                    </Box>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Typography variant='caption' className='font-mono'>Latency: {selectedLog.latency}</Typography>
                      {getStatusChip(selectedLog.upstreamStatus)}
                    </Stack>
                  </Box>
                  {selectedLog.upstreamStatus ? (
                    <Box className='bg-[#1E1E1E] p-4 rounded-lg border-is-4 overflow-x-auto' sx={{ borderLeftColor: `${selectedLog.upstreamStatus < 400 ? 'success' : 'error'}.main` }}>
                      <pre className='text-[#CE9178] font-mono text-xs m-0'>
{`POST /vendor/api/activate
To: ${selectedLog.supplier}
Response: {
  "status": "${selectedLog.upstreamStatus}",
  "esim_code": "${selectedLog.upstreamStatus < 400 ? 'ESIM-XYZ-123' : 'ERROR_VENDOR_BUSY'}",
  "cost": ${selectedLog.cost}
}`}
                      </pre>
                    </Box>
                  ) : (
                    <Box className='p-4 border-2 border-dashed rounded-lg border-slate-200 text-center'>
                      <Typography variant='caption' className='italic text-slate-400'>Luồng bị ngắt tại Downstream - Không gọi Upstream</Typography>
                    </Box>
                  )}
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='contained' color='primary' onClick={() => setIsLogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const DownstreamTransactions = () => {
  const [agent, setAgent] = useState('all')
  const [supplier, setSupplier] = useState('all')
  const [flowStatus, setFlowStatus] = useState('all')
  const [pkgType, setPkgType] = useState('all')
  const [dataLimit, setDataLimit] = useState('all')
  const [validity, setValidity] = useState('all')
  const [searchTx, setSearchTx] = useState('')
  const [fromDate, setFromDate] = useState(DEFAULT_FROM_DATE)
  const [toDate, setToDate] = useState(DEFAULT_TO_DATE)
  const [salePriceFrom, setSalePriceFrom] = useState('')
  const [salePriceTo, setSalePriceTo] = useState('')
  const [costPriceFrom, setCostPriceFrom] = useState('')
  const [costPriceTo, setCostPriceTo] = useState('')
  const [draftAdvancedFilters, setDraftAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)

  const advancedFilterCount = [
    supplier !== 'all',
    pkgType !== 'all',
    dataLimit !== 'all',
    validity !== 'all',
    fromDate !== DEFAULT_FROM_DATE || toDate !== DEFAULT_TO_DATE,
    salePriceFrom.trim().length > 0 || salePriceTo.trim().length > 0,
    costPriceFrom.trim().length > 0 || costPriceTo.trim().length > 0
  ].filter(Boolean).length

  const hasAnyFilter =
    agent !== 'all' ||
    flowStatus !== 'all' ||
    searchTx.trim().length > 0 ||
    advancedFilterCount > 0

  const filteredTransactions = transactions.filter(tx => {
    const keyword = searchTx.trim().toLowerCase()
    const dateKey = transactionDateKey(tx.date)
    const status = getFlowStatus(tx)
    const minSalePrice = parsePriceFilter(salePriceFrom)
    const maxSalePrice = parsePriceFilter(salePriceTo)
    const minCostPrice = parsePriceFilter(costPriceFrom)
    const maxCostPrice = parsePriceFilter(costPriceTo)

    return (
      (!keyword ||
        tx.id.toLowerCase().includes(keyword) ||
        tx.traceId.toLowerCase().includes(keyword) ||
        tx.agent.toLowerCase().includes(keyword) ||
        tx.supplier.toLowerCase().includes(keyword) ||
        tx.package.name.toLowerCase().includes(keyword)) &&
      (agent === 'all' || tx.agentKey === agent) &&
      (supplier === 'all' || tx.supplierKey === supplier) &&
      (flowStatus === 'all' || status === flowStatus) &&
      (pkgType === 'all' || tx.package.type === pkgType) &&
      (dataLimit === 'all' || tx.package.data === dataLimit) &&
      (validity === 'all' || tx.package.validity === validity) &&
      (!fromDate || dateKey >= fromDate) &&
      (!toDate || dateKey <= toDate) &&
      (minSalePrice === null || tx.price >= minSalePrice) &&
      (maxSalePrice === null || tx.price <= maxSalePrice) &&
      (minCostPrice === null || tx.cost >= minCostPrice) &&
      (maxCostPrice === null || tx.cost <= maxCostPrice)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize))
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize)
  const totalRevenue = filteredTransactions.reduce((sum, tx) => sum + tx.price * tx.exchangeRate, 0)
  const failedCount = filteredTransactions.filter(tx => getFlowStatus(tx) !== 'success').length
  const exportParams = new URLSearchParams({
    q: searchTx.trim(),
    agent,
    supplier,
    flowStatus,
    pkgType,
    dataLimit,
    validity,
    fromDate,
    toDate,
    salePriceFrom,
    salePriceTo,
    costPriceFrom,
    costPriceTo
  })
  const exportHref = `/api/downstream/transactions/export.xlsx?${exportParams.toString()}`

  const handleResetAll = () => {
    setAgent('all')
    setSupplier('all')
    setFlowStatus('all')
    setPkgType('all')
    setDataLimit('all')
    setValidity('all')
    setSearchTx('')
    setFromDate(DEFAULT_FROM_DATE)
    setToDate(DEFAULT_TO_DATE)
    setSalePriceFrom('')
    setSalePriceTo('')
    setCostPriceFrom('')
    setCostPriceTo('')
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
    setPage(1)
  }

  const handleOpenAdvancedFilters = () => {
    setDraftAdvancedFilters({
      supplier,
      pkgType,
      dataLimit,
      validity,
      fromDate,
      toDate,
      salePriceFrom,
      salePriceTo,
      costPriceFrom,
      costPriceTo
    })
    setAdvancedOpen(true)
  }

  const handleResetAdvancedDraft = () => {
    setDraftAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

  const handleApplyAdvancedFilters = () => {
    setSupplier(draftAdvancedFilters.supplier)
    setPkgType(draftAdvancedFilters.pkgType)
    setDataLimit(draftAdvancedFilters.dataLimit)
    setValidity(draftAdvancedFilters.validity)
    setFromDate(draftAdvancedFilters.fromDate)
    setToDate(draftAdvancedFilters.toDate)
    setSalePriceFrom(draftAdvancedFilters.salePriceFrom)
    setSalePriceTo(draftAdvancedFilters.salePriceTo)
    setCostPriceFrom(draftAdvancedFilters.costPriceFrom)
    setCostPriceTo(draftAdvancedFilters.costPriceTo)
    setPage(1)
    setAdvancedOpen(false)
  }

  return (
    <>
      <PageHeader
        title='Lịch sử giao dịch Downstream'
        description='Theo dõi luồng giao dịch từ đại lý qua hệ thống đến nhà cung cấp.'
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Giao dịch' }]}
        actions={
          <Button
            variant='contained'
            color='success'
            size='small'
            startIcon={<i className='tabler-file-download' />}
            component='a'
            href={exportHref}
            download
          >
            Xuất Excel
          </Button>
        }
        className='mbe-6'
      />

      <Card
        className='border-none shadow-sm mbe-4'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)' }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid2 container spacing={3} alignItems='flex-end'>
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm mã đơn hàng, đại lý, NCC, sản phẩm, trace...'
                value={searchTx}
                onChange={e => {
                  setSearchTx(e.target.value)
                  setPage(1)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Đại lý
              </Typography>
              <Select
                fullWidth
                size='small'
                value={agent}
                onChange={e => {
                  setAgent(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả đại lý</MenuItem>
                <MenuItem value='global'>Global eSIM Hub</MenuItem>
                <MenuItem value='travel'>TravelConnect</MenuItem>
                <MenuItem value='nomad'>Nomad Partner</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Trạng thái luồng
              </Typography>
              <Select
                fullWidth
                size='small'
                value={flowStatus}
                onChange={e => {
                  setFlowStatus(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='success'>Thành công toàn bộ</MenuItem>
                <MenuItem value='failed_downstream'>Lỗi Downstream</MenuItem>
                <MenuItem value='failed_upstream'>Lỗi Upstream</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.8 }}>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-adjustments-horizontal text-[14px]' />}
                onClick={handleOpenAdvancedFilters}
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

            <Grid2 size={{ xs: 6, md: 2, lg: 1.4 }}>
              <Button
                fullWidth
                variant='tonal'
                color='secondary'
                size='small'
                onClick={handleResetAll}
                disabled={!hasAnyFilter}
                startIcon={<i className='tabler-rotate-2 text-[14px]' />}
                sx={{ height: 38, fontWeight: 700, fontSize: '0.8125rem', textTransform: 'none' }}
              >
                Đặt lại
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h6' className='font-black'>
              Tìm kiếm nâng cao
            </Typography>
            <Typography variant='body2' className='text-slate-500'>
              Lọc thêm theo nhà cung cấp, loại gói, dung lượng, thời hạn, giá bán, giá vốn và khoảng thời gian giao dịch.
            </Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Nhà cung cấp</Typography>
              <Select
                fullWidth
                size='small'
                value={draftAdvancedFilters.supplier}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, supplier: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả NCC</MenuItem>
                <MenuItem value='singtel'>Singtel</MenuItem>
                <MenuItem value='ais'>AIS Thailand</MenuItem>
                <MenuItem value='orange'>Orange FR</MenuItem>
                <MenuItem value='kddi'>KDDI Japan</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Loại gói</Typography>
              <Select
                fullWidth
                size='small'
                value={draftAdvancedFilters.pkgType}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, pkgType: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả loại</MenuItem>
                <MenuItem value='Daily'>Daily (Theo ngày)</MenuItem>
                <MenuItem value='Total'>Total (Tổng dung lượng)</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Dung lượng</Typography>
              <Select
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
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Thời hạn</Typography>
              <Select
                fullWidth
                size='small'
                value={draftAdvancedFilters.validity}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, validity: e.target.value }))}
              >
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='7 Ngày'>7 Ngày</MenuItem>
                <MenuItem value='15 Ngày'>15 Ngày</MenuItem>
                <MenuItem value='30 Ngày'>30 Ngày</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Từ ngày</Typography>
              <TextField
                fullWidth
                size='small'
                type='date'
                value={draftAdvancedFilters.fromDate}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, fromDate: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Đến ngày</Typography>
              <TextField
                fullWidth
                size='small'
                type='date'
                value={draftAdvancedFilters.toDate}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, toDate: e.target.value }))}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Giá bán từ</Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                value={draftAdvancedFilters.salePriceFrom}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, salePriceFrom: e.target.value }))}
                placeholder='0.00'
                InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Giá bán đến</Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                value={draftAdvancedFilters.salePriceTo}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, salePriceTo: e.target.value }))}
                placeholder='0.00'
                InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Giá gốc từ</Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                value={draftAdvancedFilters.costPriceFrom}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, costPriceFrom: e.target.value }))}
                placeholder='0.00'
                InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Giá gốc đến</Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                value={draftAdvancedFilters.costPriceTo}
                onChange={e => setDraftAdvancedFilters(prev => ({ ...prev, costPriceTo: e.target.value }))}
                placeholder='0.00'
                InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='border-ts p-6'>
          <Button variant='tonal' color='secondary' onClick={handleResetAdvancedDraft}>
            Đặt lại
          </Button>
          <Button variant='contained' onClick={handleApplyAdvancedFilters}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className='border-none shadow-sm overflow-hidden mbe-6'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.1)' }}
      >
        <Box className='px-5 py-2 border-be bg-white flex justify-between items-center gap-4 flex-wrap'>
          <Box className='flex items-center gap-3'>
            <Typography variant='h6' className='font-black'>
              Lịch sử giao dịch Downstream
            </Typography>
            <Chip
              label={`${filteredTransactions.length} items`}
              size='small'
              color='primary'
              variant='tonal'
              className='font-bold text-[10px]'
            />
          </Box>
          <Stack direction='row' spacing={4}>
            <Box>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Doanh thu (Tháng này)</Typography>
              <Typography variant='h6' className='font-black text-primary'>{formatVND(totalRevenue)}</Typography>
            </Box>
            <Box className='border-is ps-4'>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Số lệnh lỗi</Typography>
              <Typography variant='h6' className='font-black text-error'>{failedCount}</Typography>
            </Box>
          </Stack>
        </Box>

        <TransactionTable rows={paginatedTransactions} />

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
    </>
  )
}

export default DownstreamTransactions
