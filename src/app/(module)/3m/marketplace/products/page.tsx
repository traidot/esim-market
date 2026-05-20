import { Suspense } from 'react'
import AdminProductCatalog from '@/views/marketplace/products/AdminProductCatalog'

const AdminProductCatalogPage = () => {
  return (
    <Suspense>
      <AdminProductCatalog />
    </Suspense>
  )
}

export default AdminProductCatalogPage
