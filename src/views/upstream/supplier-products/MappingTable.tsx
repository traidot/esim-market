'use client'

import { useState } from 'react'
import Grid2 from '@mui/material/Grid2'
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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'

import PageHeader from '@/components/layout/shared/PageHeader'

const MappingTable = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mockData = [
    { id: 'sp1', supplier: 'Airalo', region: 'Asia', country: 'Japan', externalName: 'Japan - 10GB - 30 Days', externalCode: 'airalo-jp-10gb', costPrice: '$12.50', mappedProductId: 'mp1', status: 'mapped' },
    { id: 'sp2', supplier: 'Airalo', region: 'North America', country: 'USA', externalName: 'USA - 20GB - 30 Days', externalCode: 'airalo-us-20gb', costPrice: '$22.00', mappedProductId: '', status: 'unmapped' },
    { id: 'sp3', supplier: 'Nomad', region: 'Europe', country: 'Germany', externalName: 'Europe 5GB (15D)', externalCode: 'nomad-eu-5gb', costPrice: '$10.00', mappedProductId: 'mp3', status: 'mapped' },
    { id: 'sp4', supplier: 'GoMoWorld', region: 'Asia', country: 'Vietnam', externalName: 'Vietnam Special 15GB', externalCode: 'gomo-vn-15gb', costPrice: '$6.50', mappedProductId: '', status: 'unmapped' }
  ]

  const marketplaceProducts = [
    { id: 'mp1', name: 'Gói Nhật Bản Siêu Tốc 10GB' },
    { id: 'mp2', name: 'Gói Mỹ Unlimit 20GB' },
    { id: 'mp3', name: 'Gói Châu Âu Wanderlust 5GB' }
  ]

  return (
    <>
      <PageHeader
        title="Ma trận Ánh xạ (Mapping Matrix)"
        description="Quản lý việc kết nối hàng ngàn gói cước từ Supplier vào hệ thống Marketplace"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Nguồn cung' }, { label: 'Ánh xạ sản phẩm' }]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' startIcon={<i className='tabler-wand' />} color='primary'>Smart Match (AI)</Button>
            <Button variant='contained' startIcon={<i className='tabler-refresh' />} color='primary'>Run Auto-Sync</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6} className='mbe-6'>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
          <Card className='border-none shadow-sm bg-primary/5 border-primary/20'>
            <CardContent className='flex items-center gap-4'>
              <Avatar variant='rounded' color='primary' className='bg-primary/10 text-primary'>
                <i className='tabler-package' />
              </Avatar>
              <Box>
                <Typography variant='h6' className='font-black'>102,450</Typography>
                <Typography variant='caption' className='text-slate-500'>Tổng gói cước</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
          <Card className='border-none shadow-sm bg-success/5 border-success/20'>
            <CardContent className='flex items-center gap-4'>
              <Avatar variant='rounded' color='success' className='bg-success/10 text-success'>
                <i className='tabler-check' />
              </Avatar>
              <Box>
                <Typography variant='h6' className='font-black'>98,120</Typography>
                <Typography variant='caption' className='text-slate-500'>Đã khớp hoàn toàn</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
          <Card className='border-none shadow-sm bg-warning/5 border-warning/20'>
            <CardContent className='flex items-center gap-4'>
              <Avatar variant='rounded' color='warning' className='bg-warning/10 text-warning'>
                <i className='tabler-alert-triangle' />
              </Avatar>
              <Box>
                <Typography variant='h6' className='font-black'>4,330</Typography>
                <Typography variant='caption' className='text-slate-500'>Cần kiểm tra (New/Change)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={6}>
        {/* Sidebar Filter */}
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card className='border-none shadow-sm sticky top-24'>
            <CardContent>
              <Typography variant='h6' className='font-black mbe-4 flex items-center gap-2 text-primary'>
                <i className='tabler-filter' /> Phân lọc dữ liệu lớn
              </Typography>
              
              <Box className='mbe-6'>
                <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-slate-500 text-[11px]'>Thao tác hàng loạt</Typography>
                <Stack spacing={2}>
                  <Button fullWidth variant='tonal' size='small' startIcon={<i className='tabler-check-all' />}>Khớp toàn bộ Japan</Button>
                  <Button fullWidth variant='tonal' size='small' color='secondary' startIcon={<i className='tabler-adjustments-horizontal' />}>Gán Category theo Tên</Button>
                </Stack>
              </Box>

              <Divider className='mbe-6' />

              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-slate-500 text-[11px]'>Nhà cung cấp</Typography>
              <FormGroup className='mbe-6'>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label={<Typography variant="body2">Airalo</Typography>} />
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label={<Typography variant="body2">Nomad</Typography>} />
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography variant="body2">GoMoWorld</Typography>} />
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography variant="body2">KeepGo</Typography>} />
              </FormGroup>

              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-slate-500 text-[11px]'>Vùng / Lãnh thổ</Typography>
              <FormGroup className='mbe-6'>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label={<Typography variant="body2">Châu Á</Typography>} />
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography variant="body2">Châu Âu</Typography>} />
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography variant="body2">Bắc Mỹ</Typography>} />
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography variant="body2">Toàn cầu</Typography>} />
              </FormGroup>

              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-slate-500 text-[11px]'>Trạng thái Mapping</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label={<Typography variant="body2">Đã ánh xạ</Typography>} />
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label={<Typography variant="body2">Chưa ánh xạ</Typography>} />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid2>

        {/* Main Mapping Table */}
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Card className='border-none shadow-sm'>
            <CardContent className='p-0'>
              <Box className='overflow-x-auto'>
                <table className='w-full text-left border-collapse min-w-[900px]'>
                  <thead>
                    <tr className='bg-slate-50 border-be'>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Sản phẩm Nguồn (Supplier)</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase text-center'>Khu vực</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá vốn</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase'>Ánh xạ vào Chợ</th>
                      <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.map((row) => (
                      <tr key={row.id} className='border-be last:border-0 hover:bg-slate-50/50 transition-colors'>
                        <td className='p-4'>
                          <Box className='flex items-start gap-3'>
                            <Box className='p-2 bg-slate-100 rounded text-slate-600 font-black text-[10px] uppercase'>
                              {row.supplier[0]}
                            </Box>
                            <Box>
                              <Typography variant='body2' className='font-black'>{row.externalName}</Typography>
                              <Typography variant='caption' className='text-slate-400 font-mono'>{row.externalCode}</Typography>
                            </Box>
                          </Box>
                        </td>
                        <td className='p-4 text-center'>
                          <Chip label={row.region} size='small' variant='tonal' color='info' className='font-bold text-[10px]' />
                        </td>
                        <td className='p-4'>
                          <Typography variant='body2' className='font-black text-success'>{row.costPrice}</Typography>
                        </td>
                        <td className='p-4'>
                          <Select 
                            fullWidth 
                            size='small' 
                            value={row.mappedProductId}
                            displayEmpty
                            sx={{ minWidth: 250 }}
                          >
                            <MenuItem value="">
                              <em className='text-slate-400'>-- Chọn sản phẩm Marketplace --</em>
                            </MenuItem>
                            {marketplaceProducts.map(p => (
                              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                            ))}
                          </Select>
                          {row.status === 'unmapped' && (
                            <Typography variant='caption' color='warning.main' className='flex items-center gap-1 mt-1'>
                              <i className='tabler-alert-triangle text-[12px]' /> Cần ánh xạ ngay
                            </Typography>
                          )}
                        </td>
                        <td className='p-4 text-right'>
                          <Box className='flex justify-end gap-2'>
                            <Tooltip title="Xác nhận Ánh xạ">
                              <IconButton size='small' color='primary' className='bg-primary/10'><i className='tabler-check' /></IconButton>
                            </Tooltip>
                            <Tooltip title="Bỏ qua / Xóa">
                              <IconButton size='small' color='error' className='bg-error/10'><i className='tabler-x' /></IconButton>
                            </Tooltip>
                          </Box>
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

export default MappingTable
