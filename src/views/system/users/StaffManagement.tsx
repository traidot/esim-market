'use client'

import { useState, useMemo } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid2 from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

import PageHeader from '@/components/layout/shared/PageHeader'

type StaffMember = {
  name: string
  email: string
  role: string
  status: string
}

const StaffManagement = () => {
  const [filterSearch, setFilterSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  const staff: StaffMember[] = [
    { name: 'Nguyễn Văn A', email: 'admin@esim.market', role: 'Super Admin', status: 'Online' },
    { name: 'Trần Thị B', email: 'support@esim.market', role: 'Support', status: 'Offline' },
    { name: 'Lê Văn C', email: 'finance@esim.market', role: 'Accountant', status: 'Online' }
  ]

  const filteredStaff = useMemo(() => staff.filter(s => {
    const keyword = filterSearch.trim().toLowerCase()
    const matchKeyword = !keyword || s.name.toLowerCase().includes(keyword) || s.email.toLowerCase().includes(keyword)
    const matchRole = filterRole === 'all' || s.role === filterRole
    const matchStatus = filterStatus === 'all' || s.status.toLowerCase() === filterStatus
    return matchKeyword && matchRole && matchStatus
  }), [filterSearch, filterRole, filterStatus])

  const hasAnyFilter = filterSearch.trim().length > 0 || filterRole !== 'all' || filterStatus !== 'all'

  const handleResetFilters = () => {
    setFilterSearch('')
    setFilterRole('all')
    setFilterStatus('all')
  }

  const handleOpenEdit = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember)
  }

  const handleCloseEdit = () => {
    setSelectedStaff(null)
  }

  return (
    <>
      <PageHeader
        title="Quản lý Nhân sự"
        description="Quản lý tài khoản nội bộ và trạng thái truy cập hệ thống Admin"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Hệ thống' }, { label: 'Nhân sự' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-user-plus' />}>Thêm Thành viên</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-4'>
        <CardContent>
          <Grid2 container spacing={3} alignItems='center'>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm kiếm theo tên hoặc email...'
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                InputProps={{
                  startAdornment: <i className='tabler-search text-slate-400 mie-2' />
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' label='Vai trò' value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                <MenuItem value='all'>Tất cả vai trò</MenuItem>
                <MenuItem value='Super Admin'>Super Admin</MenuItem>
                <MenuItem value='Support'>Support</MenuItem>
                <MenuItem value='Accountant'>Accountant</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' label='Trạng thái' value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='online'>Hoạt động</MenuItem>
                <MenuItem value='offline'>Không hoạt động</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1 }}>
              <Button
                fullWidth
                variant='tonal'
                color='secondary'
                size='small'
                disabled={!hasAnyFilter}
                onClick={handleResetFilters}
                startIcon={<i className='tabler-rotate-2 text-[14px]' />}
                sx={{ height: 38, whiteSpace: 'nowrap' }}
              >
                Đặt lại
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm'>
        <CardContent className='p-0'>
          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Thành viên</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Vai trò</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((s, i) => (
                  <tr key={i} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Box className='flex items-center gap-3'>
                        <Avatar sx={{ bgcolor: 'info.main' }}>{s.name[0]}</Avatar>
                        <Box>
                          <Typography variant='body2' className='font-black'>{s.name}</Typography>
                          <Typography variant='caption' className='text-slate-400'>{s.email}</Typography>
                        </Box>
                      </Box>
                    </td>
                    <td className='p-4'>
                      <Chip label={s.role} size='small' variant='tonal' color='info' className='font-bold' />
                    </td>
                    <td className='p-4'>
                      <Box className='flex items-center gap-2'>
                        <Box className={`w-2 h-2 rounded-full ${s.status === 'Online' ? 'bg-success' : 'bg-slate-300'}`} />
                        <Typography variant='caption'>{s.status}</Typography>
                      </Box>
                    </td>
                    <td className='p-4 text-right'>
                      {s.role !== 'Super Admin' && (
                        <>
                          <Button size='small' variant='text' onClick={() => handleOpenEdit(s)}>Sửa</Button>
                          <Button size='small' variant='text' color='error'>Gỡ bỏ</Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={selectedStaff !== null} onClose={handleCloseEdit} maxWidth='sm' fullWidth>
        <DialogTitle component='div' className='flex items-center justify-between border-be p-6'>
          <Box>
            <Typography variant='h5' className='font-black'>Chỉnh sửa người dùng</Typography>
            <Typography variant='caption' className='text-slate-500 uppercase font-bold tracking-widest'>
              Cập nhật thông tin tài khoản nội bộ
            </Typography>
          </Box>
          <IconButton onClick={handleCloseEdit} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedStaff && (
            <Grid2 container spacing={4} className='mbs-2'>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Tên người dùng'
                  value={selectedStaff.name}
                  onChange={e => setSelectedStaff({ ...selectedStaff, name: e.target.value })}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Email'
                  value={selectedStaff.email}
                  onChange={e => setSelectedStaff({ ...selectedStaff, email: e.target.value })}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label='Vai trò'
                  value={selectedStaff.role}
                  onChange={e => setSelectedStaff({ ...selectedStaff, role: e.target.value })}
                >
                  <MenuItem value='Support'>Support</MenuItem>
                  <MenuItem value='Accountant'>Accountant</MenuItem>
                </TextField>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label='Trạng thái'
                  value={selectedStaff.status}
                  onChange={e => setSelectedStaff({ ...selectedStaff, status: e.target.value })}
                >
                  <MenuItem value='Online'>Hoạt động</MenuItem>
                  <MenuItem value='Offline'>Không hoạt động</MenuItem>
                </TextField>
              </Grid2>
            </Grid2>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={handleCloseEdit}>Hủy</Button>
          <Button variant='contained' onClick={handleCloseEdit}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StaffManagement
