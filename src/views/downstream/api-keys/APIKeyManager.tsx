'use client'

import { useMemo, useState } from 'react'
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
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import TablePagination from '@mui/material/TablePagination'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'

import PageHeader from '@/components/layout/shared/PageHeader'

type ApiKeyStatus = 'ACTIVE' | 'REVOKED'
type ApiKeyStatusFilter = 'all' | ApiKeyStatus
type PendingActionType = 'revoke' | 'reactivate' | 'delete'

type ApiKeyAgent = {
  id: string
  code: string
  name: string
  email: string
}

type ApiKeyRow = {
  id: string
  agentId: string
  agent: ApiKeyAgent
  status: ApiKeyStatus
  createdAt: string
  lastUsedAt: string | null
  revokedAt: string | null
}

type PendingAction = {
  type: PendingActionType
  row: ApiKeyRow
} | null

const agentOptions: ApiKeyAgent[] = [
  { id: 'a001', code: 'A001', name: 'TravelConnect Solutions', email: 'contact@travelconnect.vn' },
  { id: 'a002', code: 'A002', name: 'Global eSIM Hub', email: 'hub@globale.sim' },
  { id: 'a003', code: 'A003', name: 'CheapData Agency', email: 'sales@cheapdata.com' },
  { id: 'a004', code: 'A004', name: 'Nomad Partner', email: 'partner@nomad.com' }
]

const initialKeys: ApiKeyRow[] = [
  {
    id: 'key-001',
    agentId: 'a001',
    agent: agentOptions[0],
    status: 'ACTIVE',
    createdAt: '2026-05-14T09:30:00+07:00',
    lastUsedAt: '2026-05-22T08:35:00+07:00',
    revokedAt: null
  },
  {
    id: 'key-002',
    agentId: 'a002',
    agent: agentOptions[1],
    status: 'ACTIVE',
    createdAt: '2026-05-11T14:10:00+07:00',
    lastUsedAt: '2026-05-22T09:05:00+07:00',
    revokedAt: null
  },
  {
    id: 'key-003',
    agentId: 'a003',
    agent: agentOptions[2],
    status: 'REVOKED',
    createdAt: '2026-04-26T10:45:00+07:00',
    lastUsedAt: null,
    revokedAt: '2026-05-20T16:30:00+07:00'
  }
]

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value))

const getStatusLabel = (status: ApiKeyStatus) => {
  if (status === 'ACTIVE') return 'Đang sử dụng'

  return 'Đã thu hồi'
}

const getStatusColor = (status: ApiKeyStatus) => {
  if (status === 'ACTIVE') return 'success'

  return 'default'
}

const getPendingTitle = (action: PendingAction) => {
  if (action?.type === 'revoke') return 'Thu hồi API key?'
  if (action?.type === 'reactivate') return 'Kích hoạt lại API key?'
  if (action?.type === 'delete') return 'Xóa API key?'

  return ''
}

const getPendingDescription = (action: PendingAction) => {
  if (action?.type === 'revoke') {
    return `Key của "${action.row.agent.name}" sẽ ngừng hoạt động cho đến khi được kích hoạt lại.`
  }

  if (action?.type === 'reactivate') {
    return `Key của "${action.row.agent.name}" sẽ có thể sử dụng lại.`
  }

  if (action?.type === 'delete') {
    return `Key của "${action.row.agent.name}" sẽ bị xóa vĩnh viễn.`
  }

  return ''
}

