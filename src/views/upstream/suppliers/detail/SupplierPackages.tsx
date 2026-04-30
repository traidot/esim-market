'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'

import PageHeader from '@/components/layout/shared/PageHeader'

const SupplierPackages = () => {
  const { id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentRegion, setCurrentRegion] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Mock data cho nhà cung cấp
  const supplierInfo = {
    AIRALO: { name: 'Airalo Global', total: 450, color: 'primary' },
    NOMAD: { name: 'Nomad Global', total: 1200, color: 'info' },
    GOMO: { name: 'GoMoWorld', total: 0, color: 'error' },
  }[String(id).toUpperCase()] || { name: 'Nhà cung cấp', total: 0, color: 'secondary' }

  const regions = ['Phổ biến', 'Châu Á', 'Châu Âu', 'Châu Mỹ', 'Toàn cầu']
  const countries = [
    { name: 'Nhật Bản', icon: '🇯🇵', region: 1 },
    { name: 'Hàn Quốc', icon: '🇰🇷', region: 1 },
    { name: 'Thái Lan', icon: '🇹🇭', region: 1 },
    { name: 'Hoa Kỳ', icon: '🇺🇸', region: 3 },
    { name: 'Châu Âu', icon: '🇪🇺', region: 2 },
    { name: 'Việt Nam', icon: '🇻🇳', region: 1 },
    { name: 'Đài Loan', icon: '🇹🇼', region: 1 },
    { name: 'Trung Quốc', icon: '🇨🇳', region: 1 },
  ]

  // Mock packages state
  const [packages, setPackages] = useState([
    { id: 'PKG-001', name: 'Japan 10GB Premium', country: 'Nhật Bản', data: '10GB', duration: '30 Days', cost: 8.50, status: 'Active' },
    { id: 'PKG-002', name: 'USA Fast Connection', country: 'Hoa Kỳ', data: '5GB', duration: '7 Days', cost: 12.00, status: 'Active' },
    { id: 'PKG-003', name: 'China Great Wall', country: 'Trung Quốc', data: '20GB', duration: '30 Days', cost: 15.00, status: 'Active' },
    { id: 'PKG-004', name: 'Korea SKT Unlimited', country: 'Hàn Quốc', data: 'Unlimited', duration: '1 Day', cost: 1.50, status: 'Paused' },
    { id: 'PKG-005', name: 'Europe Summer Roaming', country: 'Châu Âu', data: '10GB', duration: '15 Days', cost: 11.00, status: 'Active' },
    { id: 'PKG-006', name: 'Vietnam Viettel 4G', country: 'Việt Nam', data: '3GB', duration: '5 Days', cost: 0.50, status: 'Active' },
  ])

  const handleUpdateQuotes = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setPackages(prev => prev.map(p => ({
        ...p,
        cost: p.cost * 0.9 // Giả lập giảm 10% giá khi upload file mới
      })))
      setIsUpdating(false)
      setIsUploadModalOpen(false)
    }, 2000)
  }

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry ? pkg.country === selectedCountry : true
    return matchesSearch && matchesCountry
  })

  return (
    <>
      <PageHeader
        title={`Quản lý eSIM: ${supplierInfo.name}`}
        description={`Quản lý và cập nhật báo giá cho ${supplierInfo.total} gói cước từ ${supplierInfo.name}`}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Nguồn cung', href: '/upstream/suppliers' },
          { label: supplierInfo.name }
        ]}
        actions={
          <Button 
            variant='contained' 
            startIcon={<i className='tabler-refresh' />}
            component={Link}
            href={`/upstream/suppliers/${id}/sync`}
          >
            Cập nhật thông tin báo giá
          </Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Bộ lọc Vùng & Quốc gia */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <Box className='border-be'>
              <Tabs 
                value={currentRegion} 
                onChange={(e, v) => { setCurrentRegion(v); setSelectedCountry(null); }}
                className='px-6 pt-2'
              >
                {regions.map((region, idx) => (
                  <Tab key={idx} label={region} />
                ))}
              </Tabs>
            </Box>
            <CardContent>
              <Box className='flex flex-wrap gap-4'>
                <Box 
                  onClick={() => setSelectedCountry(null)}
                  className={`px-6 py-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center min-is-[120px] ${!selectedCountry ? 'bg-primary/10 border-primary shadow-sm' : 'hover:bg-slate-50 border-transparent bg-slate-50/50'}`}
                >
                  <Typography variant='h4' className='mbe-1'>🌍</Typography>
                  <Typography variant='caption' className={`font-black ${!selectedCountry ? 'text-primary' : ''}`}>Tất cả nước</Typography>
                </Box>
                {countries.filter(c => currentRegion === 0 || c.region === currentRegion).map((c, idx) => (
                  <Box 
                    key={idx} 
                    onClick={() => setSelectedCountry(c.name)}
                    className={`px-6 py-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center min-is-[120px] ${selectedCountry === c.name ? 'bg-primary/10 border-primary shadow-sm' : 'hover:bg-slate-50 border-transparent bg-slate-50/50'}`}
                  >
                    <Typography variant='h4' className='mbe-1'>{c.icon}</Typography>
                    <Typography variant='caption' className={`font-black ${selectedCountry === c.name ? 'text-primary' : ''}`}>{c.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Bảng dữ liệu chính */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <Box className='p-5 border-be flex justify-between items-center'>
              <TextField
                className='max-is-[400px] flex-grow'
                placeholder='Tìm nhanh trong kết quả lọc...'
                size='small'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                  }
                }}
              />
              <Typography variant='body2' className='text-slate-500 font-bold'>
                Tìm thấy {filteredPackages.length} gói cước
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead className='bg-slate-50'>
                  <TableRow>
                    <TableCell className='font-black uppercase text-[11px]'>Mã gói (ID)</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Tên hiển thị & Quốc gia</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Cấu hình (Data/Day)</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Giá vốn (Cost)</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Trạng thái</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id} hover>
                        <TableCell>
                          <Typography variant='body2' className='font-black text-primary'>{pkg.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant='body2' className='font-black'>{pkg.name}</Typography>
                            <Box className='flex items-center gap-1 text-slate-400'>
                              <i className='tabler-map-pin text-[12px]' />
                              <Typography variant='caption'>{pkg.country}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className='flex items-center gap-2'>
                            <Chip label={pkg.data} size='small' color='info' variant='tonal' className='font-bold' />
                            <Typography variant='caption' className='text-slate-500'>{pkg.duration}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' className='font-black text-slate-900'>${pkg.cost.toFixed(2)}</Typography>
                          <Typography variant='caption' className='text-slate-400 font-mono'>USD</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={pkg.status === 'Active' ? 'Đang bán' : 'Tạm dừng'} 
                            size='small' 
                            color={pkg.status === 'Active' ? 'success' : 'secondary'} 
                            variant='tonal'
                            className='font-bold'
                          />
                        </TableCell>
                        <TableCell className='text-right'>
                          <IconButton size='small'><i className='tabler-eye text-[18px]' /></IconButton>
                          <IconButton size='small'><i className='tabler-settings text-[18px]' /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className='text-center p-10'>
                        <Typography variant='body2' className='text-slate-400'>Không tìm thấy gói cước nào</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className='p-4 border-t flex justify-center'>
              <Pagination count={5} color='primary' shape='rounded' />
            </Box>
          </Card>
        </Grid2>
      </Grid2>

      {/* Dialog Upload Báo giá */}
      <Dialog 
        open={isUploadModalOpen} 
        onClose={() => !isUpdating && setIsUploadModalOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle className='font-black'>Cập nhật báo giá mới (.xlsx)</DialogTitle>
        <DialogContent>
          <Typography variant='body2' className='mbe-4'>Tải lên file báo giá mới của <strong>{supplierInfo.name}</strong> để cập nhật giá vốn toàn hệ thống.</Typography>
          <Box className='p-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer'>
            <Avatar className='bg-primary/10 text-primary w-12 h-12 mbe-3'>
              <i className='tabler-cloud-upload text-2xl' />
            </Avatar>
            <Typography variant='body2' className='font-black'>Kéo thả file Excel vào đây hoặc click để chọn</Typography>
            <Typography variant='caption' className='text-slate-400'>Hỗ trợ .xlsx, .xls (Tối đa 20MB)</Typography>
          </Box>
        </DialogContent>
        <DialogActions className='p-6'>
          <Button color='secondary' onClick={() => setIsUploadModalOpen(false)} disabled={isUpdating}>Hủy</Button>
          <Button 
            variant='contained' 
            onClick={handleUpdateQuotes} 
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Bắt đầu cập nhật giá'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SupplierPackages
