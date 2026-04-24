'use client'

import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Link from 'next/link'

import PageHeader from '@/components/layout/shared/PageHeader'
import CardStatsSquare from '@/components/card-statistics/CardStatsSquare'
import CardStatHorizontal from '@/components/card-statistics/Horizontal'

const AdminDashboard = () => {
  const stats = {
    totalSales: '$128,450',
    activeAgents: '124',
    activeSuppliers: '12',
    orderSuccessRate: '99.8%',
    pendingTickets: '3'
  }

  return (
    <>
      <PageHeader
        title="Trung tâm Điều hành 3M"
        description="Kiểm soát toàn diện thanh khoản thị trường, sức khỏe nhà cung cấp và các tầng phân phối đại lý"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Quản trị' }, { label: 'Trung tâm điều hành' }]}
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Marketplace Pulse */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Box className='flex items-center justify-between mbe-6'>
                <Typography variant='h5' className='font-black'>Nhịp đập Thị trường</Typography>
                <Box className='flex gap-2'>
                  <Button variant='tonal' size='small' color='primary' startIcon={<i className='tabler-refresh' />}>Đồng bộ Nguồn</Button>
                  <Button variant='contained' size='small' color='primary' startIcon={<i className='tabler-adjustments-horizontal' />}>Công cụ Định giá</Button>
                </Box>
              </Box>
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.totalSales}
                    statsTitle="Tổng GMV Sàn"
                    avatarIcon='tabler-currency-dollar'
                    avatarColor='primary'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.activeAgents}
                    statsTitle="Đại lý Phân phối"
                    avatarIcon='tabler-users'
                    avatarColor='success'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.orderSuccessRate}
                    statsTitle="Tỷ lệ Hoàn tất API"
                    avatarIcon='tabler-activity'
                    avatarColor='info'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.pendingTickets}
                    statsTitle="Phiếu Hỗ trợ"
                    avatarIcon='tabler-help-circle'
                    avatarColor='warning'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        {/* Upstream Connectivity */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card className='h-full'>
            <CardHeader 
              title='Sức khỏe Cổng Nguồn cung' 
              subheader='Độ trễ thời gian thực và trạng thái tồn kho từ các đối tác toàn cầu'
              action={<Button variant='text' size='small'>Chi tiết</Button>}
            />
            <CardContent>
              <Stack spacing={4}>
                {[
                  { name: 'Airalo Global', latency: '124ms', status: 'Trực tuyến', color: 'success' },
                  { name: 'Nomad API', latency: '450ms', status: 'Độ trễ cao', color: 'warning' },
                  { name: 'Truphone', latency: '110ms', status: 'Trực tuyến', color: 'success' },
                  { name: 'MobiMatter', latency: '0ms', status: 'Ngoại tuyến', color: 'error' }
                ].map((s, i) => (
                  <Box key={i} className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
                    <Box className='flex items-center gap-3'>
                      <Box className={`w-2 h-2 rounded-full bg-${s.color}.main`} />
                      <Typography variant='body2' className='font-bold'>{s.name}</Typography>
                    </Box>
                    <Box className='flex items-center gap-4'>
                      <Typography variant='caption' className='font-mono'>{s.latency}</Typography>
                      <Chip label={s.status} size='small' color={s.color as any} variant='tonal' className='font-bold' />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Top Agents By Volume */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Card className='h-full'>
            <CardHeader title='Đại lý Xuất sắc' subheader='Hiệu suất dựa trên sản lượng' />
            <CardContent>
              <Stack spacing={5}>
                {[
                  { name: 'TravelConnect SG', tier: 'PLATINUM', volume: '$42,000' },
                  { name: 'Global Roam JP', tier: 'GOLD', volume: '$28,500' },
                  { name: 'EuroSim Partners', tier: 'PLATINUM', volume: '$15,200' }
                ].map((a, i) => (
                  <Box key={i} className='flex items-center justify-between'>
                    <Box>
                      <Typography variant='body2' className='font-black'>{a.name}</Typography>
                      <Typography variant='caption' className='text-slate-400'>{a.tier}</Typography>
                    </Box>
                    <Typography variant='body1' className='font-bold text-primary'>{a.volume}</Typography>
                  </Box>
                ))}
                <Divider />
                <Button fullWidth variant='outlined' color='secondary' component={Link} href='/downstream/agents'>Xem tất cả đại lý</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* System Logs */}
        <Grid2 size={{ xs: 12 }}>
          <CardStatHorizontal
            stats="Đồng bộ Đơn hàng Kỹ thuật số"
            title="Sự kiện Webhook và API callback đang được xử lý với độ trễ 0ms"
            avatarIcon='tabler-cloud-check'
            avatarColor='info'
            avatarSkin='light'
            avatarSize={48}
          />
        </Grid2>
      </Grid2>
    </>
  )
}

const Divider = () => <Box className='h-[1px] w-full bg-slate-100 my-2' />

export default AdminDashboard
