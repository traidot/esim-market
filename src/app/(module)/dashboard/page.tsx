'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

// Component Imports
import PageHeader from '@/components/layout/shared/PageHeader'
import CardStatsSquare from '@/components/card-statistics/CardStatsSquare'
import CardStatHorizontal from '@/components/card-statistics/Horizontal'

/**
 * Dashboard Page Component
 * - Main dashboard screen of the eSIM Market
 */
const DashboardPage = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	const stats = {
		monthlySpend: '$45,240',
		pendingPRs: '8',
		pendingApprovals: '12',
		openPOs: '24',
		invoiceAlerts: '2',
		activeSuppliers: '45',
		onTimeDelivery: '94.5%',
        qcAlerts: '1'
	}

	return (
		<>
			<PageHeader
				title="eSIM Market Intelligence"
				description="Executive overview of global supply chain health, budgetary compliance, and strategic sourcing cycles"
				breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Strategic Intelligence' }, { label: 'Executive Dashboard' }]}
				className='mbe-4'
			/>

			<Grid2 container spacing={6}>
				{/* Procurement Status Section */}
				<Grid2 size={{ xs: 12 }}>
					<Card>
						<CardContent>
							<Box className='flex items-center justify-between mbe-4'>
								<Typography variant='h6' className='font-bold'>Procurement Overview</Typography>
								<Box className='flex gap-2'>
                                    <Button
                                        variant='tonal'
                                        size='small'
                                        component={Link}
                                        href='/commercial/pr'
                                        startIcon={<i className='tabler-file-text' />}
                                    >
                                        Review PRs
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        component={Link}
                                        href='/commercial/po'
                                        startIcon={<i className='tabler-file-invoice' />}
                                    >
                                        Manage POs
                                    </Button>
                                </Box>
							</Box>
							<Grid2 container spacing={4}>
								<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
									<CardStatsSquare
										stats={stats.pendingPRs}
										statsTitle="Open Requisitions"
										avatarIcon='tabler-file-text'
										avatarColor='warning'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
								<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
									<CardStatsSquare
										stats={stats.openPOs}
										statsTitle="Active POs"
										avatarIcon='tabler-shopping-cart'
										avatarColor='primary'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
								<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
									<CardStatsSquare
										stats={stats.invoiceAlerts}
										statsTitle="Invoice Issues"
										avatarIcon='tabler-receipt-off'
										avatarColor='error'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
								<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
									<CardStatsSquare
										stats={stats.activeSuppliers}
										statsTitle="Active Vendors"
										avatarIcon='tabler-building-store'
										avatarColor='info'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
							</Grid2>
						</CardContent>
					</Card>
				</Grid2>

				<Grid2 size={{ xs: 12, md: 4 }}>
					<Card>
						<CardContent>
							<Box className='flex items-center justify-between mbe-4'>
								<Typography variant='h6' className='font-bold'>Budget Health</Typography>
								<Chip label='72%' color='primary' variant='tonal' className='font-bold' />
							</Box>
							<Box className='h-[10px] w-full bg-slate-100 rounded-full overflow-hidden'>
								<Box className='h-full bg-primary' sx={{ width: '72%' }} />
							</Box>
							<Typography variant='caption' className='mt-3 block font-medium'>
								$72,500 / $100,000 monthly budget used.
							</Typography>
						</CardContent>
					</Card>
				</Grid2>

				<Grid2 size={{ xs: 12, md: 8 }}>
					<Card>
						<CardContent>
							<Typography variant='h6' className='mbe-4 font-bold'>Procurement Workspace</Typography>
							<Box className='flex gap-3 overflow-x-auto pb-2'>
								<Button component={Link} href='/commercial/pr' size='small' variant='tonal' startIcon={<i className='tabler-plus text-lg' />} className='font-bold' color='warning'>New Requisition</Button>
								<Button component={Link} href='/commercial/rfq' size='small' variant='tonal' startIcon={<i className='tabler-file-search text-lg' />} className='font-bold'>Sourcing (RFQ)</Button>
								<Button component={Link} href='/commercial/invoices' size='small' variant='tonal' startIcon={<i className='tabler-receipt text-lg' />} className='font-bold' color='error'>Match Invoices</Button>
								<Button component={Link} href='/warehouse/qc' size='small' variant='tonal' startIcon={<i className='tabler-shield-check text-lg' />} className='font-bold' color='success'>Quality Check</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid2>

				{/* Logistics Section */}
				<Grid2 size={{ xs: 12, md: 6 }}>
					<Card>
						<CardContent>
							<Typography variant='h6' className='mbe-4 font-bold'>Supply Chain Inbound</Typography>
							<Grid2 container spacing={4}>
								<Grid2 size={{ xs: 12, sm: 6 }}>
									<CardStatsSquare
										stats={stats.qcAlerts}
										statsTitle="QC Failed Alerts"
										avatarIcon='tabler-shield-x'
										avatarColor='error'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
								<Grid2 size={{ xs: 12, sm: 6 }}>
									<Button 
										fullWidth 
										variant="tonal" 
										component={Link} 
										href="/warehouse/qc"
										className='h-full font-bold'
                                        color='secondary'
									>
										Run Inspections
									</Button>
								</Grid2>
							</Grid2>
						</CardContent>
					</Card>
				</Grid2>

				<Grid2 size={{ xs: 12, md: 6 }}>
					<Card>
						<CardContent>
							<Typography variant='h6' className='mbe-4 font-bold'>Receiving & Returns</Typography>
							<Grid2 container spacing={4}>
								<Grid2 size={{ xs: 12, sm: 6 }}>
									<CardStatsSquare
										stats='3'
										statsTitle="Active Returns"
										avatarIcon='tabler-truck-return'
										avatarColor='error'
										avatarVariant='rounded'
										avatarSize={56}
										avatarSkin='light'
									/>
								</Grid2>
								<Grid2 size={{ xs: 12, sm: 6 }}>
									<Button 
										fullWidth 
										variant="tonal" 
										component={Link} 
										href="/operations/returns"
										className='h-full font-bold'
									>
										RTV Management
									</Button>
								</Grid2>
							</Grid2>
						</CardContent>
					</Card>
				</Grid2>

				{/* Early Warning System */}
				<Grid2 size={{ xs: 12 }}>
					<Card className='border-t-4 border-t-error shadow-md'>
						<CardHeader 
							title='Strategic Early Warning System' 
							subheader='Critical procurement risks requiring immediate attention'
							action={<Button variant='tonal' size='small' color='error'>View All Risks</Button>}
						/>
						<CardContent className='flex flex-col gap-4'>
							{[
								{ icon: 'tabler-file-alert', title: 'Expiring Contract', desc: 'Global Office supply agreement expires in 24 days.', color: 'warning', href: '/partners/contracts' },
								{ icon: 'tabler-receipt-off', title: 'Payment Overdue', desc: 'INV-4415 (Steel Core Ltd) is 2 days past due date.', color: 'error', href: '/commercial/invoices' },
								{ icon: 'tabler-package-off', title: 'Stock Critical', desc: 'Dell PowerEdge PSU current quantity (5) is below safety threshold.', color: 'error', href: '/inventory/materials' }
							].map((alert, i) => (
								<Box key={i} className='flex items-center gap-4 p-4 bg-slate-50 border rounded-lg hover:border-error/30 transition-colors'>
									<Box className='bg-slate-100 text-slate-700 p-3 rounded-lg'>
										<i className={`${alert.icon} text-2xl`} />
									</Box>
									<Box className='flex-grow'>
										<Typography variant='body2' className='font-bold text-slate-800'>{alert.title}</Typography>
										<Typography variant='caption' className='text-slate-500'>{alert.desc}</Typography>
									</Box>
									<Button variant='text' size='small' component={Link} href={alert.href}>Resolve</Button>
								</Box>
							))}
						</CardContent>
					</Card>
				</Grid2>

				{/* System Status */}
				<Grid2 size={{ xs: 12 }}>
					<CardStatHorizontal
						stats="Real-time Synchronization"
						title="Core Procurement Engine and Vendor API Bridge connected"
						avatarIcon='tabler-database-cog'
						avatarColor='success'
						avatarSkin='light'
						avatarSize={48}
					/>
				</Grid2>
			</Grid2>
		</>
	)
}


export default DashboardPage
