'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import PageHeader from '@/components/layout/shared/PageHeader'

const TierDetail = ({ id }: { id: string }) => {
  const router = useRouter()
  const tierName = id.toUpperCase()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  let color = 'primary'
  if (tierName === 'GOLD') color = 'warning'
  if (tierName === 'SILVER') color = 'secondary'

  const mockAgents = [
    { id: 'a001', name: 'Đại lý Toàn Cầu', email: 'global@example.com' },
    { id: 'a002', name: 'E-sim Việt Nam', email: 'vn@example.com' },
    { id: 'a003', name: 'Phụ kiện Số', email: 'pk@example.com' },
    { id: 'a004', name: 'Travel Sim Store', email: 'store@example.com' }
  ]

  return (
    <>
      <PageHeader
        title={`Cấu hình Cấp bậc: ${tierName}`}
        description="Quản lý chi tiết tỉ lệ nâng giá và điều kiện tài chính cho cấp bậc này."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Cấp bậc', href: '/downstream/tiers' }, { label: tierName }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary'>Hủy</Button>
            <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu thay đổi</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Stack spacing={6}>
            {/* Essential Configuration */}
            <Card className='border-none shadow-sm'>
              <CardContent className='p-6'>
                <Typography variant='h6' className='font-black mbe-6'>Cấu hình Nâng giá & Hạn mức</Typography>
                <Grid2 container spacing={6}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Tỉ lệ nâng giá (%)</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={tierName === 'PLATINUM' ? 5 : tierName === 'GOLD' ? 10 : 15} 
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                        className: 'font-black text-lg'
                      }}
                      helperText="Phần trăm cộng thêm vào giá gốc (Upstream Cost)."
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Hạn mức nợ (Credit Limit)</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={tierName === 'PLATINUM' ? 50000 : tierName === 'GOLD' ? 10000 : 0} 
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        className: 'font-black text-lg'
                      }}
                      helperText="Số nợ tối đa đại lý được phép giữ."
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Ký quỹ tối thiểu</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={tierName === 'PLATINUM' ? 5000 : tierName === 'GOLD' ? 1000 : 100} 
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                      }}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Doanh số yêu cầu/Tháng</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={tierName === 'PLATINUM' ? 10000 : tierName === 'GOLD' ? 3000 : 0} 
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                      }}
                    />
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm'>
              <CardContent className='p-6'>
                <Typography variant='h6' className='font-black mbe-4'>Mô tả & Ghi chú</Typography>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={2} 
                  placeholder='Mô tả ngắn gọn về đặc quyền của cấp bậc này...'
                  defaultValue={`Cấp bậc ${tierName} dành cho đối tác chiến lược.`} 
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack spacing={6}>
            <Card className='border-none shadow-sm bg-slate-50 border-is-[5px]' sx={{ borderLeftColor: `${color}.main` }}>
              <CardContent className='flex flex-col items-center text-center p-8'>
                <Avatar 
                  variant='rounded' 
                  sx={{ width: 64, height: 64, bgcolor: `${color}.main`, color: 'white', mbe: 4 }}
                >
                  <i className='tabler-trophy text-3xl' />
                </Avatar>
                <Typography variant='h4' className='font-black mbe-2'>{tierName}</Typography>
                <Typography variant='body2' className='text-slate-500 mbe-6 font-bold'>45 Đại lý đang áp dụng</Typography>
                <Button 
                  fullWidth 
                  variant='outlined' 
                  startIcon={<i className='tabler-users' />}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Xem danh sách
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Agents List Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth='xs'>
        <DialogTitle className='font-black flex justify-between items-center'>
          Danh sách Đại lý - {tierName}
          <Button size='small' color='secondary' onClick={() => setIsDialogOpen(false)}>Đóng</Button>
        </DialogTitle>
        <DialogContent className='p-0'>
          <List>
            {mockAgents.map((agent) => (
              <ListItem key={agent.id} disablePadding className='border-b last:border-0'>
                <ListItemButton onClick={() => router.push(`/downstream/agents/${agent.id}`)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main', fontSize: '14px' }}>{agent.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<Typography className='font-black'>{agent.name}</Typography>} 
                    secondary={agent.email} 
                  />
                  <i className='tabler-chevron-right text-slate-300' />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TierDetail
