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

const AgentDashboard = () => {
  const stats = {
    balance: '$5,240.00',
    activeESims: '42',
    totalOrders: '156',
    pendingActivations: '2'
  }

  return (
    <>
      <PageHeader
        title="Agent Console: TravelConnect SG"
        description="Monitor your wallet, manage customer eSIMs, and browse latest global connectivity packages"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Agent' }, { label: 'Console' }]}
        actions={
          <Box className='flex gap-2'>
            <Button variant='tonal' color='success' startIcon={<i className='tabler-plus' />}>Top-up Balance</Button>
            <Button variant='contained' color='primary' component={Link} href='/marketplace/products'>Browse Store</Button>
          </Box>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Account Overview */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm bg-primary/5'>
            <CardContent>
              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.balance}
                    statsTitle="My Balance"
                    avatarIcon='tabler-wallet'
                    avatarColor='primary'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.activeESims}
                    statsTitle="Active eSIMs"
                    avatarIcon='tabler-device-mobile-check'
                    avatarColor='success'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.totalOrders}
                    statsTitle="Total Purchases"
                    avatarIcon='tabler-shopping-bag'
                    avatarColor='info'
                    avatarVariant='rounded'
                    avatarSize={56}
                    avatarSkin='light'
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <CardStatsSquare
                    stats={stats.pendingActivations}
                    statsTitle="Pending QR"
                    avatarIcon='tabler-qrcode'
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

        {/* Recent Orders */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='h-full'>
            <CardHeader 
              title='Recent Digital Orders' 
              subheader='Track your latest eSIM activations and customer distributions'
              action={<Button variant='text' size='small' component={Link} href='/orders/list'>View All</Button>}
            />
            <CardContent className='p-0'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-be'>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Product</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Amount</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Status</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: 'Japan 10GB (30D)', amount: '$15.00', status: 'COMPLETED', color: 'success' },
                    { product: 'Europe 5GB (15D)', amount: '$12.50', status: 'PROCESSING', color: 'warning' },
                    { product: 'Global 1GB (7D)', amount: '$5.00', status: 'COMPLETED', color: 'success' },
                    { product: 'USA 20GB (30D)', amount: '$25.00', status: 'COMPLETED', color: 'success' }
                  ].map((o, i) => (
                    <tr key={i} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                      <td className='p-4'>
                        <Typography variant='body2' className='font-bold'>{o.product}</Typography>
                      </td>
                      <td className='p-4 font-mono text-sm'>{o.amount}</td>
                      <td className='p-4'>
                        <Chip label={o.status} size='small' color={o.color as any} variant='tonal' className='font-black text-[10px]' />
                      </td>
                      <td className='p-4 text-xs text-slate-400'>Today</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid2>

        {/* Featured Packages */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='h-full bg-slate-900 text-white'>
            <CardHeader title='Hot Marketplace Deals' titleTypographyProps={{ color: 'white', className: 'font-black' }} />
            <CardContent>
              <Stack spacing={4}>
                {[
                  { region: 'South East Asia', data: '50GB', price: '$18', discount: '20% OFF' },
                  { region: 'North America', data: '100GB', price: '$45', discount: 'NEW' }
                ].map((p, i) => (
                  <Box key={i} className='p-4 bg-white/10 rounded-xl border border-white/10'>
                    <Box className='flex justify-between items-start mbe-2'>
                      <Typography variant='body2' className='text-white font-bold'>{p.region}</Typography>
                      <Chip label={p.discount} size='small' color='secondary' className='font-black text-[9px] h-5' />
                    </Box>
                    <Box className='flex justify-between items-end'>
                      <Typography variant='h5' className='text-white font-black'>{p.data}</Typography>
                      <Typography variant='h6' color='primary' className='font-black'>{p.price}</Typography>
                    </Box>
                  </Box>
                ))}
                <Button fullWidth variant='contained' color='primary' className='mt-4'>View More Offers</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default AgentDashboard
