// Next Imports
import { headers } from 'next/headers'

// Type Imports
import type { ChildrenType } from '@core/types'

// Shared Layout Imports
import AppLayout from '@/app/_shared/layouts/AppLayout'

/**
 * Generate metadata for module pages
 * @returns Metadata object with title and description
 */
export async function generateMetadata() {
  return {
    title: 'eSIM Market',
    description: 'Global eSIM Marketplace',
    keywords: 'eSIM, Travel, Connectivity, Marketplace, eSIM Market',
    authors: [{ name: 'eSIM Market Team' }]
  }
}

/**
 * Module Routes Layout
 * - Layout cho tất cả module routes
 * - Wraps pages with AppLayout (providers, guards, navigation)
 * - Skips auth check for login page (login has its own layout)
 *
 * @param props - Component props containing children
 * @returns Module layout with AppLayout wrapper
 */
export default async function ModuleRoutesLayout(props: ChildrenType) {
  /**
   * Check if this is the login page - skip auth check
   */
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''

  // If accessing login page, skip auth check (login page has its own layout)
  if (pathname.includes('/login')) {
    return <>{props.children}</>
  }

  // For NestJS backend, authentication will be checked client-side
  // via JwtAuthGuard in the shared AppLayout
  // Login page will handle its own auth check
  return <AppLayout>{props.children}</AppLayout>
}
