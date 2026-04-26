'use client'

import SupplierDetail from '@/views/upstream/suppliers/detail/SupplierDetail'

const SupplierDetailPage = ({ params }: { params: { id: string } }) => {
  return <SupplierDetail id={params.id} />
}

export default SupplierDetailPage
