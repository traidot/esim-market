'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid2 from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'

import PageHeader from '@/components/layout/shared/PageHeader'

const SupplierQuotes = () => {
  const [showValidation, setShowValidation] = useState(false)

  // Giả lập dữ liệu báo giá đang chờ kiểm tra (Validation Area)
  const validationData = [
    { id: 1, country: 'Japan', pkg: '10GB', oldPrice: '$8.50', newPrice: '$8.00', change: '-5.8%', status: 'Price Down', health: 'Clean' },
    { id: 2, country: 'USA', pkg: '20GB', oldPrice: '$22.00', newPrice: '$23.50', change: '+6.8%', status: 'Price Up', health: 'Clean' },
    { id: 3, country: 'Vietnam', pkg: 'Unlimited', oldPrice: '$5.50', newPrice: '$5.50', change: '0%', status: 'No Change', health: 'Clean' },
    { id: 4, country: 'Europe', pkg: '5GB', oldPrice: '$9.00', newPrice: '$0.00', change: 'ERR', status: 'Invalid Price', health: 'Error' },
    { id: 5, country: 'Thái Lan', pkg: '7D Unlim', oldPrice: 'N/A', newPrice: '$6.50', change: 'New', status: 'New Product', health: 'Clean' }
  ]

  return (
    <>
      <PageHeader
        title="Trung tâm Quản lý Báo giá (Quote Center)"
        description="Quản lý việc tải lên, làm sạch dữ liệu và kiểm soát biến động giá từ các nhà cung cấp"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Quản lý Báo giá' }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' startIcon={<i className='tabler-history' />}>Lịch sử Upload</Button>
            <Button variant='contained' startIcon={<i className='tabler-upload' />} onClick={() => setShowValidation(true)}>
              Tải lên Báo giá mới
            </Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='border-none shadow-sm'>
            <CardContent>
              <Typography variant='h6' className='font-black mbe-4'>Lịch sử cập nhật gần đây</Typography>
              <Stack spacing={4}>
                {[
                  { name: 'NCC1_Quote_Apr_2026.xlsx', date: '26/04/2026 14:30', status: 'Completed', items: 277, changes: 12 },
                  { name: 'ZEYFI_Price_List_Global.xlsx', date: '26/04/2026 10:15', status: 'Completed', items: 2835, changes: 105 },
                  { name: 'Nomad_Flash_Sale.xlsx', date: '25/04/2026 09:00', status: 'Rejected', items: 50, changes: 0 }
                ].map((item, index) => (
                  <Box key={index} className='p-4 border rounded-xl flex justify-between items-center bg-slate-50/50'>
                    <Box className='flex items-center gap-4'>
                      <Avatar variant='rounded' className='bg-primary/10 text-primary'>
                        <i className='tabler-file-spreadsheet' />
                      </Avatar>
                      <Box>
                        <Typography variant='body2' className='font-black'>{item.name}</Typography>
                        <Typography variant='caption' className='text-slate-400'>{item.date} • {item.items} gói cước</Typography>
                      </Box>
                    </Box>
                    <Box className='flex items-center gap-4 text-right'>
                      <Box>
                        <Typography variant='caption' className='block font-bold text-success'>+{item.changes} cập nhật</Typography>
                        <Chip label={item.status} size='small' variant='tonal' color={item.status === 'Completed' ? 'success' : 'error'} />
                      </Box>
                      <IconButton size='small'><i className='tabler-dots-vertical' /></IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white'>
            <CardContent className='flex flex-col justify-between h-full'>
              <Box>
                <Typography variant='h6' className='text-white font-black mbe-2'>Sức khỏe Báo giá</Typography>
                <Typography variant='body2' className='text-slate-400 mbe-6'>Hệ thống đang theo dõi 3.112 gói cước từ 3 nhà cung cấp.</Typography>
                
                <Box className='mbe-4'>
                  <Box className='flex justify-between mbe-1'>
                    <Typography variant='caption' className='text-slate-300'>Độ tin cậy dữ liệu</Typography>
                    <Typography variant='caption' className='text-success'>98.5%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={98.5} color='success' className='h-1.5 rounded-full' />
                </Box>

                <Box>
                  <Box className='flex justify-between mbe-1'>
                    <Typography variant='caption' className='text-slate-300'>Tỷ lệ trượt giá (24h)</Typography>
                    <Typography variant='caption' className='text-warning'>1.2%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={1.2} color='warning' className='h-1.5 rounded-full' />
                </Box>
              </Box>

              <Button fullWidth variant='contained' className='bg-white text-slate-900 hover:bg-slate-100 font-black mt-8'>
                Xem báo cáo biến động giá
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {showValidation && (
        <Card className='border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <CardContent>
            <Box className='flex justify-between items-center mbe-6'>
              <Box>
                <Typography variant='h6' className='font-black'>
                  <i className='tabler-analyze text-primary mis-2' /> Giai đoạn 2: Kiểm tra & Làm sạch dữ liệu
                </Typography>
                <Typography variant='caption'>Đang so sánh file <strong>NCC1_New.xlsx</strong> với dữ liệu hiện tại...</Typography>
              </Box>
              <Stack direction='row' spacing={2}>
                <Button variant='tonal' color='secondary' onClick={() => setShowValidation(false)}>Hủy bỏ</Button>
                <Button variant='contained' color='success' startIcon={<i className='tabler-check' />}>Xác nhận Cập nhật vào DB</Button>
              </Stack>
            </Box>

            <Alert severity="warning" className='mbe-6'>
              Phát hiện <strong>1 dòng có lỗi giá ($0.00)</strong> và <strong>1 sản phẩm mới</strong> chưa có trong danh mục Marketplace.
            </Alert>

            <Box className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-be'>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá cũ</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá mới</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Biến động (%)</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái làm sạch</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {validationData.map((row) => (
                    <tr key={row.id} className='border-be last:border-0 hover:bg-slate-50/50'>
                      <td className='p-4'>
                        <Typography variant='body2' className='font-black'>{row.country} - {row.pkg}</Typography>
                      </td>
                      <td className='p-4'><Typography variant='body2' className='text-slate-400'>{row.oldPrice}</Typography></td>
                      <td className='p-4'>
                        <Typography variant='body2' className={`font-black ${row.health === 'Error' ? 'text-error underline' : ''}`}>
                          {row.newPrice}
                        </Typography>
                      </td>
                      <td className='p-4'>
                        <Chip 
                          label={row.change} 
                          size='small' 
                          color={row.change.startsWith('-') ? 'success' : row.change.startsWith('+') ? 'error' : 'secondary'} 
                          variant='tonal'
                          className='font-bold'
                        />
                      </td>
                      <td className='p-4'>
                        <Box className='flex items-center gap-1'>
                          <i className={`tabler-${row.health === 'Clean' ? 'circle-check text-success' : 'circle-x text-error'}`} />
                          <Typography variant='caption'>{row.status}</Typography>
                        </Box>
                      </td>
                      <td className='p-4 text-right'>
                        {row.health === 'Error' ? (
                          <Button size='small' variant='tonal' color='error'>Sửa lỗi</Button>
                        ) : (
                          <Button size='small' variant='text' color='secondary'>Bỏ qua</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  )
}

import IconButton from '@mui/material/IconButton'

export default SupplierQuotes