const APIKeyManager = () => {
  const [keys, setKeys] = useState<ApiKeyRow[]>(initialKeys)
  const [searchDraft, setSearchDraft] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApiKeyStatusFilter>('all')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedAgentId, setSelectedAgentId] = useState('')
  const [formError, setFormError] = useState('')
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null)
  const [selectedRow, setSelectedRow] = useState<ApiKeyRow | null>(null)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)

  const filteredKeys = useMemo(() => {
    const keyword = searchDraft.trim().toLowerCase()

    return keys.filter((key) => {
      const matchesSearch =
        keyword.length === 0 ||
        key.agent.name.toLowerCase().includes(keyword) ||
        key.agent.code.toLowerCase().includes(keyword)
      const matchesStatus = statusFilter === 'all' || key.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [keys, searchDraft, statusFilter])

  const pagedKeys = useMemo(() => {
    const start = page * pageSize

    return filteredKeys.slice(start, start + pageSize)
  }, [filteredKeys, page, pageSize])

  const resetPage = () => setPage(0)

  const handleCreateOpen = () => {
    setSelectedAgentId('')
    setFormError('')
    setIsCreateOpen(true)
  }

  const handleCreateClose = () => {
    setIsCreateOpen(false)
    setSelectedAgentId('')
    setFormError('')
  }

  const handleCreate = () => {
    const agent = agentOptions.find((item) => item.id === selectedAgentId)

    if (!agent) {
      setFormError('Vui lòng chọn đại lý.')

      return
    }

    const createdAt = new Date().toISOString()
    const id = `key-${keys.length + 1}`.padStart(7, '0')
    const plainKey = `sk_live_${agent.code.toLowerCase()}_${Math.random().toString(36).slice(2, 18)}`
    const row: ApiKeyRow = {
      id,
      agentId: agent.id,
      agent,
      status: 'ACTIVE',
      createdAt,
      lastUsedAt: null,
      revokedAt: null
    }

    setKeys((current) => [row, ...current])
    setCreatedSecret(plainKey)
    setCopiedSecret(false)
    handleCreateClose()
  }

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, row: ApiKeyRow) => {
    setActionAnchor(event.currentTarget)
    setSelectedRow(row)
  }

  const handleActionMenuClose = () => {
    setActionAnchor(null)
    setSelectedRow(null)
  }

  const openPendingAction = (type: PendingActionType) => {
    if (!selectedRow) return

    setPendingAction({ type, row: selectedRow })
    handleActionMenuClose()
  }

  const confirmPendingAction = () => {
    if (!pendingAction) return

    if (pendingAction.type === 'delete') {
      setKeys((current) => current.filter((key) => key.id !== pendingAction.row.id))
    }

    if (pendingAction.type === 'revoke') {
      setKeys((current) =>
        current.map((key) =>
          key.id === pendingAction.row.id
            ? { ...key, status: 'REVOKED', revokedAt: new Date().toISOString() }
            : key
        )
      )
    }

    if (pendingAction.type === 'reactivate') {
      setKeys((current) =>
        current.map((key) =>
          key.id === pendingAction.row.id
            ? { ...key, status: 'ACTIVE', revokedAt: null }
            : key
        )
      )
    }

    setPendingAction(null)
  }

  const copyCreatedSecret = async () => {
    if (!createdSecret) return

    try {
      await navigator.clipboard.writeText(createdSecret)
      setCopiedSecret(true)
    } catch {
      setCopiedSecret(false)
    }
  }

  return (
    <>
      <PageHeader
        title='Quản lý API Keys'
        description='Cấp phát và thu hồi thông tin xác thực Public API cho đại lý.'
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Hệ thống' }, { label: 'API Keys' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-key' />} onClick={handleCreateOpen}>
            Tạo key
          </Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent className='p-0'>
          <Box className='flex flex-col gap-3 border-be p-4 sm:flex-row sm:flex-wrap sm:items-center'>
            <TextField
              className='sm:max-w-[28rem] flex-1'
              size='small'
              placeholder='Tìm theo đại lý'
              value={searchDraft}
              onChange={(event) => {
                setSearchDraft(event.target.value)
                resetPage()
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search text-slate-400' />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              select
              size='small'
              className='w-full sm:w-44'
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as ApiKeyStatusFilter)
                resetPage()
              }}
            >
              <MenuItem value='all'>Tất cả trạng thái</MenuItem>
              <MenuItem value='ACTIVE'>Đang sử dụng</MenuItem>
              <MenuItem value='REVOKED'>Đã thu hồi</MenuItem>
            </TextField>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-be bg-slate-50/80'>
                  <th className='p-4 text-xs font-semibold uppercase text-slate-500'>Đại lý</th>
                  <th className='p-4 text-xs font-semibold uppercase text-slate-500'>Ngày tạo</th>
                  <th className='p-4 text-xs font-semibold uppercase text-slate-500'>Sử dụng lần cuối</th>
                  <th className='p-4 text-xs font-semibold uppercase text-slate-500'>Trạng thái</th>
                  <th className='p-4 text-right text-xs font-semibold uppercase text-slate-500'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {pagedKeys.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='p-8 text-center text-sm text-slate-500'>
                      Chưa có API key.
                    </td>
                  </tr>
                ) : null}
                {pagedKeys.map((key) => (
                  <tr key={key.id} className='border-be last:border-0 transition-colors hover:bg-slate-50/70'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-medium'>
                        {key.agent.name}
                      </Typography>
                      <Typography variant='caption' className='text-slate-500'>
                        {key.agent.code}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='text-slate-500'>
                        {formatDateTime(key.createdAt)}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='text-slate-500'>
                        {key.lastUsedAt ? formatDateTime(key.lastUsedAt) : 'Chưa sử dụng'}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Chip
                        label={getStatusLabel(key.status)}
                        color={getStatusColor(key.status)}
                        size='small'
                        variant='outlined'
                        className='text-xs font-bold'
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Tooltip title='Mở menu thao tác'>
                        <IconButton size='small' onClick={(event) => handleActionMenuOpen(event, key)}>
                          <i className='tabler-dots-vertical text-lg' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <TablePagination
            component='div'
            count={filteredKeys.length}
            page={page}
            onPageChange={(_, nextPage) => setPage(nextPage)}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onRowsPerPageChange={(event) => {
              setPageSize(Number(event.target.value))
              setPage(0)
            }}
            labelRowsPerPage='Số dòng'
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count} dòng`}
          />
        </CardContent>
      </Card>

      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={handleActionMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {selectedRow?.status === 'ACTIVE' ? (
          <MenuItem className='text-error' onClick={() => openPendingAction('revoke')}>
            <i className='tabler-lock mie-2' />
            Thu hồi
          </MenuItem>
        ) : (
          <MenuItem className='text-success' onClick={() => openPendingAction('reactivate')}>
            <i className='tabler-lock-open mie-2' />
            Kích hoạt lại
          </MenuItem>
        )}
        <MenuItem className='text-error' onClick={() => openPendingAction('delete')}>
          <i className='tabler-trash mie-2' />
          Xóa
        </MenuItem>
      </Menu>

      <Dialog open={isCreateOpen} onClose={handleCreateClose} maxWidth='sm' fullWidth>
        <DialogTitle className='font-black text-xl'>Tạo API key</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={4} className='mbs-2'>
            <Typography variant='body2' className='text-slate-500'>
              Chọn đại lý sở hữu key này.
            </Typography>
            <TextField
              select
              fullWidth
              label='Đại lý'
              value={selectedAgentId}
              error={formError.length > 0}
              helperText={formError}
              onChange={(event) => {
                setSelectedAgentId(event.target.value)
                setFormError('')
              }}
            >
              {agentOptions.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.code} - {agent.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
            Hủy
          </Button>
          <Button variant='contained' onClick={handleCreate}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createdSecret !== null} onClose={() => setCreatedSecret(null)} maxWidth='sm' fullWidth>
        <DialogTitle className='font-black text-xl'>Sao chép API key</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={4} className='mbs-2'>
            <Typography variant='body2' className='text-slate-500'>
              Hãy copy secret ngay tại thời điểm tạo. Secret chỉ hiển thị một lần và không thể xem lại.
            </Typography>
            {createdSecret ? (
              <Box className='flex items-center gap-2 rounded-md border bg-slate-50 p-3'>
                <Typography component='code' className='min-w-0 flex-1 break-all font-mono text-sm'>
                  {createdSecret}
                </Typography>
                <Tooltip title='Copy secret'>
                  <IconButton size='small' onClick={copyCreatedSecret}>
                    <i className={copiedSecret ? 'tabler-check text-success' : 'tabler-copy'} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button variant='contained' onClick={() => setCreatedSecret(null)}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={pendingAction !== null} onClose={() => setPendingAction(null)} maxWidth='xs' fullWidth>
        <DialogTitle className='font-black text-xl'>{getPendingTitle(pendingAction)}</DialogTitle>
        <DialogContent dividers>
          <Typography variant='body2' className='text-slate-600'>
            {getPendingDescription(pendingAction)}
          </Typography>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button variant='tonal' color='secondary' onClick={() => setPendingAction(null)}>
            Hủy
          </Button>
          <Button variant='contained' color={pendingAction?.type === 'reactivate' ? 'success' : 'error'} onClick={confirmPendingAction}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default APIKeyManager
