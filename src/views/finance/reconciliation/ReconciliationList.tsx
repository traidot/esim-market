'use client'

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

import PageHeader from '@/components/layout/shared/PageHeader'

const ReconciliationList = () => {
  const transactions = [
    { 
      id: 'ORD-99812', 
      date: '2026-04-28 09:15', 
      sku: 'JP-10GB-7D',
      package: 'Nhật Bản 10GB 7 Ngày',
      agent: { name: 'TravelConnect', code: 'A001' },
      agentPrice: 6.50,
      supplier: { name: 'Airalo API', code: 'Airalo' },
      supplierCost: 5.00,
      systemStatus: 'Hoàn tất',
      matchStatus: 'Đã khớp' 
    },
    { 
      id: 'ORD-99811', 
      date: '2026-04-28 08:30', 
      sku: 'US-UNL-15D',
      package: 'Hoa Kỳ Không Giới Hạn',
      agent: { name: 'Global eSIM Hub', code: 'A002' },
      agentPrice: 18.00,
      supplier: { name: '1Global (Truphone)', code: '1Global' },
      supplierCost: 14.50,
      systemStatus: 'Hoàn tất',
      matchStatus: 'Đã khớp' 
    },
    { 
      id: 'ORD-99810', 
      date: '2026-04-27 18:20', 
      sku: 'TH-50GB-10D',
      package: 'Thái Lan 50GB',
      agent: { name: 'CheapData Agency', code: 'A003' },
      agentPrice: 5.10,
      supplier: { name: 'eSIM Go', code: 'eSIM Go' },
      supplierCost: 5.10, // Cost changed unexpectedly?
      systemStatus: 'Hoàn tất',
      matchStatus: 'Lệch giá vốn' // Mismatch example
    },
    { 
      id: 'ORD-99809', 
      date: '2026-04-27 15:45', 
      sku: 'EU-30GB-30D',
      package: 'Châu Âu 30GB',
      agent: { name: 'Asia Roaming', code: 'A005' },
      agentPrice: 22.50,
      supplier: { name: 'Redtea Mobile', code: 'Redtea' },
      supplierCost: 18.00,
      systemStatus: 'Lỗi phát hành', // Failed to issue but charged?
      matchStatus: 'Đang xử lý' 
    },
    { 
      id: 'ORD-99808', 
      date: '2026-04-27 10:00', 
      sku: 'SG-5GB-5D',
      package: 'Singapore 5GB',
      agent: { name: 'TravelConnect', code: 'A001' },
      agentPrice: 4.50,
      supplier: { name: 'Airalo API', code: 'Airalo' },
      supplierCost: 3.20,
      systemStatus: 'Hoàn tất',
      matchStatus: 'Đã khớp' 
    },
  ]

  // Mock global metrics
  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.agentPrice, 0)
  const totalCost = transactions.reduce((acc, curr) => acc + curr.supplierCost, 0)
  const totalProfit = totalRevenue - totalCost
  const profitMargin = (totalProfit / totalRevenue) * 100
  const mismatchedCount = transactions.filter(t => t.matchStatus !== 'Đã khớp').length

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'Đã khớp': return 'success'
      case 'Đang xử lý': return 'warning'
      case 'Lệch giá vốn': return 'error'
      default: return 'default'
    }
  }

  return (
    <>
      <PageHeader
        title="Đối soát Giao dịch Toàn tuyến (End-to-End Reconciliation)"
        description="Bảng phân tích dòng tiền (Cashflow) chi tiết trên từng đơn hàng: Dòng tiền vào từ Đại lý (AR) và Dòng tiền ra cho Nhà cung cấp (AP)."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Tài chính' }, 
          { label: 'Đối soát Giao dịch' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' color='secondary' startIcon={<i className='tabler-adjustments' />}>Công cụ Khớp lệnh</Button>
            <Button variant='contained' color='primary' startIcon={<i className='tabler-file-export' />}>Xuất File Đối soát</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Doanh thu B2B (Đại lý)</Typography>
              <Typography variant='h4' className='font-black text-primary'>
                {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Chi phí Nhập (NCC)</Typography>
              <Typography variant='h4' className='font-black text-warning'>
                {totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Lợi nhuận gộp</Typography>
              <Box className='flex items-baseline gap-2'>
                <Typography variant='h4' className='font-black text-success'>
                  {totalProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
                <Chip label={`Margin: ${profitMargin.toFixed(1)}%`} size='small' color='success' variant='tonal' className='h-5 text-[10px]' />
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20'>
            <CardContent className='p-6 flex flex-col justify-between h-full'>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Giao dịch Lệch/Lỗi</Typography>
                <Typography variant='h3' className='font-black text-error mbe-1'>
                  {mismatchedCount} <span className='text-sm'>đơn</span>
                </Typography>
              </Box>
              <Typography variant='caption' className='text-slate-600 font-bold'>Cần kiểm tra lại log</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be'>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField 
                fullWidth 
                placeholder='Tìm mã đơn hàng/SKU...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Lọc Đại lý (Downstream)'>
                <MenuItem value='all'>Tất cả Đại lý</MenuItem>
                <MenuItem value='a001'>TravelConnect</MenuItem>
                <MenuItem value='a002'>Global eSIM Hub</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Lọc Nhà cung cấp (Upstream)'>
                <MenuItem value='all'>Tất cả Nhà cung cấp</MenuItem>
                <MenuItem value='airalo'>Airalo API</MenuItem>
                <MenuItem value='1global'>1Global</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='mismatch' label='Trạng thái Khớp lệnh'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='matched'>Đã khớp</MenuItem>
                <MenuItem value='mismatch'>Lệch đối soát (Cần xử lý)</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Mã Đơn / Thời gian</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Gói cước (SKU)</TableCell>
                <TableCell className='font-black uppercase text-[11px] bg-primary/5 text-primary'>Đại lý (B2B)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-primary/5 text-primary'>Thu (A)</TableCell>
                <TableCell className='font-black uppercase text-[11px] bg-warning/5 text-warning'>NCC (Nguồn)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-warning/5 text-warning'>Chi (B)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Lãi (A-B)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Đối soát</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => {
                const profit = tx.agentPrice - tx.supplierCost
                const margin = (profit / tx.agentPrice) * 100

                return (
                  <TableRow key={tx.id} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-bold text-primary'>{tx.id}</Typography>
                      <Typography variant='caption' className='text-slate-400'>{tx.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='font-bold'>{tx.package}</Typography>
                      <Typography variant='caption' className='text-slate-500'>{tx.sku}</Typography>
                    </TableCell>
                    
                    {/* Downstream Column */}
                    <TableCell className='bg-primary/5'>
                      <Typography variant='body2' className='font-bold'>{tx.agent.name}</Typography>
                      <Typography variant='caption' className='text-slate-500'>ID: {tx.agent.code}</Typography>
                    </TableCell>
                    <TableCell className='text-right bg-primary/5'>
                      <Typography variant='subtitle2' className='font-black text-primary'>
                        {tx.agentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                    </TableCell>

                    {/* Upstream Column */}
                    <TableCell className='bg-warning/5'>
                      <Typography variant='body2' className='font-bold'>{tx.supplier.name}</Typography>
                      <Typography variant='caption' className='text-slate-500'>ID: {tx.supplier.code}</Typography>
                    </TableCell>
                    <TableCell className='text-right bg-warning/5'>
                      <Typography variant='subtitle2' className='font-black text-warning'>
                        {tx.supplierCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                    </TableCell>

                    {/* Profit Column */}
                    <TableCell className='text-right'>
                      <Typography variant='subtitle2' className={`font-black ${profit > 0 ? 'text-success' : 'text-error'}`}>
                        {profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                      <Typography variant='caption' className={`font-bold ${profit > 0 ? 'text-success/70' : 'text-error/70'}`}>
                        {margin.toFixed(1)}%
                      </Typography>
                    </TableCell>

                    <TableCell className='text-center'>
                      <Chip 
                        label={tx.matchStatus} 
                        color={getMatchStatusColor(tx.matchStatus) as any} 
                        size='small' 
                        variant={tx.matchStatus === 'Đã khớp' ? 'tonal' : 'filled'} 
                        className='font-bold'
                      />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button size='small' variant='outlined' color='secondary'>Chi tiết</Button>
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

export default ReconciliationList
