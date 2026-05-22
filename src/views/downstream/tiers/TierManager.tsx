'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import MultiSelectDropdown from '@/components/common/MultiSelectDropdown'
import PageHeader from '@/components/layout/shared/PageHeader'

type TierStatus = 'active' | 'inactive'

type Tier = {
  id: string
  name: string
  markup: number
  status: TierStatus
  description: string
}

const tiers: Tier[] = [
  {
    id: 'platinum',
    name: 'PLATINUM',
    markup: 5,
    status: 'active',
    description: 'Dành cho các đối tác chiến lược có sản lượng cực lớn.'
  },
  {
    id: 'gold',
    name: 'GOLD',
    markup: 10,
    status: 'active',
    description: 'Dành cho các đại lý hoạt động ổn định.'
  },
  {
    id: 'silver',
    name: 'SILVER',
    markup: 15,
    status: 'active',
    description: 'Cấp bậc mặc định cho đại lý mới.'
  }
]

const getStatusLabel = (status: TierStatus) => (status === 'active' ? 'Hoạt động' : 'Tạm dừng')

const TierManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [markupMin, setMarkupMin] = useState('')
  const [markupMax, setMarkupMax] = useState('')
  const [pendingMarkupMin, setPendingMarkupMin] = useState('')
  const [pendingMarkupMax, setPendingMarkupMax] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const advancedFilterCount = (markupMin ? 1 : 0) + (markupMax ? 1 : 0)
  const hasAnyFilter = searchTerm.length > 0 || selectedStatuses.length > 0 || advancedFilterCount > 0

  const filteredTiers = useMemo(
    () =>
      tiers.filter(tier => {
        const keyword = searchTerm.trim().toLowerCase()
        const matchesSearch =
          keyword.length === 0 ||
          tier.name.toLowerCase().includes(keyword) ||
          tier.description.toLowerCase().includes(keyword)
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(tier.status)
        const matchesMarkupMin = !markupMin || tier.markup >= Number(markupMin)
        const matchesMarkupMax = !markupMax || tier.markup <= Number(markupMax)

        return matchesSearch && matchesStatus && matchesMarkupMin && matchesMarkupMax
      }),
    [markupMax, markupMin, searchTerm, selectedStatuses]
  )

  const paginatedTiers = filteredTiers.slice((page - 1) * pageSize, page * pageSize)

  const handleResetAll = () => {
    setSearchTerm('')
    setSelectedStatuses([])
    setMarkupMin('')
    setMarkupMax('')
    setPage(1)
  }

  const handleOpenAdvanced = () => {
    setPendingMarkupMin(markupMin)
    setPendingMarkupMax(markupMax)
    setAdvancedOpen(true)
  }

  const handleApplyAdvanced = () => {
    setMarkupMin(pendingMarkupMin)
    setMarkupMax(pendingMarkupMax)
    setPage(1)
    setAdvancedOpen(false)
  }

  return (
    <>
      <PageHeader
        title='Cấp bậc Đại lý (Agent Tiers)'
        description='Định nghĩa tỉ lệ nâng giá (markup) và các điều kiện tài chính theo cấp bậc đối tác'
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Cấp bậc' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            Tạo Cấp bậc
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
                placeholder='Tìm tên cấp bậc, mô tả...'
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
              Danh sách cấp bậc
            </Typography>
            <Chip
              label={`${filteredTiers.length} items`}
              size='small'
              color='primary'
              variant='tonal'
              className='font-bold text-[10px]'
            />
          </Box>
        </Box>

        <Box sx={{ position: 'relative', height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 760, borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 220, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Cấp bậc</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 260 }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Mô tả</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 120, textAlign: 'right' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Markup</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 120, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Trạng thái</span>
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 120, textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Hành động</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTiers.length > 0 ? (
                paginatedTiers.map(tier => (
                  <TableRow key={tier.id} hover>
                    <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Typography variant='body2' className='font-black text-slate-900'>
                        {tier.name}
                      </Typography>
                      <Typography variant='caption' className='font-mono font-bold text-slate-400 uppercase text-[10px]'>
                        {tier.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-slate-600'>
                        {tier.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant='body2' className='font-black text-primary'>
                        +{tier.markup}%
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getStatusLabel(tier.status)}
                        size='small'
                        color={tier.status === 'active' ? 'success' : 'default'}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Tooltip title='Cấu hình chi tiết'>
                        <IconButton size='small' color='primary' component={Link} href={`/3m/downstream/tiers/${tier.id}`}>
                          <i className='tabler-settings text-[16px]' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                      <i className='tabler-hierarchy-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>
                        Không tìm thấy cấp bậc nào
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
            count={Math.max(1, Math.ceil(filteredTiers.length / pageSize))}
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
              Lọc thêm theo khoảng markup áp dụng cho cấp bậc đại lý.
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
                Markup từ (%)
              </Typography>
              <TextField fullWidth size='small' type='number' placeholder='0' value={pendingMarkupMin} onChange={event => setPendingMarkupMin(event.target.value)} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Markup đến (%)
              </Typography>
              <TextField fullWidth size='small' type='number' placeholder='100' value={pendingMarkupMax} onChange={event => setPendingMarkupMax(event.target.value)} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='p-6 pt-0 flex justify-between'>
          <Button
            variant='text'
            color='secondary'
            startIcon={<i className='tabler-filter-off' />}
            onClick={() => {
              setPendingMarkupMin('')
              setPendingMarkupMax('')
            }}
          >
            Xóa bộ lọc
          </Button>
          <Button variant='contained' color='primary' onClick={handleApplyAdvanced}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TierManager
