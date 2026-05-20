import type { NextRequest } from 'next/server'

import { buildWorkbookBuffer, type ExcelColumn, xlsxResponse } from '@/server/lib/excel'

type FlowStatus = 'success' | 'failed_downstream' | 'failed_upstream'

type DownstreamTransaction = {
  id: string
  traceId: string
  agent: string
  agentKey: string
  supplier: string
  supplierKey: string
  package: {
    name: string
    data: string
    validity: string
    type: string
  }
  action: string
  price: number
  cost: number
  exchangeRate: number
  downstreamStatus: number
  upstreamStatus: number | null
  latency: string
  date: string
}

const transactions: DownstreamTransaction[] = [
  {
    id: 'ORD-7729-10A',
    traceId: 'trace-a1b2c3d4e5f6',
    agent: 'Global eSIM Hub',
    agentKey: 'global',
    supplier: 'Singtel',
    supplierKey: 'singtel',
    package: { name: 'Singapore 10GB', data: '10GB', validity: '30 Ngày', type: 'Total' },
    action: 'Mua',
    price: 12.5,
    cost: 9.8,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 200,
    latency: '450ms',
    date: '28/04/2026 14:15'
  },
  {
    id: 'ORD-7729-10B',
    traceId: 'trace-b2c3d4e5f6a1',
    agent: 'TravelConnect',
    agentKey: 'travel',
    supplier: 'AIS Thailand',
    supplierKey: 'ais',
    package: { name: 'Thailand Unlimited', data: 'Unlimited', validity: '7 Ngày', type: 'Daily' },
    action: 'Mua',
    price: 8,
    cost: 6.2,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 200,
    latency: '320ms',
    date: '28/04/2026 14:12'
  },
  {
    id: 'ORD-7729-10C',
    traceId: 'trace-c3d4e5f6a1b2',
    agent: 'Nomad Partner',
    agentKey: 'nomad',
    supplier: 'Orange FR',
    supplierKey: 'orange',
    package: { name: 'Europe Pro 20GB', data: '20GB', validity: '30 Ngày', type: 'Total' },
    action: 'Huỷ',
    price: 25,
    cost: 18.5,
    exchangeRate: 25450,
    downstreamStatus: 400,
    upstreamStatus: null,
    latency: '110ms',
    date: '28/04/2026 13:55'
  },
  {
    id: 'ORD-7729-10D',
    traceId: 'trace-d4e5f6a1b2c3',
    agent: 'TravelConnect',
    agentKey: 'travel',
    supplier: 'KDDI Japan',
    supplierKey: 'kddi',
    package: { name: 'Japan 5GB', data: '5GB', validity: '15 Ngày', type: 'Total' },
    action: 'Mua',
    price: 14.5,
    cost: 11.2,
    exchangeRate: 25450,
    downstreamStatus: 201,
    upstreamStatus: 500,
    latency: '820ms',
    date: '28/04/2026 13:45'
  }
]

export async function GET(req: NextRequest) {
  const rows = filterTransactions(req.nextUrl.searchParams)
  const columns: ExcelColumn<DownstreamTransaction>[] = [
    { key: 'id', header: 'Mã đơn hàng', width: 18 },
    { key: 'traceId', header: 'Trace ID', width: 24 },
    { key: 'agent', header: 'Đại lý', width: 24 },
    { key: 'supplier', header: 'Nhà cung cấp', width: 20 },
    { key: 'action', header: 'Hành động', width: 12 },
    { key: 'packageName', header: 'Sản phẩm', width: 24, get: row => row.package.name },
    { key: 'data', header: 'Dung lượng', width: 12, get: row => row.package.data },
    { key: 'validity', header: 'Thời hạn', width: 14, get: row => row.package.validity },
    { key: 'packageType', header: 'Loại gói', width: 12, get: row => row.package.type },
    { key: 'downstreamStatus', header: 'Đại lý -> Chợ', width: 16, get: row => statusLabel(row.downstreamStatus) },
    { key: 'upstreamStatus', header: 'Chợ -> NCC', width: 16, get: row => statusLabel(row.upstreamStatus) },
    { key: 'flowStatus', header: 'Trạng thái luồng', width: 18, get: row => flowStatusLabel(getFlowStatus(row)) },
    { key: 'price', header: 'Giá bán (USD)', width: 14 },
    { key: 'priceVnd', header: 'Giá bán (VND)', width: 16, get: row => row.price * row.exchangeRate },
    { key: 'cost', header: 'Giá vốn (USD)', width: 14 },
    { key: 'costVnd', header: 'Giá vốn (VND)', width: 16, get: row => row.cost * row.exchangeRate },
    { key: 'exchangeRate', header: 'Tỉ giá', width: 12 },
    { key: 'latency', header: 'Latency', width: 12 },
    { key: 'date', header: 'Thời gian', width: 18 }
  ]

  const buffer = await buildWorkbookBuffer(rows, columns)

  return xlsxResponse(buffer, `downstream-transactions-${new Date().toISOString().slice(0, 10)}.xlsx`)
}

function filterTransactions(searchParams: URLSearchParams) {
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()
  const agent = searchParams.get('agent') ?? 'all'
  const supplier = searchParams.get('supplier') ?? 'all'
  const flowStatus = searchParams.get('flowStatus') ?? 'all'
  const pkgType = searchParams.get('pkgType') ?? 'all'
  const dataLimit = searchParams.get('dataLimit') ?? 'all'
  const validity = searchParams.get('validity') ?? 'all'
  const fromDate = searchParams.get('fromDate') ?? ''
  const toDate = searchParams.get('toDate') ?? ''
  const minSalePrice = parsePriceFilter(searchParams.get('salePriceFrom') ?? '')
  const maxSalePrice = parsePriceFilter(searchParams.get('salePriceTo') ?? '')
  const minCostPrice = parsePriceFilter(searchParams.get('costPriceFrom') ?? '')
  const maxCostPrice = parsePriceFilter(searchParams.get('costPriceTo') ?? '')

  return transactions.filter(tx => {
    const dateKey = transactionDateKey(tx.date)
    const status = getFlowStatus(tx)

    return (
      (!q ||
        tx.id.toLowerCase().includes(q) ||
        tx.traceId.toLowerCase().includes(q) ||
        tx.agent.toLowerCase().includes(q) ||
        tx.supplier.toLowerCase().includes(q) ||
        tx.package.name.toLowerCase().includes(q)) &&
      (agent === 'all' || tx.agentKey === agent) &&
      (supplier === 'all' || tx.supplierKey === supplier) &&
      (flowStatus === 'all' || status === flowStatus) &&
      (pkgType === 'all' || tx.package.type === pkgType) &&
      (dataLimit === 'all' || tx.package.data === dataLimit) &&
      (validity === 'all' || tx.package.validity === validity) &&
      (!fromDate || dateKey >= fromDate) &&
      (!toDate || dateKey <= toDate) &&
      (minSalePrice === null || tx.price >= minSalePrice) &&
      (maxSalePrice === null || tx.price <= maxSalePrice) &&
      (minCostPrice === null || tx.cost >= minCostPrice) &&
      (maxCostPrice === null || tx.cost <= maxCostPrice)
    )
  })
}

function transactionDateKey(date: string) {
  const [datePart] = date.split(' ')
  const [day, month, year] = datePart.split('/')

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function parsePriceFilter(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const parsed = Number(trimmed)

  return Number.isFinite(parsed) ? parsed : null
}

function getFlowStatus(tx: DownstreamTransaction): FlowStatus {
  if (tx.downstreamStatus >= 400) return 'failed_downstream'
  if (tx.upstreamStatus !== null && tx.upstreamStatus >= 400) return 'failed_upstream'
  return 'success'
}

function statusLabel(status: number | null) {
  if (status === null) return 'N/A'
  if (status >= 200 && status < 300) return 'Thành công'

  return 'Thất bại'
}

function flowStatusLabel(status: FlowStatus) {
  if (status === 'success') return 'Thành công toàn bộ'
  if (status === 'failed_downstream') return 'Lỗi Downstream'

  return 'Lỗi Upstream'
}
