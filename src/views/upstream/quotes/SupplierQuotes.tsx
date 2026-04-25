'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'

import PageHeader from '@/components/layout/shared/PageHeader'

const SupplierQuotes = () => {
  const quotes = [
    { region: 'Nhật Bản (10GB)', bestPrice: '$8.50', supplier: 'Airalo', compare: [
      { name: 'Airalo', price: '$8.50', status: 'Active' },
      { name: 'Nomad', price: '$9.20', status: 'Available' },
      { name: 'GoMoWorld', price: '$10.00', status: 'High' }
    ]},
    { region: 'Châu Âu (5GB)', bestPrice: '$6.00', supplier: 'Nomad', compare: [
      { name: 'Airalo', price: '$7.50', status: 'High' },
      { name: 'Nomad', price: '$6.00', status: 'Active' },
      { name: 'Orange', price: '$12.00', status: 'Direct' }
    ]},
    { region: 'Toàn cầu (1GB)', bestPrice: '$9.00', supplier: 'Airalo', compare: [
      { name: 'Airalo', price: '$9.00', status: 'Active' },
      { name: 'Flexiroam', price: '$11.50', status: 'Available' }
    ]}
  ]

  return (
    <>
      <PageHeader
        title="Báo giá Nhà cung cấp (Supplier Quotes)"
        description="So sánh giá vốn giữa các nhà cung cấp để tối ưu hóa nguồn hàng đầu vào"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Báo giá' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-refresh' />}>Cập nhật lại giá API</Button>
        }
        className='mbe-6'
      />

      <Stack spacing={6}>
        <Card className='border-none shadow-sm'>
          <CardContent>
            <Box className='flex justify-between items-center mbe-6'>
              <TextField 
                size='small' 
                placeholder='Tìm vùng hoặc gói cước...' 
                className='min-is-[300px]'
                slotProps={{ input: { startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment> } }}
              />
            </Box>

            <Box className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-be'>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Vùng / Gói cước</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá tốt nhất</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Nguồn ưu tiên</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Chi tiết so sánh (Supplier: Price)</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q, i) => (
                    <tr key={i} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                      <td className='p-4'>
                        <Typography variant='body2' className='font-black'>{q.region}</Typography>
                      </td>
                      <td className='p-4'>
                        <Typography variant='body2' className='font-black text-success'>{q.bestPrice}</Typography>
                      </td>
                      <td className='p-4'>
                        <Chip label={q.supplier} size='small' color='primary' variant='tonal' className='font-bold' />
                      </td>
                      <td className='p-4'>
                        <Stack direction='row' spacing={2}>
                          {q.compare.map((c, ci) => (
                            <Tooltip key={ci} title={c.status}>
                              <Box className={`px-2 py-1 rounded border ${c.status === 'Active' ? 'bg-primary/10 border-primary/20' : 'bg-slate-50 border-slate-100'}`}>
                                <Typography variant='caption' className='font-bold'>{c.name}: {c.price}</Typography>
                              </Box>
                            </Tooltip>
                          ))}
                        </Stack>
                      </td>
                      <td className='p-4 text-right'>
                        <Button size='small' variant='text'>Đổi nguồn</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </>
  )
}

import Tooltip from '@mui/material/Tooltip'

export default SupplierQuotes
