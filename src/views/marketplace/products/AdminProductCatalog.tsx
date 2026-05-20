'use client'

import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
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
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Popover from '@mui/material/Popover'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import Link from 'next/link'

import PageHeader from '@/components/layout/shared/PageHeader'

type ProductStatus = 'ACTIVE' | 'PAUSED' | 'REMOVED'
type ProductSaleStatus = 'OPEN_FOR_SALE' | 'NOT_FOR_SALE'

type Product = {
  id: string
  sku: string
  name: string
  country: string
  region: string
  supplier: string
  cost: number
  currency: string
  convertedCost: number
  convertedCurrency: string
  msrp: number
  status: ProductStatus
  saleStatus: ProductSaleStatus
  stock: number
  type: 'Total' | 'Daily'
  validity: string
}

type SortKey =
  | 'country'
  | 'supplier'
  | 'product'
  | 'type'
  | 'data'
  | 'validity'
  | 'price'
  | 'currency'
  | 'convertedPrice'
  | 'convertedCurrency'
  | 'status'
type SortDirection = 'asc' | 'desc'
type PendingSaleStatusAction = {
  productId: string
  productName: string
  nextSaleStatus: ProductSaleStatus
}

const products: Product[] = [
  { id: 'P001', sku: 'JP-30D-10GB', name: 'Nhật Bản Siêu Tốc', country: 'Nhật Bản', region: 'Châu Á', supplier: 'Singtel', cost: 8.5, currency: 'USD', convertedCost: 215000, convertedCurrency: 'VND', msrp: 12.5, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 450, type: 'Total', validity: '30 Ngày' },
  { id: 'P002', sku: 'EU-15D-5GB', name: 'Roaming Châu Âu', country: 'Châu Âu', region: 'Châu Âu', supplier: 'Orange FR', cost: 6.2, currency: 'USD', convertedCost: 157000, convertedCurrency: 'VND', msrp: 9, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 1200, type: 'Daily', validity: '15 Ngày' },
  { id: 'P003', sku: 'US-30D-20GB', name: 'Mỹ Không giới hạn', country: 'Hoa Kỳ', region: 'Châu Mỹ', supplier: 'T-Mobile', cost: 15, currency: 'USD', convertedCost: 380000, convertedCurrency: 'VND', msrp: 22, status: 'PAUSED', saleStatus: 'NOT_FOR_SALE', stock: 0, type: 'Total', validity: '30 Ngày' },
  { id: 'P004', sku: 'TH-07D-UNL', name: 'Thái Lan Travel', country: 'Thái Lan', region: 'Châu Á', supplier: 'AIS', cost: 4.2, currency: 'USD', convertedCost: 106000, convertedCurrency: 'VND', msrp: 6.2, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 85, type: 'Daily', validity: '7 Ngày' },
  { id: 'P005', sku: 'VN-30D-20GB', name: 'Viettel 4G Local', country: 'Việt Nam', region: 'Châu Á', supplier: 'Viettel', cost: 3.5, currency: 'USD', convertedCost: 88500, convertedCurrency: 'VND', msrp: 5.5, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 2500, type: 'Total', validity: '30 Ngày' },
  { id: 'P006', sku: 'SG-30D-15GB', name: 'Singapore Premium', country: 'Singapore', region: 'Châu Á', supplier: 'airalo', cost: 9.0, currency: 'USD', convertedCost: 228000, convertedCurrency: 'VND', msrp: 13.5, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 320, type: 'Total', validity: '30 Ngày' },
  { id: 'P007', sku: 'KR-15D-UNL', name: 'Hàn Quốc Unlimited', country: 'Hàn Quốc', region: 'Châu Á', supplier: 'airalo', cost: 11.0, currency: 'USD', convertedCost: 278000, convertedCurrency: 'VND', msrp: 16.0, status: 'ACTIVE', saleStatus: 'OPEN_FOR_SALE', stock: 180, type: 'Daily', validity: '15 Ngày' },
  { id: 'P008', sku: 'AU-30D-10GB', name: 'Úc Explorer', country: 'Úc', region: 'Châu Đại Dương', supplier: 'nomad', cost: 12.0, currency: 'USD', convertedCost: 304000, convertedCurrency: 'VND', msrp: 18.0, status: 'ACTIVE', saleStatus: 'NOT_FOR_SALE', stock: 95, type: 'Total', validity: '30 Ngày' }
]

