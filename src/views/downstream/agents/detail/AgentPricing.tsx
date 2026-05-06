'use client'

import { useState } from 'react'
import Link from 'next/link'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentPricing = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const agentName = id.toUpperCase() === 'A001' ? 'TravelConnect Solutions' : 'Global eSIM Hub'

  const countries = [
    { code: 'JP', name: 'Nhật Bản', defaultMarkup: '15%', customMarkup: '10%', status: 'Custom' },
    { code: 'US', name: 'Hoa Kỳ', defaultMarkup: '15%', customMarkup: '-', status: 'Default' },
    { code: 'TH', name: 'Thái Lan', defaultMarkup: '15%', customMarkup: '12%', status: 'Custom' },
  ]

  const packages = [
    { sku: 'JP-10GB-7D', name: 'Nhật Bản 10GB 7 Ngày', basePrice: '$5.00', retailPrice: '$8.00', agentPrice: '$6.50', profit: '$1.50' },
    { sku: 'US-UNL-15D', name: 'Mỹ Không Giới Hạn 15 Ngày', basePrice: '$15.00', retailPrice: '$25.00', agentPrice: '$20.00', profit: '$5.00' },
  ]

  return (
    <>
      <PageHeader
        title={`Cấu hình Giá đặc thù: ${agentName}`}
        description="Thiết lập các quy tắc Ghi đè (Override) dành riêng cho đại lý này. Lưu ý: Cấu hình tại đây sẽ có độ ưu tiên cao nhất, vượt qua Bảng giá chuẩn hệ thống."
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Đại lý', href: '/downstream/agents' }, 
          { label: agentName, href: `/downstream/agents/${id}` },
          { label: 'Cấu hình Giá' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary' component={Link} href={`/downstream/agents/${id}`}>Quay lại</Button>
            <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu Cấu hình</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <Tabs value={activeTab} onChange={handleTabChange} className='border-be'>
          <Tab label="1. Toàn hệ thống (Global)" />
          <Tab label="2. Theo Quốc gia (Country)" />
          <Tab label="3. Theo Gói cước (Package)" />
        </Tabs>

        {activeTab === 0 && (
          <CardContent className='p-8'>
            <Box className='flex items-center gap-2 mbe-2'>
              <Typography variant='h5' className='font-black'>Cấu hình Giá Toàn hệ thống</Typography>
              <Chip label="Ưu tiên: Cao" color="primary" size="small" variant="tonal" className="h-5" />
            </Box>
            <Typography variant='body2' className='text-slate-500 mbe-6'>
              Mức chiết khấu hoặc Markup này sẽ được áp dụng cho toàn bộ eSIM của đại lý này, **ghi đè hoàn toàn** cấu hình mặc định theo Cấp bậc (Tier).
            </Typography>
            
            <Grid2 container spacing={6} className='max-w-2xl'>
              <Grid2 size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Switch defaultChecked color='primary' />}
                  label={<Typography className='font-bold'>Kế thừa cấu hình từ Cấp bậc (Tier)</Typography>}
                  className='mbe-4'
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label='Giảm giá trên Giá niêm yết (Marketplace Discount)' 
                  defaultValue={15} 
                  InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                  helperText="Đại lý sẽ mua rẻ hơn giá niêm yết trên Chợ 15%"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label='Giá cố định cộng thêm (Fixed Fee)' 
                  defaultValue={0} 
                  InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                  helperText="Cộng thêm một khoản cố định vào mỗi đơn hàng"
                />
              </Grid2>
            </Grid2>
          </CardContent>
        )}

        {activeTab === 1 && (
          <CardContent className='p-0'>
            <Box className='p-6 border-be flex justify-between items-center bg-slate-50'>
              <Box>
                <Typography variant='h6' className='font-black'>Ghi đè giá theo Quốc gia</Typography>
                <Typography variant='body2' className='text-slate-500'>Thiết lập mức chiết khấu đặc biệt cho từng vùng. Sẽ ghi đè cấu hình Toàn hệ thống.</Typography>
              </Box>
              <Button variant='outlined' size='small' startIcon={<i className='tabler-plus' />}>Thêm Quốc gia</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className='font-black uppercase text-[11px]'>Quốc gia</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Cấu hình gốc (Tier)</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Cấu hình riêng (Đại lý)</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countries.map((country) => (
                    <TableRow key={country.code}>
                      <TableCell>
                        <Box className='flex items-center gap-2'>
                          <i className={`fis fi fi-${country.code.toLowerCase()} rounded-full text-xl`} />
                          <Typography className='font-bold'>{country.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell className='text-slate-500'>Markup {country.defaultMarkup}</TableCell>
                      <TableCell>
                        {country.status === 'Custom' ? (
                          <TextField size='small' defaultValue={parseInt(country.customMarkup)} InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }} className='w-24' />
                        ) : (
                          <Typography className='text-slate-400 italic'>- Theo Tier -</Typography>
                        )}
                      </TableCell>
                      <TableCell className='text-center'>
                        <Chip label={country.status} size='small' color={country.status === 'Custom' ? 'primary' : 'default'} variant='tonal' />
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button size='small' color='error'>Xóa</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}

        {activeTab === 2 && (
          <CardContent className='p-0'>
            <Box className='p-6 border-be flex justify-between items-center bg-slate-50'>
              <Box>
                <Typography variant='h6' className='font-black'>Ghi đè giá theo Gói cụ thể (SKU)</Typography>
                <Typography variant='body2' className='text-slate-500'>Thiết lập mức giá FIX CỨNG cho đại lý đối với một gói cụ thể. Mức ưu tiên cao nhất.</Typography>
              </Box>
              <Button variant='outlined' size='small' startIcon={<i className='tabler-plus' />}>Thêm Gói</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className='font-black uppercase text-[11px]'>Gói cước (SKU)</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Giá Vốn (Cost)</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Giá Niêm yết (Marketplace)</TableCell>
                    <TableCell className='font-black uppercase text-[11px]'>Giá Riêng (Agent Pays)</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Lợi Nhuận Gộp</TableCell>
                    <TableCell className='font-black uppercase text-[11px] text-right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.sku}>
                      <TableCell>
                        <Typography variant='body2' className='font-black'>{pkg.name}</Typography>
                        <Typography variant='caption' className='text-slate-400'>{pkg.sku}</Typography>
                      </TableCell>
                      <TableCell className='text-right text-slate-500 line-through'>{pkg.basePrice}</TableCell>
                      <TableCell className='text-right font-bold'>{pkg.retailPrice}</TableCell>
                      <TableCell>
                        <TextField size='small' defaultValue={parseFloat(pkg.agentPrice.replace('$', ''))} InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }} className='w-32 bg-warning/5' />
                      </TableCell>
                      <TableCell className='text-right'>
                        <Typography variant='body2' className='font-black text-success'>{pkg.profit}</Typography>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button size='small' color='error'>Xóa</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </>
  )
}

export default AgentPricing
