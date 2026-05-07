'use client'

import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import PageHeader from '@/components/layout/shared/PageHeader'

const InventoryStatus = () => {
  const quotas = [
    { supplier: 'Airalo API', used: 450, total: 1000, color: 'primary' },
    { supplier: 'Nomad API', used: 1200, total: 5000, color: 'success' },
    { supplier: 'GoMoWorld API', used: 80, total: 100, color: 'error' }
  ]

  const batches = [
    { id: 'B001', name: 'Vietnam Viettel 5GB', type: 'Mã cứng (Static)', count: 250, remaining: 45, date: '2026-04-20' },
    { id: 'B002', name: 'Thailand AIS 10GB', type: 'Mã cứng (Static)', count: 100, remaining: 12, date: '2026-04-22' }
  ]

  return (
    <>
      <PageHeader
        title="Quản lý Kho (Inventory)"
        description="Quản lý và theo dõi các lô mã eSIM nhập tay trực tiếp vào hệ thống"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Kho' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-download' />}>Nhập lô mã mới</Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>

        {/* Static Inventory Batches */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardHeader 
              title='Lô mã eSIM nhập tay (Manual Batches)' 
              subheader='Danh sách các mã eSIM được nhập trực tiếp vào hệ thống'
              action={
                <Button 
                  variant='tonal' 
                  color='primary' 
                  size='small' 
                  startIcon={<i className='tabler-file-download' />}
                  className='font-black'
                >
                  Xuất Excel
                </Button>
              }
            />
            <CardContent className='p-0'>
              <Box className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='bg-slate-50 border-be'>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Mã lô</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Tên sản phẩm</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Loại</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Số lượng</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Còn lại</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ngày nhập</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr key={b.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                        <td className='p-4'><Typography variant='body2' className='font-mono font-bold text-primary'>{b.id}</Typography></td>
                        <td className='p-4'><Typography variant='body2' className='font-black'>{b.name}</Typography></td>
                        <td className='p-4'><Chip label={b.type} size='small' variant='tonal' color='info' /></td>
                        <td className='p-4'><Typography variant='body2' className='font-bold'>{b.count}</Typography></td>
                        <td className='p-4'>
                          <Box className='flex items-center gap-2'>
                            <Typography variant='body2' className='font-black' color={b.remaining < 20 ? 'error' : 'inherit'}>
                              {b.remaining}
                            </Typography>
                            {b.remaining < 20 && <i className='tabler-alert-triangle text-error text-sm anim-pulse' />}
                          </Box>
                        </td>
                        <td className='p-4'><Typography variant='caption'>{b.date}</Typography></td>
                        <td className='p-4 text-right'>
                          <Button size='small' variant='text'>Quản lý mã</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

export default InventoryStatus
