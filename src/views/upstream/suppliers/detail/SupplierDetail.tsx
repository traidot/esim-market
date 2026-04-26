'use client'

import { useState } from 'react'
import Link from 'next/link'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'

const SupplierDetail = ({ id }: { id: string }) => {
  const [active, setActive] = useState(true)

  // Giả lập dữ liệu cho demo
  const supplier = {
    id,
    name: id.toUpperCase() === 'AIRALO' ? 'Airalo Global' : 'Nomad API',
    logo: id.toUpperCase() === 'AIRALO' ? 'A' : 'N',
    color: id.toUpperCase() === 'AIRALO' ? 'primary.main' : 'info.main',
    status: 'Connected',
    endpoint: 'https://partners.airalo.com/api/v2',
    apiKey: 'sk_live_51Mxxxxxxxxxxxxxxxxxx',
    secret: '••••••••••••••••••••••••',
    webhook: 'https://api.esim.market/hooks/airalo'
  }

  return (
    <>
      <PageHeader
        title={`Cấu hình: ${supplier.name}`}
        description="Quản lý kết nối API, bảo mật và thông số đồng bộ dữ liệu"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Nguồn cung', href: '/upstream/suppliers' },
          { label: 'Chi tiết' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary' component={Link} href={`/upstream/suppliers/${id}/mapping`}>
              Cấu hình Mapping
            </Button>
            <Button variant='tonal' color='error'>Gỡ kết nối</Button>
            <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu thay đổi</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Thông tin chung & Trạng thái */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack spacing={6}>
            <Card className='border-none shadow-sm'>
              <CardContent className='flex flex-col items-center p-8'>
                <Avatar 
                  sx={{ width: 80, height: 80, bgcolor: supplier.color, fontSize: '2rem', fontWeight: 'bold' }}
                  className='mbe-4'
                >
                  {supplier.logo}
                </Avatar>
                <Typography variant='h5' className='font-black'>{supplier.name}</Typography>
                <Typography variant='body2' className='text-slate-500 mbe-4'>ID: {supplier.id}</Typography>
                <Chip 
                  label={supplier.status} 
                  color='success' 
                  variant='tonal' 
                  size='small' 
                  className='font-bold'
                  icon={<i className='tabler-circle-check-filled' />}
                />
              </CardContent>
              <Divider />
              <CardContent>
                <Stack spacing={4}>
                  <FormControlLabel
                    control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />}
                    label="Kích hoạt Nhà cung cấp"
                  />
                  <Box className='flex justify-between items-center'>
                    <Typography variant='body2'>Đồng bộ tự động</Typography>
                    <Switch defaultChecked />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm bg-primary/5 border-primary/20'>
              <CardContent>
                <Typography variant='h6' className='font-black mbe-2'>Sức khỏe kết nối</Typography>
                <Typography variant='body2' className='mbe-4'>Kết nối ổn định. Lần cuối kiểm tra: 5 phút trước.</Typography>
                <Button fullWidth variant='contained' size='small' startIcon={<i className='tabler-bolt' />}>
                  Test Connection Now
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>

        {/* Cấu hình API */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Typography variant='h6' className='font-black mbe-6 flex items-center gap-2'>
                <i className='tabler-api text-primary' /> Thông số API (Production)
              </Typography>
              
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12 }}>
                  <TextField 
                    fullWidth 
                    label="API Endpoint URL" 
                    defaultValue={supplier.endpoint}
                    placeholder="https://api.provider.com/v1"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth 
                    label="API Key / Client ID" 
                    defaultValue={supplier.apiKey}
                    type="password"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth 
                    label="API Secret" 
                    defaultValue={supplier.secret}
                    type="password"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField 
                    fullWidth 
                    label="Webhook URL (Dành cho thông báo eSIM)" 
                    defaultValue={supplier.webhook}
                    helperText="URL này sẽ nhận thông báo khi trạng thái eSIM thay đổi từ phía nhà cung cấp."
                  />
                </Grid2>
              </Grid2>

              <Divider className='my-8' />

              <Typography variant='h6' className='font-black mbe-6 flex items-center gap-2'>
                <i className='tabler-shield-lock text-success' /> Bảo mật & Kết nối nâng cao
              </Typography>
              
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12 }}>
                  <TextField 
                    fullWidth 
                    label="Whitelist IP (Dành cho Outbound)" 
                    placeholder="1.2.3.4, 5.6.7.8"
                    helperText="Danh sách IP của sàn được phép gọi đến Supplier (ngăn chặn rò rỉ Key)."
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth 
                    multiline
                    rows={3}
                    label="Custom Headers (JSON format)" 
                    placeholder='{ "X-Custom-Auth": "value" }'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Box className='p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 h-full'>
                    <Typography variant='caption' className='font-black uppercase mbe-2 block'>Proxy Configuration</Typography>
                    <Stack spacing={2}>
                      <TextField size='small' fullWidth label="Proxy Host/Port" placeholder="proxy.example.com:8080" />
                      <TextField size='small' fullWidth label="Proxy Auth (Username:Pass)" type="password" />
                    </Stack>
                  </Box>
                </Grid2>
              </Grid2>

              <Divider className='my-8' />

              <Typography variant='h6' className='font-black mbe-6'>Tham số Đồng bộ (Sync Settings)</Typography>
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth 
                    label="Tần suất đồng bộ giá (phút)" 
                    defaultValue="60"
                    type="number"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth 
                    label="Tần suất kiểm tra kho (phút)" 
                    defaultValue="15"
                    type="number"
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default SupplierDetail
