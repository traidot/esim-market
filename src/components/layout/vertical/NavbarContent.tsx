'use client'

// Third-party Imports
import classnames from 'classnames'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

// Type Imports
import type { ShortcutsType } from '@components/layout/shared/ShortcutsDropdown'
import type { NotificationsType } from '@components/layout/shared/NotificationsDropdown'
import ModeDropdown from '@components/layout/shared/ModeDropdown'

// Component Imports
import NavToggle from './NavToggle'
import ShortcutsDropdown from '@components/layout/shared/ShortcutsDropdown'
import NotificationDropdown from '@components/layout/shared/NotificationsDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Hook Imports
import { useNotifications } from '@/hooks/useNotifications'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Vars
const shortcuts: ShortcutsType[] = [
  {
    url: '/commercial/pr',
    icon: 'tabler-file-plus',
    title: 'New PR',
    subtitle: 'Requisition'
  },
  {
    url: '/commercial/po',
    icon: 'tabler-file-invoice',
    title: 'Orders',
    subtitle: 'Purchase Orders'
  },
  {
    url: '/inventory/materials',
    icon: 'tabler-box',
    title: 'Materials',
    subtitle: 'Master Data'
  },
  {
    url: '/warehouse/qc',
    icon: 'tabler-shield-check',
    title: 'Quality',
    subtitle: 'Inspections'
  },
  {
    url: '/dashboard',
    icon: 'tabler-smart-home',
    title: 'Dashboard',
    subtitle: 'Main View'
  },
  {
    url: '/system/settings',
    icon: 'tabler-settings',
    title: 'Settings',
    subtitle: 'System Config'
  }
]

const breadcrumbRows = [
  { group: 'Chính', label: 'Bảng điều khiển', href: '/3m/dashboard' },
  { group: 'Quản lý danh mục eSIM', label: 'Danh mục eSIM', href: '/3m/marketplace/products' },
  { group: 'Quản lý danh mục eSIM', label: 'Quản lý Tỉ giá', href: '/3m/finance/exchange-rates' },
  { group: 'Nguồn cung (Upstream)', label: 'Nhà cung cấp', href: '/3m/upstream/suppliers', exactMatch: false },
  { group: 'Nguồn cung (Upstream)', label: 'Lịch sử giao dịch', href: '/3m/upstream/transactions' },
  { group: 'Phân phối (Downstream)', label: 'Nhóm đại lý', href: '/3m/downstream/tiers', exactMatch: false },
  { group: 'Phân phối (Downstream)', label: 'Đại lý & Đối tác', href: '/3m/downstream/agents', exactMatch: false },
  { group: 'Phân phối (Downstream)', label: 'Lịch sử giao dịch', href: '/3m/downstream/transactions' },
  { group: 'Tài chính & Ví', label: 'Phải thu (Đại lý)', href: '/3m/finance/agent-debts' },
  { group: 'Tài chính & Ví', label: 'Phải trả (NCC)', href: '/3m/finance/supplier-debts' },
  { group: 'Tài chính & Ví', label: 'Lịch sử Giao dịch', href: '/3m/finance/transactions' },
  { group: 'Tài chính & Ví', label: 'Đối soát (Reconciliation)', href: '/3m/finance/reconciliation' },
  { group: 'Hệ thống', label: 'Người dùng nội bộ', href: '/3m/system/users', exactMatch: false },
  { group: 'Hệ thống', label: 'Phân quyền & Vai trò', href: '/3m/system/users/permissions' },
  { group: 'Hệ thống', label: 'Cấu hình Hệ thống', href: '/3m/system/settings' },
  { group: 'Hệ thống', label: 'Quản lý log', href: '/3m/system/audit-logs' },
  { group: 'Hệ thống', label: 'Cổng API (Gateway)', href: '/3m/system/api-keys' }
]

const NavbarContent = () => {
  const pathname = usePathname()
  const currentBreadcrumb = useMemo(() => {
    return breadcrumbRows
      .filter(row => (row.exactMatch === false ? pathname.startsWith(row.href) : pathname === row.href))
      .sort((left, right) => right.href.length - left.href.length)[0]
  }, [pathname])

  // Hooks
  const {
    notifications,
    loading: notificationsLoading,
    refresh: refreshNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    markAllAsUnread,
    dismissNotification,
  } = useNotifications()

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex min-w-0 items-center gap-4'>
        <NavToggle />
        {currentBreadcrumb ? (
          <Box component='nav' aria-label='breadcrumb' className='hidden min-w-0 items-center gap-2 text-sm md:flex'>
            <Typography variant='body2' className='truncate text-slate-500'>
              {currentBreadcrumb.group}
            </Typography>
            <i className='tabler-chevron-right text-[16px] shrink-0 text-slate-400' />
            <Typography variant='body2' className='truncate font-semibold text-primary'>
              {currentBreadcrumb.label}
            </Typography>
          </Box>
        ) : null}
      </div>
      <div className='flex items-center'>
        {/* <LanguageDropdown /> */}
        {/* <ThemeModeToggle />// */}
        <ModeDropdown />
        <ShortcutsDropdown shortcuts={shortcuts} />
        <NotificationDropdown
          notifications={notifications as any}
          loading={notificationsLoading}
          onMarkAsRead={markAsRead}
          onMarkAsUnread={markAsUnread}
          onMarkAllAsRead={markAllAsRead}
          onMarkAllAsUnread={markAllAsUnread}
          onDismiss={dismissNotification}
          onRefresh={refreshNotifications}
          viewAllUrl='/notifications'
        />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
