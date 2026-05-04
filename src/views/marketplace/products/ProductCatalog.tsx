'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import MenuItem from '@mui/material/MenuItem'

import { toast } from 'react-toastify'
import PageHeader from '@/components/layout/shared/PageHeader'

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)
  
  // New Filter States
  const [filterData, setFilterData] = useState('all')
  const [filterValidity, setFilterValidity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const handleOpenDialog = (product: any) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  const handleConfirmPurchase = () => {
    toast.success(`Đã đặt mua gói ${selectedProduct?.name} thành công!`)
    handleCloseDialog()
  }

  const countries = [
    { name: 'Nhật Bản', code: 'JP', flag: '🇯🇵', region: 'Châu Á' },
    { name: 'Hàn Quốc', code: 'KR', flag: '🇰🇷', region: 'Châu Á' },
    { name: 'Thái Lan', code: 'TH', flag: '🇹🇭', region: 'Châu Á' },
    { name: 'Hoa Kỳ', code: 'US', flag: '🇺🇸', region: 'Mỹ' },
    { name: 'Châu Âu', code: 'EU', flag: '🇪🇺', region: 'Châu Âu' },
    { name: 'Việt Nam', code: 'VN', flag: '🇻🇳', region: 'Châu Á' },
    { name: 'Đài Loan', code: 'TW', flag: '🇹🇼', region: 'Châu Á' },
    { name: 'Trung Quốc', code: 'CN', flag: '🇨🇳', region: 'Châu Á' }
  ]

  const baseProducts = [
    { code: 'JP-30D-10GB', name: 'Nhật Bản Siêu Tốc', country: 'Nhật Bản', data: '10GB', validity: '30 Ngày', price: '$12.50', status: 'Đang hoạt động' },
    { code: 'EU-15D-5GB', name: 'Roaming Châu Âu', country: 'Châu Âu', data: '5GB', validity: '15 Ngày', price: '$9.00', status: 'Đang hoạt động' },
    { code: 'US-30D-20GB', name: 'Mỹ Không giới hạn', country: 'Hoa Kỳ', data: '20GB', validity: '30 Ngày', price: '$22.00', status: 'Tạm dừng' },
    { code: 'VN-30D-20GB', name: 'Viettel 4G Local', country: 'Việt Nam', data: '20GB', validity: '30 Ngày', price: '$5.50', status: 'Đang hoạt động' },
    { code: 'TH-07D-Unlimited', name: 'Thái Lan Travel', country: 'Thái Lan', data: 'Unlimited', validity: '7 Ngày', price: '$6.20', status: 'Đang hoạt động' },
    { code: 'TH-15D-15GB', name: 'Thái Lan Business', country: 'Thái Lan', data: '15GB', validity: '15 Ngày', price: '$12.00', status: 'Đang hoạt động' },
    { code: 'TH-30D-50GB', name: 'Thái Lan Dài Hạn', country: 'Thái Lan', data: '50GB', validity: '30 Ngày', price: '$25.00', status: 'Đang hoạt động' },
    { code: 'KR-14D-10GB', name: 'Hàn Quốc Tốc Độ Cao', country: 'Hàn Quốc', data: '10GB', validity: '14 Ngày', price: '$15.00', status: 'Đang hoạt động' },
    { code: 'TW-05D-3GB', name: 'Đài Loan Ngắn Ngày', country: 'Đài Loan', data: '3GB', validity: '5 Ngày', price: '$4.50', status: 'Đang hoạt động' },
    { code: 'CN-30D-50GB', name: 'Trung Quốc Vượt Tường Lửa', country: 'Trung Quốc', data: '50GB', validity: '30 Ngày', price: '$28.00', status: 'Đang hoạt động' }
  ]

  const products = Array.from({ length: 50 }).map((_, index) => {
    const base = baseProducts[index % baseProducts.length];
    return {
      id: `${index + 1}`,
      code: `${base.code}-${index + 1}`,
      name: `${base.name} (Gói ${index + 1})`,
      country: base.country,
      data: base.data,
      validity: base.validity,
      price: base.price,
      status: index % 7 === 0 ? 'Tạm dừng' : 'Đang hoạt động'
    }
  })

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCountry = !selectedCountry || p.country === selectedCountry;
    const matchData = filterData === 'all' || p.data === filterData;
    const matchValidity = filterValidity === 'all' || p.validity === filterValidity;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? p.status === 'Đang hoạt động' : p.status === 'Tạm dừng');

    return matchSearch && matchCountry && matchData && matchValidity && matchStatus;
  })

  const resetFilters = () => {
    setFilterData('all')
    setFilterValidity('all')
    setFilterStatus('all')
    setSelectedCountry(null)
    setSearchTerm('')
  }

  return (
    <>
      <PageHeader
        title="Danh mục eSIM theo Quốc gia"
        description="Duyệt và quản lý các gói cước eSIM theo từng vùng lãnh thổ trên toàn cầu"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chợ eSIM' }, { label: 'Danh mục' }]}
        className='mbe-6'
      />

      <Box className='mbe-6'>
        <Card className='border-none shadow-sm'>
          <CardContent className='p-4'>
            <Box className='flex justify-between items-center flex-wrap gap-4'>
              <Tabs 
                value={activeTab} 
                onChange={(_, val) => setActiveTab(val)}
                className='border-be-0'
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Phổ biến" />
                <Tab label="Châu Á" />
                <Tab label="Châu Âu" />
                <Tab label="Châu Mỹ" />
                <Tab label="Toàn cầu" />
              </Tabs>
              <TextField
                size='small'
                placeholder='Nhập tên quốc gia bạn muốn tìm...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='tabler-search text-slate-400' />
                      </InputAdornment>
                    )
                  }
                }}
                className='min-is-[300px]'
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Country Grid */}
      <Box className='mbe-6'>
        <Typography variant='h6' className='font-black mbe-4'>Quốc gia phổ biến</Typography>
        <Grid2 container spacing={4}>
          {countries.map((c) => (
            <Grid2 key={c.code} size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }}>
              <Card 
                className={`border-none shadow-sm cursor-pointer transition-all hover:shadow-md hover:scale-105 ${selectedCountry === c.name ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={() => setSelectedCountry(selectedCountry === c.name ? null : c.name)}
              >
                <CardContent className='flex flex-col items-center p-4'>
                  <Typography variant='h3' className='mbe-2'>{c.flag}</Typography>
                  <Typography variant='body2' className='font-bold text-center truncate w-full'>{c.name}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
          <Grid2 size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }}>
            <Card className='border-none shadow-sm cursor-pointer hover:bg-slate-50'>
              <CardContent className='flex flex-col items-center p-4 justify-center h-full'>
                <i className='tabler-plus text-2xl text-slate-400 mbe-2' />
                <Typography variant='body2' className='text-slate-500 font-bold'>Xem thêm</Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      {/* Product List */}
      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-4'>
            <Typography variant='h6' className='font-black'>
              {selectedCountry ? `Gói cước tại ${selectedCountry}` : 'Tất cả gói cước'} 
              <Chip label={filteredProducts.length} size='small' className='mis-2' variant='tonal' color='primary' />
            </Typography>
            {(selectedCountry || filterData !== 'all' || filterValidity !== 'all' || filterStatus !== 'all' || searchTerm !== '') && (
              <Button size='small' variant='text' onClick={resetFilters}>Xóa tất cả lọc</Button>
            )}
          </Box>

          <Grid2 container spacing={4} className='mbe-6'>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField 
                select 
                fullWidth 
                size='small' 
                label='Dung lượng' 
                value={filterData}
                onChange={(e) => setFilterData(e.target.value)}
              >
                <MenuItem value='all'>Tất cả dung lượng</MenuItem>
                <MenuItem value='5GB'>5GB</MenuItem>
                <MenuItem value='10GB'>10GB</MenuItem>
                <MenuItem value='15GB'>15GB</MenuItem>
                <MenuItem value='20GB'>20GB</MenuItem>
                <MenuItem value='50GB'>50GB</MenuItem>
                <MenuItem value='Unlimited'>Không giới hạn</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField 
                select 
                fullWidth 
                size='small' 
                label='Thời hạn' 
                value={filterValidity}
                onChange={(e) => setFilterValidity(e.target.value)}
              >
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='5 Ngày'>5 Ngày</MenuItem>
                <MenuItem value='7 Ngày'>7 Ngày</MenuItem>
                <MenuItem value='14 Ngày'>14 Ngày</MenuItem>
                <MenuItem value='15 Ngày'>15 Ngày</MenuItem>
                <MenuItem value='30 Ngày'>30 Ngày</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField 
                select 
                fullWidth 
                size='small' 
                label='Trạng thái' 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='active'>Đang hoạt động</MenuItem>
                <MenuItem value='paused'>Tạm dừng</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Gói cước</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Quốc gia</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Dung lượng</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Thời hạn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/50'>
                    <td className='p-4'>
                      <Box>
                        <Typography variant='body2' className='font-black'>{p.name}</Typography>
                        <Typography variant='caption' className='font-mono text-slate-400'>{p.code}</Typography>
                      </Box>
                    </td>
                    <td className='p-4'>
                      <Box className='flex items-center gap-2'>
                        <Typography variant='body2'>{countries.find(c => c.name === p.country)?.flag || '🌐'}</Typography>
                        <Typography variant='body2'>{p.country}</Typography>
                      </Box>
                    </td>
                    <td className='p-4'><Typography variant='body2' className='font-bold'>{p.data}</Typography></td>
                    <td className='p-4'><Typography variant='body2'>{p.validity}</Typography></td>
                    <td className='p-4'><Typography variant='body2' className='font-black text-primary'>{p.price}</Typography></td>
                    <td className='p-4'>
                      <Chip label={p.status} size='small' color={p.status === 'Đang hoạt động' ? 'success' : 'secondary'} variant='tonal' />
                    </td>
                    <td className='p-4 text-right'>
                      <Button 
                        size='small' 
                        variant='contained'
                        onClick={() => handleOpenDialog(p)}
                      >
                        Mua ngay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
        <DialogTitle className='flex items-center justify-between'>
          <Typography variant='h5' component='span' className='font-black'>Xác nhận mua eSIM</Typography>
          <IconButton onClick={handleCloseDialog} size='small'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box className='flex flex-col gap-4 m-bs-2'>
              <Box className='p-4 bg-slate-50 rounded-lg'>
                <Box className='flex justify-between items-center mbe-4'>
                  <Typography variant='h6' className='font-bold'>{selectedProduct.name}</Typography>
                  <Typography variant='h6' color='primary' className='font-black'>{selectedProduct.price}</Typography>
                </Box>
                <Divider className='mbe-4' />
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500'>Quốc gia</Typography>
                    <Typography variant='body1' className='font-medium'>{selectedProduct.country}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500'>Dung lượng</Typography>
                    <Typography variant='body1' className='font-medium'>{selectedProduct.data}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500'>Thời hạn</Typography>
                    <Typography variant='body1' className='font-medium'>{selectedProduct.validity}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Typography variant='caption' className='text-slate-500'>Mã gói</Typography>
                    <Typography variant='body1' className='font-mono'>{selectedProduct.code}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Typography variant='body2' className='text-slate-500 text-center m-t-2'>
                Vui lòng kiểm tra kỹ thông tin gói cước trước khi thanh toán.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={handleCloseDialog}>Hủy</Button>
          <Button variant='contained' color='primary' onClick={handleConfirmPurchase}>Xác nhận thanh toán</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductCatalog
