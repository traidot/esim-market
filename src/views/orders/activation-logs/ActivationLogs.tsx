'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import PageHeader from '@/components/layout/shared/PageHeader'

const ActivationLogs = () => {
  return (
    <>
      <PageHeader
        title="Nhật ký Kích hoạt (Technical Logs)"
        description="Theo dõi luồng xử lý kỹ thuật khi cấp phát eSIM từ Supplier đến Agent"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng' }, { label: 'Nhật ký kỹ thuật' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6'>
            <Typography variant='h6' className='font-black text-primary'>Luồng xử lý mới nhất (Real-time)</Typography>
            <Button size='small' variant='tonal'>Tạm dừng Live</Button>
          </Box>
          
          <Timeline position="right" sx={{ p: 0 }}>
            {[
              { time: '14:20:05', event: 'Order ORD-8241 received from Agent TravelConnect', status: 'success' },
              { time: '14:20:06', event: 'Checking inventory for Japan 10GB... OK', status: 'success' },
              { time: '14:20:07', event: 'Calling Airalo API for eSIM generation...', status: 'warning' },
              { time: '14:20:10', event: 'API Response: 200 OK. ICCID: 89812...', status: 'success' },
              { time: '14:20:11', event: 'Pushing QR Code to Agent Webhook... Success', status: 'success' }
            ].map((log, i) => (
              <TimelineItem key={i} sx={{ minHeight: 60, '&:before': { display: 'none' } }}>
                <TimelineSeparator>
                  <TimelineDot color={log.status as any} variant='tonal'>
                    <i className={log.status === 'success' ? 'tabler-check' : 'tabler-loader'} />
                  </TimelineDot>
                  {i < 4 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 4 }}>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='body2' className='font-bold'>{log.event}</Typography>
                    <Typography variant='caption' className='text-slate-400 font-mono'>{log.time}</Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </>
  )
}

export default ActivationLogs
