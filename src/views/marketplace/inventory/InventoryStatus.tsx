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
        description="Theo dõi hạn mức API của các nhà cung cấp và quản lý các lô mã eSIM nhập tay"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chợ eSIM' }, { label: 'Kho' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-download' />}>Nhập lô mã mới</Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* API Quota Usage */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardHeader 
              title='Hạn mức API (API Quotas)' 
              subheader='Dữ liệu được cập nhật tự động từ các Supplier'
              action={<Button variant='tonal' size='small' startIcon={<i className='tabler-refresh' />}>Làm mới</Button>}
            />
            <Divider />
            <CardContent>
              <Grid2 container spacing={6}>
                {quotas.map((q, i) => (
                  <Grid2 key={i} size={{ xs: 12, md: 4 }}>
                    <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100'>
                      <Box className='flex justify-between items-center mbe-2'>
                        <Typography variant='body2' className='font-black'>{q.supplier}</Typography>
                        <Typography variant='caption' className='font-bold'>{q.used}/{q.total}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(q.used / q.total) * 100} 
                        color={q.color as any}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant='caption' className='text-slate-400 mt-2 block'>
                        Còn lại: {q.total - q.used} giao dịch
                      </Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        {/* Static Inventory Batches */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardHeader 
              title='Lô mã eSIM nhập tay (Manual Batches)' 
              subheader='Danh sách các mã eSIM được nhập trực tiếp vào hệ thống'
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
