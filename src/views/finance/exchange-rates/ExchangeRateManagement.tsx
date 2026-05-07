'use client'

import { useState } from 'react'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import PageHeader from '@/components/layout/shared/PageHeader'

const ExchangeRateManagement = () => {
  const [isSyncing, setIsSyncing] = useState(false)
  const [vcbRate, setVcbRate] = useState<number | null>(null)
  
  // Form States
  const [currency, setCurrency] = useState('USD')
  const [manualRate, setManualRate] = useState('25540')
  const [fromDate, setFromDate] = useState('2026-05-01')
  const [toDate, setToDate] = useState('2026-12-31')

  const history = [
    { id: 1, pair: 'USD/VND', rate: 25540, from: '2026-05-01', to: '2026-12-31', status: 'Active', updatedBy: 'Admin', updatedAt: '2026-05-01 10:30' },
    { id: 2, pair: 'EUR/VND', rate: 27120, from: '2026-05-01', to: '2026-12-31', status: 'Active', updatedBy: 'Admin', updatedAt: '2026-05-01 11:00' },
    { id: 3, pair: 'USD/VND', rate: 25420, from: '2026-04-01', to: '2026-04-30', status: 'Expired', updatedBy: 'Admin', updatedAt: '2026-04-01 09:15' },
    { id: 4, pair: 'JPY/VND', rate: 165.5, from: '2026-05-01', to: '2026-12-31', status: 'Active', updatedBy: 'System', updatedAt: '2026-05-01 00:01' },
  ]

  const handleSyncVCB = () => {
    setIsSyncing(true)
    // Simulating API call to Vietcombank XML for specific currency
    setTimeout(() => {
      const mockRates: any = {
        'USD': 25485,
        'EUR': 27050,
        'JPY': 163.2,
        'GBP': 31500
      }
      setVcbRate(mockRates[currency] || 25000)
      setIsSyncing(false)
    }, 1500)
  }

  const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'SGD']

  return (
    <>
      <PageHeader
        title="Quản lý Tỉ giá (Exchange Rates)"
        description="Thiết lập tỉ giá các loại ngoại tệ sang VND cho toàn hệ thống. Hỗ trợ đồng bộ từ Vietcombank."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài chính' }, { label: 'Tỉ giá' }]}
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Left Column: All Active Rates & Set Form */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Stack spacing={6}>
            {/* All Active Rates Summary Card */}
            <Card className='border-none shadow-sm'>
              <CardHeader 
                title='Tỉ giá đang áp dụng' 
                subheader='Toàn bộ tỉ giá active cho các loại ngoại tệ'
                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><i className='tabler-trending-up' /></Avatar>}
              />
              <Divider />
              <CardContent className='p-0'>
                <Box className='flex flex-col'>
                  {[
                    { curr: 'USD', rate: '25.540', color: 'primary' },
                    { curr: 'EUR', rate: '27.120', color: 'success' },
                    { curr: 'JPY', rate: '165.50', color: 'info' },
                    { curr: 'GBP', rate: '31.500', color: 'warning' }
                  ].map((item, index) => (
                    <Box key={item.curr} className={`flex items-center justify-between p-4 ${index !== 3 ? 'border-b' : ''} hover:bg-slate-50 transition-colors`}>
                      <Box className='flex items-center gap-3'>
                        <Avatar variant='rounded' sx={{ width: 32, height: 32, fontSize: '12px', fontWeight: '900', bgcolor: `${item.color}.main`, color: 'white' }}>
                          {item.curr[0]}
                        </Avatar>
                        <Typography variant='body1' className='font-black'>{item.curr}/VND</Typography>
                      </Box>
                      <Box className='text-right'>
                        <Typography variant='h6' className='font-black text-primary'>{item.rate} đ</Typography>
                        <Typography variant='caption' className='text-slate-400 font-bold'>Cập nhật: 01/05/2026</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Manual Set Form */}
            <Card className='border-none shadow-sm'>
              <CardHeader 
                title='Thiết lập tỉ giá mới' 
                subheader='Chọn loại tệ và nhập tỉ giá áp dụng'
                action={
                  <Button 
                    variant='tonal' 
                    color='success' 
                    size='small'
                    onClick={handleSyncVCB}
                    disabled={isSyncing}
                    startIcon={isSyncing ? <CircularProgress size={16} color='inherit' /> : <i className='tabler-refresh' />}
                  >
                    {isSyncing ? 'Đang lấy...' : `Đồng bộ ${currency} từ VCB`}
                  </Button>
                }
              />
              <Divider />
              <CardContent className='space-y-4'>
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Loại ngoại tệ</Typography>
                    <Select 
                      fullWidth 
                      size='small' 
                      value={currency} 
                      onChange={(e) => {
                        setCurrency(e.target.value);
                        setVcbRate(null);
                      }}
                    >
                      {currencies.map(curr => (
                        <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                      ))}
                    </Select>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 8 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Tỉ giá quy đổi (VND)</Typography>
                    <TextField 
                      fullWidth 
                      variant='outlined' 
                      size='small'
                      value={manualRate}
                      onChange={(e) => setManualRate(e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>VND</InputAdornment>,
                        className: 'font-black'
                      }}
                    />
                  </Grid2>
                </Grid2>

                {vcbRate && (
                  <Box className='p-3 bg-success/5 rounded border border-success/20 flex items-center justify-between anim-fade-in'>
                    <Typography variant='caption' className='text-success font-bold'>
                      Tỉ giá {currency} tham chiếu VCB: <b>{vcbRate.toLocaleString()} VND</b>
                    </Typography>
                    <Button size='small' variant='contained' color='success' className='text-[10px] h-6' onClick={() => setManualRate(vcbRate.toString())}>Áp dụng</Button>
                  </Box>
                )}

                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Từ ngày</Typography>
                    <TextField fullWidth type='date' value={fromDate} size='small' onChange={(e) => setFromDate(e.target.value)} />
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Đến ngày</Typography>
                    <TextField fullWidth type='date' value={toDate} size='small' onChange={(e) => setToDate(e.target.value)} />
                  </Grid2>
                </Grid2>

                <Box className='p-4 bg-slate-50 rounded-lg'>
                  <Typography variant='caption' color='textSecondary' className='italic'>
                    * Ghi chú: Tỉ giá này sẽ được áp dụng cho tất cả các giao dịch tính tiền từ {currency} sang VND.
                  </Typography>
                </Box>

                <Button variant='contained' fullWidth size='large' startIcon={<i className='tabler-device-floppy' />}>
                  Lưu & Áp dụng tỉ giá {currency}
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid2>

        {/* Right Column: History Table */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardHeader 
              title='Lịch sử thay đổi tỉ giá' 
              subheader='Nhật ký thiết lập tỉ giá cho các loại ngoại tệ'
              action={
                <Button variant='contained' color='success' size='small' startIcon={<i className='tabler-file-download' />}>Xuất Excel</Button>
              }
            />
            <TableContainer>
              <Table>
                <TableHead className='bg-slate-50'>
                  <TableRow>
                    <TableCell className='font-black uppercase text-[11px]'>Cặp tiền</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Tỉ giá</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Hiệu lực</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Người set</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Chip label={row.pair} size='small' className='font-black bg-slate-100' />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-black text-primary'>{row.rate.toLocaleString()} VND</Typography>
                        <Typography variant='caption' className='text-slate-400 font-mono text-[10px]'>{row.updatedAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant='caption' className='font-bold text-slate-500 block text-[10px]'>Từ: {row.from}</Typography>
                          <Typography variant='caption' className='font-bold text-slate-500 block text-[10px]'>Đến: {row.to}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Chip 
                          label={row.status === 'Active' ? 'Đang dùng' : 'Hết hạn'} 
                          size='small' 
                          color={row.status === 'Active' ? 'primary' : 'default'} 
                          variant={row.status === 'Active' ? 'filled' : 'outlined'}
                          className='font-black text-[10px]'
                        />
                      </TableCell>
                      <TableCell className='text-right'>
                        <Typography variant='body2' className='font-bold'>{row.updatedBy}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default ExchangeRateManagement
