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

const SupplierDebtsList = () => {
  const suppliers = [
    { id: 'airalo', name: 'Airalo API', code: 'AI', debt: 15240.00, creditLimit: 100000.00, status: 'Active', dueDate: '15/05/2026' },
    { id: '1global', name: '1Global (Truphone)', code: '1G', debt: 48500.00, creditLimit: 50000.00, status: 'Critical', dueDate: '05/05/2026' },
    { id: 'redtea', name: 'Redtea Mobile', code: 'RT', debt: 500.00, creditLimit: 20000.00, status: 'Active', dueDate: '10/05/2026' },
    { id: 'esimgo', name: 'eSIM Go', code: 'EG', debt: 12500.00, creditLimit: 25000.00, status: 'Warning', dueDate: '20/05/2026' },
  ]

  // Mock global metrics
  const totalPayable = suppliers.reduce((acc, curr) => acc + curr.debt, 0)
  const totalCreditAvailable = suppliers.reduce((acc, curr) => acc + curr.creditLimit, 0)
  const totalSuppliers = suppliers.length
  const criticalSuppliers = suppliers.filter(s => (s.debt / s.creditLimit) > 0.8).length

  return (
    <>
      <PageHeader
        title="Quản lý Công nợ Phải trả (Accounts Payable)"
        description="Theo dõi toàn bộ khoản nợ phải thanh toán cho các nhà cung cấp nguồn (Upstream). Lên lịch dòng tiền để tránh gián đoạn dịch vụ."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Tài chính' }, 
          { label: 'Phải trả (NCC)' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='primary' startIcon={<i className='tabler-file-export' />}>Xuất Báo cáo</Button>
            <Button variant='contained' startIcon={<i className='tabler-cash-banknote' />}>Lập Kế hoạch Chi trả</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-warning/5 border-warning/20'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-warning uppercase'>Tổng Nợ Phải Trả</Typography>
              <Typography variant='h3' className='font-black text-warning'>
                {totalPayable.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Hạn mức tín dụng tổng</Typography>
              <Typography variant='h3' className='font-black text-primary'>
                {totalCreditAvailable.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-6'>
              <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Số NCC Đang nợ</Typography>
              <Typography variant='h3' className='font-black'>
                {suppliers.filter(s => s.debt > 0).length} <span className='text-sm text-slate-400'>/ {totalSuppliers}</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm bg-error/5 border-error/20'>
            <CardContent className='p-6 flex flex-col justify-between h-full'>
              <Box>
                <Typography variant='caption' className='font-bold text-error uppercase'>Cần thanh toán gấp</Typography>
                <Typography variant='h3' className='font-black text-error mbe-1'>
                  {criticalSuppliers} <span className='text-sm'>NCC</span>
                </Typography>
              </Box>
              <Typography variant='caption' className='text-slate-600 font-bold'>Tránh bị ngắt kết nối API</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be flex justify-between items-center'>
          <Grid2 container spacing={4} className='w-full lg:w-2/3'>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField 
                fullWidth 
                placeholder='Tìm nhà cung cấp...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Trạng thái Hạn mức'>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='critical'>Báo động đỏ (&gt;90%)</MenuItem>
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
                <TableCell className='font-black uppercase text-[11px]'>Nhà Cung Cấp (Upstream)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-warning/5 text-warning'>Dư Nợ Phải Trả</TableCell>
                <TableCell className='font-black uppercase text-[11px] w-48'>Đã sử dụng (Line of Credit)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Hạn Thanh Toán</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái Mạng</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => {
                const usageRatio = (supplier.debt / supplier.creditLimit) * 100
                const usageColor = usageRatio > 90 ? 'error' : usageRatio > 50 ? 'warning' : 'primary'

                return (
                  <TableRow key={supplier.id} hover>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <Avatar variant='rounded' className='bg-primary/10 text-primary font-black'>
                          {supplier.code}
                        </Avatar>
                        <Box>
                          <Typography variant='body2' className='font-black'>{supplier.name}</Typography>
                          <Typography variant='caption' className='text-slate-400'>API Partner</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className='text-right bg-warning/5'>
                      <Typography variant='subtitle2' className={`font-black ${usageRatio > 90 ? 'text-error' : 'text-warning'}`}>
                        {supplier.debt.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className='flex justify-between items-center mbe-1'>
                        <Typography variant='caption' className='font-bold text-slate-500'>
                          {usageRatio.toFixed(1)}%
                        </Typography>
                        <Typography variant='caption' className='text-slate-400'>
                          Max: {supplier.creditLimit / 1000}k
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant='determinate' 
                        value={usageRatio} 
                        color={usageColor} 
                        className='bs-2 rounded-full' 
                      />
                    </TableCell>
                    <TableCell className='text-center'>
                      <Typography variant='body2' className={`font-bold ${usageRatio > 90 ? 'text-error' : ''}`}>
                        {supplier.dueDate}
                      </Typography>
                    </TableCell>
                    <TableCell className='text-center'>
                      <Chip 
                        label={supplier.status === 'Critical' ? 'Sắp ngắt kết nối' : 'Đang hoạt động'} 
                        color={supplier.status === 'Critical' ? 'error' : 'success'} 
                        size='small' 
                        variant='tonal' 
                      />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button 
                          size='small' 
                          variant='contained' 
                          color='success' 
                        >
                          Ủy nhiệm chi
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

export default SupplierDebtsList