const SUPPLIERS = [...new Set(products.map(p => p.supplier))]
const TYPES = ['Total', 'Daily'] as const
const COUNTRIES = [...new Set(products.map(p => p.country))]
const REGIONS = [...new Set(products.map(p => p.region))]
const CURRENCIES = [...new Set(products.map(p => p.currency))]
const CONVERTED_CURRENCIES = [...new Set(products.map(p => p.convertedCurrency))]
const SALE_STATUSES: ProductSaleStatus[] = ['OPEN_FOR_SALE', 'NOT_FOR_SALE']

const formatMoneyWithUnit = (amount: number, currency: string) => {
  if (currency === 'VND') {
    return `${amount.toLocaleString('en-US')} đ`
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2
    }).format(amount)
  } catch {
    return `${amount.toLocaleString('en-US')} ${currency}`
  }
}

const getStatusLabel = (status: ProductStatus) => {
  if (status === 'ACTIVE') return 'Hoạt động'
  if (status === 'PAUSED') return 'Tạm dừng'
  return 'Đã gỡ'
}

const getStatusChipColor = (status: ProductStatus): 'success' | 'warning' | 'default' => {
  if (status === 'ACTIVE') return 'success'
  if (status === 'PAUSED') return 'warning'
  return 'default'
}

const getSaleStatusLabel = (saleStatus: ProductSaleStatus) =>
  saleStatus === 'OPEN_FOR_SALE' ? 'Mở bán' : 'Chưa bán'

const getSaleStatusChipColor = (saleStatus: ProductSaleStatus): 'info' | 'default' =>
  saleStatus === 'OPEN_FOR_SALE' ? 'info' : 'default'

const getProductDataLabel = (product: Product) => {
  if (product.sku.includes('UNL') || product.name.includes('giới hạn')) return 'Unlimited'
  return product.sku.split('-').pop() ?? ''
}

const getSortValue = (product: Product, sortKey: SortKey): string | number => {
  switch (sortKey) {
    case 'country': return product.country
    case 'supplier': return product.supplier
    case 'product': return `${product.name} ${product.sku}`
    case 'type': return product.type
    case 'data': return getProductDataLabel(product)
    case 'validity': return Number.parseInt(product.validity, 10)
    case 'price': return product.cost
    case 'currency': return product.currency
    case 'convertedPrice': return product.convertedCost
    case 'convertedCurrency': return product.convertedCurrency
    case 'status': return getStatusLabel(product.status)
  }
}

