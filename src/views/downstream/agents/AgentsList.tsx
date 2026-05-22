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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Grid2 from '@mui/material/Grid2'
import Pagination from '@mui/material/Pagination'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import MultiSelectDropdown from '@/components/common/MultiSelectDropdown'
import PageHeader from '@/components/layout/shared/PageHeader'

type AgentStatus = 'Active' | 'Inactive'
type AgentTier = 'PLATINUM' | 'GOLD' | 'SILVER'
type AgentPaymentType = 'prepaid' | 'postpaid'

type Agent = {
  id: string
  name: string
  email: string
  tier: AgentTier
  status: AgentStatus
  type: AgentPaymentType
}

const buildEmptyAgentForm = () => ({
  name: '',
  email: '',
  tier: 'SILVER',
  type: 'prepaid',
  currency: 'VND',
  purchaseDeadlineDays: ''
})

const agents: Agent[] = [
  { id: 'A001', name: 'TravelConnect Solutions', email: 'contact@travelconnect.vn', tier: 'PLATINUM', status: 'Active', type: 'postpaid' },
  { id: 'A002', name: 'Global eSIM Hub', email: 'hub@globale.sim', tier: 'GOLD', status: 'Active', type: 'prepaid' },
  { id: 'A003', name: 'CheapData Agency', email: 'sales@cheapdata.com', tier: 'SILVER', status: 'Active', type: 'prepaid' },
  { id: 'A004', name: 'Nomad Partner', email: 'partner@nomad.com', tier: 'GOLD', status: 'Inactive', type: 'prepaid' }
]

const getStatusLabel = (status: AgentStatus) => {
  if (status === 'Active') return 'Hoạt động'
  return 'Tạm dừng'
}

const getStatusColor = (status: AgentStatus) => {
  if (status === 'Active') return 'success'
  return 'default'
}

const getPaymentTypeLabel = (type: AgentPaymentType) => (type === 'postpaid' ? 'Công nợ' : 'Ví')

