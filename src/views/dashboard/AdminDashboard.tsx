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
        title="eSIM Market: 3M Command Center"
        description="Comprehensive control over marketplace liquidity, supplier health, and agent distribution tiers"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admin' }, { label: 'Command Center' }]}
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Marketplace Pulse */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Box className='flex items-center justify-between mbe-6'>
                <Typography variant='h5' className='font-black'>Marketplace Pulse</Typography>
                <Box className='flex gap-2'>
                  <Button variant='tonal' size='small' color='primary' startIcon={<i className='tabler-refresh' />}>Sync Upstream</Button>
                  <Button variant='contained' size='small' color='primary' startIcon={<i className='tabler-adjustments-horizontal' />}>Pricing Engine</Button>
                </Box>
              </Box>
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.totalSales}
                    statsTitle="Marketplace GMV"
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
                    statsTitle="Distributor Agents"
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
                    statsTitle="API Fulfillment"
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
                    statsTitle="Support Tickets"
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
              title='Upstream Gateway Health' 
              subheader='Real-time latency and inventory status from global providers'
              action={<Button variant='text' size='small'>Details</Button>}
            />
            <CardContent>
              <Stack spacing={4}>
                {[
                  { name: 'Airalo Global', latency: '124ms', status: 'Online', color: 'success' },
                  { name: 'Nomad API', latency: '450ms', status: 'High Latency', color: 'warning' },
                  { name: 'Truphone', latency: '110ms', status: 'Online', color: 'success' },
                  { name: 'MobiMatter', latency: '0ms', status: 'Offline', color: 'error' }
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
            <CardHeader title='Top Tier Distributors' subheader='Volume based performance' />
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
                <Button fullWidth variant='outlined' color='secondary' component={Link} href='/downstream/agents'>View All Agents</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* System Logs */}
        <Grid2 size={{ xs: 12 }}>
          <CardStatHorizontal
            stats="Digital Order Synchronization"
            title="Webhook events and API callbacks are processing with 0ms backlog"
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
