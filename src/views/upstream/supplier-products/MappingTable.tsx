'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import PageHeader from '@/components/layout/shared/PageHeader'

const MappingTable = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mockData = [
    {
      id: 'sp1',
      supplier: 'Airalo',
      externalName: 'Japan - 10GB - 30 Days',
      externalCode: 'airalo-jp-10gb',
      costPrice: '$12.50',
      mappedProductId: 'mp1',
      status: 'mapped'
    },
    {
      id: 'sp2',
      supplier: 'Airalo',
      externalName: 'USA - 20GB - 30 Days',
      externalCode: 'airalo-us-20gb',
      costPrice: '$22.00',
      mappedProductId: '',
      status: 'unmapped'
    },
    {
      id: 'sp3',
      supplier: 'Nomad',
      externalName: 'Europe 5GB (15D)',
      externalCode: 'nomad-eu-5gb',
      costPrice: '$10.00',
      mappedProductId: 'mp3',
      status: 'mapped'
    }
  ]

  const marketplaceProducts = [
    { id: 'mp1', name: 'Gói Nhật Bản Siêu Tốc 10GB' },
    { id: 'mp2', name: 'Gói Mỹ Unlimit 20GB' },
    { id: 'mp3', name: 'Gói Châu Âu Wanderlust 5GB' }
  ]

  return (
    <>
      <PageHeader
        title="Ánh xạ Sản phẩm (Mapping Matrix)"
        description="Kết nối các gói cước từ nhà cung cấp vào danh mục sản phẩm của Chợ"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Ánh xạ sản phẩm' }]}
        actions={
          <Button variant='tonal' startIcon={<i className='tabler-wand' />} color='primary'>Auto-Mapping</Button>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent>
          <Box className='flex justify-between items-center mbe-6'>
            <Typography variant='h6' className='font-black'>Ma trận Ánh xạ</Typography>
            <TextField 
              size='small' 
              placeholder='Tìm kiếm gói cước...' 
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
            />
          </Box>

          <Box className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[800px]'>
              <thead>
                <tr className='bg-slate-50 border-be'>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase w-[20%]'>Supplier & Code</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase w-[25%]'>Sản phẩm Nguồn (External)</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase w-[10%]'>Giá vốn</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase w-[35%]'>Ánh xạ vào Chợ (Marketplace)</th>
                  <th className='p-4 text-xs font-black text-slate-500 uppercase w-[10%]'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row) => (
                  <tr key={row.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-bold'>{row.supplier}</Typography>
                      <Typography variant='caption' className='text-slate-400 font-mono'>{row.externalCode}</Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-black'>{row.externalName}</Typography>
                      <Chip 
                        label={row.status === 'mapped' ? 'Đã ánh xạ' : 'Chưa ánh xạ'} 
                        size='small' 
                        variant='tonal'
                        color={row.status === 'mapped' ? 'success' : 'warning'}
                        className='mt-1 font-bold text-[10px] h-5'
                      />
                    </td>
                    <td className='p-4'>
                      <Typography variant='body2' className='font-bold text-success'>{row.costPrice}</Typography>
                    </td>
                    <td className='p-4'>
                      <Select 
                        fullWidth 
                        size='small' 
                        value={row.mappedProductId}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em className='text-slate-400'>-- Chọn sản phẩm để ánh xạ --</em>
                        </MenuItem>
                        {marketplaceProducts.map(p => (
                          <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                        ))}
                      </Select>
                    </td>
                    <td className='p-4'>
                      <Box className='flex gap-1'>
                        <Button variant='tonal' size='small' color='primary' className='min-w-0 p-1'>
                          <i className='tabler-check' />
                        </Button>
                        <Button variant='tonal' size='small' color='error' className='min-w-0 p-1'>
                          <i className='tabler-trash' />
                        </Button>
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

export default MappingTable
