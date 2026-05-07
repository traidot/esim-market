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
        description="Quản lý toàn bộ danh sách gói cước, định giá MSRP và giám sát nguồn cung Upstream"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Quản lý Danh mục' }, { label: 'Danh mục eSIM' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>Thêm Gói cước</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Tìm kiếm sản phẩm</Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Tên gói, SKU...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Nhà cung cấp (Source)</Typography>
              <Select fullWidth size='small' value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
                <MenuItem value='all'>Tất cả nguồn</MenuItem>
                <MenuItem value='Singtel'>Singtel</MenuItem>
                <MenuItem value='Orange FR'>Orange FR</MenuItem>
                <MenuItem value='AIS'>AIS</MenuItem>
                <MenuItem value='T-Mobile'>T-Mobile</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Trạng thái kinh doanh</Typography>
              <Select fullWidth size='small' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='Active'>Đang kinh doanh</MenuItem>
                <MenuItem value='Inactive'>Ngừng kinh doanh</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 opacity-0 uppercase text-[11px] hidden md:block'>Reset</Typography>
              <Button fullWidth variant='tonal' color='secondary' onClick={() => { setSearchTerm(''); setSelectedSupplier('all'); setSelectedStatus('all'); }}>Xóa lọc</Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be bg-slate-50/50 flex justify-between items-center'>
          <Typography variant='h6' className='font-black'>Danh sách eSIM Marketplace</Typography>
          <Typography variant='body2' className='text-slate-500'>Tổng cộng: <b>{filteredProducts.length}</b> sản phẩm</Typography>
        </Box>
        <Box className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50 border-be'>
                <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm / SKU</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase'>Khu vực</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Nguồn (Upstream)</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Giá gốc (Cost)</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Giá bán (MSRP)</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Tồn kho</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Trạng thái</th>
                <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/50'>
                  <td className='p-4'>
                    <Box>
                      <Typography variant='body2' className='font-black text-slate-900'>{p.name}</Typography>
                      <Typography variant='caption' className='font-mono text-slate-400'>{p.sku}</Typography>
                    </Box>
                  </td>
                  <td className='p-4'>
                    <Box className='flex items-center gap-2'>
                      <Chip label={p.region} size='small' variant='tonal' color='secondary' sx={{ height: 20, fontSize: '10px', fontWeight: 'bold' }} />
                      <Typography variant='body2' className='text-slate-600'>{p.country}</Typography>
                    </Box>
                  </td>
                  <td className='p-4 text-center'>
                    <Typography variant='body2' className='font-bold text-primary'>{p.supplier}</Typography>
                  </td>
                  <td className='p-4 text-right'>
                    <Typography variant='body2' className='font-black text-slate-500'>${p.cost.toFixed(2)}</Typography>
                  </td>
                  <td className='p-4 text-right'>
                    <Typography variant='body2' className='font-black text-primary'>${p.msrp.toFixed(2)}</Typography>
                  </td>
                  <td className='p-4 text-center'>
                    <Typography variant='body2' className={`font-black ${p.stock < 100 ? 'text-error' : 'text-success'}`}>
                      {p.stock.toLocaleString()}
                    </Typography>
                  </td>
                  <td className='p-4 text-center'>
                    {getStatusChip(p.status)}
                  </td>
                  <td className='p-4 text-right'>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                      <Tooltip title='Chỉnh sửa'>
                        <IconButton size='small' onClick={() => handleOpenDetail(p)}><i className='tabler-edit text-slate-400' /></IconButton>
                      </Tooltip>
                      <Tooltip title='Cài đặt giá'>
                        <IconButton size='small' color='primary'><i className='tabler-adjustments-horizontal' /></IconButton>
                      </Tooltip>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box className='p-4 flex justify-between items-center'>
          <Typography variant='caption' className='text-slate-500 italic'>* Giá Cost được cập nhật tự động từ luồng Upstream</Typography>
          <Pagination count={Math.ceil(filteredProducts.length / pageSize)} page={page} onChange={(_, v) => setPage(v)} color='primary' shape='rounded' />
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
