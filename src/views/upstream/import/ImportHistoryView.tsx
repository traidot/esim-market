'use client'

import { useState, useMemo } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

import PageHeader from '@/components/layout/shared/PageHeader'
import { formatDate } from '@/lib/format'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ImportStatus = 'pending' | 'running' | 'success' | 'failed'
type EsimDetailStatus = 'OK' | 'EXTRA' | 'MISSING'

interface EsimDetail {
  id: string
  external_id: string
  sheet_name: string
  row_number: number
  package: string
  exchange_rate: number | null
  status: EsimDetailStatus
}

interface ImportJob {
  id: string
  ref: string
  supplier: string
  file_name: string
  status: ImportStatus
  sheet_count: number
  total_rows: number
  imported_rows: number
  error_rows: number
  skipped_rows: number
  started_at: string | null
  finished_at: string | null
  job_details: { esims: EsimDetail[] }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_JOBS: ImportJob[] = [
  {
    id: 'job-001',
    ref: 'IMP-2026-001',
    supplier: 'TUGE',
    file_name: 'tuge_price_apr_2026.xlsx',
    status: 'success',
    sheet_count: 3,
    total_rows: 320,
    imported_rows: 315,
    error_rows: 2,
    skipped_rows: 3,
    started_at: '2026-04-25T08:12:00Z',
    finished_at: '2026-04-25T08:14:32Z',
    job_details: {
      esims: [
        { id: 'e1', external_id: 'TUGE-JP-10G-001', sheet_name: 'Japan', row_number: 2, package: 'JP 10GB 30D', exchange_rate: 25400, status: 'OK' },
        { id: 'e2', external_id: 'TUGE-JP-5G-002', sheet_name: 'Japan', row_number: 3, package: 'JP 5GB 15D', exchange_rate: 25400, status: 'OK' },
        { id: 'e3', external_id: 'TUGE-KR-3G-001', sheet_name: 'Korea', row_number: 2, package: 'KR 3GB 7D', exchange_rate: 25390, status: 'OK' },
        { id: 'e4', external_id: 'TUGE-KR-UNLIM', sheet_name: 'Korea', row_number: 3, package: 'KR Unlimited 1D', exchange_rate: null, status: 'MISSING' },
        { id: 'e5', external_id: 'TUGE-EU-5G-X', sheet_name: 'Europe', row_number: 2, package: 'EU 5GB 15D', exchange_rate: 25400, status: 'EXTRA' },
        { id: 'e6', external_id: 'TUGE-US-10G-001', sheet_name: 'USA', row_number: 2, package: 'US 10GB 30D', exchange_rate: 25410, status: 'OK' },
        { id: 'e7', external_id: 'TUGE-VN-2G-001', sheet_name: 'Vietnam', row_number: 2, package: 'VN 2GB 7D', exchange_rate: 25380, status: 'OK' },
      ]
    }
  },
  {
    id: 'job-002',
    ref: 'IMP-2026-002',
    supplier: 'TSIM',
    file_name: 'tsim_quotes_may2026_v2.xlsx',
    status: 'success',
    sheet_count: 5,
    total_rows: 580,
    imported_rows: 572,
    error_rows: 5,
    skipped_rows: 3,
    started_at: '2026-05-01T10:00:00Z',
    finished_at: '2026-05-01T10:03:11Z',
    job_details: {
      esims: [
        { id: 'e10', external_id: 'TSIM-SG-5G-A', sheet_name: 'Singapore', row_number: 2, package: 'SG 5GB 7D', exchange_rate: 18900, status: 'OK' },
        { id: 'e11', external_id: 'TSIM-SG-UNLIM', sheet_name: 'Singapore', row_number: 3, package: 'SG Unlimited 3D', exchange_rate: 18900, status: 'OK' },
        { id: 'e12', external_id: 'TSIM-TH-3G-B', sheet_name: 'Thailand', row_number: 2, package: 'TH 3GB 5D', exchange_rate: 18850, status: 'OK' },
        { id: 'e13', external_id: 'TSIM-TH-ERR', sheet_name: 'Thailand', row_number: 10, package: '', exchange_rate: null, status: 'MISSING' },
        { id: 'e14', external_id: 'TSIM-MY-2G-C', sheet_name: 'Malaysia', row_number: 2, package: 'MY 2GB 7D', exchange_rate: 18870, status: 'OK' },
      ]
    }
  },
  {
    id: 'job-003',
    ref: 'IMP-2026-003',
    supplier: 'MOS',
    file_name: 'mos_pricing_may2026.xlsx',
    status: 'failed',
    sheet_count: 2,
    total_rows: 120,
    imported_rows: 0,
    error_rows: 120,
    skipped_rows: 0,
    started_at: '2026-05-05T14:20:00Z',
    finished_at: '2026-05-05T14:20:45Z',
    job_details: { esims: [] }
  },
  {
    id: 'job-004',
    ref: 'IMP-2026-004',
    supplier: 'TUGE',
    file_name: 'tuge_price_may_patch.xlsx',
    status: 'running',
    sheet_count: 2,
    total_rows: 200,
    imported_rows: 88,
    error_rows: 1,
    skipped_rows: 0,
    started_at: '2026-05-20T07:45:00Z',
    finished_at: null,
    job_details: { esims: [] }
  },
  {
    id: 'job-005',
    ref: 'IMP-2026-005',
    supplier: 'MOS',
    file_name: 'mos_quotes_q2_2026.xlsx',
    status: 'success',
    sheet_count: 4,
    total_rows: 410,
    imported_rows: 408,
    error_rows: 0,
    skipped_rows: 2,
    started_at: '2026-05-10T09:00:00Z',
    finished_at: '2026-05-10T09:02:55Z',
    job_details: {
      esims: [
        { id: 'e20', external_id: 'MOS-AU-10G-001', sheet_name: 'Australia', row_number: 2, package: 'AU 10GB 30D', exchange_rate: 16500, status: 'OK' },
        { id: 'e21', external_id: 'MOS-AU-5G-002', sheet_name: 'Australia', row_number: 3, package: 'AU 5GB 14D', exchange_rate: 16500, status: 'OK' },
        { id: 'e22', external_id: 'MOS-NZ-3G-001', sheet_name: 'NZ', row_number: 2, package: 'NZ 3GB 7D', exchange_rate: 15800, status: 'OK' },
        { id: 'e23', external_id: 'MOS-NZ-EXTRA', sheet_name: 'NZ', row_number: 3, package: 'NZ Extra Pack', exchange_rate: 15800, status: 'EXTRA' },
        { id: 'e24', external_id: 'MOS-CA-8G-001', sheet_name: 'Canada', row_number: 2, package: 'CA 8GB 28D', exchange_rate: 18200, status: 'OK' },
        { id: 'e25', external_id: 'MOS-CA-MISS', sheet_name: 'Canada', row_number: 5, package: '', exchange_rate: null, status: 'MISSING' },
        { id: 'e26', external_id: 'MOS-UK-15G-001', sheet_name: 'UK', row_number: 2, package: 'UK 15GB 30D', exchange_rate: 31200, status: 'OK' },
        { id: 'e27', external_id: 'MOS-UK-5G-002', sheet_name: 'UK', row_number: 3, package: 'UK 5GB 7D', exchange_rate: 31200, status: 'OK' },
        { id: 'e28', external_id: 'MOS-UK-UNLIM', sheet_name: 'UK', row_number: 4, package: 'UK Unlimited 1D', exchange_rate: 31200, status: 'OK' },
      ]
    }
  },
  {
    id: 'job-006',
    ref: 'IMP-2026-006',
    supplier: 'TSIM',
    file_name: 'tsim_may_update.xlsx',
    status: 'pending',
    sheet_count: 1,
    total_rows: 0,
    imported_rows: 0,
    error_rows: 0,
    skipped_rows: 0,
    started_at: null,
    finished_at: null,
    job_details: { esims: [] }
  },
  {
    id: 'job-007',
    ref: 'IMP-2026-007',
    supplier: 'TUGE',
    file_name: 'tuge_full_catalog_2026.xlsx',
    status: 'success',
    sheet_count: 8,
    total_rows: 1240,
    imported_rows: 1228,
    error_rows: 7,
    skipped_rows: 5,
    started_at: '2026-05-15T06:30:00Z',
    finished_at: '2026-05-15T06:37:18Z',
    job_details: { esims: [] }
  },
  {
    id: 'job-008',
    ref: 'IMP-2026-008',
    supplier: 'MOS',
    file_name: 'mos_pricing_correction.xlsx',
    status: 'failed',
    sheet_count: 1,
    total_rows: 55,
    imported_rows: 12,
    error_rows: 43,
    skipped_rows: 0,
    started_at: '2026-05-18T11:00:00Z',
    finished_at: '2026-05-18T11:01:10Z',
    job_details: { esims: [] }
  }
]

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const
const SUPPLIERS = ['TUGE', 'TSIM', 'MOS']
const STATUSES: ImportStatus[] = ['pending', 'running', 'success', 'failed']
const HISTORY_TABLE_COLUMN_COUNT = 12

const SURFACE_CARD_SX = {
  borderRadius: 3,
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.08)'
}