const MultiSelectDropdown = ({
  label,
  options,
  value,
  onChange
}: {
  label: string
  options: { value: string; label: string }[]
  value: string[]
  onChange: (v: string[]) => void
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const isActive = value.length > 0

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        onClick={e => setAnchor(e.currentTarget)}
        endIcon={<i className='tabler-chevron-down text-[11px]' />}
        sx={{
          width: '100%',
          height: 38,
          justifyContent: 'space-between',
          borderColor: isActive ? 'primary.main' : 'divider',
          color: isActive ? 'primary.main' : 'text.secondary',
          fontWeight: 500,
          fontSize: '0.8125rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          px: 1.5
        }}
      >
        {label}{isActive ? ` (${value.length})` : ''}
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { minWidth: 200, mt: 0.5, boxShadow: 3 } }}
      >
        {options.map(opt => (
          <MenuItem
            key={opt.value}
            dense
            onClick={() =>
              onChange(value.includes(opt.value) ? value.filter(v => v !== opt.value) : [...value, opt.value])
            }
            sx={{ gap: 0.5 }}
          >
            <Checkbox size='small' checked={value.includes(opt.value)} disableRipple sx={{ p: 0.5 }} />
            <Typography variant='body2'>{opt.label}</Typography>
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

const AdminProductCatalog = () => {
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>(() => {
    const id = searchParams.get('supplierId')
    return id && id !== 'all' ? [id] : []
  })
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])
  const [selectedConvertedCurrencies, setSelectedConvertedCurrencies] = useState<string[]>([])
  const [selectedSaleStatuses, setSelectedSaleStatuses] = useState<string[]>([])
  const [costMin, setCostMin] = useState('')
  const [costMax, setCostMax] = useState('')
  const [convertedCostMin, setConvertedCostMin] = useState('')
  const [convertedCostMax, setConvertedCostMax] = useState('')
  const [pendingTypes, setPendingTypes] = useState<string[]>([])
  const [pendingCountries, setPendingCountries] = useState<string[]>([])
  const [pendingRegions, setPendingRegions] = useState<string[]>([])
  const [pendingCurrencies, setPendingCurrencies] = useState<string[]>([])
  const [pendingConvertedCurrencies, setPendingConvertedCurrencies] = useState<string[]>([])
  const [pendingSaleStatuses, setPendingSaleStatuses] = useState<string[]>([])
  const [pendingCostMin, setPendingCostMin] = useState('')
  const [pendingCostMax, setPendingCostMax] = useState('')
  const [pendingConvertedCostMin, setPendingConvertedCostMin] = useState('')
  const [pendingConvertedCostMax, setPendingConvertedCostMax] = useState('')

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [pendingSaleStatusAction, setPendingSaleStatusAction] = useState<PendingSaleStatusAction | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('product')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [saleStatusMap, setSaleStatusMap] = useState<Record<string, ProductSaleStatus>>(
    () => Object.fromEntries(products.map(p => [p.id, p.saleStatus]))
  )

  const advancedFilterCount =
    selectedTypes.length +
    selectedCountries.length +
    selectedRegions.length +
    selectedCurrencies.length +
    selectedConvertedCurrencies.length +
    selectedSaleStatuses.length +
    (costMin ? 1 : 0) +
    (costMax ? 1 : 0) +
    (convertedCostMin ? 1 : 0) +
    (convertedCostMax ? 1 : 0)

  const hasAnyFilter =
    searchTerm || selectedSuppliers.length > 0 || selectedStatuses.length > 0 || advancedFilterCount > 0

  const getCurrentSaleStatus = useCallback(
    (product: Product) => saleStatusMap[product.id] ?? product.saleStatus,
    [saleStatusMap]
  )

  const handleRequestSaleStatusChange = (product: Product) => {
    const currentSaleStatus = getCurrentSaleStatus(product)
    setPendingSaleStatusAction({
      productId: product.id,
      productName: product.name,
      nextSaleStatus: currentSaleStatus === 'OPEN_FOR_SALE' ? 'NOT_FOR_SALE' : 'OPEN_FOR_SALE'
    })
  }

  const handleConfirmSaleStatusChange = () => {
    if (pendingSaleStatusAction === null) return

    const { productId, nextSaleStatus } = pendingSaleStatusAction
    setSaleStatusMap(prev => ({ ...prev, [productId]: nextSaleStatus }))
    setPendingSaleStatusAction(null)
    toast.success(nextSaleStatus === 'OPEN_FOR_SALE' ? 'Đã mở bán eSIM' : 'Đã chuyển eSIM về chưa bán')
  }

  const handleOpenAdvanced = () => {
    setPendingTypes(selectedTypes)
    setPendingCountries(selectedCountries)
    setPendingRegions(selectedRegions)
    setPendingCurrencies(selectedCurrencies)
    setPendingConvertedCurrencies(selectedConvertedCurrencies)
    setPendingSaleStatuses(selectedSaleStatuses)
    setPendingCostMin(costMin)
    setPendingCostMax(costMax)
    setPendingConvertedCostMin(convertedCostMin)
    setPendingConvertedCostMax(convertedCostMax)
    setAdvancedOpen(true)
  }

  const handleApplyAdvanced = () => {
    if (pendingCostMin && pendingCostMax && Number(pendingCostMin) > Number(pendingCostMax)) {
      toast.error('Giá vốn đến phải lớn hơn hoặc bằng giá vốn từ')
      return
    }
    if (
      pendingConvertedCostMin &&
      pendingConvertedCostMax &&
      Number(pendingConvertedCostMin) > Number(pendingConvertedCostMax)
    ) {
      toast.error('Giá vốn quy đổi đến phải lớn hơn hoặc bằng giá vốn quy đổi từ')
      return
    }

    setSelectedTypes(pendingTypes)
    setSelectedCountries(pendingCountries)
    setSelectedRegions(pendingRegions)
    setSelectedCurrencies(pendingCurrencies)
    setSelectedConvertedCurrencies(pendingConvertedCurrencies)
    setSelectedSaleStatuses(pendingSaleStatuses)
    setCostMin(pendingCostMin)
    setCostMax(pendingCostMax)
    setConvertedCostMin(pendingConvertedCostMin)
    setConvertedCostMax(pendingConvertedCostMax)
    setPage(1)
    setAdvancedOpen(false)
  }

  const handleResetAll = () => {
    setSearchTerm('')
    setSelectedSuppliers([])
    setSelectedStatuses([])
    setSelectedTypes([])
    setSelectedCountries([])
    setSelectedRegions([])
    setSelectedCurrencies([])
    setSelectedConvertedCurrencies([])
    setSelectedSaleStatuses([])
    setCostMin('')
    setCostMax('')
    setConvertedCostMin('')
    setConvertedCostMax('')
    setPage(1)
  }

  const filteredProducts = useMemo(
    () =>
      products.filter(p => {
        const matchSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        const matchSupplier = selectedSuppliers.length === 0 || selectedSuppliers.includes(p.supplier)
        const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(p.status)
        const matchType = selectedTypes.length === 0 || selectedTypes.includes(p.type)
        const matchCountry = selectedCountries.length === 0 || selectedCountries.includes(p.country)
        const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(p.region)
        const matchCurrency = selectedCurrencies.length === 0 || selectedCurrencies.includes(p.currency)
        const matchConvertedCurrency =
          selectedConvertedCurrencies.length === 0 || selectedConvertedCurrencies.includes(p.convertedCurrency)
        const matchSaleStatus =
          selectedSaleStatuses.length === 0 || selectedSaleStatuses.includes(getCurrentSaleStatus(p))
        const matchCostMin = !costMin || p.cost >= Number(costMin)
        const matchCostMax = !costMax || p.cost <= Number(costMax)
        const matchConvertedCostMin = !convertedCostMin || p.convertedCost >= Number(convertedCostMin)
        const matchConvertedCostMax = !convertedCostMax || p.convertedCost <= Number(convertedCostMax)
        return (
          matchSearch &&
          matchSupplier &&
          matchStatus &&
          matchType &&
          matchCountry &&
          matchRegion &&
          matchCurrency &&
          matchConvertedCurrency &&
          matchSaleStatus &&
          matchCostMin &&
          matchCostMax &&
          matchConvertedCostMin &&
          matchConvertedCostMax
        )
      }),
    [
      searchTerm,
      selectedSuppliers,
      selectedStatuses,
      selectedTypes,
      selectedCountries,
      selectedRegions,
      selectedCurrencies,
      selectedConvertedCurrencies,
      selectedSaleStatuses,
      costMin,
      costMax,
      convertedCostMin,
      convertedCostMax,
      getCurrentSaleStatus
    ]
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
      'Giá vốn': formatMoneyWithUnit(product.cost, product.currency),
      'Loại tiền tệ': product.currency,
      'Giá vốn quy đổi': formatMoneyWithUnit(product.convertedCost, product.convertedCurrency),
      'Loại tiền quy đổi': product.convertedCurrency,
      'Tồn kho': product.stock,
      'Trạng thái': getStatusLabel(product.status),
      'Trạng thái mở bán': getSaleStatusLabel(getCurrentSaleStatus(product))
    }))
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh mục eSIM')
    XLSX.writeFile(workbook, `danh-muc-esim-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <i className='tabler-arrows-sort text-[12px] text-slate-300' />
    return <i className={`tabler-arrow-${sortDirection === 'asc' ? 'up' : 'down'} text-[12px] text-primary`} />
  }

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      type='button'
      className='inline-flex items-center gap-1 cursor-pointer border-0 bg-transparent p-0 font-semibold uppercase tracking-normal text-slate-500 text-[11px]'
      onClick={() => handleSort(col)}
    >
      {label}
      {renderSortIcon(col)}
    </button>
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
              component={Link}
              href='/3m/upstream/import'
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

      {/* Filter bar */}
      <Card
        className='border-none shadow-sm mbe-4'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.06)' }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid2 container spacing={3} alignItems='flex-end'>
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                size='small'
                placeholder='Tìm tên sản phẩm, dung lượng, nguồn cung...'
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

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Nhà cung cấp
              </Typography>
              <MultiSelectDropdown
                label='Tất cả nguồn cung'
                options={SUPPLIERS.map(s => ({ value: s, label: s }))}
                value={selectedSuppliers}
                onChange={v => {
                  setSelectedSuppliers(v)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
              <Typography variant='caption' className='block font-black uppercase text-slate-500 mbe-1'>
                Trạng thái
              </Typography>
              <MultiSelectDropdown
                label='Tất cả trạng thái'
                options={[
                  { value: 'ACTIVE', label: 'Hoạt động' },
                  { value: 'PAUSED', label: 'Tạm dừng' },
                  { value: 'REMOVED', label: 'Đã gỡ' }
                ]}
                value={selectedStatuses}
                onChange={v => {
                  setSelectedStatuses(v)
                  setPage(1)
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.8 }}>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                startIcon={<i className='tabler-adjustments-horizontal text-[14px]' />}
                onClick={handleOpenAdvanced}
                sx={{
                  height: 38,
                  borderColor: advancedFilterCount > 0 ? 'primary.main' : 'divider',
                  color: advancedFilterCount > 0 ? 'primary.main' : 'text.secondary',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  textTransform: 'none'
                }}
              >
                Nâng cao
                {advancedFilterCount > 0 ? (
                  <Chip
                    label={advancedFilterCount}
                    size='small'
                    color='primary'
                    variant='tonal'
                    sx={{ ml: 1, height: 18, minWidth: 18, fontSize: 10, fontWeight: 700 }}
                  />
                ) : null}
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 2, lg: 1.4 }}>
              <Button
                fullWidth
                variant='tonal'
                color='secondary'
                size='small'
                onClick={handleResetAll}
                disabled={!hasAnyFilter}
                startIcon={<i className='tabler-rotate-2 text-[14px]' />}
                sx={{ height: 38, fontWeight: 700, fontSize: '0.8125rem', textTransform: 'none' }}
              >
                Đặt lại
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      {/* Table */}
      <Card
        className='border-none shadow-sm overflow-hidden mbe-6'
        sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.1)' }}
      >
        <Box className='px-5 py-2 border-be bg-white flex justify-between items-center'>
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
        </Box>

        <Box sx={{ position: 'relative', height: 'calc(100dvh - 24rem)', minHeight: 360, maxHeight: 640, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 1780, borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 220, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' }}>
                  <SortBtn col='product' label='Sản phẩm' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 120 }}>
                  <SortBtn col='country' label='Quốc gia' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 120 }}>
                  <SortBtn col='supplier' label='Nguồn cung' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 90, textAlign: 'center' }}>
                  <SortBtn col='type' label='Loại' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 100, textAlign: 'center' }}>
                  <SortBtn col='data' label='Dung lượng' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 90, textAlign: 'center' }}>
                  <SortBtn col='validity' label='Số ngày' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 160, textAlign: 'right' }}>
                  <SortBtn col='price' label='Giá vốn' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 130, textAlign: 'center' }}>
                  <SortBtn col='currency' label='Loại tiền tệ' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 170, textAlign: 'right' }}>
                  <SortBtn col='convertedPrice' label='Giá vốn quy đổi' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 150, textAlign: 'center' }}>
                  <SortBtn col='convertedCurrency' label='Loại tiền quy đổi' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 110, textAlign: 'center' }}>
                  <SortBtn col='status' label='Trạng thái' />
                </TableCell>
                <TableCell sx={{ bgcolor: 'grey.100', minWidth: 100, textAlign: 'center' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Mở bán</span>
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, zIndex: 4, bgcolor: 'grey.100', minWidth: 120, textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.06)' }}>
                  <span className='font-semibold uppercase tracking-normal text-slate-500 text-[11px]'>Hành động</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(p => (
                  <TableRow key={p.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: '2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Box>
                        <Typography variant='body2' className='font-black text-slate-900'>
                          {p.name}
                        </Typography>
                        <Typography variant='caption' className='font-mono font-bold text-slate-400 uppercase text-[10px]'>
                          {p.sku}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className='flex items-center gap-1.5'>
                        <i className='tabler-map-pin text-[14px] text-primary' />
                        <Typography variant='body2' className='font-bold text-slate-700'>
                          {p.country}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={p.supplier}
                        size='small'
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem', bgcolor: 'grey.100', color: 'text.secondary', border: 'none' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={p.type}
                        size='small'
                        variant='tonal'
                        color={p.type === 'Daily' ? 'info' : 'secondary'}
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant='body2' className='font-black text-slate-700'>
                        {getProductDataLabel(p)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant='body2' className='font-black text-slate-700'>
                        {p.validity}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatMoneyWithUnit(p.cost, p.currency)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant='caption' className='font-bold text-slate-500'>
                        {p.currency}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant='body2' sx={{ fontWeight: 700, color: 'success.main' }}>
                        {formatMoneyWithUnit(p.convertedCost, p.convertedCurrency)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant='caption' className='font-bold text-slate-500'>
                        {p.convertedCurrency}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getStatusLabel(p.status)}
                        size='small'
                        color={getStatusChipColor(p.status)}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={getSaleStatusLabel(getCurrentSaleStatus(p))}
                        size='small'
                        color={getSaleStatusChipColor(getCurrentSaleStatus(p))}
                        variant='tonal'
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ position: 'sticky', right: 0, zIndex: 1, bgcolor: 'background.paper', textAlign: 'center', boxShadow: '-2px 0 4px rgba(0,0,0,0.04)' }}>
                      <Stack direction='row' justifyContent='center' spacing={0.5}>
                        <Tooltip title={getCurrentSaleStatus(p) === 'OPEN_FOR_SALE' ? 'Chuyển sang chưa bán' : 'Mở bán'}>
                          <IconButton
                            size='small'
                            color={getCurrentSaleStatus(p) === 'OPEN_FOR_SALE' ? 'default' : 'success'}
                            onClick={() => handleRequestSaleStatusChange(p)}
                          >
                            <i className={getCurrentSaleStatus(p) === 'OPEN_FOR_SALE' ? 'tabler-ban text-[16px]' : 'tabler-shopping-cart text-[16px]'} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Lịch sử giá'>
                          <IconButton
                            size='small'
                            onClick={() => toast.info('Lịch sử giá — tính năng đang phát triển')}
                          >
                            <i className='tabler-history text-[16px]' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Xem chi tiết'>
                          <IconButton size='small' color='primary' onClick={() => handleOpenDetail(p)}>
                            <i className='tabler-eye text-[16px]' />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Box className='flex flex-col items-center gap-4 opacity-40 py-20'>
                      <i className='tabler-package-off text-[64px]' />
                      <Typography variant='h6' className='font-black'>
                        Không tìm thấy sản phẩm nào
                      </Typography>
                      <Button variant='tonal' size='small' onClick={handleResetAll}>
                        Xóa bộ lọc
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box className='p-5 border-ts bg-slate-50/30 flex justify-between items-center'>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='caption' className='text-slate-500'>
              Hiển thị
            </Typography>
            <Select
              size='small'
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
              sx={{ fontSize: '0.75rem', minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
            <Typography variant='caption' className='text-slate-500'>
              hàng / trang
            </Typography>
          </Stack>
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

      {/* Advanced filter dialog */}
      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle component='div' className='flex justify-between items-center border-be p-6'>
          <Box>
            <Typography variant='h6' className='font-black'>
              Tìm kiếm nâng cao
            </Typography>
            <Typography variant='body2' className='text-slate-500'>
              Lọc thêm theo loại gói, tiền tệ, trạng thái mở bán, quốc gia, khu vực và khoảng giá vốn.
            </Typography>
          </Box>
          <IconButton onClick={() => setAdvancedOpen(false)} size='small' className='bg-slate-100'>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-6'>
          <Grid2 container spacing={4} className='mbs-2'>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Loại eSIM
              </Typography>
              <MultiSelectDropdown
                label='Tất cả loại'
                options={TYPES.map(t => ({ value: t, label: t.toUpperCase() }))}
                value={pendingTypes}
                onChange={setPendingTypes}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Loại tiền tệ
              </Typography>
              <MultiSelectDropdown
                label='Tất cả tiền tệ'
                options={CURRENCIES.map(c => ({ value: c, label: c }))}
                value={pendingCurrencies}
                onChange={setPendingCurrencies}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Loại tiền tệ quy đổi
              </Typography>
              <MultiSelectDropdown
                label='Tất cả tiền quy đổi'
                options={CONVERTED_CURRENCIES.map(c => ({ value: c, label: c }))}
                value={pendingConvertedCurrencies}
                onChange={setPendingConvertedCurrencies}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Trạng thái mở bán
              </Typography>
              <MultiSelectDropdown
                label='Tất cả trạng thái mở bán'
                options={SALE_STATUSES.map(s => ({ value: s, label: getSaleStatusLabel(s) }))}
                value={pendingSaleStatuses}
                onChange={setPendingSaleStatuses}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Quốc gia
              </Typography>
              <MultiSelectDropdown
                label='Tất cả quốc gia'
                options={COUNTRIES.map(c => ({ value: c, label: c }))}
                value={pendingCountries}
                onChange={setPendingCountries}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Khu vực
              </Typography>
              <MultiSelectDropdown
                label='Tất cả khu vực'
                options={REGIONS.map(r => ({ value: r, label: r }))}
                value={pendingRegions}
                onChange={setPendingRegions}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Giá vốn từ
              </Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                placeholder='0'
                value={pendingCostMin}
                onChange={e => setPendingCostMin(e.target.value)}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Giá vốn đến
              </Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                placeholder='999999'
                value={pendingCostMax}
                onChange={e => setPendingCostMax(e.target.value)}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Giá vốn quy đổi từ
              </Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                placeholder='0'
                value={pendingConvertedCostMin}
                onChange={e => setPendingConvertedCostMin(e.target.value)}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>
                Giá vốn quy đổi đến
              </Typography>
              <TextField
                fullWidth
                size='small'
                type='number'
                placeholder='999999'
                value={pendingConvertedCostMax}
                onChange={e => setPendingConvertedCostMax(e.target.value)}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions className='p-6 pt-0 flex justify-between'>
          <Button
            variant='text'
            color='secondary'
            startIcon={<i className='tabler-filter-off' />}
            onClick={() => {
              setPendingTypes([])
              setPendingCountries([])
              setPendingRegions([])
              setPendingCurrencies([])
              setPendingConvertedCurrencies([])
              setPendingSaleStatuses([])
              setPendingCostMin('')
              setPendingCostMax('')
              setPendingConvertedCostMin('')
              setPendingConvertedCostMax('')
            }}
          >
            Xóa bộ lọc
          </Button>
          <Button variant='contained' color='primary' onClick={handleApplyAdvanced}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sale status confirm dialog */}
      <Dialog
        open={pendingSaleStatusAction !== null}
        onClose={() => setPendingSaleStatusAction(null)}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle className='font-black'>
          {pendingSaleStatusAction?.nextSaleStatus === 'OPEN_FOR_SALE'
            ? 'Xác nhận mở bán'
            : 'Xác nhận chuyển chưa bán'}
        </DialogTitle>
        <DialogContent>
          <Typography variant='body2' className='text-slate-600'>
            {pendingSaleStatusAction?.nextSaleStatus === 'OPEN_FOR_SALE'
              ? `Bạn có chắc muốn mở bán "${pendingSaleStatusAction.productName}"?`
              : `Bạn có chắc muốn chuyển "${pendingSaleStatusAction?.productName ?? ''}" về chưa bán?`}
          </Typography>
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button variant='tonal' color='secondary' onClick={() => setPendingSaleStatusAction(null)}>
            Hủy
          </Button>
          <Button
            variant='contained'
            color={pendingSaleStatusAction?.nextSaleStatus === 'OPEN_FOR_SALE' ? 'primary' : 'error'}
            onClick={handleConfirmSaleStatusChange}
          >
            {pendingSaleStatusAction?.nextSaleStatus === 'OPEN_FOR_SALE' ? 'Mở bán' : 'Chuyển chưa bán'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product detail dialog */}
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
                      label={getStatusLabel(selectedProduct.status)}
                      color={getStatusChipColor(selectedProduct.status)}
                      size='small'
                      className='font-black'
                    />
                  </Box>
                </Box>
                <i className='tabler-world absolute -right-6 -bottom-6 text-9xl text-white/5 rotate-12' />
              </Box>

              <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'>
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
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' className='font-black mbe-4 uppercase text-[11px] text-slate-500 tracking-widest'>
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
                          Giá vốn
                        </Typography>
                        <Typography variant='h5' className='font-black text-primary'>
                          {formatMoneyWithUnit(selectedProduct.cost, selectedProduct.currency)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center'>
                      <Box>
                        <Typography variant='caption' className='block text-slate-400 font-bold uppercase text-[9px]'>
                          Giá vốn quy đổi
                        </Typography>
                        <Typography variant='body1' className='font-black text-emerald-700'>
                          {formatMoneyWithUnit(selectedProduct.convertedCost, selectedProduct.convertedCurrency)}
                        </Typography>
                      </Box>
                      <Chip
                        label={getSaleStatusLabel(getCurrentSaleStatus(selectedProduct))}
                        size='small'
                        color={getSaleStatusChipColor(getCurrentSaleStatus(selectedProduct))}
                        variant='tonal'
                        className='font-bold'
                      />
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
                  </Stack>
                </Grid2>
              </Grid2>

              <Box className='p-5 bg-slate-50 rounded-xl border border-slate-100'>
                <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[10px] text-slate-500 tracking-widest'>
                  Mô tả hiển thị (Agent Store)
                </Typography>
                <Typography variant='body2' className='text-slate-600 leading-relaxed italic'>
                  "Gói cước eSIM cao cấp tại {selectedProduct.country}. Hỗ trợ hạ tầng mạng {selectedProduct.supplier} tốc độ cao, hỗ trợ Hotspot và Roaming ổn định."
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions className='p-6 pt-0'>
          <Button fullWidth variant='tonal' color='secondary' onClick={() => setOpenDialog(false)} className='font-black'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdminProductCatalog
