// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => {
  const getUrl = (path: string) => path

  return [
    {
      label: 'Main',
      isSection: true,
      children: [
        { label: 'Dashboard', icon: 'tabler-smart-home', href: getUrl('/dashboard') }
      ]
    },
    {
      label: 'Marketplace (3M Admin)',
      icon: 'tabler-building-store',
      children: [
        { label: 'Catalog Management', icon: 'tabler-packages', href: getUrl('/marketplace/products') },
        { label: 'Pricing Engine', icon: 'tabler-adjustments-horizontal', href: getUrl('/marketplace/pricing') },
        { label: 'Inventory (API/Codes)', icon: 'tabler-barcode', href: getUrl('/marketplace/inventory') }
      ]
    },
    {
      label: 'Upstream Hub',
      icon: 'tabler-cloud-download',
      children: [
        { label: 'Global Suppliers', icon: 'tabler-world', href: getUrl('/upstream/suppliers') },
        { label: 'Provider Mapping', icon: 'tabler-link', href: getUrl('/upstream/supplier-products') },
        { label: 'Sync Monitoring', icon: 'tabler-activity', href: getUrl('/upstream/sync-logs') }
      ]
    },
    {
      label: 'Downstream Hub',
      icon: 'tabler-users-group',
      children: [
        { label: 'Agents & Partners', icon: 'tabler-users', href: getUrl('/downstream/agents') },
        { label: 'Tier Groups', icon: 'tabler-hierarchy-2', href: getUrl('/downstream/tiers') },
        { label: 'API Gateway', icon: 'tabler-key', href: getUrl('/downstream/api-keys') }
      ]
    },
    {
      label: 'Finance & Wallets',
      icon: 'tabler-wallet',
      children: [
        { label: 'Agent Wallets', icon: 'tabler-cash', href: getUrl('/finance/wallets') },
        { label: 'Transaction Logs', icon: 'tabler-receipt-2', href: getUrl('/finance/transactions') },
        { label: 'Reconciliation', icon: 'tabler-file-analytics', href: getUrl('/finance/reconciliation') }
      ]
    },
    {
      label: 'Digital Orders',
      icon: 'tabler-shopping-cart',
      children: [
        { label: 'All Orders', icon: 'tabler-list-details', href: getUrl('/orders/list') },
        { label: 'Activation Logs', icon: 'tabler-qrcode', href: getUrl('/orders/activation-logs') }
      ]
    },
    {
      label: 'System Engine',
      icon: 'tabler-settings-cog',
      children: [
        { label: 'Internal Users', icon: 'tabler-user-shield', href: getUrl('/system/users') },
        { label: 'System Config', icon: 'tabler-settings', href: getUrl('/system/settings') }
      ]
    },
    {
      label: 'Agent Console',
      isSection: true,
      children: [
        { label: 'Agent Dashboard', icon: 'tabler-layout-dashboard', href: getUrl('/dashboard') },
        { label: 'eSIM Store', icon: 'tabler-shopping-bag', href: getUrl('/marketplace/products') },
        { label: 'My Wallet', icon: 'tabler-wallet', href: getUrl('/finance/my-wallet') },
        { label: 'My Orders', icon: 'tabler-list-details', href: getUrl('/orders/my-orders') },
        { label: 'API & Webhooks', icon: 'tabler-api', href: getUrl('/system/api') }
      ]
    }
  ]
}

export default verticalMenuData