const STICKY_HEAD_SX = {
  position: 'sticky',
  top: 0,
  zIndex: 2,
  bgcolor: 'grey.100'
}

const STICKY_LEFT_HEAD_SX = {
  ...STICKY_HEAD_SX,
  left: 0,
  zIndex: 4,
  borderRight: '1px solid',
  borderColor: 'divider',
  boxShadow: '4px 0 8px -8px rgba(15, 23, 42, 0.45)'
}

const STICKY_LEFT_BODY_SX = {
  position: 'sticky',
  left: 0,
  zIndex: 1,
  bgcolor: 'background.paper',
  borderRight: '1px solid',
  borderColor: 'divider',
  boxShadow: '4px 0 8px -8px rgba(15, 23, 42, 0.45)'
}

const STICKY_RIGHT_HEAD_SX = {
  ...STICKY_HEAD_SX,
  right: 0,
  zIndex: 4,
  borderLeft: '1px solid',
  borderColor: 'divider',
  boxShadow: '-4px 0 8px -8px rgba(15, 23, 42, 0.45)'
}

const STICKY_RIGHT_BODY_SX = {
  position: 'sticky',
  right: 0,
  zIndex: 1,
  bgcolor: 'background.paper',
  borderLeft: '1px solid',
  borderColor: 'divider',
  boxShadow: '-4px 0 8px -8px rgba(15, 23, 42, 0.45)'
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function statusChipProps(status: ImportStatus): { color: 'warning' | 'info' | 'success' | 'error'; label: string } {
  switch (status) {
    case 'pending':  return { color: 'warning', label: 'Chờ xử lý' }
    case 'running':  return { color: 'info',    label: 'Đang chạy' }
    case 'success':  return { color: 'success', label: 'Thành công' }
    case 'failed':   return { color: 'error',   label: 'Thất bại' }
  }
}

function esimStatusChipProps(status: EsimDetailStatus): { color: 'success' | 'warning' | 'error'; label: string } {
  switch (status) {
    case 'OK':      return { color: 'success', label: 'OK' }
    case 'EXTRA':   return { color: 'warning', label: 'Extra' }
    case 'MISSING': return { color: 'error',   label: 'Missing' }
  }
}

function supplierColor(supplier: string): 'primary' | 'secondary' | 'warning' {
  if (supplier === 'TUGE') return 'primary'
  if (supplier === 'TSIM') return 'secondary'
  return 'warning'
}

function resetTableFilters(
  setSearch: (value: string) => void,
  setStatusFilter: (value: ImportStatus | '') => void,
  setSupplierFilter: (value: string) => void,
  setPage: (value: number) => void
) {
  setSearch('')
  setStatusFilter('')
  setSupplierFilter('')
  setPage(1)
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL DIALOG
// ─────────────────────────────────────────────────────────────────────────────

interface DetailDialogProps {
  job: ImportJob | null
  open: boolean
  onClose: () => void
}

function DetailDialog({ job, open, onClose }: DetailDialogProps) {
  const [search, setSearch] = useState('')
  const [detailPage, setDetailPage] = useState(1)
  const DETAIL_PAGE_SIZE = 8

  const filtered = useMemo(() => {
    if (!job) return []
    const q = search.toLowerCase()
    if (!q) return job.job_details.esims
    return job.job_details.esims.filter(e =>
      e.external_id.toLowerCase().includes(q) ||
      e.sheet_name.toLowerCase().includes(q) ||
      e.package.toLowerCase().includes(q) ||
      String(e.row_number).includes(q)
    )
  }, [job, search])

  const totalDetailPages = Math.max(1, Math.ceil(filtered.length / DETAIL_PAGE_SIZE))
  const pageRows = filtered.slice((detailPage - 1) * DETAIL_PAGE_SIZE, detailPage * DETAIL_PAGE_SIZE)

  if (!job) return null

  const { color: statusColor, label: statusLabel } = statusChipProps(job.status)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: 'calc(100vw - 2rem)', sm: 'calc(100vw - 4rem)' },
          maxWidth: { xs: 'calc(100vw - 2rem)', sm: 'calc(100vw - 4rem)', xl: 1320 },
          maxHeight: '88dvh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle>
        <Box className='flex min-w-0 items-start justify-between gap-3'>
          <Box className='flex min-w-0 flex-1 items-center gap-3'>
            <Box className='min-w-0'>
              <Typography variant='h6' className='truncate font-black leading-tight'>
                Chi tiết Import — {job.ref}
              </Typography>
              <Box className='mt-1 flex min-w-0 items-center gap-2'>
                <Chip label={job.supplier} size='small' color={supplierColor(job.supplier)} variant='tonal' className='font-bold text-[10px]' />
                <Chip label={statusLabel} size='small' color={statusColor} variant='tonal' className='font-bold text-[10px]' />
                <Tooltip title={job.file_name} placement='top'>
                  <Typography variant='caption' className='min-w-0 truncate font-mono text-slate-400'>{job.file_name}</Typography>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <IconButton onClick={onClose} size='small' className='shrink-0'>
            <i className='tabler-x text-slate-400' />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent className='p-0'>
        {/* Summary strip */}
        <Box className='grid grid-cols-4 divide-x border-b bg-slate-50/50'>
          {[
            { label: 'Tổng dòng', value: job.total_rows, color: 'text-slate-700' },
            { label: 'Đã import', value: job.imported_rows, color: 'text-emerald-600' },
            { label: 'Lỗi', value: job.error_rows, color: 'text-red-600' },
            { label: 'Bỏ qua', value: job.skipped_rows, color: 'text-amber-600' },
          ].map(item => (
            <Box key={item.label} className='flex flex-col items-center py-3'>
              <Typography variant='h5' className={`font-black ${item.color}`}>{item.value}</Typography>
              <Typography variant='caption' className='text-slate-500'>{item.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box className='p-4'>
          {job.job_details.esims.length === 0 ? (
            <Box className='flex flex-col items-center justify-center py-16 text-slate-400'>
              <i className='tabler-database-off text-4xl mb-3' />
              <Typography variant='body2'>Không có dữ liệu eSIM chi tiết cho job này</Typography>
            </Box>
          ) : (
            <>
              <Box className='flex items-center justify-between mb-3'>
                <Typography variant='subtitle2' className='font-black text-slate-600'>
                  Kết quả eSIM ({filtered.length} dòng)
                </Typography>
                <TextField
                  size='small'
                  placeholder='Tìm external ID, sheet, package...'
                  value={search}
                  onChange={e => { setSearch(e.target.value); setDetailPage(1) }}
                  sx={{ width: 280 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <i className='tabler-search text-slate-400 text-sm' />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <TableContainer className='rounded-lg border border-slate-100' sx={{ overflow: 'auto' }}>
                <Table size='small' sx={{ minWidth: 720 }}>
                  <TableHead>
                    <TableRow className='bg-slate-50'>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase'>External ID</TableCell>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase'>Sheet</TableCell>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase' align='right'>Dòng #</TableCell>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase'>Package</TableCell>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase' align='right'>Tỷ giá</TableCell>
                      <TableCell className='font-black text-[11px] text-slate-500 uppercase' align='center'>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align='center' className='py-8 text-slate-400'>
                          Không tìm thấy kết quả
                        </TableCell>
                      </TableRow>
                    ) : pageRows.map(esim => {
                      const { color, label } = esimStatusChipProps(esim.status)
                      return (
                        <TableRow key={esim.id} className='hover:bg-slate-50/70 transition-colors group'>
                          <TableCell className='font-mono text-xs text-primary'>{esim.external_id}</TableCell>
                          <TableCell className='text-xs'>{esim.sheet_name}</TableCell>
                          <TableCell align='right' className='text-xs tabular-nums'>{esim.row_number}</TableCell>
                          <TableCell className='text-xs'>{esim.package || <span className='text-slate-300 italic'>—</span>}</TableCell>
                          <TableCell align='right' className='text-xs tabular-nums font-mono'>
                            {esim.exchange_rate != null
                              ? esim.exchange_rate.toLocaleString('en-US')
                              : <span className='text-slate-300'>—</span>}
                          </TableCell>
                          <TableCell align='center'>
                            <Chip label={label} size='small' color={color} variant='tonal' className='font-bold text-[10px]' />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {totalDetailPages > 1 && (
                <Box className='flex justify-center mt-4'>
                  <Pagination
                    count={totalDetailPages}
                    page={detailPage}
                    onChange={(_, p) => setDetailPage(p)}
                    size='small'
                    color='primary'
                    variant='tonal'
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN VIEW
// ─────────────────────────────────────────────────────────────────────────────

const ImportHistoryView = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ImportStatus | ''>('')
  const [supplierFilter, setSupplierFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
  const [detailJob, setDetailJob] = useState<ImportJob | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    return MOCK_JOBS.filter(job => {
      const matchesSearch = !q || job.ref.toLowerCase().includes(q) || job.file_name.toLowerCase().includes(q) || job.supplier.toLowerCase().includes(q)
      const matchesStatus = !statusFilter || job.status === statusFilter
      const matchesSupplier = !supplierFilter || job.supplier === supplierFilter
      return matchesSearch && matchesStatus && matchesSupplier
    })
  }, [search, statusFilter, supplierFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <>
      <PageHeader
        title="Lịch sử Import Báo giá"
        description="Theo dõi tiến trình và kết quả các lần import file báo giá từ nhà cung cấp"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Nguồn cung' },
          { label: 'Lịch sử Import' }
        ]}
        actions={
          <Button
            component={Link}
            href='/3m/upstream/import'
            variant='contained'
            startIcon={<i className='tabler-cloud-upload' />}
          >
            Import mới
          </Button>
        }
        className='mbe-4'
      />

      <Box className='flex w-full flex-col gap-4'>
        <Card className='border-none shadow-sm' sx={SURFACE_CARD_SX}>
          <CardContent className='p-3'>
            <Box className='grid gap-2 md:grid-cols-[minmax(260px,1fr)_220px_240px_auto_auto] md:items-end'>
              <Box className='flex flex-col gap-1'>
                <Typography component='label' htmlFor='import-history-search' variant='caption' className='font-medium text-slate-700'>
                  Tìm kiếm
                </Typography>
                <TextField
                  id='import-history-search'
                  size='small'
                  placeholder='Mã ref, file, nhà cung cấp...'
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') setPage(1)
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <i className='tabler-search text-slate-400 text-sm' />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box className='flex flex-col gap-1'>
                <Typography component='label' htmlFor='import-history-supplier' variant='caption' className='font-medium text-slate-700'>
                  Nhà cung cấp
                </Typography>
                <FormControl size='small' fullWidth>
                  <InputLabel>Nhà cung cấp</InputLabel>
                  <Select
                    id='import-history-supplier'
                    value={supplierFilter}
                    label='Nhà cung cấp'
                    onChange={event => {
                      setSupplierFilter(event.target.value)
                      setPage(1)
                    }}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
                    {SUPPLIERS.map(s => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box className='flex flex-col gap-1'>
                <Typography component='label' htmlFor='import-history-status' variant='caption' className='font-medium text-slate-700'>
                  Trạng thái
                </Typography>
                <FormControl size='small' fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    id='import-history-status'
                    value={statusFilter}
                    label='Trạng thái'
                    onChange={event => {
                      setStatusFilter(event.target.value as ImportStatus | '')
                      setPage(1)
                    }}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
                    {STATUSES.map(s => {
                      const { label, color } = statusChipProps(s)
                      return (
                        <MenuItem key={s} value={s}>
                          <Box className='flex items-center gap-2'>
                            <Chip label={label} size='small' color={color} variant='tonal' className='font-bold text-[10px]' />
                          </Box>
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant='contained'
                startIcon={<i className='tabler-search' />}
                onClick={() => setPage(1)}
                className='whitespace-nowrap'
              >
                Tìm kiếm
              </Button>

              <Button
                variant='tonal'
                startIcon={<i className='tabler-rotate-clockwise-2' />}
                color='inherit'
                onClick={() => resetTableFilters(setSearch, setStatusFilter, setSupplierFilter, setPage)}
                className='whitespace-nowrap'
              >
                Đặt lại
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card className='mb-6 overflow-hidden border-none shadow-sm' sx={SURFACE_CARD_SX}>
          <Box className='flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-2 sm:px-6'>
            <Typography variant='subtitle1' className='font-semibold text-slate-800'>
              Danh sách lịch sử import
            </Typography>
            <Chip label={`${filtered.length} items`} size='small' color='info' variant='tonal' className='font-bold text-[10px]' />
          </Box>

          <TableContainer
            sx={{
              height: 'calc(100dvh - 24rem)',
              minHeight: 360,
              maxHeight: 640,
              overflow: 'auto'
            }}
          >
            <Table stickyHeader size='small' sx={{ minWidth: 1280, tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  {[
                    { label: 'Mã Ref', align: 'left' as const, sx: { ...STICKY_LEFT_HEAD_SX, minWidth: 240 } },
                    { label: 'NCC', align: 'left' as const, sx: { ...STICKY_HEAD_SX, minWidth: 120 } },
                    { label: 'File', align: 'left' as const, sx: { ...STICKY_HEAD_SX, minWidth: 260 } },
                    { label: 'Trạng thái', align: 'center' as const, sx: { ...STICKY_HEAD_SX, minWidth: 140 } },
                    { label: 'Sheets', align: 'right' as const, sx: { ...STICKY_HEAD_SX, minWidth: 90 } },
                    { label: 'Tổng dòng', align: 'right' as const, sx: { ...STICKY_HEAD_SX, minWidth: 110 } },
                    { label: 'Đã import', align: 'right' as const, sx: { ...STICKY_HEAD_SX, minWidth: 120 } },
                    { label: 'Lỗi', align: 'right' as const, sx: { ...STICKY_HEAD_SX, minWidth: 90 } },
                    { label: 'Bỏ qua', align: 'right' as const, sx: { ...STICKY_HEAD_SX, minWidth: 100 } },
                    { label: 'Bắt đầu', align: 'left' as const, sx: { ...STICKY_HEAD_SX, minWidth: 160 } },
                    { label: 'Kết thúc', align: 'left' as const, sx: { ...STICKY_HEAD_SX, minWidth: 160 } },
                    { label: 'Hành động', align: 'center' as const, sx: { ...STICKY_RIGHT_HEAD_SX, minWidth: 110 } },
                  ].map(col => (
                    <TableCell
                      key={col.label}
                      align={col.align}
                      className='font-semibold text-[11px] text-slate-500 uppercase whitespace-nowrap'
                      sx={col.sx}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pageRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={HISTORY_TABLE_COLUMN_COUNT} align='center' className='py-16 text-slate-400'>
                      <Box className='flex flex-col items-center gap-3'>
                        <i className='tabler-layers-off text-5xl opacity-40' />
                        <Typography variant='body2' className='font-semibold'>Không có dữ liệu</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : pageRows.map(job => {
                  const { color: statusColor, label: statusLabel } = statusChipProps(job.status)
                  const hasDetail = job.job_details.esims.length > 0

                  return (
                    <TableRow
                      key={job.id}
                      className='hover:bg-slate-50/70 transition-colors group'
                    >
                      {/* Ref */}
                      <TableCell className='whitespace-nowrap' sx={STICKY_LEFT_BODY_SX}>
                        <Tooltip title={job.ref} placement='top'>
                          <Typography variant='body2' className='max-w-[220px] truncate font-mono text-xs font-semibold text-primary'>
                            {job.ref}
                          </Typography>
                        </Tooltip>
                      </TableCell>

                      {/* Supplier */}
                      <TableCell className='px-3'>
                        <Chip
                          label={job.supplier}
                          size='small'
                          color={supplierColor(job.supplier)}
                          variant='tonal'
                          className='font-black text-[10px]'
                        />
                      </TableCell>

                      {/* File */}
                      <TableCell className='px-3'>
                        <Tooltip title={job.file_name} placement='top'>
                          <Box className='flex max-w-[260px] items-center gap-1.5'>
                            <i className='tabler-file-spreadsheet text-emerald-500 shrink-0' />
                            <Typography variant='caption' className='truncate font-mono text-slate-600'>
                              {job.file_name}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </TableCell>

                      {/* Status */}
                      <TableCell align='center' className='whitespace-nowrap px-3'>
                        <Chip
                          label={statusLabel}
                          size='small'
                          color={statusColor}
                          variant='tonal'
                          className='font-bold text-[10px]'
                          icon={
                            job.status === 'running'
                              ? <i className='tabler-loader-2 animate-spin text-[10px]' />
                              : undefined
                          }
                        />
                      </TableCell>

                      {/* Sheets */}
                      <TableCell align='right' className='px-3'>
                        <Typography variant='body2' className='tabular-nums text-slate-700'>{job.sheet_count}</Typography>
                      </TableCell>

                      {/* Total rows */}
                      <TableCell align='right' className='px-3'>
                        <Typography variant='body2' className='tabular-nums font-bold text-slate-700'>{job.total_rows.toLocaleString()}</Typography>
                      </TableCell>

                      {/* Imported */}
                      <TableCell align='right' className='px-3'>
                        <Typography variant='body2' className='tabular-nums font-bold text-emerald-600'>{job.imported_rows.toLocaleString()}</Typography>
                      </TableCell>

                      {/* Errors */}
                      <TableCell align='right' className='px-3'>
                        <Typography
                          variant='body2'
                          className={`tabular-nums font-bold ${job.error_rows > 0 ? 'text-red-600' : 'text-slate-300'}`}
                        >
                          {job.error_rows}
                        </Typography>
                      </TableCell>

                      {/* Skipped */}
                      <TableCell align='right' className='px-3'>
                        <Typography
                          variant='body2'
                          className={`tabular-nums ${job.skipped_rows > 0 ? 'text-amber-600 font-bold' : 'text-slate-300'}`}
                        >
                          {job.skipped_rows}
                        </Typography>
                      </TableCell>

                      {/* Started at */}
                      <TableCell className='whitespace-nowrap px-3'>
                        <Typography variant='caption' className='font-mono text-slate-500'>
                          {job.started_at ? formatDate(job.started_at) : <span className='text-slate-300'>—</span>}
                        </Typography>
                      </TableCell>

                      {/* Finished at */}
                      <TableCell className='whitespace-nowrap px-3'>
                        <Typography variant='caption' className='font-mono text-slate-500'>
                          {job.finished_at ? formatDate(job.finished_at) : <span className='text-slate-300'>—</span>}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align='center' className='whitespace-nowrap px-3' sx={STICKY_RIGHT_BODY_SX}>
                        <Tooltip title={hasDetail ? 'Xem chi tiết eSIM' : 'Không có dữ liệu chi tiết'} placement='left'>
                          <span>
                            <IconButton
                              size='small'
                              onClick={() => setDetailJob(job)}
                              disabled={!hasDetail && job.status !== 'success' && job.status !== 'failed'}
                              aria-label='Xem chi tiết eSIM'
                            >
                              <i className='tabler-eye text-lg' />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className='flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
            <Box className='flex flex-wrap items-center gap-3'>
              <Typography variant='caption' className='text-slate-500'>
                {filtered.length} bản ghi
              </Typography>
              <FormControl size='small' sx={{ minWidth: 132 }}>
                <InputLabel>Số dòng</InputLabel>
                <Select
                  value={pageSize}
                  label='Số dòng'
                  onChange={event => {
                    setPageSize(Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
                    setPage(1)
                  }}
                >
                  {PAGE_SIZE_OPTIONS.map(option => (
                    <MenuItem key={option} value={option}>
                      {option} / trang
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant='caption' className='text-slate-500'>
                Trang {currentPage} / {totalPages}
              </Typography>
            </Box>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, p) => setPage(p)}
              color='primary'
              variant='tonal'
              size='small'
            />
          </Box>
        </Card>
      </Box>

      <DetailDialog
        job={detailJob}
        open={Boolean(detailJob)}
        onClose={() => setDetailJob(null)}
      />
    </>
  )
}

export default ImportHistoryView
