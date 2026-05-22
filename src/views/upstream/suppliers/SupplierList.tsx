'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import MultiSelectDropdown from '@/components/common/MultiSelectDropdown'
import PageHeader from '@/components/layout/shared/PageHeader'

import AddSupplierModal from './AddSupplierModal'

type SupplierStatus = 'active' | 'inactive'
type ConnectionStatus = 'Connected' | 'Disconnected'

type Supplier = {
  id: string
  name: string
  code: string
  supplierCode: string
  status: SupplierStatus
  connectionStatus: ConnectionStatus
  packagesCount: number
}

const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Airalo Global',
    code: 'AIRALO',
    supplierCode: 'SUP-1',
    status: 'active',
    connectionStatus: 'Connected',
    packagesCount: 450
  },
  {
    id: '2',
    name: 'Nomad API',
    code: 'NOMAD',
    supplierCode: 'SUP-2',
    status: 'active',
    connectionStatus: 'Connected',
    packagesCount: 1200
  },
  {
    id: '3',
    name: 'GoMoWorld',
    code: 'GOMO',
    supplierCode: 'SUP-3',
    status: 'inactive',
    connectionStatus: 'Disconnected',
    packagesCount: 0
  }
]

const getStatusLabel = (status: SupplierStatus) => (status === 'active' ? 'Hoạt động' : 'Tạm dừng')
const getConnectionColor = (status: ConnectionStatus) => (status === 'Connected' ? 'success' : 'default')

