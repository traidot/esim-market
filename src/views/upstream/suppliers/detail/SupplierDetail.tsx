'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from '@/libs/Recharts'

const orderChartData = [
  { week: 'T1/W1', success: 120, failed: 5 },
  { week: 'T1/W2', success: 145, failed: 3 },
  { week: 'T1/W3', success: 98,  failed: 8 },
  { week: 'T1/W4', success: 160, failed: 2 },
  { week: 'T2/W1', success: 134, failed: 6 },
  { week: 'T2/W2', success: 178, failed: 4 },
  { week: 'T2/W3', success: 200, failed: 1 },
  { week: 'T2/W4', success: 190, failed: 3 },
]

const SupplierDetail = ({ id }: { id: string }) => {
  const router = useRouter()

  const supplier = {
    id,
    name: id.toUpperCase() === 'AIRALO' ? 'Airalo Global' : 'Nomad API',
    color: id.toUpperCase() === 'AIRALO' ? '#7367F0' : '#00BAD1',
    connected: id.toUpperCase() !== 'GOMO',
    ordersThisMonth: 850,
    productsCount: 450,
    successRate: 99.2,
  }

  const [connected, setConnected] = useState(supplier.connected)

  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

  return (
    <>
      <PageHeader
        title={`Dashboard: ${supplier.name}`}
        description="Quản lý hiệu năng, công nợ và cảnh báo hệ thống Upstream"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Nguồn cung', href: '/3m/upstream/suppliers' },
          { label: supplier.name },
        ]}
        actions={
          <Button
            variant={connected ? 'tonal' : 'contained'}
            color={connected ? 'error' : 'success'}
            startIcon={<i className={connected ? 'tabler-plug-x' : 'tabler-plug'} />}
            onClick={() => setConnected(!connected)}
          >
            {connected ? 'Gỡ kết nối' : 'Kết nối'}
          </Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={4}>
        {/* Left column: KPIs + chart */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Grid2 container spacing={4}>
            {/* KPI: Products — clickable (4.7) */}
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Card className='border-none shadow-sm h-full'>
                <CardActionArea
                  onClick={() => router.push(`/3m/marketplace/products?supplierId=${id}`)}
                  className='h-full'
                >
                  <CardContent className='p-4'>
                    <Box className='flex justify-between items-start mbe-2'>
                      <Typography variant='subtitle2' className='font-black uppercase text-slate-500 text-[11px]'>Sản phẩm</Typography>
                      <Avatar variant='rounded' sx={{ bgcolor: 'info.light', color: 'info.main', width: 32, height: 32 }}>
                        <i className='tabler-packages text-base' />
                      </Avatar>
                    </Box>
                    <Typography variant='h4' className='font-black mbe-1'>{supplier.productsCount}</Typography>
                    <Typography variant='caption' className='text-success font-bold'>+12 gói mới tháng này</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>

            {/* KPI: Orders — clickable (4.8) */}
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Card className='border-none shadow-sm h-full'>
                <CardActionArea
                  onClick={() => router.push(`/3m/upstream/transactions?supplierId=${id}&month=${currentMonth}`)}
                  className='h-full'
                >
                  <CardContent className='p-4'>
                    <Box className='flex justify-between items-start mbe-2'>
                      <Typography variant='subtitle2' className='font-black uppercase text-slate-500 text-[11px]'>Đơn hàng (Tháng)</Typography>
                      <Avatar variant='rounded' sx={{ bgcolor: 'success.light', color: 'success.main', width: 32, height: 32 }}>
                        <i className='tabler-shopping-cart text-base' />
                      </Avatar>
                    </Box>
                    <Typography variant='h4' className='font-black mbe-1'>{supplier.ordersThisMonth}</Typography>
                    <Typography variant='caption' className='text-slate-500'>Avg. 28 đơn/ngày</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>

            {/* KPI: Success rate */}
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Card className='border-none shadow-sm h-full'>
                <CardContent className='p-4'>
                  <Box className='flex justify-between items-start mbe-2'>
                    <Typography variant='subtitle2' className='font-black uppercase text-slate-500 text-[11px]'>Tỷ lệ thành công</Typography>
                    <Avatar variant='rounded' sx={{ bgcolor: 'warning.light', color: 'warning.main', width: 32, height: 32 }}>
                      <i className='tabler-chart-bar text-base' />
                    </Avatar>
                  </Box>
                  <Typography variant='h4' className='font-black mbe-1'>{supplier.successRate}%</Typography>
                  <Box className='flex items-center gap-1'>
                    <Box className={`w-2 h-2 rounded-full ${connected ? 'bg-success animate-pulse' : 'bg-error'}`} />
                    <Typography variant='caption' className={`font-bold ${connected ? 'text-success' : 'text-error'}`}>
                      {connected ? 'API: Connected' : 'API: Disconnected'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>

            {/* Order chart (4.5) */}
            <Grid2 size={{ xs: 12 }}>
              <Card className='border-none shadow-sm'>
                <CardContent className='p-4'>
                  <Typography variant='h6' className='font-black mbe-4'>Đơn hàng theo tuần (2 tháng gần nhất)</Typography>
                  <ResponsiveContainer width='100%' height={220}>
                    <BarChart data={orderChartData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                      <XAxis dataKey='week' tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey='success' name='Thành công' fill='#28C76F' radius={[3, 3, 0, 0]} />
                      <Bar dataKey='failed' name='Thất bại' fill='#EA5455' radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Right column: quick nav */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-4'>
              <Typography variant='h6' className='font-black mbe-3'>Điều hướng nhanh</Typography>
              <Stack spacing={2}>
                <Card
                  component={Link}
                  href={`/3m/upstream/suppliers/${id}/config`}
                  className='border shadow-none hover:shadow-sm transition-all'
                  sx={{ textDecoration: 'none' }}
                >
                  <CardContent className='flex items-center gap-3 p-3'>
                    <Avatar variant='rounded' sx={{ bgcolor: 'info.main', width: 36, height: 36 }}>
                      <i className='tabler-settings-automation text-lg' />
                    </Avatar>
                    <Box>
                      <Typography variant='body2' className='font-black'>Cấu hình API</Typography>
                      <Typography variant='caption' className='text-slate-500'>Thông số kỹ thuật & Keys</Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card
                  component={Link}
                  href={`/3m/upstream/transactions?supplier=${id}`}
                  className='border shadow-none hover:shadow-sm transition-all'
                  sx={{ textDecoration: 'none' }}
                >
                  <CardContent className='flex items-center gap-3 p-3'>
                    <Avatar variant='rounded' sx={{ bgcolor: 'success.main', width: 36, height: 36 }}>
                      <i className='tabler-receipt-2 text-lg' />
                    </Avatar>
                    <Box>
                      <Typography variant='body2' className='font-black'>Đối soát Giao dịch</Typography>
                      <Typography variant='caption' className='text-slate-500'>Nhật ký mua hàng & nợ</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>

              <Divider className='my-4' />

              <Box className='p-3 rounded-lg' sx={{ bgcolor: connected ? 'success.light' : 'error.light' }}>
                <Box className='flex items-center gap-2'>
                  <Box className={`w-2 h-2 rounded-full ${connected ? 'bg-success animate-pulse' : 'bg-error'}`} />
                  <Typography variant='body2' className='font-black'>
                    Trạng thái: {connected ? 'Đã kết nối' : 'Chưa kết nối'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default SupplierDetail
