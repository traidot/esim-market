import { buildWorkbookBuffer, type ExcelColumn, xlsxResponse } from '@/server/lib/excel'

export const runtime = 'nodejs'

interface AgentPriceTemplateRow {
  sku: string
  country: string
  packageName: string
  esimType: string
  packageType: string
  dataGb: string
  validityDays: number
  basePrice: number
  agentPrice: number
  currency: string
  appliedRule: string
  effectiveFrom: string
  effectiveTo: string
}

const templateRows: AgentPriceTemplateRow[] = [
  {
    sku: 'JP-10GB-7D',
    country: 'Nhật Bản',
    packageName: '10GB 7 Ngày',
    esimType: 'eSIM',
    packageType: 'Total',
    dataGb: '10',
    validityDays: 7,
    basePrice: 5,
    agentPrice: 6.5,
    currency: 'USD',
    appliedRule: 'Ghi đè Gói (Package Level)',
    effectiveFrom: '2026-05-20',
    effectiveTo: ''
  },
  {
    sku: 'HK-DAILY1',
    country: 'Hồng Kông',
    packageName: 'HK Daily Essential',
    esimType: 'Physical',
    packageType: 'Daily',
    dataGb: '1',
    validityDays: 1,
    basePrice: 0.39,
    agentPrice: 0.45,
    currency: 'USD',
    appliedRule: 'Tier PLATINUM (-15%)',
    effectiveFrom: '2026-05-20',
    effectiveTo: ''
  }
]

const columns: ExcelColumn<AgentPriceTemplateRow>[] = [
  { key: 'sku', header: 'SKU', width: 18 },
  { key: 'country', header: 'Quốc gia', width: 18 },
  { key: 'packageName', header: 'Tên gói', width: 28 },
  { key: 'esimType', header: 'Loại SIM', width: 14 },
  { key: 'packageType', header: 'Loại gói', width: 14 },
  { key: 'dataGb', header: 'Dung lượng (GB)', width: 16 },
  { key: 'validityDays', header: 'Số ngày', width: 12 },
  { key: 'basePrice', header: 'Giá gốc', width: 14 },
  { key: 'agentPrice', header: 'Giá đại lý', width: 14 },
  { key: 'currency', header: 'Tiền tệ', width: 10 },
  { key: 'appliedRule', header: 'Quy tắc áp dụng', width: 28 },
  { key: 'effectiveFrom', header: 'Hiệu lực từ', width: 16 },
  { key: 'effectiveTo', header: 'Hiệu lực đến', width: 16 }
]

export async function GET() {
  const buffer = await buildWorkbookBuffer(templateRows, columns)

  return xlsxResponse(buffer, 'price-list-template.xlsx')
}
