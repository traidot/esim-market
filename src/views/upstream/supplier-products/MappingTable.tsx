'use client'

import { useState } from 'react'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'

const MappingTable = () => {
  const [activeRegion, setActiveRegion] = useState('popular')
  const [selectedSupplier, setSelectedSupplier] = useState('all')

  const regions = [
    { value: 'popular', label: 'Phổ biến' },
    { value: 'asia', label: 'Châu Á' },
    { value: 'europe', label: 'Châu Âu' },
    { value: 'america', label: 'Châu Mỹ' },
    { value: 'global', label: 'Toàn cầu' }
  ]

  const suppliers = [
    { value: 'all', label: 'Tất cả Nhà cung cấp', icon: 'tabler-layers-intersect' },
    { value: 'airalo', label: 'Airalo Global', icon: 'tabler-square-rounded-letter-a' },
    { value: 'nomad', label: 'Nomad Global', icon: 'tabler-square-rounded-letter-n' },
    { value: 'keepgo', label: 'KeepGo', icon: 'tabler-square-rounded-letter-k' }
  ]

  const countries = [
    { code: 'jp', name: 'Nhật Bản', flag: '🇯🇵', count: 120 },
    { code: 'kr', name: 'Hàn Quốc', flag: '🇰🇷', count: 85 },
    { code: 'th', name: 'Thái Lan', flag: '🇹🇭', count: 64 },
    { code: 'us', name: 'Hoa Kỳ', flag: '🇺🇸', count: 210 },
    { code: 'vn', name: 'Việt Nam', flag: '🇻🇳', count: 45 },
    { code: 'uk', name: 'Vương Quốc Anh', flag: '🇬🇧', count: 112 },
    { code: 'fr', name: 'Pháp', flag: '🇫🇷', count: 78 },
    { code: 'de', name: 'Đức', flag: '🇩🇪', count: 92 }
  ]

  const packages = [
    { id: 'PKG-001', supplier: 'Airalo', name: 'Japan 10GB Premium', country: 'Nhật Bản', data: '10GB', duration: '30 Days', cost: 8.50, status: 'Active' },
    { id: 'PKG-002', supplier: 'Nomad', name: 'USA Fast Connection', country: 'Hoa Kỳ', data: '5GB', duration: '7 Days', cost: 12.00, status: 'Active' },
    { id: 'PKG-003', supplier: 'Airalo', name: 'China Great Wall', country: 'Trung Quốc', data: '20GB', duration: '30 Days', cost: 15.00, status: 'Active' },
    { id: 'PKG-004', supplier: 'KeepGo', name: 'Europe Discovery', country: 'Châu Âu', data: 'Unlimited', duration: '1 Day', cost: 1.50, status: 'Inactive' },
    { id: 'PKG-005', supplier: 'Nomad', name: 'UK Business Pro', country: 'Vương Quốc Anh', data: '50GB', duration: '90 Days', cost: 45.00, status: 'Active' },
  ]

  return (
    <>
      <PageHeader
        title="Kho Sản phẩm Upstream"
        description="Quản lý toàn bộ gói cước từ tất cả nhà cung cấp, lọc theo khu vực và quốc gia"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Tất cả sản phẩm' }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Select 
              size='small' 
              value={selectedSupplier} 
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className='bg-white min-is-[220px]'
              startAdornment={
                <InputAdornment position='start'>
                  <i className='tabler-filter text-primary' />
                </InputAdornment>
              }
            >
              {suppliers.map(s => (
                <MenuItem key={s.value} value={s.value}>
                  <Box className='flex items-center gap-2'>
                    <i className={s.icon} />
                    {s.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            <Button variant='contained' startIcon={<i className='tabler-refresh' />}>Đồng bộ Toàn sàn</Button>
          </Stack>
        }
        className='mbe-6'
      />

      {/* FILTER TABS & COUNTRY GRID */}
      <Card className='border-none shadow-sm mbe-6 overflow-hidden'>
        <TabContext value={activeRegion}>
          <Box className='border-be bg-slate-50/50'>
            <TabList 
              onChange={(e, v) => setActiveRegion(v)}
              className='min-bs-[60px]'
            >
              {regions.map(r => (
                <Tab key={r.value} label={r.label} value={r.value} className='font-black' />
              ))}
            </TabList>
          </Box>
          <TabPanel value={activeRegion} className='p-6'>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
                <Card className='border-2 border-primary bg-primary/5 cursor-pointer hover:shadow-md transition-all h-full'>
                  <CardContent className='p-4 text-center'>
                    <Typography variant='h3' className='mbe-1'>🌍</Typography>
                    <Typography variant='body2' className='font-black'>Tất cả nước</Typography>
                  </CardContent>
                </Card>
              </Grid2>
              {countries.map(c => (
                <Grid2 key={c.code} size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
                  <Card className='border border-slate-100 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all h-full group'>
                    <CardContent className='p-4 text-center'>
                      <Typography variant='h3' className='mbe-1 grayscale group-hover:grayscale-0 transition-all'>{c.flag}</Typography>
                      <Typography variant='body2' className='font-bold'>{c.name}</Typography>
                      <Typography variant='caption' className='text-slate-400'>{c.count} gói</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </TabPanel>
        </TabContext>
      </Card>

      {/* PACKAGE LIST TABLE */}
      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be flex justify-between items-center gap-4 flex-wrap'>
          <Typography variant='h6' className='font-black'>Danh sách Gói cước Upstream</Typography>
          <TextField 
            size='small' 
            placeholder='Tìm kiếm mã gói, tên nước...' 
            className='min-is-[300px]'
            InputProps={{
              startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead className='bg-slate-50'>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Nhà cung cấp</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Mã Gói (ID)</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Tên Hiển thị & Quốc gia</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Cấu hình (Data/Day)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Giá Vốn (Cost)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id} hover>
                  <TableCell>
                    <Box className='flex items-center gap-2'>
                      <Avatar variant='rounded' className='w-8 h-8 bg-primary/10 text-primary text-xs font-black'>
                        {pkg.supplier[0]}
                      </Avatar>
                      <Typography variant='body2' className='font-bold'>{pkg.supplier}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className='font-mono text-xs text-primary font-bold'>{pkg.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-black'>{pkg.name}</Typography>
                    <Typography variant='caption' className='text-slate-400 italic'>{pkg.country}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <Chip label={pkg.data} size='small' variant='tonal' color='info' className='font-bold text-[10px]' />
                      <Chip label={pkg.duration} size='small' variant='tonal' color='secondary' className='font-bold text-[10px]' />
                    </Stack>
                  </TableCell>
                  <TableCell className='text-right font-black text-primary'>
                    ${pkg.cost.toFixed(2)}
                    <Typography variant='caption' className='block text-slate-400 font-normal'>USD</Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip 
                      label={pkg.status === 'Active' ? 'Đang bán' : 'Tạm dừng'} 
                      size='small' 
                      color={pkg.status === 'Active' ? 'success' : 'default'} 
                      variant='tonal'
                      className='font-black'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <IconButton size='small'><i className='tabler-eye text-[18px]' /></IconButton>
                    <IconButton size='small'><i className='tabler-settings text-[18px]' /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

// Bổ sung các import còn thiếu
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

export default MappingTable
