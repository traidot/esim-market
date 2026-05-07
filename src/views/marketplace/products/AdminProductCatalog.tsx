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
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import PageHeader from '@/components/layout/shared/PageHeader'

const AdminProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  
  // New Filter States
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterData, setFilterData] = useState('all')
  const [filterValidity, setFilterValidity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterUpstream, setFilterUpstream] = useState('all')
  const [filterSimType, setFilterSimType] = useState('all')

  const [sortBy, setSortBy] = useState('none')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleToggleStatus = (id: string, currentStatus: string) => {
    // In real app, dispatch to API to toggle
    console.log(`Toggle status for ${id}`)
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
    { code: 'JP-30D-10GB', name: 'Nhật Bản Siêu Tốc', country: 'Nhật Bản', data: '10GB', validity: '30 Ngày', upstream: 'Airalo', upstreamPrice: 10.50, price: 12.50, status: 'Đang hoạt động', type: 'Total' },
    { code: 'EU-15D-5GB', name: 'Roaming Châu Âu', country: 'Châu Âu', data: '5GB', validity: '15 Ngày', upstream: 'Truphone', upstreamPrice: 7.00, price: 9.00, status: 'Đang hoạt động', type: 'Total' },
    { code: 'US-30D-20GB', name: 'Mỹ Không giới hạn', country: 'Hoa Kỳ', data: '20GB', validity: '30 Ngày', upstream: 'Nomad', upstreamPrice: 18.00, price: 22.00, status: 'Tạm dừng', type: 'Daily' },
    { code: 'VN-30D-20GB', name: 'Viettel 4G Local', country: 'Việt Nam', data: '20GB', validity: '30 Ngày', upstream: 'MobiMatter', upstreamPrice: 4.00, price: 5.50, status: 'Đang hoạt động', type: 'Total' },
    { code: 'TH-07D-Unlimited', name: 'Thái Lan Travel', country: 'Thái Lan', data: 'Unlimited', validity: '7 Ngày', upstream: 'Airalo', upstreamPrice: 4.50, price: 6.20, status: 'Đang hoạt động', type: 'Daily' },
    { code: 'TH-15D-15GB', name: 'Thái Lan Business', country: 'Thái Lan', data: '15GB', validity: '15 Ngày', upstream: 'Truphone', upstreamPrice: 8.50, price: 12.00, status: 'Đang hoạt động', type: 'Total' },
    { code: 'TH-30D-50GB', name: 'Thái Lan Dài Hạn', country: 'Thái Lan', data: '50GB', validity: '30 Ngày', upstream: 'Airalo', upstreamPrice: 18.00, price: 25.00, status: 'Đang hoạt động', type: 'Total' },
    { code: 'KR-14D-10GB', name: 'Hàn Quốc Tốc Độ Cao', country: 'Hàn Quốc', data: '10GB', validity: '14 Ngày', upstream: 'Nomad', upstreamPrice: 12.00, price: 15.00, status: 'Đang hoạt động', type: 'Total' },
    { code: 'TW-05D-3GB', name: 'Đài Loan Ngắn Ngày', country: 'Đài Taiwan', data: '3GB', validity: '5 Ngày', upstream: 'MobiMatter', upstreamPrice: 3.00, price: 4.50, status: 'Đang hoạt động', type: 'Total' },
    { code: 'CN-30D-50GB', name: 'Trung Quốc Vượt Tường Lửa', country: 'Trung Quốc', data: '50GB', validity: '30 Ngày', upstream: 'Truphone', upstreamPrice: 20.00, price: 28.00, status: 'Đang hoạt động', type: 'Total' }
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
      upstream: base.upstream,
      upstreamPrice: base.upstreamPrice,
      price: base.price,
      type: base.type,
      status: index % 7 === 0 ? 'Tạm dừng' : 'Đang hoạt động'
    }
  })

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.country.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRegion = filterRegion === 'all' || countries.find(c => c.name === p.country)?.region === filterRegion;
    const matchCountry = !selectedCountry || p.country === selectedCountry;
    const matchData = filterData === 'all' || p.data === filterData;
    const matchValidity = filterValidity === 'all' || p.validity === filterValidity;
    const matchSimType = filterSimType === 'all' || p.type === filterSimType;
    const matchUpstream = filterUpstream === 'all' || p.upstream === filterUpstream;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? p.status === 'Đang hoạt động' : p.status === 'Tạm dừng');

    return matchSearch && matchRegion && matchCountry && matchData && matchValidity && matchSimType && matchUpstream && matchStatus;
  }).sort((a, b) => {
    if (sortBy === 'none') return 0
    let valA: any = a[sortBy as keyof typeof a]
    let valB: any = b[sortBy as keyof typeof b]
    
    if (sortBy === 'price' || sortBy === 'upstreamPrice') {
      valA = parseFloat(valA)
      valB = parseFloat(valB)
    } else {
      valA = String(valA).toLowerCase()
      valB = String(valB).toLowerCase()
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const resetFilters = () => {
    setFilterData('all')
    setFilterValidity('all')
    setFilterStatus('all')
    setFilterRegion('all')
    setFilterUpstream('all')
    setFilterSimType('all')
    setSelectedCountry(null)
    setSearchTerm('')
    setSortBy('none')
  }

  const handleSort = (property: string) => {
    const isAsc = sortBy === property && sortOrder === 'asc'
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortBy(property)
  }

  return (
    <>
      <PageHeader
        title="Quản lý Danh mục eSIM (Admin 3M)"
        description="Theo dõi giá nhập (Upstream), giá bán (Downstream), biên lợi nhuận và kiểm soát trạng thái các gói cước trên chợ"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chợ eSIM' }, { label: 'Quản lý Danh mục' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6'>
            <Typography variant='h6' className='font-black uppercase text-sm text-slate-500'>Bộ lọc chuyên sâu</Typography>
            {(searchTerm !== '' || selectedCountry !== null || filterRegion !== 'all' || filterData !== 'all' || filterValidity !== 'all' || filterStatus !== 'all' || filterUpstream !== 'all' || filterSimType !== 'all') && (
              <Button size='small' variant='text' color='error' onClick={resetFilters} startIcon={<i className='tabler-trash' />}>Xóa lọc</Button>
            )}
          </Box>
          <Grid2 container spacing={4}>
            {/* Row 1 */}
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm nhanh mã, tên gói, quốc gia...'
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
            <Grid2 size={{ xs: 12, md: 2 }}>
              <TextField select fullWidth size='small' label='Vùng/Châu lục' value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
                <MenuItem value='all'>Tất cả vùng</MenuItem>
                <MenuItem value='Châu Á'>Châu Á</MenuItem>
                <MenuItem value='Châu Âu'>Châu Âu</MenuItem>
                <MenuItem value='Mỹ'>Châu Mỹ</MenuItem>
                <MenuItem value='Toàn cầu'>Toàn cầu</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField select fullWidth size='small' label='Nhà cung cấp (Upstream)' value={filterUpstream} onChange={(e) => setFilterUpstream(e.target.value)}>
                <MenuItem value='all'>Tất cả Upstream</MenuItem>
                <MenuItem value='Airalo'>Airalo</MenuItem>
                <MenuItem value='Nomad'>Nomad</MenuItem>
                <MenuItem value='Truphone'>Truphone</MenuItem>
                <MenuItem value='MobiMatter'>MobiMatter</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField select fullWidth size='small' label='Trạng thái' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='active'>Đang hoạt động</MenuItem>
                <MenuItem value='paused'>Tạm dừng</MenuItem>
              </TextField>
            </Grid2>

            {/* Row 2 */}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' label='Dung lượng' value={filterData} onChange={(e) => setFilterData(e.target.value)}>
                <MenuItem value='all'>Tất cả dung lượng</MenuItem>
                <MenuItem value='5GB'>5GB</MenuItem>
                <MenuItem value='10GB'>10GB</MenuItem>
                <MenuItem value='Unlimited'>Không giới hạn</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' label='Thời hạn' value={filterValidity} onChange={(e) => setFilterValidity(e.target.value)}>
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='7 Ngày'>7 Ngày</MenuItem>
                <MenuItem value='15 Ngày'>15 Ngày</MenuItem>
                <MenuItem value='30 Ngày'>30 Ngày</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' label='Loại eSIM' value={filterSimType} onChange={(e) => setFilterSimType(e.target.value)}>
                <MenuItem value='all'>Tất cả loại</MenuItem>
                <MenuItem value='Daily'>Daily (Theo ngày)</MenuItem>
                <MenuItem value='Total'>Total (Tổng dung lượng)</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Button variant='contained' color='primary' fullWidth startIcon={<i className='tabler-search' />}>Tìm kiếm</Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Product List Table */}
      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be bg-slate-50/50 flex justify-between items-center'>
          <Typography variant='body2' className='text-slate-500 font-bold'>
            Hiển thị {filteredProducts.length} gói cước
          </Typography>
          <Button 
            variant='tonal' 
            color='primary' 
            size='small' 
            startIcon={<i className='tabler-file-download' />}
            className='font-black'
          >
            Xuất Excel
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead className='bg-slate-50'>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>
                  <TableSortLabel active={sortBy === 'code'} direction={sortBy === 'code' ? sortOrder : 'asc'} onClick={() => handleSort('code')}>Gói cước / Mã</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px]'>
                  <TableSortLabel active={sortBy === 'country'} direction={sortBy === 'country' ? sortOrder : 'asc'} onClick={() => handleSort('country')}>Quốc gia</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>
                  <TableSortLabel active={sortBy === 'data'} direction={sortBy === 'data' ? sortOrder : 'asc'} onClick={() => handleSort('data')}>Dung lượng</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>
                  <TableSortLabel active={sortBy === 'validity'} direction={sortBy === 'validity' ? sortOrder : 'asc'} onClick={() => handleSort('validity')}>Thời hạn</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Upstream</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>
                  <TableSortLabel active={sortBy === 'upstreamPrice'} direction={sortBy === 'upstreamPrice' ? sortOrder : 'asc'} onClick={() => handleSort('upstreamPrice')}>Giá Nhập</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>
                  <TableSortLabel active={sortBy === 'status'} direction={sortBy === 'status' ? sortOrder : 'asc'} onClick={() => handleSort('status')}>Trạng thái</TableSortLabel>
                </TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((p) => {
                const supplierColor = p.upstream === 'Airalo' ? '#7367F0' : p.upstream === 'Nomad' ? '#00BAD1' : p.upstream === 'Truphone' ? '#EA5455' : '#FF9F43';
                
                return (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant='body2' className='font-black'>{p.name}</Typography>
                      <Typography variant='caption' className='font-mono text-primary font-bold'>{p.code}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className='flex items-center gap-2'>
                      <Typography variant='body2'>{countries.find(c => c.name === p.country)?.flag || '🌐'}</Typography>
                      <Typography variant='body2' className='font-bold'>{p.country}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip label={p.data} size='small' variant='tonal' color='info' className='font-black' />
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip label={p.validity} size='small' variant='tonal' color='secondary' className='font-black' />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={p.upstream} 
                      size='small' 
                      variant='outlined' 
                      className='font-black' 
                      sx={{ color: supplierColor, borderColor: `${supplierColor}40` }}
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='body2' className='font-mono text-error font-bold'>${p.upstreamPrice.toFixed(2)}</Typography>
                    <Typography variant='caption' className='text-slate-400 uppercase text-[10px]'>Cost</Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip 
                      label={p.status === 'Đang hoạt động' ? 'Active' : 'Paused'} 
                      size='small' 
                      color={p.status === 'Đang hoạt động' ? 'success' : 'secondary'} 
                      variant='tonal'
                      className='font-black'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Switch 
                      size='small'
                      checked={p.status === 'Đang hoạt động'} 
                      onChange={() => handleToggleStatus(p.id, p.status)}
                      color='success'
                    />
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className='p-4 border-t flex justify-center'>
          <Pagination count={5} color='primary' shape='rounded' />
        </Box>
      </Card>

    </>
  )
}

export default AdminProductCatalog