const SupplierList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedConnections, setSelectedConnections] = useState<string[]>([])
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [packageMin, setPackageMin] = useState('')
  const [packageMax, setPackageMax] = useState('')
  const [pendingPackageMin, setPendingPackageMin] = useState('')
  const [pendingPackageMax, setPendingPackageMax] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const advancedFilterCount = (packageMin ? 1 : 0) + (packageMax ? 1 : 0)
  const hasAnyFilter =
    searchTerm.length > 0 || selectedStatuses.length > 0 || selectedConnections.length > 0 || advancedFilterCount > 0

  const filteredSuppliers = useMemo(
    () =>
      suppliers.filter(supplier => {
        const keyword = searchTerm.trim().toLowerCase()
        const matchesSearch =
          keyword.length === 0 ||
          supplier.name.toLowerCase().includes(keyword) ||
          supplier.code.toLowerCase().includes(keyword) ||
          supplier.supplierCode.toLowerCase().includes(keyword)
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(supplier.status)
        const matchesConnection =
          selectedConnections.length === 0 || selectedConnections.includes(supplier.connectionStatus)
        const matchesPackageMin = !packageMin || supplier.packagesCount >= Number(packageMin)
        const matchesPackageMax = !packageMax || supplier.packagesCount <= Number(packageMax)

        return matchesSearch && matchesStatus && matchesConnection && matchesPackageMin && matchesPackageMax
      }),
    [packageMax, packageMin, searchTerm, selectedConnections, selectedStatuses]
  )

  const paginatedSuppliers = filteredSuppliers.slice((page - 1) * pageSize, page * pageSize)

  const handleResetAll = () => {
    setSearchTerm('')
    setSelectedStatuses([])
    setSelectedConnections([])
    setPackageMin('')
    setPackageMax('')
    setPage(1)
  }

  const handleOpenAdvanced = () => {
    setPendingPackageMin(packageMin)
    setPendingPackageMax(packageMax)
    setAdvancedOpen(true)
  }

  const handleApplyAdvanced = () => {
    setPackageMin(pendingPackageMin)
    setPackageMax(pendingPackageMax)
    setPage(1)
    setAdvancedOpen(false)
  }

  return (
    <>
      <PageHeader
        title='Nhà cung cấp Toàn cầu (Upstream)'
        description='Kết nối và quản lý API từ các nhà cung cấp eSIM gốc trên toàn thế giới'
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Nhà cung cấp' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setIsModalOpen(true)}>
            Thêm Nhà cung cấp
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
                placeholder='Tìm tên, mã NCC, mã nhà cung cấp...'
                value={searchTerm}
                onChange={event => {
                  setSearchTerm(event.target.value)
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
                Trạng thái
              </Typography>
              <MultiSelectDropdown
                label='Tất cả trạng thái'
                options={[
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Tạm dừng' }
                ]}
                value={selectedStatuses}
                onChange={value => {
                  setSelectedStatuses(value)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Kết nối
              </Typography>
              <MultiSelectDropdown
                label='Tất cả kết nối'
                options={[
                  { value: 'Connected', label: 'Connected' },
                  { value: 'Disconnected', label: 'Disconnected' }
                ]}
                value={selectedConnections}
                onChange={value => {
                  setSelectedConnections(value)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.8 }}>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-adjustments-horizontal text-[14px]' />}
                onClick={handleOpenAdvanced}
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

      <Card
        className='border-none shadow-sm overflow-hidden mbe-6'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.1)' }}
      >
        <Box className='px-5 py-2 border-be bg-white flex justify-between items-center'>
          <Box className='flex items-center gap-3'>
            <Typography variant='h6' className='font-black'>
              Danh sách nhà cung cấp
            </Typography>
            <Chip
              label={`${filteredSuppliers.length} items`}
              size='small'
              color='primary'
              variant='tonal'
              className='font-bold text-[10px]'
            />
          </Box>
        </Box>

        <Box sx={{ position: 'relative', height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 780, borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 280, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Nhà cung cấp / Mã NCC</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 150, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Kết nối</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 120, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Trạng thái</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 130, textAlign: 'right' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Gói cước</span>
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 120, textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Hành động</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSuppliers.length > 0 ? (
                paginatedSuppliers.map(supplier => {
                  const dashboardHref = `/3m/upstream/suppliers/${supplier.code.toLowerCase()}`

                  return (
                  <TableRow key={supplier.id} hover>
                    <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Link href={dashboardHref} className='inline-flex flex-col gap-0.5 hover:underline'>
                        <Typography variant='body2' className='font-black text-slate-900'>
                          {supplier.name}
                        </Typography>
                        <Typography variant='caption' className='font-mono font-black text-primary uppercase text-[10px]'>
                          {supplier.supplierCode}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={supplier.connectionStatus}
                        size='small'
                        color={getConnectionColor(supplier.connectionStatus)}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getStatusLabel(supplier.status)}
                        size='small'
                        color={supplier.status === 'active' ? 'success' : 'default'}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant='body2' className='font-black text-slate-700'>
                        {supplier.packagesCount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Stack direction='row' justifyContent='center' spacing={0.5}>
                        <Tooltip title='Cấu hình'>
                          <IconButton size='small' component={Link} href={`/3m/upstream/suppliers/${supplier.code.toLowerCase()}/config`}>
                            <i className='tabler-settings text-[16px]' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Truy cập Dashboard'>
                          <IconButton size='small' color='primary' component={Link} href={dashboardHref}>
                            <i className='tabler-layout-dashboard text-[16px]' />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                      <i className='tabler-cloud-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>
                        Không tìm thấy nhà cung cấp nào
                      </Typography>
                      <Button variant='tonal' size='small' onClick={handleResetAll}>
                        Xóa bộ lọc
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box className='p-5 border-ts bg-slate-50/30 flex justify-between items-center'>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='caption' className='text-slate-500'>
              Hiển thị
            </Typography>
            <Select
              size='small'
              value={pageSize}
              onChange={event => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
              sx={{ fontSize: '0.75rem', minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
            <Typography variant='caption' className='text-slate-500'>
              hàng / trang
            </Typography>
          </Stack>
          <Pagination
            count={Math.max(1, Math.ceil(filteredSuppliers.length / pageSize))}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            shape='rounded'
            size='small'
          />
        </Box>
      </Card>

      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h6' className='font-black'>
              Tìm kiếm nâng cao
            </Typography>
            <Typography variant='body2' className='text-slate-500'>
              Lọc thêm theo số lượng gói cước đang đồng bộ từ nhà cung cấp.
            </Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Gói cước từ
              </Typography>
              <TextField fullWidth size='small' type='number' placeholder='0' value={pendingPackageMin} onChange={event => setPendingPackageMin(event.target.value)} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Gói cước đến
              </Typography>
              <TextField fullWidth size='small' type='number' placeholder='999999' value={pendingPackageMax} onChange={event => setPendingPackageMax(event.target.value)} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='p-6 pt-0 flex justify-between'>
          <Button
            variant='text'
            color='secondary'
            startIcon={<i className='tabler-filter-off' />}
            onClick={() => {
              setPendingPackageMin('')
              setPendingPackageMax('')
            }}
          >
            Xóa bộ lọc
          </Button>
          <Button variant='contained' color='primary' onClick={handleApplyAdvanced}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>

      <AddSupplierModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} supplierCount={suppliers.length} />
    </>
  )
}

export default SupplierList
