'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentApiConfig = ({ id }: { id: string }) => {
  const agentName = id.toUpperCase() === 'A001' ? 'TravelConnect Solutions' : 'Global eSIM Hub'
  const apiKey = 'sk_live_123abc456def789ghi'
  const hmacSecret = 'hmac_live_9876543210abcdef'

  const [showLiveKey, setShowLiveKey] = useState(false)
  const [showHmacSecret, setShowHmacSecret] = useState(false)

  return (
    <>
      <PageHeader
        title={`Cấu hình API & Webhooks: ${agentName}`}
        description="Quản lý khóa truy cập API, cấu hình bảo mật IP và nhận thông báo trạng thái đơn hàng (Webhooks) cho đối tác B2B."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Đại lý', href: '/3m/downstream/agents' }, 
          { label: agentName, href: `/3m/downstream/agents/${id}` },
          { label: 'API & Webhooks' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary' component={Link} href={`/3m/downstream/agents/${id}`}>Quay lại</Button>
            <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu Cấu hình</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* API ACCESS CONTROL */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm mbe-6 bg-slate-50'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-black mbe-4'>Quyền truy cập API</Typography>
              <Stack spacing={4}>
                <Box className='flex justify-between items-center'>
                  <Box>
                    <Typography variant='body1' className='font-bold'>Kích hoạt API B2B</Typography>
                    <Typography variant='caption' className='text-slate-500'>Cho phép đại lý gọi API</Typography>
                  </Box>
                  <Switch defaultChecked color='success' />
                </Box>
                <Divider />
                <Box>
                  <Typography variant='body2' className='font-bold mbe-2'>Giới hạn Rate Limit</Typography>
                  <TextField 
                    fullWidth 
                    size='small' 
                    defaultValue={100} 
                    InputProps={{ endAdornment: <InputAdornment position='end'>req/min</InputAdornment> }} 
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-black mbe-4'>Bảo mật (IP Whitelist)</Typography>
              <Typography variant='body2' className='text-slate-500 mbe-4'>Chỉ cho phép gọi API từ các địa chỉ IP được chỉ định. Nhập mỗi IP một dòng.</Typography>
              <TextField 
                fullWidth 
                multiline 
                rows={4} 
                placeholder="Ví dụ:&#10;192.168.1.1&#10;203.0.113.50"
                defaultValue="203.0.113.50&#10;198.51.100.22"
              />
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }}>
          {/* API CREDENTIALS */}
          <Card className='border-none shadow-sm mbe-6'>
            <CardContent className='p-6'>
              <Box className='flex justify-between items-center mbe-6'>
                <Typography variant='h6' className='font-black'>API Key & HMAC Secret</Typography>
                <Button variant='outlined' size='small' color='error' startIcon={<i className='tabler-refresh' />}>Rotate Credential</Button>
              </Box>

              <Stack spacing={5}>
                <Box>
                  <Box className='flex items-center gap-2 mbe-2'>
                    <Typography variant='subtitle2' className='font-bold'>Public API Credential</Typography>
                    <Chip label='Active' color='success' size='small' className='h-[20px] text-[10px]' />
                  </Box>
                  <Typography variant='body2' className='text-slate-500 mbe-4'>
                    API key xác thực đối tác. HMAC secret dùng để ký request qua header x-api-signature.
                  </Typography>

                  <Typography variant='caption' className='font-bold text-slate-600 mbe-1 inline-block'>API Key</Typography>
                  <Box className='flex flex-col sm:flex-row gap-2'>
                    <TextField 
                      fullWidth 
                      size='small' 
                      type={showLiveKey ? 'text' : 'password'}
                      defaultValue={apiKey}
                      InputProps={{ readOnly: true }}
                    />
                    <Tooltip title={showLiveKey ? 'Ẩn API key' : 'Hiện API key'}>
                      <IconButton onClick={() => setShowLiveKey(!showLiveKey)} className='bg-slate-100 rounded'>
                        <i className={showLiveKey ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </Tooltip>
                    <Button variant='tonal' className='shrink-0' onClick={() => void navigator.clipboard.writeText(apiKey)}>Copy</Button>
                  </Box>

                  <Typography variant='caption' className='font-bold text-slate-600 mbe-1 mt-4 inline-block'>HMAC Secret</Typography>
                  <Box className='flex flex-col sm:flex-row gap-2'>
                    <TextField
                      fullWidth
                      size='small'
                      type={showHmacSecret ? 'text' : 'password'}
                      defaultValue={hmacSecret}
                      InputProps={{ readOnly: true }}
                    />
                    <Tooltip title={showHmacSecret ? 'Ẩn HMAC secret' : 'Hiện HMAC secret'}>
                      <IconButton onClick={() => setShowHmacSecret(!showHmacSecret)} className='bg-slate-100 rounded'>
                        <i className={showHmacSecret ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </Tooltip>
                    <Button variant='tonal' className='shrink-0' onClick={() => void navigator.clipboard.writeText(hmacSecret)}>Copy</Button>
                  </Box>

                  <Typography variant='caption' className='text-error mt-2 inline-block'>
                    Cảnh báo: Không chia sẻ API key hoặc HMAC secret. Giao dịch sẽ trừ tiền thật.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* WEBHOOKS CONFIG */}
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='h6' className='font-black mbe-2'>Cấu hình Webhooks</Typography>
              <Typography variant='body2' className='text-slate-500 mbe-6'>Hệ thống sẽ gửi HTTP POST request đến URL của đại lý khi có các sự kiện quan trọng (ví dụ: eSIM được xuất thành công).</Typography>
              
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant='subtitle2' className='font-bold mbe-2'>Webhook Endpoint URL</Typography>
                  <TextField 
                    fullWidth 
                    placeholder='https://api.youragent.com/webhooks/esim' 
                    defaultValue='https://api.travelconnect.vn/v1/callbacks/esim'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant='subtitle2' className='font-bold mbe-2'>Webhook Secret (Dùng để verify signature)</Typography>
                  <Box className='flex gap-2'>
                    <TextField 
                      fullWidth 
                      disabled
                      defaultValue='whsec_9876543210abcdef'
                    />
                    <Button variant='tonal' className='shrink-0'>Tạo lại Secret</Button>
                  </Box>
                </Grid2>
              </Grid2>

              <Box className='mt-6 p-4 bg-slate-50 rounded-lg'>
                <Typography variant='subtitle2' className='font-bold mbe-3'>Sự kiện Đăng ký (Subscribed Events)</Typography>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel control={<Switch defaultChecked size='small' />} label={<Typography variant='body2'>order.completed (Xuất eSIM thành công)</Typography>} />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel control={<Switch defaultChecked size='small' />} label={<Typography variant='body2'>order.failed (Xuất eSIM thất bại)</Typography>} />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel control={<Switch size='small' />} label={<Typography variant='body2'>esim.installed (Khách cài đặt eSIM)</Typography>} />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel control={<Switch size='small' />} label={<Typography variant='body2'>wallet.topup (Nạp tiền thành công)</Typography>} />
                  </Grid2>
                </Grid2>
              </Box>
            </CardContent>
          </Card>
        </Grid2>

      </Grid2>
    </>
  )
}

export default AgentApiConfig
