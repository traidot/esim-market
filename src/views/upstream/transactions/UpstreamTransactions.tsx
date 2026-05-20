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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Pagination from '@mui/material/Pagination'

import PageHeader from '@/components/layout/shared/PageHeader'
import { formatVND } from '@/lib/format'

type Transaction = {
  id: string
  orderCode: string
  supplier: string
  action: string
  package: { name: string; data: string; validity: string; type: string; region: string }
  originalCost: number
  costCurrency: string
  exchangeRate: number
  amountVND: number
  status: string
  date: string
  esimInfo?: {
    iccid: string
    qrCode: string
    server: string
    matchingKey: string
  }
}

const transactions: Transaction[] = [
  {
    id: 'TX-9821',
    orderCode: 'ORD-5821',
    supplier: 'Airalo',
    action: 'Mua',
    package: { name: 'Japan Premium', data: '10GB', validity: '30 Ngày', type: 'Total', region: 'asia' },
    originalCost: 8.25,
    costCurrency: 'USD',
    exchangeRate: 25450,
    amountVND: 210000,
    status: 'SUCCESS',
    date: '28/04/2026 01:15',
    esimInfo: {
      iccid: '8984400000000000001',
      qrCode: 'LPA:1$smdp.plus$AIRALO-JAPAN-001',
      server: 'smdp.plus',
      matchingKey: 'AIRALO-JAPAN-001',
    },
  },
  {
    id: 'TX-9820',
    orderCode: 'ORD-5820',
    supplier: 'Nomad',
    action: 'Mua',
    package: { name: 'USA Fast Connection', data: '20GB', validity: '30 Ngày', type: 'Total', region: 'america' },
    originalCost: 21.42,
    costCurrency: 'USD',
    exchangeRate: 25450,
    amountVND: 545000,
    status: 'SUCCESS',
    date: '28/04/2026 00:45',
  },
  {
    id: 'TX-9819',
    orderCode: 'ORD-5819',
    supplier: 'Airalo',
    action: 'Mua',
    package: { name: 'USA Traveler', data: '5GB', validity: '15 Ngày', type: 'Total', region: 'america' },
    originalCost: 11.71,
    costCurrency: 'USD',
    exchangeRate: 25450,
    amountVND: 298000,
    status: 'FAILED',
    date: '27/04/2026 23:30',
  },
  {
    id: 'TX-9818',
    orderCode: 'ORD-5818',
    supplier: 'KeepGo',
    action: 'Huỷ',
    package: { name: 'Global Roaming', data: '1GB', validity: '1 Ngày', type: 'Daily', region: 'global' },
    originalCost: 0,
    costCurrency: 'USD',
    exchangeRate: 25450,
    amountVND: 0,
    status: 'SUCCESS',
    date: '27/04/2026 22:10',
  },
  {
    id: 'TX-9817',
    orderCode: 'ORD-5817',
    supplier: 'Nomad',
    action: 'Mua',
    package: { name: 'UK Business Pro', data: '50GB', validity: '90 Ngày', type: 'Total', region: 'europe' },
    originalCost: 43.81,
    costCurrency: 'USD',
    exchangeRate: 25450,
    amountVND: 1115000,
    status: 'FAILED',
    date: '27/04/2026 21:55',
    esimInfo: {
      iccid: '8984400000000000002',
      qrCode: 'LPA:1$rsp.truphone.com$NOMAD-UK-PRO',
      server: 'rsp.truphone.com',
      matchingKey: 'NOMAD-UK-PRO',
    },
  },
]

const STATUS_LABEL: Record<string, string> = {
  SUCCESS: 'Thành công',
  FAILED: 'Thất bại',
}

const DEFAULT_FROM_DATE = '2026-04-01'
const DEFAULT_TO_DATE = '2026-04-28'
const PAGE_SIZE_OPTIONS = [10, 50, 100] as const

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

function formatSupplierCost(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2
  }).format(amount)
}

