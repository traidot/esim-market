'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import MenuItem from '@mui/material/MenuItem'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'

import { toast } from 'react-toastify'
import PageHeader from '@/components/layout/shared/PageHeader'

const AgentProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('all')
  const [selectedCountries, setSelectedCountries] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)
  
  // New Filter States
  const [filterData, setFilterData] = useState('all')
  const [filterValidity, setFilterValidity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Dev toggle to demonstrate different agent types
  const [agentType, setAgentType] = useState<'prepaid' | 'postpaid'>('postpaid')

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

    const matchStatus = p.status === 'Đang hoạt động';

    return matchSearch && matchContinent && matchCountries && matchData && matchValidity && matchStatus;
  })

  const resetFilters = () => {
    setFilterData('all')
    setFilterValidity('all')
    setFilterStatus('all')
    setSelectedContinent('all')
    setSelectedCountries([])
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

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6'>
            <Typography variant='h6' className='font-black uppercase text-sm text-slate-500'>Bộ lọc tìm kiếm</Typography>
            {(selectedContinent !== 'all' || selectedCountries.length > 0 || filterData !== 'all' || filterValidity !== 'all' || filterStatus !== 'all' || searchTerm !== '') && (
              <Button size='small' variant='text' color='error' onClick={resetFilters} startIcon={<i className='tabler-trash' />}>
                Xóa tất cả bộ lọc
              </Button>
            )}
          </Box>
          
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField 
                select 
                fullWidth 
                size='small' 
                label='Khu vực (Châu lục)' 
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
              >
                <MenuItem value='all'>Tất cả khu vực</MenuItem>
                <MenuItem value='Châu Á'>Châu Á</MenuItem>
                <MenuItem value='Châu Âu'>Châu Âu</MenuItem>
                <MenuItem value='Mỹ'>Châu Mỹ</MenuItem>
                <MenuItem value='Toàn cầu'>Toàn cầu</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Autocomplete
                multiple
                size='small'
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountries}
                onChange={(_, newValue) => setSelectedCountries(newValue)}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField {...params} label='Chọn Quốc gia' placeholder='Tìm quốc gia...' />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<i className='tabler-square' />}
                      checkedIcon={<i className='tabler-square-check-filled' />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.flag} {option.name}
                  </li>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={`${option.flag} ${option.name}`}
                      {...getTagProps({ index })}
                      size='small'
                      variant='tonal'
                      key={option.code}
                    />
                  ))
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm theo tên gói cước...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
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
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
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
          </Grid2>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-4'>
            <Typography variant='h6' className='font-black'>
              Danh sách Gói cước
              <Chip label={filteredProducts.length} size='small' className='mis-2' variant='tonal' color='primary' />
            </Typography>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Gói cước</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Quốc gia</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Dung lượng</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Thời hạn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
        <DialogTitle className='flex items-center justify-between'>
          <Typography variant='h5' component='span' className='font-black'>Thông tin Tích hợp API</Typography>
          <IconButton onClick={handleCloseDialog} size='small'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className='p-4 bg-primary/5 rounded-xl border border-primary/10 mbe-6 m-bs-2'>
            <Typography variant='caption' className='font-bold text-primary uppercase block mbe-1'>Sản phẩm (Package SKU)</Typography>
            <Typography variant='h6' className='font-black'>{selectedProduct?.code}</Typography>
            <Typography variant='body2' className='text-slate-500'>{selectedProduct?.name} - {selectedProduct?.price}</Typography>
          </Box>

          <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Mẫu lệnh gọi API (cURL)</Typography>
          <Box className='p-4 bg-slate-900 rounded-lg overflow-x-auto mbe-4'>
            <pre className='text-xs text-success m-0 font-mono'>
              {`curl -X POST "https://api.esimmarket.com/v1/orders" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "${selectedProduct?.code}",
    "quantity": 1,
    "agent_reference": "YOUR_ORDER_ID"
  }'`}
            </pre>
          </Box>


          <Typography variant='body2' className='text-slate-600 italic'>
            * Lưu ý: Hệ thống ESIM Market chỉ hỗ trợ mua sỉ qua API. Vui lòng đảm bảo số dư ví hoặc hạn mức công nợ để giao dịch thành công.
          </Typography>
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button onClick={handleCloseDialog} color='secondary' variant='tonal'>Đóng</Button>
          <Button variant='contained' href='/system/api' component={Link} startIcon={<i className='tabler-file-description' />}>
            Xem Tài liệu API
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AgentProductCatalog