const AgentsList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTiers, setSelectedTiers] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)

  const [newAgent, setNewAgent] = useState(buildEmptyAgentForm)
  const [editAgent, setEditAgent] = useState(buildEmptyAgentForm)

  const hasAnyFilter =
    searchTerm.length > 0 || selectedTiers.length > 0 || selectedStatuses.length > 0 || selectedPaymentTypes.length > 0

  const filteredAgents = useMemo(
    () =>
      agents.filter(agent => {
        const keyword = searchTerm.trim().toLowerCase()
        const matchesSearch =
          keyword.length === 0 ||
          agent.name.toLowerCase().includes(keyword) ||
          agent.email.toLowerCase().includes(keyword) ||
          agent.id.toLowerCase().includes(keyword)
        const matchesTier = selectedTiers.length === 0 || selectedTiers.includes(agent.tier)
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(agent.status)
        const matchesPayment = selectedPaymentTypes.length === 0 || selectedPaymentTypes.includes(agent.type)

        return matchesSearch && matchesTier && matchesStatus && matchesPayment
      }),
    [searchTerm, selectedPaymentTypes, selectedStatuses, selectedTiers]
  )

  const paginatedAgents = filteredAgents.slice((page - 1) * pageSize, page * pageSize)

  const handleCloseDialog = () => {
    setOpenAddDialog(false)
    setNewAgent(buildEmptyAgentForm())
  }

  const handleOpenEditDialog = (agent: Agent) => {
    setEditingAgent(agent)
    setEditAgent({
      ...buildEmptyAgentForm(),
      name: agent.name,
      email: agent.email,
      tier: agent.tier,
      type: agent.type,
      currency: 'USD'
    })
  }

  const handleCloseEditDialog = () => {
    setEditingAgent(null)
    setEditAgent(buildEmptyAgentForm())
  }

  const handleResetAll = () => {
    setSearchTerm('')
    setSelectedTiers([])
    setSelectedStatuses([])
    setSelectedPaymentTypes([])
    setPage(1)
  }

  return (
    <>
      <PageHeader
        title='Quản lý Đại lý (Agents)'
        description='Quản lý mạng lưới phân phối, số dư ví và cấu hình chiết khấu cho từng đối tác'
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Đại lý' }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='contained' onClick={() => setOpenAddDialog(true)} startIcon={<i className='tabler-plus' />}>
              Thêm Đại lý
            </Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Card
        className='border-none shadow-sm mbe-4'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)' }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid2 container spacing={3} alignItems='flex-end'>
            <Grid2 size={{ xs: 12, md: 6, lg: 3.8 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm tên, email, mã đại lý...'
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

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1.8 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Cấp bậc
              </Typography>
              <MultiSelectDropdown
                label='Tất cả cấp bậc'
                options={[
                  { value: 'PLATINUM', label: 'Platinum' },
                  { value: 'GOLD', label: 'Gold' },
                  { value: 'SILVER', label: 'Silver' }
                ]}
                value={selectedTiers}
                onChange={value => {
                  setSelectedTiers(value)
                  setPage(1)
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
                  { value: 'Active', label: 'Hoạt động' },
                  { value: 'Inactive', label: 'Tạm dừng' }
                ]}
                value={selectedStatuses}
                onChange={value => {
                  setSelectedStatuses(value)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.8 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Hình thức thanh toán
              </Typography>
              <MultiSelectDropdown
                label='Tất cả hình thức'
                options={[
                  { value: 'prepaid', label: 'Ví' },
                  { value: 'postpaid', label: 'Công nợ' }
                ]}
                value={selectedPaymentTypes}
                onChange={value => {
                  setSelectedPaymentTypes(value)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.2 }}>
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
              Danh sách đại lý
            </Typography>
            <Chip
              label={`${filteredAgents.length} items`}
              size='small'
              color='primary'
              variant='tonal'
              className='font-bold text-[10px]'
            />
          </Box>
        </Box>

        <Box sx={{ position: 'relative', height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 980, borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 260, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Đại lý</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 220 }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Email</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 130, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Cấp bậc</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 130, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Thanh toán</span>
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 140, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Trạng thái</span>
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 120, textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Hành động</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAgents.length > 0 ? (
                paginatedAgents.map(agent => {
                  const detailHref = `/3m/downstream/agents/${agent.id.toLowerCase()}`

                  return (
                  <TableRow key={agent.id} hover>
                    <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Link href={detailHref} className='inline-flex flex-col gap-0.5 hover:underline'>
                        <Typography variant='body2' className='font-black text-slate-900'>
                          {agent.name}
                        </Typography>
                        <Typography variant='caption' className='font-mono font-bold text-primary uppercase text-[10px]'>
                          {agent.id}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='text-slate-600'>
                        {agent.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={agent.tier}
                        size='small'
                        color={agent.tier === 'PLATINUM' ? 'primary' : agent.tier === 'GOLD' ? 'warning' : 'secondary'}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getPaymentTypeLabel(agent.type)}
                        size='small'
                        color={agent.type === 'postpaid' ? 'error' : 'success'}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getStatusLabel(agent.status)}
                        size='small'
                        color={getStatusColor(agent.status)}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Stack direction='row' justifyContent='center' spacing={0.5}>
                        <Tooltip title='Chỉnh sửa đại lý'>
                          <IconButton size='small' onClick={() => handleOpenEditDialog(agent)}>
                            <i className='tabler-edit text-[16px]' />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                      <i className='tabler-users-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>
                        Không tìm thấy đại lý nào
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
            count={Math.max(1, Math.ceil(filteredAgents.length / pageSize))}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            shape='rounded'
            size='small'
          />
        </Box>
      </Card>

      <Dialog open={editingAgent !== null} onClose={handleCloseEditDialog} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be'>
          <Box>
            <Typography variant='h5' className='font-black'>Chỉnh sửa Đại lý</Typography>
            <Typography variant='caption' className='text-slate-500 uppercase font-bold tracking-widest'>
              {editingAgent ? `Mã đại lý: ${editingAgent.id}` : 'Cập nhật thông tin phân phối'}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseEditDialog} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={5} className='mbs-2'>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Tên Đại lý / Công ty'
                value={editAgent.name}
                onChange={event => setEditAgent({ ...editAgent, name: event.target.value })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Email liên hệ'
                value={editAgent.email}
                onChange={event => setEditAgent({ ...editAgent, email: event.target.value })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Cấp bậc Đại lý</Typography>
                <Select value={editAgent.tier} onChange={event => setEditAgent({ ...editAgent, tier: event.target.value })}>
                  <MenuItem value='PLATINUM'>Platinum (+5%)</MenuItem>
                  <MenuItem value='GOLD'>Gold (+10%)</MenuItem>
                  <MenuItem value='SILVER'>Silver (+15%)</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl component='fieldset'>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Hình thức Thanh toán</Typography>
                <RadioGroup row value={editAgent.type} onChange={event => setEditAgent({ ...editAgent, type: event.target.value })}>
                  <FormControlLabel value='prepaid' control={<Radio size='small' />} label={<Typography variant='body2'>Ví</Typography>} />
                  <FormControlLabel value='postpaid' control={<Radio size='small' />} label={<Typography variant='body2'>Công nợ</Typography>} />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Số ngày deadline thanh toán</Typography>
              <TextField
                fullWidth
                placeholder='VD: 7'
                type='number'
                value={editAgent.purchaseDeadlineDays}
                onChange={event => setEditAgent({ ...editAgent, purchaseDeadlineDays: event.target.value })}
                inputProps={{ min: 1, 'aria-label': 'Số ngày deadline thanh toán' }}
                helperText='Số ngày kể từ ngày mua'
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Đơn vị tiền tệ</Typography>
                <Select value={editAgent.currency} onChange={event => setEditAgent({ ...editAgent, currency: event.target.value })}>
                  <MenuItem value='VND'>VND (đ)</MenuItem>
                  <MenuItem value='USD'>USD ($)</MenuItem>
                  <MenuItem value='JPY'>JPY (¥)</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='p-6 pt-0 flex gap-3'>
          <Button fullWidth variant='tonal' color='secondary' onClick={handleCloseEditDialog} className='font-black'>Hủy bỏ</Button>
          <Button fullWidth variant='contained' onClick={handleCloseEditDialog} className='font-black'>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be'>
          <Box>
            <Typography variant='h5' className='font-black'>Thêm Đại lý mới</Typography>
            <Typography variant='caption' className='text-slate-500 uppercase font-bold tracking-widest'>Đăng ký đối tác phân phối</Typography>
          </Box>
          <IconButton onClick={handleCloseDialog} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={5} className='mbs-2'>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Tên Đại lý / Công ty'
                placeholder='VD: TravelConnect Solutions'
                value={newAgent.name}
                onChange={event => setNewAgent({ ...newAgent, name: event.target.value })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Email liên hệ'
                placeholder='VD: contact@travel.vn'
                value={newAgent.email}
                onChange={event => setNewAgent({ ...newAgent, email: event.target.value })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Cấp bậc Đại lý</Typography>
                <Select value={newAgent.tier} onChange={event => setNewAgent({ ...newAgent, tier: event.target.value })}>
                  <MenuItem value='PLATINUM'>Platinum (+5%)</MenuItem>
                  <MenuItem value='GOLD'>Gold (+10%)</MenuItem>
                  <MenuItem value='SILVER'>Silver (+15%)</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl component='fieldset'>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Hình thức Thanh toán</Typography>
                <RadioGroup row value={newAgent.type} onChange={event => setNewAgent({ ...newAgent, type: event.target.value })}>
                  <FormControlLabel value='prepaid' control={<Radio size='small' />} label={<Typography variant='body2'>Ví</Typography>} />
                  <FormControlLabel value='postpaid' control={<Radio size='small' />} label={<Typography variant='body2'>Công nợ</Typography>} />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Số ngày deadline thanh toán</Typography>
              <TextField
                fullWidth
                placeholder='VD: 7'
                type='number'
                value={newAgent.purchaseDeadlineDays}
                onChange={event => setNewAgent({ ...newAgent, purchaseDeadlineDays: event.target.value })}
                inputProps={{ min: 1, 'aria-label': 'Số ngày deadline thanh toán' }}
                helperText='Số ngày kể từ ngày mua'
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <Typography variant='caption' className='mbe-1 font-black text-slate-500 uppercase'>Đơn vị tiền tệ</Typography>
                <Select value={newAgent.currency} onChange={event => setNewAgent({ ...newAgent, currency: event.target.value })}>
                  <MenuItem value='VND'>VND (đ)</MenuItem>
                  <MenuItem value='USD'>USD ($)</MenuItem>
                  <MenuItem value='JPY'>JPY (¥)</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='p-6 pt-0 flex gap-3'>
          <Button fullWidth variant='tonal' color='secondary' onClick={handleCloseDialog} className='font-black'>Hủy bỏ</Button>
          <Button fullWidth variant='contained' onClick={handleCloseDialog} className='font-black'>Tạo Đại lý</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AgentsList
