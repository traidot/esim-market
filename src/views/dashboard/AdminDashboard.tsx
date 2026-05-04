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
import CardStatHorizontal from '@/components/card-statistics/Horizontal'

const AdminDashboard = () => {
  return (
    <>
      <PageHeader
        title="Hệ thống Quản trị & Điều hành eSIM (3M Admin)"
        description="Nền tảng tập trung giám sát hạ tầng kết nối, tối ưu hóa chuỗi cung ứng kỹ thuật số và kiểm soát vận hành đại lý."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Hệ thống 3M' }, { label: 'Dashboard Điều hành' }]}
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Upstream Connectivity */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card className='h-full'>
            <CardHeader 
              title='Giám sát Hạ tầng Kết nối (Upstream)' 
              subheader='Chỉ số độ trễ và trạng thái đáp ứng dịch vụ từ các đối tác viễn thông toàn cầu.'
              action={<Button variant='text' size='small'>Xem chi tiết</Button>}
            />
            <CardContent>
              <Stack spacing={4}>
                {[
                  { name: 'Airalo Global', latency: '124ms', status: 'Hoạt động ổn định', color: 'success' },
                  { name: 'Nomad API', latency: '450ms', status: 'Phản hồi chậm', color: 'warning' },
                  { name: 'Truphone', latency: '110ms', status: 'Hoạt động ổn định', color: 'success' },
                  { name: 'MobiMatter', latency: '0ms', status: 'Mất kết nối', color: 'error' }
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
            <CardHeader title='Phân tích Kênh Phân phối' subheader='Xếp hạng đối tác Downstream dựa trên sản lượng giao dịch.' />
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
            stats="Cổng Xử lý Giao dịch & Webhook"
            title="Tình trạng: Đồng bộ hóa thời gian thực (Real-time). Độ trễ xử lý trung bình: < 50ms."
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
