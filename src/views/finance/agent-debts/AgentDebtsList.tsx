'use client'

import Link from 'next/link'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentDebtsList = () => {
  const agents = [
    { id: 'a001', name: 'TravelConnect Solutions', code: 'TR', tier: 'PLATINUM', tierColor: 'primary', balance: 5240.00, creditLimit: 50000.00, status: 'Active', type: 'postpaid' },
    { id: 'a002', name: 'Global eSIM Hub', code: 'GL', tier: 'GOLD', tierColor: 'warning', balance: 1120.50, creditLimit: 0, status: 'Active', type: 'prepaid' },
    { id: 'a003', name: 'CheapData Agency', code: 'CH', tier: 'SILVER', tierColor: 'secondary', balance: 15.00, creditLimit: 0, status: 'Active', type: 'prepaid' },
    { id: 'a004', name: 'Nomad Partner', code: 'NO', tier: 'GOLD', tierColor: 'warning', balance: 0.00, creditLimit: 10000.00, status: 'Active', type: 'postpaid' },
    { id: 'a005', name: 'Asia Roaming', code: 'AS', tier: 'PLATINUM', tierColor: 'primary', balance: 45000.00, creditLimit: 50000.00, status: 'Critical', type: 'postpaid' },
  ]

  // Mock global metrics
  const totalDebt = agents.filter(a => a.type === 'postpaid').reduce((acc, curr) => acc + curr.balance, 0)
  const totalWallet = agents.filter(a => a.type === 'prepaid').reduce((acc, curr) => acc + curr.balance, 0)
  const totalCreditLimit = agents.reduce((acc, curr) => acc + curr.creditLimit, 0)
  const totalAgents = agents.length
  const criticalAgents = agents.filter(a => a.type === 'postpaid' && (a.balance / a.creditLimit) > 0.8).length

  return (
    <>
      <PageHeader
        title="Quản lý Công nợ Tổng (Agent Debts)"
        description="Theo dõi toàn bộ khoản phải thu từ đại lý (Accounts Receivable). Cảnh báo sớm các đại lý sắp chạm hạn mức."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Tài chính' }, 
          { label: 'Công nợ Đại lý' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='primary' startIcon={<i className='tabler-file-export' />}>Xuất Báo cáo</Button>
            <Button variant='contained' startIcon={<i className='tabler-bell-ringing' />}>Gửi Nhắc nợ Hàng loạt</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20 h-full'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-error uppercase'>Tổng Công Nợ Phải Thu</Typography>
              <Typography variant='h3' className='font-black text-error'>
                {totalDebt.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20 h-full'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-success uppercase'>Tổng Tiền Trong Ví Đại Lý</Typography>
              <Typography variant='h3' className='font-black text-success'>
                {totalWallet.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Đại lý đang Nợ/Dùng Ví</Typography>
              <Typography variant='h3' className='font-black text-primary'>
                {agents.filter(a => a.balance > 0).length} <span className='text-sm text-slate-400'>/ {totalAgents}</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-warning/5 border-warning/20 h-full'>
            <CardContent className='p-6 flex flex-col justify-between h-full'>
              <Box>
                <Typography variant='caption' className='font-bold text-warning uppercase'>Rủi ro tín dụng (Sát hạn mức)</Typography>
                <Typography variant='h3' className='font-black text-warning mbe-1'>
                  {criticalAgents} <span className='text-sm'>đại lý</span>
                </Typography>
              </Box>
              <Typography variant='caption' className='text-slate-600 font-bold'>&gt;80% Hạn mức</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex justify-between items-center'>
          <Grid2 container spacing={4} className='w-full lg:w-2/3'>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField 
                fullWidth 
                placeholder='Tìm đại lý...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Cấp bậc'>
                <MenuItem value='all'>Tất cả cấp bậc</MenuItem>
                <MenuItem value='platinum'>Platinum</MenuItem>
                <MenuItem value='gold'>Gold</MenuItem>
                <MenuItem value='silver'>Silver</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Trạng thái Nợ'>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='critical'>Rủi ro (&gt;80%)</MenuItem>
                <MenuItem value='warning'>Chú ý (&gt;50%)</MenuItem>
                <MenuItem value='safe'>An toàn</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Đại lý</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Mô hình</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Số Dư / Nợ</TableCell>
                <TableCell className='font-black uppercase text-[11px] w-48'>Sử dụng Hạn mức</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map((agent) => {
                const usageRatio = (agent.balance / (agent.creditLimit || 1)) * 100
                const usageColor = usageRatio > 80 ? 'error' : usageRatio > 50 ? 'warning' : 'primary'

                return (
                  <TableRow key={agent.id} hover>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <Avatar variant='rounded' className={`bg-${agent.tierColor}/10 text-${agent.tierColor} font-black`}>
                          {agent.code}
                        </Avatar>
                        <Box>
                          <Typography variant='body2' className='font-black'>{agent.name}</Typography>
                          <Typography variant='caption' className='text-slate-400'>ID: {agent.id.toUpperCase()}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={agent.type === 'prepaid' ? 'Prepaid (Ví)' : 'Postpaid (Nợ)'} 
                        color={agent.type === 'prepaid' ? 'success' : 'primary'} 
                        size='small' 
                        variant='tonal' 
                        className='font-bold' 
                      />
                      <Typography variant='caption' className='block mt-1 text-slate-400'>{agent.tier}</Typography>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Typography variant='subtitle2' className={`font-black ${agent.type === 'postpaid' && usageRatio > 80 ? 'text-error' : agent.type === 'prepaid' ? 'text-success' : ''}`}>
                        {agent.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                      <Typography variant='caption' className='text-slate-400'>
                        {agent.type === 'prepaid' ? 'Tiền sẵn có' : 'Khoản phải thu'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {agent.type === 'postpaid' ? (
                        <>
                          <Box className='flex justify-between items-center mbe-1'>
                            <Typography variant='caption' className='font-bold text-slate-500'>
                              {usageRatio.toFixed(1)}%
                            </Typography>
                            <Typography variant='caption' className='text-slate-400'>
                              Max: {agent.creditLimit / 1000}k
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant='determinate' 
                            value={usageRatio} 
                            color={usageColor} 
                            className='bs-2 rounded-full' 
                          />
                        </>
                      ) : (
                        <Typography variant='caption' className='text-slate-400 italic'>Không áp dụng hạn mức</Typography>
                      )}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Chip 
                        label={agent.status} 
                        color={agent.status === 'Critical' ? 'error' : agent.status === 'Warning' ? 'warning' : 'success'} 
                        size='small' 
                        variant='tonal' 
                      />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button 
                          size='small' 
                          variant='contained' 
                          color={agent.type === 'prepaid' ? 'success' : 'primary'}
                        >
                          {agent.type === 'prepaid' ? 'Nạp ví' : 'Thu nợ'}
                        </Button>
                        <Button 
                          size='small' 
                          variant='tonal' 
                          color='secondary' 
                          component={Link} 
                          href={`/downstream/agents/${agent.id}/debt`}
                        >
                          Lịch sử
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default AgentDebtsList
