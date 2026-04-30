'use client'

import { useState } from 'react'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'

import PageHeader from '@/components/layout/shared/PageHeader'

const TierDetail = ({ id }: { id: string }) => {
  const tierName = id.toUpperCase()
  
  let color = 'primary'
  if (tierName === 'GOLD') color = 'warning'
  if (tierName === 'SILVER') color = 'secondary'

  return (
    <>
      <PageHeader
        title={`Cấu hình Cấp bậc: ${tierName}`}
        description="Quản lý chi tiết quyền lợi, chiết khấu và điều kiện áp dụng cho cấp bậc này."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Cấp bậc', href: '/downstream/tiers' }, { label: tierName }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary'>Hủy thay đổi</Button>
            <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu Cấu hình</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='border-none shadow-sm mbe-6'>
            <CardContent className='p-6'>
              <Typography variant='h5' className='font-black mbe-4'>1. Thông tin chung</Typography>
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Tên cấp bậc' 
                    defaultValue={tierName} 
                    InputProps={{ readOnly: true }}
                    variant='filled'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Mã Cấp bậc (Code)' 
                    defaultValue={tierName} 
                    InputProps={{ readOnly: true }}
                    variant='filled'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField 
                    fullWidth 
                    multiline 
                    rows={3} 
                    label='Mô tả (Dành cho Đại lý xem)' 
                    defaultValue={`Cấp bậc ${tierName} với nhiều quyền lợi hấp dẫn.`} 
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='h5' className='font-black mbe-4'>2. Cấu hình Chiết khấu & Tài chính</Typography>
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Mức chiết khấu (Discount off Markup)' 
                    defaultValue={tierName === 'PLATINUM' ? 70 : tierName === 'GOLD' ? 40 : 0} 
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>
                    }}
                    helperText="Phần trăm giảm giá dựa trên lợi nhuận gộp (Markup) của hệ thống."
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Hạn mức nợ tối đa (Credit Limit)' 
                    defaultValue={tierName === 'PLATINUM' ? 50000 : tierName === 'GOLD' ? 10000 : 0} 
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    helperText="Số tiền nợ tối đa đại lý được phép giữ trước khi bị khóa mua hàng."
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Yêu cầu Ký quỹ tối thiểu' 
                    defaultValue={tierName === 'PLATINUM' ? 5000 : tierName === 'GOLD' ? 1000 : 100} 
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField 
                    fullWidth 
                    label='Doanh số yêu cầu (Hàng tháng)' 
                    defaultValue={tierName === 'PLATINUM' ? 10000 : tierName === 'GOLD' ? 3000 : 0} 
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm mbe-6 bg-slate-50'>
            <CardContent className='flex flex-col items-center text-center p-8'>
              <Avatar 
                variant='rounded' 
                className={`bg-${color}/10 text-${color} w-[64px] h-[64px] mbe-4`}
              >
                <i className='tabler-trophy text-3xl' />
              </Avatar>
              <Typography variant='h4' className='font-black mbe-2'>{tierName}</Typography>
              <Typography variant='body2' className='text-slate-500 mbe-6'>Cấp bậc hiện đang áp dụng cho 45 Đại lý trong hệ thống.</Typography>
              <Button fullWidth variant='outlined' startIcon={<i className='tabler-users' />}>Xem danh sách Đại lý</Button>
            </CardContent>
          </Card>
          
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Typography variant='subtitle2' className='font-black uppercase mbe-4 text-slate-500'>Tính năng nâng cao</Typography>
              <Stack spacing={4}>
                <Box className='flex justify-between items-center'>
                  <Box>
                    <Typography variant='body1' className='font-bold'>API Access</Typography>
                    <Typography variant='caption' className='text-slate-500'>Cấp quyền sử dụng API B2B</Typography>
                  </Box>
                  <Chip label={tierName === 'SILVER' ? 'Khóa' : 'Cho phép'} color={tierName === 'SILVER' ? 'secondary' : 'success'} size='small' variant='tonal' />
                </Box>
                <Divider />
                <Box className='flex justify-between items-center'>
                  <Box>
                    <Typography variant='body1' className='font-bold'>White-label Portal</Typography>
                    <Typography variant='caption' className='text-slate-500'>Trang bán hàng thương hiệu riêng</Typography>
                  </Box>
                  <Chip label={tierName === 'PLATINUM' ? 'Cho phép' : 'Khóa'} color={tierName === 'PLATINUM' ? 'success' : 'secondary'} size='small' variant='tonal' />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default TierDetail