function formatExchangeRate(rate: number, currency: string) {
  return `${formatVND(rate)}/${currency}`
}

const TransactionTable = ({ rows }: { rows: Transaction[] }) => {
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<Transaction | null>(null)
  const [isEsimOpen, setIsEsimOpen] = useState(false)
  const [selectedEsim, setSelectedEsim] = useState<Transaction | null>(null)

  return (
    <>
      <TableContainer sx={{ height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 1700, borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...TABLE_HEAD_CELL_SX,
                  position: 'sticky',
                  left: 0,
                  zIndex: 4,
                  minWidth: 120,
                  boxShadow: '2px 0 4px rgba(0,0,0,0.06)'
                }}
              >
                Mã GD
              </TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150 }}>Mã đơn hàng</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150 }}>Nhà cung cấp</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 110 }}>Hành động</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 280 }}>Sản phẩm / Chi tiết</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 170, textAlign: 'right' }}>Giá vốn chưa quy đổi</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 140, textAlign: 'right' }}>Tỉ giá</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 140, textAlign: 'right' }}>Số tiền</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 150, textAlign: 'center' }}>Trạng thái</TableCell>
              <TableCell sx={{ ...TABLE_HEAD_CELL_SX, minWidth: 160, textAlign: 'right' }}>Thời gian</TableCell>
              <TableCell
                sx={{
                  ...TABLE_HEAD_CELL_SX,
                  position: 'sticky',
                  right: 0,
                  zIndex: 4,
                  minWidth: 130,
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
                <TableCell colSpan={11}>
                  <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                    <i className='tabler-receipt-off text-[64px]' />
                    <Typography variant='h6' className='font-black'>
                      Không có dữ liệu
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.map((tx) => {
              const supplierColor =
                tx.supplier === 'Airalo' ? '#7367F0' : tx.supplier === 'Nomad' ? '#00BAD1' : '#EA5455'

              return (
                <TableRow key={tx.id} hover>
                  <TableCell
                    className='font-mono text-xs font-bold text-slate-600'
                    sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}
                  >
                    {tx.id}
                  </TableCell>
                  <TableCell className='font-mono text-xs font-black text-primary'>{tx.orderCode}</TableCell>
                  <TableCell>
                    <Box className='flex items-center gap-2'>
                      <Avatar
                        variant='rounded'
                        sx={{
                          backgroundColor: `${supplierColor}15`,
                          color: supplierColor,
                          width: 28,
                          height: 28,
                          fontSize: '10px',
                          fontWeight: '900',
                        }}
                      >
                        {tx.supplier[0]}
                      </Avatar>
                      <Typography variant='body2' className='font-bold' sx={{ color: supplierColor }}>
                        {tx.supplier}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-black'>{tx.action}</Typography>
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
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-black text-slate-700'>
                      {formatSupplierCost(tx.originalCost, tx.costCurrency)}
                    </Typography>
                    <Typography variant='caption' className='font-bold text-slate-400'>
                      {tx.costCurrency}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-black text-slate-700'>
                      {formatExchangeRate(tx.exchangeRate, tx.costCurrency)}
                    </Typography>
                  </TableCell>
                  <TableCell className='text-right font-black text-primary'>
                    {formatVND(tx.amountVND)}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip
                      label={STATUS_LABEL[tx.status] ?? tx.status}
                      size='small'
                      color={tx.status === 'SUCCESS' ? 'success' : 'error'}
                      variant='tonal'
                      className='font-black'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='caption' className='font-bold text-slate-500'>{tx.date}</Typography>
                  </TableCell>
                  <TableCell
                    className='text-center'
                    sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}
                  >
                    <Stack direction='row' spacing={1} justifyContent='center'>
                      <IconButton size='small' onClick={() => { setSelectedLog(tx); setIsLogOpen(true) }}>
                        <i className='tabler-code text-[18px]' />
                      </IconButton>
                      {tx.esimInfo && (
                        <IconButton size='small' color='primary' onClick={() => { setSelectedEsim(tx); setIsEsimOpen(true) }}>
                          <i className='tabler-qrcode text-[18px]' />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Log Dialog */}
      <Dialog open={isLogOpen} onClose={() => setIsLogOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex items-center justify-between'>
          <Typography variant='h5' component='span' className='font-black'>API Request/Response Log</Typography>
          <IconButton onClick={() => setIsLogOpen(false)} size='small'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box className='flex flex-col gap-4 m-bs-2'>
              <Box className='flex justify-between items-center bg-slate-50 p-4 rounded-lg'>
                <Box>
                  <Typography variant='caption' className='text-slate-500'>Mã giao dịch</Typography>
                  <Typography variant='body1' className='font-mono font-bold'>{selectedLog.id}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption' className='text-slate-500'>Mã đơn hàng</Typography>
                  <Typography variant='body1' className='font-mono font-bold text-primary'>{selectedLog.orderCode}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption' className='text-slate-500'>Trạng thái</Typography>
                  <Box>
                    <Chip
                      label={STATUS_LABEL[selectedLog.status] ?? selectedLog.status}
                      size='small'
                      color={selectedLog.status === 'SUCCESS' ? 'success' : 'error'}
                      variant='tonal'
                      className='font-black'
                    />
                  </Box>
                </Box>
              </Box>
              <Typography variant='subtitle2' className='font-black uppercase text-slate-500 mt-2'>Request Payload</Typography>
              <Box className='bg-[#1E1E1E] rounded-lg p-4 overflow-x-auto'>
                <pre className='text-[#D4D4D4] font-mono text-xs m-0'>
{`POST /v2/orders
Host: api.${selectedLog.supplier.toLowerCase()}.com
Content-Type: application/json
Authorization: Bearer ***

{
  "package_id": "${selectedLog.package.name}",
  "quantity": 1,
  "reference_id": "${selectedLog.orderCode}"
}`}
                </pre>
              </Box>
              <Typography variant='subtitle2' className='font-black uppercase text-slate-500 mt-2'>Response Body</Typography>
              <Box className='bg-[#1E1E1E] rounded-lg p-4 overflow-x-auto'>
                <pre className='text-[#D4D4D4] font-mono text-xs m-0'>
{selectedLog.status === 'SUCCESS' ? `{
  "data": {
    "order_id": "${selectedLog.orderCode}",
    "status": "completed",
    "iccid": "${selectedLog.esimInfo?.iccid || '8984400000000000000'}",
    "amount": "${formatSupplierCost(selectedLog.originalCost, selectedLog.costCurrency)}",
    "exchange_rate": "${formatExchangeRate(selectedLog.exchangeRate, selectedLog.costCurrency)}"
  },
  "meta": { "message": "Success" }
}` : `{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "The wallet balance is not enough to process this order."
  }
}`}
                </pre>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='contained' color='primary' onClick={() => setIsLogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* eSIM Details Dialog */}
      <Dialog open={isEsimOpen} onClose={() => setIsEsimOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='flex items-center justify-between border-b p-5'>
          <Box>
            <Typography variant='h5' className='font-black'>Chi tiết eSIM Upstream</Typography>
            <Typography variant='caption' color='textSecondary'>Cung cấp bởi {selectedEsim?.supplier}</Typography>
          </Box>
          <IconButton onClick={() => setIsEsimOpen(false)} size='small'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedEsim?.esimInfo && (
            <Box className='flex flex-col items-center gap-6'>
              <Box className='w-48 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden group hover:border-primary transition-colors cursor-pointer'>
                <i className='tabler-qrcode text-slate-300 text-6xl group-hover:text-primary transition-colors' />
                <Box className='absolute bottom-2 left-0 right-0 text-center'>
                  <Typography variant='caption' className='text-[8px] font-mono text-slate-400'>{selectedEsim.esimInfo.qrCode}</Typography>
                </Box>
              </Box>
              <Box className='w-full space-y-4'>
                <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100'>
                  <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1'>Mã ICCID</Typography>
                  <Box className='flex items-center justify-between'>
                    <Typography variant='body1' className='font-mono font-black text-primary'>{selectedEsim.esimInfo.iccid}</Typography>
                    <IconButton size='small'><i className='tabler-copy text-sm' /></IconButton>
                  </Box>
                </Box>
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 6 }}>
                    <Box className='p-3 bg-slate-50 rounded-lg border border-slate-100'>
                      <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1'>SM-DP+ Address</Typography>
                      <Typography variant='body2' className='font-mono font-bold truncate'>{selectedEsim.esimInfo.server}</Typography>
                    </Box>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Box className='p-3 bg-slate-50 rounded-lg border border-slate-100'>
                      <Typography variant='caption' className='font-black uppercase text-slate-400 block mbe-1'>Matching Key</Typography>
                      <Typography variant='body2' className='font-mono font-bold truncate'>{selectedEsim.esimInfo.matchingKey}</Typography>
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={() => setIsEsimOpen(false)}>Đóng</Button>
          <Button variant='contained' color='success' startIcon={<i className='tabler-file-spreadsheet' />}>Xuất Excel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const UpstreamTransactions = () => {
  // Filter States
  const [supplier, setSupplier] = useState('all')
  const [region, setRegion] = useState('all')
  const [status, setStatus] = useState('all')
  const [simType, setSimType] = useState('all')
  const [dataLimit, setDataLimit] = useState('all')
  const [validity, setValidity] = useState('all')
  const [searchTx, setSearchTx] = useState('')
  const [fromDate, setFromDate] = useState(DEFAULT_FROM_DATE)
  const [toDate, setToDate] = useState(DEFAULT_TO_DATE)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)

  const advancedFilterCount = [
    region !== 'all',
    simType !== 'all',
    dataLimit !== 'all',
    validity !== 'all',
    fromDate !== DEFAULT_FROM_DATE || toDate !== DEFAULT_TO_DATE
  ].filter(Boolean).length

  const hasAnyFilter =
    supplier !== 'all' ||
    status !== 'all' ||
    searchTx.trim().length > 0 ||
    advancedFilterCount > 0

  const filteredTransactions = transactions.filter(tx => {
    const keyword = searchTx.trim().toLowerCase()
    const dateKey = transactionDateKey(tx.date)

    return (
      (!keyword ||
        tx.id.toLowerCase().includes(keyword) ||
        tx.orderCode.toLowerCase().includes(keyword) ||
        tx.supplier.toLowerCase().includes(keyword) ||
        tx.package.name.toLowerCase().includes(keyword)) &&
      (supplier === 'all' || tx.supplier.toLowerCase() === supplier) &&
      (status === 'all' || tx.status.toLowerCase() === status) &&
      (region === 'all' || tx.package.region === region) &&
      (simType === 'all' || tx.package.type === simType) &&
      (dataLimit === 'all' || tx.package.data === dataLimit) &&
      (validity === 'all' || tx.package.validity === validity) &&
      (!fromDate || dateKey >= fromDate) &&
      (!toDate || dateKey <= toDate)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize))
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize)

  const handleResetAll = () => {
    setSupplier('all')
    setRegion('all')
    setStatus('all')
    setSimType('all')
    setDataLimit('all')
    setValidity('all')
    setSearchTx('')
    setFromDate(DEFAULT_FROM_DATE)
    setToDate(DEFAULT_TO_DATE)
    setPage(1)
  }

  return (
    <>
      <PageHeader
        title="Lịch sử giao dịch Upstream"
        description="Nhật ký chi tiết các lệnh gọi API, mua hàng và biến động số dư với Nhà cung cấp"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Lịch sử giao dịch' }]}
        actions={
          <Button variant='contained' color='success' size='small' startIcon={<i className='tabler-file-download' />}>
            Xuất Excel
          </Button>
        }
        className='mbe-6'
      />

      {/* Filter bar */}
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
                placeholder='Tìm mã giao dịch, mã đơn hàng, nhà cung cấp, sản phẩm...'
                value={searchTx}
                onChange={(e) => {
                  setSearchTx(e.target.value)
                  setPage(1)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Nhà cung cấp
              </Typography>
              <Select
                fullWidth
                size='small'
                value={supplier}
                onChange={(e) => {
                  setSupplier(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả NCC</MenuItem>
                <MenuItem value='airalo'>Airalo Global</MenuItem>
                <MenuItem value='nomad'>Nomad Global</MenuItem>
                <MenuItem value='keepgo'>KeepGo</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
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
                <MenuItem value='success'>Thành công</MenuItem>
                <MenuItem value='failed'>Thất bại</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.8 }}>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-adjustments-horizontal text-[14px]' />}
                onClick={() => setAdvancedOpen(true)}
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
              Lọc thêm theo vùng, loại eSIM, dung lượng, thời hạn và khoảng thời gian giao dịch.
            </Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Vùng / Quốc gia</Typography>
              <Select fullWidth size='small' value={region} onChange={(e) => { setRegion(e.target.value); setPage(1) }}>
                <MenuItem value='all'>Tất cả vùng</MenuItem>
                <MenuItem value='global'>Toàn cầu</MenuItem>
                <MenuItem value='asia'>Châu Á</MenuItem>
                <MenuItem value='europe'>Châu Âu</MenuItem>
                <MenuItem value='america'>Châu Mỹ</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Loại eSIM</Typography>
              <Select fullWidth size='small' value={simType} onChange={(e) => { setSimType(e.target.value); setPage(1) }}>
                <MenuItem value='all'>Tất cả loại</MenuItem>
                <MenuItem value='Daily'>Daily (Theo ngày)</MenuItem>
                <MenuItem value='Total'>Total (Tổng dung lượng)</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Dung lượng</Typography>
              <Select fullWidth size='small' value={dataLimit} onChange={(e) => { setDataLimit(e.target.value); setPage(1) }}>
                <MenuItem value='all'>Tất cả dung lượng</MenuItem>
                <MenuItem value='1GB'>1GB</MenuItem>
                <MenuItem value='5GB'>5GB</MenuItem>
                <MenuItem value='10GB'>10GB</MenuItem>
                <MenuItem value='20GB'>20GB</MenuItem>
                <MenuItem value='50GB'>50GB</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Thời hạn</Typography>
              <Select fullWidth size='small' value={validity} onChange={(e) => { setValidity(e.target.value); setPage(1) }}>
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='1 Ngày'>1 Ngày</MenuItem>
                <MenuItem value='15 Ngày'>15 Ngày</MenuItem>
                <MenuItem value='30 Ngày'>30 Ngày</MenuItem>
                <MenuItem value='90 Ngày'>90 Ngày</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Từ ngày</Typography>
              <TextField fullWidth size='small' type='date' value={fromDate} onChange={e => { setFromDate(e.target.value); setPage(1) }} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>Đến ngày</Typography>
              <TextField fullWidth size='small' type='date' value={toDate} onChange={e => { setToDate(e.target.value); setPage(1) }} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='border-ts p-6'>
          <Button variant='tonal' color='secondary' onClick={handleResetAll}>
            Đặt lại
          </Button>
          <Button variant='contained' onClick={() => setAdvancedOpen(false)}>
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
              Lịch sử giao dịch Upstream
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
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Tổng chi (Tháng này)</Typography>
              <Typography variant='h6' className='font-black text-primary'>{formatVND(2450800)}</Typography>
            </Box>
            <Box className='border-is ps-4'>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Số lệnh thất bại</Typography>
              <Typography variant='h6' className='font-black text-error'>12</Typography>
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

export default UpstreamTransactions
