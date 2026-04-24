// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => {
  // Helper function to generate URL
  const getUrl = (path: string) => {
    return path
  }

  const menuDict = (dictionary as any).screens?.menu || (dictionary as any).menu || {}

  return [
    {
      label: 'Strategic Intelligence',
      icon: 'tabler-presentation',
      children: [
        { label: 'Executive Dashboard', icon: 'tabler-smart-home', href: getUrl('/dashboard'), exactMatch: false },
        { label: 'Spending Analytics', icon: 'tabler-chart-pie', href: getUrl('/analytics'), exactMatch: true }
      ]
    },
    {
      label: 'Strategic Sourcing',
      icon: 'tabler-target',
      children: [
        { label: 'Supplier Onboarding', icon: 'tabler-user-plus', href: getUrl('/partners/onboarding'), exactMatch: false },
        { label: 'Contract Management', icon: 'tabler-file-certificate', href: getUrl('/partners/contracts'), exactMatch: false }
      ]
    },
    {
      label: 'Procurement Ops',
      icon: 'tabler-shopping-cart',
      children: [
        { label: 'Purchase Requisitions', icon: 'tabler-file-text', href: getUrl('/commercial/pr'), exactMatch: false },
        { label: 'Purchase Orders', icon: 'tabler-file-invoice', href: getUrl('/commercial/po'), exactMatch: false },
        { label: 'Requests for Quotation', icon: 'tabler-file-search', href: getUrl('/commercial/rfq'), exactMatch: false },
        { label: 'Supplier Invoices', icon: 'tabler-receipt-2', href: getUrl('/commercial/invoices'), exactMatch: false }
      ]
    },
    {
      label: 'Financial Bridge',
      icon: 'tabler-building-bank',
      children: [
        { label: 'Payments & Batches', icon: 'tabler-cash-banknote', href: getUrl('/commercial/payments'), exactMatch: false },
        { label: 'Departmental Budgets', icon: 'tabler-chart-donut', href: getUrl('/commercial/budgets'), exactMatch: false }
      ]
    },
    {
      label: 'Supplier Hub',
      icon: 'tabler-building-store',
      children: [
        { label: 'Supplier Directory', icon: 'tabler-users', href: getUrl('/partners'), exactMatch: true },
        { label: 'Contracted Pricing', icon: 'tabler-currency-dollar', href: getUrl('/partners/pricing'), exactMatch: false },
        { label: 'Supplier Performance', icon: 'tabler-trending-up', href: getUrl('/partners/performance'), exactMatch: false }
      ]
    },
    {
      label: 'Logistics & Inbound',
      icon: 'tabler-truck-delivery',
      children: [
        { label: 'Goods Receipts (GR)', icon: 'tabler-arrow-down-circle', href: getUrl('/operations/inbound'), exactMatch: false },
        { label: 'Quality Inspection', icon: 'tabler-shield-check', href: getUrl('/warehouse/qc'), exactMatch: false },
        { label: 'Purchase Returns (RTV)', icon: 'tabler-receipt-refund', href: getUrl('/operations/returns'), exactMatch: false }
      ]
    },
    {
      label: 'Master Data & Assets',
      icon: 'tabler-packages',
      children: [
        { label: 'Material Master', icon: 'tabler-box', href: getUrl('/inventory/materials'), exactMatch: false },
        { label: 'Batch/Serial Registry', icon: 'tabler-barcode', href: getUrl('/inventory/tracking'), exactMatch: false },
        { label: 'Storage Layout', icon: 'tabler-map-2', href: getUrl('/warehouse/zones'), exactMatch: false },
        { label: 'Replenishment Logic', icon: 'tabler-refresh-dot', href: getUrl('/inventory/reorder'), exactMatch: false }
      ]
    },
    {
      label: 'Procurement Reports',
      icon: 'tabler-report-analytics',
      href: getUrl('/reports'),
      exactMatch: false
    },
    {
      label: 'AI & Market Intelligence',
      icon: 'tabler-brain',
      children: [
        { label: 'Demand Forecasting', icon: 'tabler-presentation-analytics', href: getUrl('/analytics/forecasting'), exactMatch: false },
        { label: 'Market Price Trends', icon: 'tabler-chart-arrows-vertical', href: getUrl('/analytics/trends'), exactMatch: false }
      ]
    },
    {
      label: 'System Engine',
      icon: 'tabler-settings-cog',
      children: [
        { label: 'Users & Roles', icon: 'tabler-user-shield', href: getUrl('/system/users'), exactMatch: false },
        { label: 'Approval Hierarchies', icon: 'tabler-hierarchy-2', href: getUrl('/system/workflows'), exactMatch: false },
        { label: 'System Config', icon: 'tabler-settings', href: getUrl('/system/settings'), exactMatch: false },
      ]
    }
  ]
}

export default verticalMenuData
