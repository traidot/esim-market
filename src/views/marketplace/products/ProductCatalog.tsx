'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    { id: '1', code: 'JP-30D-10GB', name: 'Nhật Bản Siêu Tốc', region: 'Nhật Bản', data: '10GB', validity: '30 Ngày', price: '$12.50', status: 'Đang hoạt động' },
    { id: '2', code: 'EU-15D-5GB', name: 'Roaming Châu Âu', region: 'Châu Âu', data: '5GB', validity: '15 Ngày', price: '$9.00', status: 'Đang hoạt động' },
    { id: '3', code: 'US-30D-20GB', name: 'Mỹ Không giới hạn', region: 'Hoa Kỳ', data: '20GB', validity: '30 Ngày', price: '$22.00', status: 'Tạm dừng' },
    { id: '4', code: 'GL-07D-1GB', name: 'Toàn cầu Lite', region: 'Toàn cầu', data: '1GB', validity: '7 Ngày', price: '$4.50', status: 'Đang hoạt động' }
  ]

  return (
    <>
      <PageHeader
        title="Danh mục Sản phẩm (Chợ eSIM)"
        description="Quản lý các gói cước eSIM tập trung dành cho các đại lý hạ nguồn"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chợ eSIM' }, { label: 'Sản phẩm' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>Tạo Gói cước mới</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6 flex-wrap gap-4'>
            <TextField
              size='small'
              placeholder='Tìm kiếm sản phẩm...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='tabler-search text-slate-400' />
                    </InputAdornment>
                  )
                }
              }}
              className='max-sm:is-full min-is-[300px]'
            />
            <Box className='flex gap-2'>
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-download' />}>Xuất file</Button>
              <Button variant='tonal' color='secondary' startIcon={<i className='tabler-filter' />}>Bộ lọc</Button>
            </Box>
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[800px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã gói</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Tên gói cước</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Vùng phủ</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Dung lượng / Hạn dùng</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá cơ sở</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-mono font-bold text-primary'>{p.code}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{p.name}</Typography>
                    </td>
                    <td className='p-4'>
                      <Chip label={p.region} size='small' variant='tonal' color='info' className='font-bold' />
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2'>{p.data} / {p.validity}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{p.price}</Typography>
                    </td>
                    <td className='p-4'>
                      <Chip 
                        label={p.status} 
                        size='small' 
                        color={p.status === 'Đang hoạt động' ? 'success' : 'secondary'} 
                        variant='tonal' 
                        className='font-bold' 
                      />
                    </td>
                    <td className='p-4 text-right'>
                      <Box className='flex justify-end gap-1'>
                        <Button size='small' variant='text' className='min-is-0 p-1'><i className='tabler-edit text-lg' /></Button>
                        <Button size='small' variant='text' color='error' className='min-is-0 p-1'><i className='tabler-trash text-lg' /></Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductCatalog
