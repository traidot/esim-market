// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => {
  const getUrl = (path: string) => path

  return [
    {
      label: 'Chính',
      isSection: true,
      roles: ['admin', 'agent'],
      children: [
        { label: 'Bảng điều khiển', icon: 'tabler-smart-home', href: getUrl('/dashboard') }
      ]
    },
    {
      label: 'Chợ eSIM (3M Admin)',
      icon: 'tabler-building-store',
      roles: ['admin'],
      children: [
        { label: 'Quản lý Danh mục', icon: 'tabler-packages', href: getUrl('/marketplace/products') },
        { label: 'Công cụ Định giá', icon: 'tabler-adjustments-horizontal', href: getUrl('/marketplace/pricing') },
        { label: 'Quản lý Kho (API/Codes)', icon: 'tabler-barcode', href: getUrl('/marketplace/inventory') }
      ]
    },
    {
      label: 'Nguồn cung (Upstream)',
      icon: 'tabler-cloud-download',
      roles: ['admin'],
      children: [
        { label: 'Nhà cung cấp Toàn cầu', icon: 'tabler-world', href: getUrl('/upstream/suppliers') },
        { label: 'Mapping Sản phẩm', icon: 'tabler-link', href: getUrl('/upstream/supplier-products') },
        { label: 'Báo giá Supplier', icon: 'tabler-file-dollar', href: getUrl('/upstream/quotes') },
        { label: 'Nhật ký Đồng bộ', icon: 'tabler-activity', href: getUrl('/upstream/sync-logs') }
      ]
    },
    {
      label: 'Phân phối (Downstream)',
      icon: 'tabler-users-group',
      roles: ['admin'],
      children: [
        { label: 'Đại lý & Đối tác', icon: 'tabler-users', href: getUrl('/downstream/agents') },
        { label: 'Nhóm Cấp bậc (Tiers)', icon: 'tabler-hierarchy-2', href: getUrl('/downstream/tiers') },
        { label: 'Quản lý Bảng giá', icon: 'tabler-file-spreadsheet', href: getUrl('/downstream/price-lists') },
        { label: 'Cổng API (Gateway)', icon: 'tabler-key', href: getUrl('/downstream/api-keys') }
      ]
    },
    {
      label: 'Tài chính & Ví',
      icon: 'tabler-wallet',
      roles: ['admin'],
      children: [
        { label: 'Ví Đại lý', icon: 'tabler-cash', href: getUrl('/finance/wallets') },
        { label: 'Lịch sử Giao dịch', icon: 'tabler-receipt-2', href: getUrl('/finance/transactions') },
        { label: 'Đối soát (Reconciliation)', icon: 'tabler-file-analytics', href: getUrl('/finance/reconciliation') }
      ]
    },
    {
      label: 'Đơn hàng kỹ thuật số',
      icon: 'tabler-shopping-cart',
      roles: ['admin'],
      children: [
        { label: 'Tất cả đơn hàng', icon: 'tabler-list-details', href: getUrl('/orders/list') },
        { label: 'Nhật ký Kích hoạt', icon: 'tabler-qrcode', href: getUrl('/orders/activation-logs') }
      ]
    },
    {
      label: 'Hệ thống',
      icon: 'tabler-settings-cog',
      roles: ['admin'],
      children: [
        { label: 'Người dùng Nội bộ', icon: 'tabler-user-shield', href: getUrl('/system/users') },
        { label: 'Cấu hình Hệ thống', icon: 'tabler-settings', href: getUrl('/system/settings') }
      ]
    },
    {
      label: 'Kênh Đại lý',
      isSection: true,
      roles: ['agent'],
      children: [
        { label: 'Dashboard Đại lý', icon: 'tabler-layout-dashboard', href: getUrl('/dashboard') },
        { label: 'Cửa hàng eSIM', icon: 'tabler-shopping-bag', href: getUrl('/marketplace/products') },
        { label: 'Ví của tôi', icon: 'tabler-wallet', href: getUrl('/finance/my-wallet') },
        { label: 'Đơn hàng của tôi', icon: 'tabler-list-details', href: getUrl('/orders/my-orders') },
        { label: 'API & Webhooks', icon: 'tabler-api', href: getUrl('/system/api') }
      ]
    }
  ]
}

export default verticalMenuData
