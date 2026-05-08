'use client'

import { useMemo, useRef, useState } from 'react'

import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'

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
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CircularProgress from '@mui/material/CircularProgress'

import PageHeader from '@/components/layout/shared/PageHeader'

type ProductStatus = 'Active' | 'Inactive'

type Product = {
  id: string
  sku: string
  name: string
  country: string
  region: string
  supplier: string
  cost: number
  msrp: number
  status: ProductStatus
  stock: number
  type: 'Total' | 'Daily'
  validity: string
}

type SortKey = 'country' | 'supplier' | 'product' | 'type' | 'data' | 'validity' | 'price' | 'status'
type SortDirection = 'asc' | 'desc'

const products: Product[] = [
  {
    id: 'P001',
    sku: 'JP-30D-10GB',
    name: 'Nhật Bản Siêu Tốc',
    country: 'Nhật Bản',
    region: 'Châu Á',
    supplier: 'Singtel',
    cost: 8.5,
    msrp: 12.5,
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
    cost: 6.2,
    msrp: 9,
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
    cost: 15,
    msrp: 22,
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
    cost: 4.2,
    msrp: 6.2,
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
    cost: 3.5,
    msrp: 5.5,
    status: 'Active',
    stock: 2500,
    type: 'Total',
    validity: '30 Ngày'
  }
]

const getProductDataLabel = (product: Product) => {
  if (product.sku.includes('UNL') || product.name.includes('giới hạn')) return 'Unlimited'

  return product.sku.split('-').pop() ?? ''
}

const getSortValue = (product: Product, sortKey: SortKey): string | number => {
  switch (sortKey) {
    case 'country':
      return product.country
    case 'supplier':
      return product.supplier
    case 'product':
      return `${product.name} ${product.sku}`
    case 'type':
      return product.type
    case 'data':
      return getProductDataLabel(product)
    case 'validity':
      return Number.parseInt(product.validity, 10)
    case 'price':
      return product.msrp
    case 'status':
      return product.status
  }
}

const AdminProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('all')
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [importStep, setImportStep] = useState(0)
  const [importSupplier, setImportSupplier] = useState('')
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importPreview, setImportPreview] = useState<{ rows: number; headers: string[] } | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importProcessing, setImportProcessing] = useState(false)
  const importInputRef = useRef<HTMLInputElement | null>(null)
  const SUPPLIER_OPTIONS = ['Singtel', 'Orange FR', 'AIS', 'T-Mobile']
  const IMPORT_STEPS = ['Tải lên Báo giá (Excel)', 'Đồng bộ API NCC', 'Kiểm định & Phê duyệt']
  const validationResults = [
    { id: 'Z-01', name: 'Japan 10GB', cost: 8.5, status: 'Valid', type: 'Update' },
    { id: 'Z-02', name: 'USA 5GB', cost: 12.0, status: 'Valid', type: 'New' },
    { id: 'Z-03', name: 'UK 1GB', cost: 0.0, status: 'Error', type: 'Invalid' },
    { id: 'Z-04', name: 'Global Pro', cost: 45.0, status: 'Warning', type: 'Check' }
  ]
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedData, setSelectedData] = useState('all')
  const [selectedValidity, setSelectedValidity] = useState('all')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('product')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const [page, setPage] = useState(1)
  const pageSize = 10

  const filteredProducts = useMemo(
    () =>
      products.filter(p => {
        const matchSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        const matchSupplier = selectedSupplier === 'all' || p.supplier === selectedSupplier
        const matchStatus = selectedStatus === 'all' || p.status === selectedStatus
        const matchType = selectedType === 'all' || p.type === selectedType
        const matchData = selectedData === 'all' || p.sku.includes(selectedData)
        const matchValidity = selectedValidity === 'all' || p.validity.includes(selectedValidity)

        return matchSearch && matchSupplier && matchStatus && matchType && matchData && matchValidity
      }),
    [searchTerm, selectedData, selectedStatus, selectedSupplier, selectedType, selectedValidity]
  )

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((left, right) => {
      const leftValue = getSortValue(left, sortKey)
      const rightValue = getSortValue(right, sortKey)
      const result =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue), 'vi', { numeric: true })

      return sortDirection === 'asc' ? result : -result
    })
  }, [filteredProducts, sortDirection, sortKey])

  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize)

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const handleSort = (nextKey: SortKey) => {
    setSortDirection(current => (sortKey === nextKey && current === 'asc' ? 'desc' : 'asc'))
    setSortKey(nextKey)
    setPage(1)
  }

  const handleOpenImport = () => {
    setImportStep(0)
    setImportSupplier('')
    setImportFile(null)
    setImportPreview(null)
    setImportError(null)
    setImportProcessing(false)
    setOpenImportDialog(true)
  }

  const handleCloseImport = () => {
    setOpenImportDialog(false)
  }

  const handleImportFileChange = async (file: File | null) => {
    setImportFile(file)
    setImportError(null)
    setImportPreview(null)

    if (!file) return

    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]

      if (!sheetName) {
        setImportError('File không có sheet nào')

        return
      }

      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: null })

      if (json.length === 0) {
        setImportError('File rỗng hoặc không đọc được dữ liệu')

        return
      }

      const headers = Object.keys(json[0])

      setImportPreview({ rows: json.length, headers })
    } catch {
      setImportError('Không thể đọc file Excel. Vui lòng kiểm tra định dạng .xlsx')
    }
  }

  const handleImportStepUpload = () => {
    if (!importSupplier) {
      setImportError('Vui lòng chọn nhà cung cấp')

      return
    }

    if (!importFile || !importPreview) {
      setImportError('Vui lòng chọn file báo giá hợp lệ')

      return
    }

    setImportError(null)
    setImportProcessing(true)
    setTimeout(() => {
      setImportProcessing(false)
      setImportStep(1)
    }, 1200)
  }

  const handleImportStepSync = () => {
    setImportProcessing(true)
    setTimeout(() => {
      setImportProcessing(false)
      setImportStep(2)
    }, 1500)
  }

  const handleImportStepCommit = () => {
    setImportProcessing(true)
    setTimeout(() => {
      setImportProcessing(false)
      setImportStep(3)
      toast.success(
        `Đã nhập ${importPreview?.rows ?? 0} dòng báo giá từ ${importSupplier} vào danh mục eSIM.`
      )
    }, 1200)
  }

  const handleExportExcel = () => {
    const rows = sortedProducts.map(product => ({
      'Quốc gia': product.country,
      'Khu vực': product.region,
      'Nguồn cung': product.supplier,
      'Tên eSIM': product.name,
      SKU: product.sku,
      Loại: product.type,
      'Dung lượng': getProductDataLabel(product),
      'Số ngày': product.validity,
      'Giá MSRP (USD)': product.msrp,
      'Giá cost (USD)': product.cost,
      'Tồn kho': product.stock,
      'Trạng thái': product.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh mục eSIM')
    XLSX.writeFile(workbook, `danh-muc-esim-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const getStatusChip = (status: ProductStatus) => {
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

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <i className='tabler-arrows-sort text-[14px] text-slate-300' />

    return <i className={`tabler-arrow-${sortDirection === 'asc' ? 'up' : 'down'} text-[14px] text-primary`} />
  }

  const renderSortableHeader = (key: SortKey, label: string, align: 'left' | 'center' | 'right' = 'left') => (
    <th
      className={`p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}`}
    >
      <button
        type='button'
        className={`inline-flex w-full cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-black uppercase tracking-wider text-slate-500 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}
        onClick={() => handleSort(key)}
      >
        {label}
        {renderSortIcon(key)}
      </button>
    </th>
  )

  return (
    <>
      <PageHeader
        title='Danh mục eSIM Hệ thống'
        description='Quản lý toàn bộ danh sách gói cước, định giá MSRP và giám sát nguồn cung Upstream.'
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Quản lý danh mục eSIM' },
          { label: 'Danh mục eSIM' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<i className='tabler-file-upload' />}
              onClick={handleOpenImport}
            >
              Import báo giá
            </Button>
            <Button
              variant='tonal'
              color='secondary'
              startIcon={<i className='tabler-file-spreadsheet' />}
              onClick={handleExportExcel}
            >
              Xuất Excel
            </Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent className='p-6'>
          <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Tìm kiếm gói cước / SKU
              </Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Nhập tên gói hoặc SKU...'
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.66 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Nhà cung cấp
              </Typography>
              <Select
                fullWidth
                size='small'
                value={selectedSupplier}
                onChange={e => {
                  setSelectedSupplier(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả nguồn cung</MenuItem>
                <MenuItem value='Singtel'>Singtel</MenuItem>
                <MenuItem value='Orange FR'>Orange FR</MenuItem>
                <MenuItem value='AIS'>AIS</MenuItem>
                <MenuItem value='T-Mobile'>T-Mobile</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.66 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Loại eSIM
              </Typography>
              <Select
                fullWidth
                size='small'
                value={selectedType}
                onChange={e => {
                  setSelectedType(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả loại</MenuItem>
                <MenuItem value='Daily'>Gói Daily (Ngày)</MenuItem>
                <MenuItem value='Total'>Gói Total (Tổng)</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.66 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Trạng thái
              </Typography>
              <Select
                fullWidth
                size='small'
                value={selectedStatus}
                onChange={e => {
                  setSelectedStatus(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả trạng thái</MenuItem>
                <MenuItem value='Active'>Đang kinh doanh</MenuItem>
                <MenuItem value='Inactive'>Ngừng kinh doanh</MenuItem>
              </Select>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Dung lượng
              </Typography>
              <Select
                fullWidth
                size='small'
                value={selectedData}
                onChange={e => {
                  setSelectedData(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả dung lượng</MenuItem>
                <MenuItem value='5GB'>5GB</MenuItem>
                <MenuItem value='10GB'>10GB</MenuItem>
                <MenuItem value='20GB'>20GB</MenuItem>
                <MenuItem value='UNL'>Không giới hạn</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Số ngày sử dụng
              </Typography>
              <Select
                fullWidth
                size='small'
                value={selectedValidity}
                onChange={e => {
                  setSelectedValidity(e.target.value)
                  setPage(1)
                }}
              >
                <MenuItem value='all'>Tất cả thời hạn</MenuItem>
                <MenuItem value='7'>7 Ngày</MenuItem>
                <MenuItem value='15'>15 Ngày</MenuItem>
                <MenuItem value='30'>30 Ngày</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }} className='flex items-end'>
              <Button
                fullWidth
                variant='tonal'
                color='secondary'
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSupplier('all')
                  setSelectedStatus('all')
                  setSelectedType('all')
                  setSelectedData('all')
                  setSelectedValidity('all')
                  setPage(1)
                }}
                startIcon={<i className='tabler-filter-off' />}
              >
                Xóa bộ lọc
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be bg-white flex justify-between items-center'>
          <Box className='flex items-center gap-3'>
            <Typography variant='h6' className='font-black'>
              Danh sách eSIM
            </Typography>
            <Chip
              label={`${filteredProducts.length} items`}
              size='small'
              color='primary'
              variant='tonal'
              className='font-bold text-[10px]'
            />
          </Box>
          <Box className='flex items-center gap-2'>
            <Typography variant='caption' className='text-slate-400 italic'>
              Cập nhật: 2 phút trước
            </Typography>
            <IconButton size='small'>
              <i className='tabler-dots-vertical' />
            </IconButton>
          </Box>
        </Box>
        <Box className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50 border-be'>
                {renderSortableHeader('country', 'Quốc gia')}
                {renderSortableHeader('supplier', 'Nguồn cung')}
                {renderSortableHeader('product', 'Sản phẩm')}
                {renderSortableHeader('type', 'Loại', 'center')}
                {renderSortableHeader('data', 'Dung lượng', 'center')}
                {renderSortableHeader('validity', 'Số ngày', 'center')}
                {renderSortableHeader('price', 'Giá (Cost/MSRP)', 'right')}
                {renderSortableHeader('status', 'Trạng thái', 'center')}
                <th className='p-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right'>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(p => (
                  <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/80 transition-all cursor-default'>
                    <td className='p-4'>
                      <Box className='flex items-center gap-2'>
                        <i className='tabler-map-pin text-[16px] text-primary' />
                        <Typography variant='body2' className='font-black text-slate-700'>
                          {p.country}
                        </Typography>
                      </Box>
                    </td>
                    <td className='p-4'>
                      <Chip
                        label={p.supplier}
                        size='small'
                        variant='tonal'
                        className='font-black text-[10px] bg-slate-100 text-slate-600 border-none'
                      />
                    </td>
                    <td className='p-4'>
                      <Box>
                        <Typography variant='body2' className='font-black text-slate-900'>
                          {p.name}
                        </Typography>
                        <Typography
                          variant='caption'
                          className='font-mono font-bold text-slate-400 uppercase text-[10px]'
                        >
                          {p.sku}
                        </Typography>
                      </Box>
                    </td>
                    <td className='p-4 text-center'>
                      <Typography
                        variant='caption'
                        className='font-black uppercase text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100'
                      >
                        {p.type}
                      </Typography>
                    </td>
                    <td className='p-4 text-center'>
                      <Typography variant='body2' className='font-black text-slate-700'>
                        {getProductDataLabel(p)}
                      </Typography>
                    </td>
                    <td className='p-4 text-center'>
                      <Typography variant='body2' className='font-black text-slate-700'>
                        {p.validity}
                      </Typography>
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex flex-col items-end'>
                        <Typography variant='body2' className='font-black text-primary'>
                          ${p.msrp.toFixed(2)}
                        </Typography>
                        <Typography variant='caption' className='text-slate-400 font-bold text-[10px]'>
                          Cost: ${p.cost.toFixed(2)}
                        </Typography>
                      </Box>
                    </td>
                    <td className='p-4 text-center'>{getStatusChip(p.status)}</td>
                    <td className='p-4 text-right'>
                      <Button
                        size='small'
                        variant='tonal'
                        color='primary'
                        className='font-black text-[11px]'
                        onClick={() => handleOpenDetail(p)}
                      >
                        Show
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className='p-20 text-center'>
                    <Box className='flex flex-col items-center gap-4 opacity-40'>
                      <i className='tabler-package-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>
                        Không tìm thấy sản phẩm nào
                      </Typography>
                      <Button variant='tonal' size='small' onClick={() => setSearchTerm('')}>
                        Xóa bộ lọc tìm kiếm
                      </Button>
                    </Box>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
        <Box className='p-5 border-ts bg-slate-50/30 flex justify-between items-center'>
          <Typography variant='caption' className='text-slate-500 font-medium italic'>
            <i className='tabler-info-circle mis-1 inline-block align-middle' /> Giá gốc được đồng bộ theo thời gian
            thực từ API Upstream.
          </Typography>
          <Pagination
            count={Math.ceil(sortedProducts.length / pageSize)}
            page={page}
            onChange={(_, v) => setPage(v)}
            color='primary'
            shape='rounded'
            size='small'
          />
        </Box>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h5' className='font-black'>
              Chi tiết Gói cước: {selectedProduct?.name}
            </Typography>
            <Typography variant='caption' className='text-slate-400 uppercase font-bold tracking-widest'>
              Thông tin cấu hình hệ thống & Quản trị
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenDialog(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          {selectedProduct && (
            <Stack spacing={6} className='mbs-2'>
              {/* Header Info Block */}
              <Box className='p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden'>
                <Box className='relative z-10 flex justify-between items-center'>
                  <Box>
                    <Box className='flex items-center gap-2 mbe-1'>
                      <i className='tabler-map-pin text-primary' />
                      <Typography variant='subtitle1' className='text-white font-black'>
                        {selectedProduct.country}
                      </Typography>
                    </Box>
                    <Typography variant='h4' className='text-white font-black mbe-2'>
                      {selectedProduct.name}
                    </Typography>
                    <Chip
                      label={selectedProduct.sku}
                      size='small'
                      className='bg-white/20 text-white font-mono border-none font-bold'
                    />
                  </Box>
                  <Box className='text-right'>
                    <Typography variant='caption' className='text-slate-400 font-bold uppercase block'>
                      Trạng thái hiện tại
                    </Typography>
                    <Chip
                      label={selectedProduct.status === 'Active' ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
                      color={selectedProduct.status === 'Active' ? 'success' : 'default'}
                      size='small'
                      className='font-black'
                    />
                  </Box>
                </Box>
                <i className='tabler-world absolute -right-6 -bottom-6 text-9xl text-white/5 rotate-12' />
              </Box>

              <Grid2 container spacing={6}>
                {/* Technical Section */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant='subtitle2'
                    className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'
                  >
                    Thông số Kỹ thuật
                  </Typography>
                  <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 4 }}>
                      <Box className='p-3 rounded-xl bg-slate-50 border border-slate-100 text-center'>
                        <i className='tabler-signal-4g text-primary text-xl mbe-1' />
                        <Typography variant='caption' className='block text-slate-400 uppercase font-bold text-[9px]'>
                          Loại
                        </Typography>
                        <Typography variant='body2' className='font-black'>
                          {selectedProduct.type}
                        </Typography>
                      </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 4 }}>
                      <Box className='p-3 rounded-xl bg-slate-50 border border-slate-100 text-center'>
                        <i className='tabler-database text-primary text-xl mbe-1' />
                        <Typography variant='caption' className='block text-slate-400 uppercase font-bold text-[9px]'>
                          Dung lượng
                        </Typography>
                        <Typography variant='body2' className='font-black'>
                          {getProductDataLabel(selectedProduct)}
                        </Typography>
                      </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 4 }}>
                      <Box className='p-3 rounded-xl bg-slate-50 border border-slate-100 text-center'>
                        <i className='tabler-calendar text-primary text-xl mbe-1' />
                        <Typography variant='caption' className='block text-slate-400 uppercase font-bold text-[9px]'>
                          Thời hạn
                        </Typography>
                        <Typography variant='body2' className='font-black'>
                          {selectedProduct.validity}
                        </Typography>
                      </Box>
                    </Grid2>
                  </Grid2>

                  <Box className='mts-6'>
                    <Typography variant='subtitle2' className='font-black mbe-3'>
                      Mô tả hiển thị (Agent View)
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue={`Gói cước eSIM cao cấp tại ${selectedProduct.country}. Hỗ trợ hạ tầng mạng ${selectedProduct.supplier} tốc độ cao, hỗ trợ Hotspot và Roaming ổn định.`}
                      placeholder='Nhập mô tả cho đại lý...'
                    />
                  </Box>
                </Grid2>

                {/* Financial Section */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant='subtitle2'
                    className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'
                  >
                    Thông tin Nguồn cung
                  </Typography>
                  <Stack spacing={4}>
                    <Box className='p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center'>
                      <Box>
                        <Typography variant='caption' className='block text-slate-400 font-bold uppercase text-[9px]'>
                          Nhà cung cấp (NCC)
                        </Typography>
                        <Typography variant='body1' className='font-black'>
                          {selectedProduct.supplier}
                        </Typography>
                      </Box>
                      <Box className='text-right'>
                        <Typography variant='caption' className='block text-slate-400 font-bold uppercase text-[9px]'>
                          Giá Cost (Nhập)
                        </Typography>
                        <Typography variant='h5' className='font-black text-slate-400'>
                          ${selectedProduct.cost.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center'>
                      <Box>
                        <Typography variant='caption' className='block text-slate-400 font-bold uppercase text-[9px]'>
                          Tồn kho khả dụng
                        </Typography>
                        <Typography variant='body1' className='font-black'>
                          {selectedProduct.stock.toLocaleString()} units
                        </Typography>
                      </Box>
                      <i className='tabler-barcode text-slate-300 text-2xl' />
                    </Box>

                    <Box className='p-4 rounded-xl bg-primary/5 border border-dashed border-primary/20 flex items-center gap-3'>
                      <i className='tabler-info-circle text-primary text-xl' />
                      <Typography variant='caption' className='text-slate-600 font-medium'>
                        Thông tin giá gốc được đồng bộ trực tiếp từ hệ thống của{' '}
                        <strong>{selectedProduct.supplier}</strong>.
                      </Typography>
                    </Box>
                  </Stack>
                </Grid2>
              </Grid2>

              <Box className='p-5 bg-slate-50 rounded-xl border border-slate-100'>
                <Typography
                  variant='subtitle2'
                  className='font-black mbe-2 uppercase text-[10px] text-slate-500 tracking-widest'
                >
                  Mô tả hiển thị (Agent Store)
                </Typography>
                <Typography variant='body2' className='text-slate-600 leading-relaxed italic'>
                  "Gói cước eSIM cao cấp tại {selectedProduct.country}. Hỗ trợ hạ tầng mạng {selectedProduct.supplier}{' '}
                  tốc độ cao, hỗ trợ Hotspot và Roaming ổn định."
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button
            fullWidth
            variant='tonal'
            color='secondary'
            onClick={() => setOpenDialog(false)}
            className='font-black'
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openImportDialog} onClose={handleCloseImport} maxWidth='lg' fullWidth>
        <DialogTitle className='font-black flex items-center justify-between border-be'>
          <Box>
            <Typography variant='h5' className='font-black'>
              Quy trình Đồng bộ Báo giá
            </Typography>
            <Typography variant='caption' className='text-slate-500'>
              Upload file → Đồng bộ API → Kiểm định & phê duyệt
            </Typography>
          </Box>
          <IconButton size='small' onClick={handleCloseImport}>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='flex flex-col gap-6 p-6 pt-6'>
          <Card className='border-none shadow-none bg-slate-50'>
            <CardContent className='py-5'>
              <Stepper activeStep={importStep} alternativeLabel>
                {IMPORT_STEPS.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {importStep === 0 && (
            <Stack spacing={5}>
              <Box className='text-center flex flex-col items-center'>
                <Avatar variant='rounded' className='w-16 h-16 bg-primary/10 text-primary mbe-4'>
                  <i className='tabler-file-spreadsheet text-4xl' />
                </Avatar>
                <Typography variant='h5' className='font-black mbe-1'>
                  Bước 1: Tải lên Báo giá Excel
                </Typography>
                <Typography variant='body2' className='text-slate-500 max-is-[600px]'>
                  Chọn nhà cung cấp và tải file .xlsx báo giá. Hệ thống sẽ đọc cột tiêu đề ở dòng đầu để ánh xạ vào danh
                  mục eSIM.
                </Typography>
              </Box>

              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 5 }}>
                  <Typography variant='subtitle2' className='font-black mbe-2'>
                    Nhà cung cấp <span className='text-error'>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    size='small'
                    displayEmpty
                    value={importSupplier}
                    onChange={e => setImportSupplier(e.target.value)}
                  >
                    <MenuItem value='' disabled>
                      Chọn nhà cung cấp
                    </MenuItem>
                    {SUPPLIER_OPTIONS.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 7 }}>
                  <Typography variant='subtitle2' className='font-black mbe-2'>
                    File báo giá <span className='text-error'>*</span>
                  </Typography>
                  <Box
                    className='rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-5 cursor-pointer hover:bg-primary/10 transition-colors'
                    onClick={() => importInputRef.current?.click()}
                  >
                    <Stack direction='row' spacing={3} alignItems='center'>
                      <Avatar variant='rounded' className='bg-primary/10 text-primary'>
                        <i className='tabler-paperclip' />
                      </Avatar>
                      <Box className='min-w-0 flex-1'>
                        <Typography variant='body2' className='font-bold truncate'>
                          {importFile ? importFile.name : 'Click để chọn hoặc kéo thả file .xlsx'}
                        </Typography>
                        <Typography variant='caption' className='text-slate-500'>
                          Hỗ trợ .xlsx (tối đa 10MB)
                        </Typography>
                      </Box>
                      <Button variant='outlined' size='small'>
                        Chọn file
                      </Button>
                    </Stack>
                    <input
                      ref={importInputRef}
                      hidden
                      type='file'
                      accept='.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      onChange={event => handleImportFileChange(event.target.files?.[0] ?? null)}
                    />
                  </Box>
                </Grid2>
              </Grid2>

              {importPreview && (
                <Box className='p-4 bg-success/5 rounded-lg border border-success/30'>
                  <Typography variant='subtitle2' className='font-black text-success mbe-1'>
                    Đã đọc {importPreview.rows} dòng dữ liệu
                  </Typography>
                  <Typography variant='caption' className='text-slate-600 block mbe-2'>
                    Cột nhận diện: {importPreview.headers.length}
                  </Typography>
                  <Box className='flex flex-wrap gap-1'>
                    {importPreview.headers.slice(0, 12).map(h => (
                      <Chip key={h} label={h} size='small' variant='tonal' color='primary' className='font-bold' />
                    ))}
                    {importPreview.headers.length > 12 && (
                      <Chip
                        label={`+${importPreview.headers.length - 12}`}
                        size='small'
                        variant='tonal'
                        color='secondary'
                        className='font-bold'
                      />
                    )}
                  </Box>
                </Box>
              )}

              {importError && (
                <Box className='p-3 bg-error/10 text-error rounded-lg flex items-center gap-2'>
                  <i className='tabler-alert-circle' />
                  <Typography variant='body2' color='error' className='font-medium'>
                    {importError}
                  </Typography>
                </Box>
              )}
            </Stack>
          )}

          {importStep === 1 && (
            <Box className='text-center flex flex-col items-center py-10'>
              <Avatar variant='rounded' className='w-16 h-16 bg-info/10 text-info mbe-4'>
                <i className='tabler-api text-4xl' />
              </Avatar>
              <Typography variant='h5' className='font-black mbe-1'>
                Bước 2: Đồng bộ từ API {importSupplier}
              </Typography>
              <Typography variant='body2' className='text-slate-500 max-is-[600px] mbe-6'>
                Đã nhận diện file báo giá ({importPreview?.rows ?? 0} dòng). Hệ thống sẽ gọi API NCC để lấy danh sách
                eSIM thực tế và đối chiếu giá.
              </Typography>
              <Button
                variant='contained'
                size='large'
                startIcon={<i className='tabler-refresh' />}
                onClick={handleImportStepSync}
              >
                Bắt đầu Đồng bộ API ngay
              </Button>
            </Box>
          )}

          {importStep === 2 && (
            <Stack spacing={4}>
              <Alert severity='warning'>
                <AlertTitle className='font-black'>Phát hiện gói cước cần xử lý</AlertTitle>
                Dữ liệu từ API và File đã được gộp. Vui lòng kiểm tra các dòng màu đỏ/vàng trước khi duyệt.
              </Alert>
              <Card className='border border-slate-200 shadow-none overflow-hidden'>
                <Box className='p-4 bg-slate-900 text-white'>
                  <Typography variant='subtitle1' className='text-white font-black'>
                    Bảng Kiểm Định & So Sánh Giá
                  </Typography>
                  <Typography variant='caption' className='text-slate-400 font-bold'>
                    Dữ liệu chuẩn hóa từ File & API mới nhất
                  </Typography>
                </Box>
                <TableContainer>
                  <Table size='small'>
                    <TableHead className='bg-slate-50'>
                      <TableRow>
                        <TableCell className='font-black uppercase text-[11px]'>Mã gói</TableCell>
                        <TableCell className='font-black uppercase text-[11px]'>Tên eSIM</TableCell>
                        <TableCell className='font-black uppercase text-[11px] text-right'>Giá Vốn</TableCell>
                        <TableCell className='font-black uppercase text-[11px] text-center'>Kiểm định</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {validationResults.map(res => (
                        <TableRow key={res.id} hover>
                          <TableCell className='font-mono text-xs'>{res.id}</TableCell>
                          <TableCell className='font-bold'>{res.name}</TableCell>
                          <TableCell className='text-right font-black text-primary'>${res.cost.toFixed(2)}</TableCell>
                          <TableCell className='text-center'>
                            <Chip
                              label={res.status}
                              size='small'
                              color={res.status === 'Valid' ? 'success' : res.status === 'Error' ? 'error' : 'warning'}
                              variant='tonal'
                              className='font-black'
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Stack>
          )}

          {importStep === 3 && (
            <Box className='text-center flex flex-col items-center py-10'>
              <Avatar className='w-20 h-20 bg-success/10 text-success mbe-4'>
                <i className='tabler-shield-check text-5xl' />
              </Avatar>
              <Typography variant='h4' className='font-black mbe-1 text-success'>
                Phê duyệt Hoàn tất
              </Typography>
              <Typography variant='body1' className='text-slate-500 max-is-[600px]'>
                Báo giá từ {importSupplier} đã được niêm yết vào danh mục eSIM Market.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0 border-bs'>
          {importStep === 0 && (
            <>
              <Button variant='outlined' color='secondary' onClick={handleCloseImport}>
                Hủy
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<i className='tabler-arrow-right' />}
                onClick={handleImportStepUpload}
                disabled={!importSupplier || !importPreview}
              >
                Tiếp tục
              </Button>
            </>
          )}
          {importStep === 1 && (
            <Button variant='outlined' color='secondary' onClick={handleCloseImport}>
              Hủy
            </Button>
          )}
          {importStep === 2 && (
            <>
              <Button variant='outlined' color='secondary' onClick={() => setImportStep(1)}>
                Quay lại
              </Button>
              <Button
                variant='contained'
                color='success'
                startIcon={<i className='tabler-check' />}
                onClick={handleImportStepCommit}
              >
                Phê duyệt & Nhập danh mục
              </Button>
            </>
          )}
          {importStep === 3 && (
            <Button variant='contained' color='primary' onClick={handleCloseImport}>
              Đóng
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={importProcessing}>
        <DialogContent className='p-10 flex flex-col items-center gap-3'>
          <CircularProgress size={48} thickness={4} />
          <Typography variant='subtitle1' className='font-black'>
            Đang chuẩn hóa dữ liệu...
          </Typography>
          <Typography variant='caption' className='text-slate-500'>
            Vui lòng đợi trong giây lát
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AdminProductCatalog
