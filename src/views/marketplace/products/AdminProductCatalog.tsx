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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

import PageHeader from '@/components/layout/shared/PageHeader'

const AdminProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  
  const [page, setPage] = useState(1)
  const pageSize = 10

  const products = [
    { 
      id: 'P001', 
      sku: 'JP-30D-10GB', 
      name: 'Nhật Bản Siêu Tốc', 
      country: 'Nhật Bản', 
      region: 'Châu Á',
      supplier: 'Singtel',
      cost: 8.50,
      msrp: 12.50,
      status: 'Active',
      stock: 450,
      type: 'Total',
      validity: '30 Ngày'
    },
    { 
      id: 'P002', 
      sku: 'EU-15D-5GB', 
      name: 'Roaming Châu Âu', 
      country: 'Châu Âu', 
      region: 'Châu Âu',
      supplier: 'Orange FR',
      cost: 6.20,
      msrp: 9.00,
      status: 'Active',
      stock: 1200,
      type: 'Daily',
      validity: '15 Ngày'
    },
    { 
      id: 'P003', 
      sku: 'US-30D-20GB', 
      name: 'Mỹ Không giới hạn', 
      country: 'Hoa Kỳ', 
      region: 'Châu Mỹ',
      supplier: 'T-Mobile',
      cost: 15.00,
      msrp: 22.00,
      status: 'Inactive',
      stock: 0,
      type: 'Total',
      validity: '30 Ngày'
    },
    { 
      id: 'P004', 
      sku: 'TH-07D-UNL', 
      name: 'Thái Lan Travel', 
      country: 'Thái Lan', 
      region: 'Châu Á',
      supplier: 'AIS',
      cost: 4.20,
      msrp: 6.20,
      status: 'Active',
      stock: 85,
      type: 'Daily',
      validity: '7 Ngày'
    },
    { 
      id: 'P005', 
      sku: 'VN-30D-20GB', 
      name: 'Viettel 4G Local', 
      country: 'Việt Nam', 
      region: 'Châu Á',
      supplier: 'Viettel',
      cost: 3.50,
      msrp: 5.50,
      status: 'Active',
      stock: 2500,
      type: 'Total',
      validity: '30 Ngày'
    }
  ]

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSupplier = selectedSupplier === 'all' || p.supplier === selectedSupplier;
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchSearch && matchSupplier && matchStatus;
  })

  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const getStatusChip = (status: string) => {
    return (
      <Chip 
        label={status === 'Active' ? 'Hoạt động' : 'Tạm dừng'} 
        size='small' 
        color={status === 'Active' ? 'success' : 'default'} 
        variant='tonal'
        className='font-black uppercase text-[10px]'
      />
    )
  }

  return (
    <>
      <PageHeader
        title="Danh mục eSIM Hệ thống"
        description="Quản lý toàn bộ danh sách gói cước, định giá MSRP và giám sát nguồn cung Upstream."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Quản lý Danh mục' }, { label: 'Danh mục eSIM' }]}
        actions={
          <Stack direction='row' spacing={3}>
            <Tooltip title="Cập nhật giá từ nguồn cung">
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-refresh' />}>Sync Now</Button>
            </Tooltip>
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>Thêm Gói cước</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent className='p-6'>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Tìm kiếm gói cước / SKU</Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Nhập tên gói hoặc SKU...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search text-slate-400' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 2.5 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Nhà cung cấp</Typography>
              <Select fullWidth size='small' value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                <MenuItem value='all'>Tất cả nguồn cung</MenuItem>
                <MenuItem value='Singtel'>Singtel</MenuItem>
                <MenuItem value='Orange FR'>Orange FR</MenuItem>
                <MenuItem value='AIS'>AIS</MenuItem>
                <MenuItem value='T-Mobile'>T-Mobile</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 2.5 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Trạng thái kinh doanh</Typography>
              <Select fullWidth size='small' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='Active'>Đang kinh doanh</MenuItem>
                <MenuItem value='Inactive'>Ngừng kinh doanh</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 opacity-0 hidden md:block'>Reset</Typography>
              <Button fullWidth variant='tonal' color='secondary' onClick={() => { setSearchTerm(''); setSelectedSupplier('all'); setSelectedStatus('all'); }}>Xóa bộ lọc</Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be bg-white flex justify-between items-center'>
          <Box className='flex items-center gap-3'>
            <Typography variant='h6' className='font-black'>Inventory & Marketplace</Typography>
            <Chip label={`${filteredProducts.length} items`} size='small' color='primary' variant='tonal' className='font-bold text-[10px]' />
          </Box>
          <Box className='flex items-center gap-2'>
            <Typography variant='caption' className='text-slate-400 italic'>Cập nhật: 2 phút trước</Typography>
            <IconButton size='small'><i className='tabler-dots-vertical' /></IconButton>
          </Box>
        </Box>
        <Box className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50 border-be'>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider'>Sản phẩm / SKU</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider'>Vùng phủ sóng</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-center'>Nguồn cung</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right'>Giá Cost</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right'>Giá MSRP</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-center'>Kho hàng</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-center'>Trạng thái</th>
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? paginatedProducts.map((p) => (
                <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/80 transition-all cursor-default'>
                  <td className='p-4'>
                    <Box className='flex items-center gap-3'>
                      <Avatar variant='rounded' className='bg-primary/5 text-primary bs-[38px] is-[38px] border border-primary/10'>
                        <i className='tabler-wifi text-[20px]' />
                      </Avatar>
                      <Box>
                        <Typography variant='body2' className='font-black text-slate-900'>{p.name}</Typography>
                        <Typography variant='caption' className='font-mono font-bold text-slate-400 uppercase text-[10px]'>{p.sku}</Typography>
                      </Box>
                    </Box>
                  </td>
                  <td className='p-4'>
                    <Box className='flex flex-col gap-1'>
                      <Box className='flex items-center gap-1.5'>
                        <i className='tabler-map-pin text-[14px] text-slate-400' />
                        <Typography variant='body2' className='font-bold text-slate-700'>{p.country}</Typography>
                      </Box>
                      <Box>
                        <Chip label={p.region} size='small' color='secondary' variant='tonal' sx={{ height: 18, fontSize: '9px', fontWeight: 900, textTransform: 'uppercase' }} />
                      </Box>
                    </Box>
                  </td>
                  <td className='p-4 text-center'>
                    <Chip 
                      label={p.supplier} 
                      size='small' 
                      className='font-black text-[10px] bg-primary/10 text-primary border border-primary/20'
                    />
                  </td>
                  <td className='p-4 text-right'>
                    <Typography variant='body2' className='font-black text-slate-400'>${p.cost.toFixed(2)}</Typography>
                  </td>
                  <td className='p-4 text-right'>
                    <Box className='flex flex-col items-end'>
                      <Typography variant='body2' className='font-black text-primary'>${p.msrp.toFixed(2)}</Typography>
                      <Typography variant='caption' className='text-success font-black text-[9px]'>+{((p.msrp - p.cost) / p.cost * 100).toFixed(0)}% Margin</Typography>
                    </Box>
                  </td>
                  <td className='p-4 text-center'>
                    <Box className='flex flex-col items-center gap-1'>
                      <Typography variant='body2' className={`font-black ${p.stock < 100 ? 'text-error' : 'text-slate-700'}`}>
                        {p.stock.toLocaleString()}
                      </Typography>
                      <Box className='is-full bs-1 bg-slate-100 rounded-full overflow-hidden' sx={{ width: 40 }}>
                        <Box 
                          className={`bs-full ${p.stock < 100 ? 'bg-error' : 'bg-success'}`} 
                          sx={{ width: `${Math.min(p.stock / 10, 100)}%` }} 
                        />
                      </Box>
                    </Box>
                  </td>
                  <td className='p-4 text-center'>
                    {getStatusChip(p.status)}
                  </td>
                  <td className='p-4 text-right'>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                      <Tooltip title='Chỉnh sửa thông tin'>
                        <IconButton size='small' className='bg-slate-50' onClick={() => handleOpenDetail(p)}><i className='tabler-edit text-slate-500' /></IconButton>
                      </Tooltip>
                      <Tooltip title='Lịch sử tồn kho'>
                        <IconButton size='small' className='bg-slate-50' color='primary'><i className='tabler-chart-bar' /></IconButton>
                      </Tooltip>
                    </Stack>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className='p-20 text-center'>
                    <Box className='flex flex-col items-center gap-4 opacity-40'>
                      <i className='tabler-package-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>Không tìm thấy sản phẩm nào</Typography>
                      <Button variant='tonal' size='small' onClick={() => setSearchTerm('')}>Xóa bộ lọc tìm kiếm</Button>
                    </Box>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
        <Box className='p-5 border-ts bg-slate-50/30 flex justify-between items-center'>
          <Typography variant='caption' className='text-slate-500 font-medium italic'>
            <i className='tabler-info-circle mis-1 inline-block align-middle' /> Giá gốc được đồng bộ theo thời gian thực từ API Upstream.
          </Typography>
          <Pagination count={Math.ceil(filteredProducts.length / pageSize)} page={page} onChange={(_, v) => setPage(v)} color='primary' shape='rounded' size='small' />
        </Box>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be'>
          <Typography variant='h5' className='font-black'>Cấu hình Gói cước: {selectedProduct?.sku}</Typography>
          <IconButton onClick={() => setOpenDialog(false)} size='small'><i className='tabler-x' /></IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedProduct && (
            <Grid2 container spacing={6} className='mbs-2'>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'>Thông tin cơ bản</Typography>
                <Stack spacing={4}>
                  <TextField fullWidth size='small' label='Tên gói cước' defaultValue={selectedProduct.name} />
                  <TextField fullWidth size='small' label='SKU Hệ thống' defaultValue={selectedProduct.sku} disabled />
                  <Stack direction='row' spacing={4}>
                    <TextField fullWidth size='small' label='Dung lượng' defaultValue={selectedProduct.data} />
                    <TextField fullWidth size='small' label='Thời hạn' defaultValue={selectedProduct.validity} />
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'>Định giá \u0026 Nguồn cung</Typography>
                <Stack spacing={4}>
                  <Box className='p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200'>
                    <Typography variant='caption' className='text-slate-500 font-bold uppercase'>Giá Cost hiện tại ({selectedProduct.supplier})</Typography>
                    <Typography variant='h4' className='font-black text-slate-400'>${selectedProduct.cost.toFixed(2)}</Typography>
                  </Box>
                  <TextField 
                    fullWidth 
                    size='small' 
                    label='Giá niêm yết (MSRP)' 
                    defaultValue={selectedProduct.msrp}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                  />
                  <Box>
                    <Typography variant='caption' className='text-success font-black'>Lợi nhuận gộp: ${(selectedProduct.msrp - selectedProduct.cost).toFixed(2)} ({((selectedProduct.msrp - selectedProduct.cost) / selectedProduct.cost * 100).toFixed(1)}%)</Typography>
                  </Box>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Divider className='border-dashed' />
                <Box className='mts-4'>
                  <Typography variant='subtitle2' className='font-black mbe-2'>Mô tả hiển thị cho Đại lý</Typography>
                  <TextField fullWidth multiline rows={3} placeholder='Nhập mô tả gói cước...' defaultValue={`Gói cước tốc độ cao tại ${selectedProduct.country}, hỗ trợ roaming và hotspot.`} />
                </Box>
              </Grid2>
            </Grid2>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={() => setOpenDialog(false)}>Hủy bỏ</Button>
          <Button variant='contained' onClick={() => { setOpenDialog(false); }}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdminProductCatalog
