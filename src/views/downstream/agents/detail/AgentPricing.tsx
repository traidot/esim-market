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

  const agentName = id.toUpperCase() === 'A001' ? 'TravelConnect Solutions' : 'Global eSIM Hub'
  const agentTier = id.toUpperCase() === 'A001' ? 'PLATINUM' : 'GOLD'
  const tierMarkup = agentTier === 'PLATINUM' ? 5 : 10

  const [inheritTier, setInheritTier] = useState(true)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const countries = [
    { code: 'JP', name: 'Nhật Bản', defaultMarkup: `${tierMarkup}%`, customMarkup: '10%', status: 'Custom' },
    { code: 'US', name: 'Hoa Kỳ', defaultMarkup: `${tierMarkup}%`, customMarkup: '-', status: 'Default' },
    { code: 'TH', name: 'Thái Lan', defaultMarkup: `${tierMarkup}%`, customMarkup: '12%', status: 'Custom' },
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
        </Tabs>

        {activeTab === 0 && (
          <CardContent className='p-8'>
            <Box className='flex items-center gap-2 mbe-2'>
              <Typography variant='h5' className='font-black'>Cấu hình Giá Toàn hệ thống</Typography>
              <Chip label="Ưu tiên: Cao" color="primary" size="small" variant="tonal" className="h-5" />
            </Box>
            <Typography variant='body2' className='text-slate-500 mbe-6'>
              Mức Markup này sẽ được áp dụng cho toàn bộ eSIM của đại lý này, **ghi đè hoàn toàn** cấu hình mặc định theo Cấp bậc (Tier).
            </Typography>
            
            <Grid2 container spacing={8}>
              <Grid2 size={{ xs: 12, md: 7 }}>
                <Stack spacing={6}>
                  <Box className='flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200'>
                    <FormControlLabel
                      control={<Switch checked={inheritTier} onChange={(e) => setInheritTier(e.target.checked)} color='primary' />}
                      label={
                        <Box>
                          <Typography className='font-black'>Kế thừa cấu hình từ Cấp bậc (Tier)</Typography>
                          <Typography variant='caption' className='text-slate-400'>Cấp bậc hiện tại: {agentTier} (Markup +{tierMarkup}%)</Typography>
                        </Box>
                      }
                    />
                    {inheritTier && (
                      <Chip label={`Đang áp dụng: +${tierMarkup}%`} color='success' variant='tonal' size='small' className='font-black' />
                    )}
                  </Box>

                  {!inheritTier && (
                    <Box>
                      <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500 text-primary'>Tỉ lệ nâng giá riêng (%)</Typography>
                      <TextField 
                        fullWidth 
                        placeholder={`Ví dụ: 8`}
                        defaultValue={tierMarkup} 
                        InputProps={{ 
                          endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                          className: 'font-black text-lg'
                        }}
                        helperText={`Ghi đè mức +${tierMarkup}% của cấp bậc ${agentTier}`}
                      />
                    </Box>
                  )}
                </Stack>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 5 }}>
                <Card className='bg-indigo-50/50 border-indigo-100 border border-solid shadow-none'>
                  <CardContent className='p-6'>
                    <Typography variant='subtitle2' className='font-black mbe-4 uppercase text-[11px] text-indigo-600 flex items-center gap-2'>
                      <i className='tabler-calculator' />
                      Bảng tính giá minh họa
                    </Typography>
                    
                    <Stack spacing={3}>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' className='text-slate-500'>Giá gốc (Upstream Cost):</Typography>
                        <Typography variant='body2' className='font-bold'>$10.00</Typography>
                      </Box>
                      <Box className='flex justify-between'>
                        <Typography variant='body2' className='text-slate-500'>Tỉ lệ nâng giá:</Typography>
                        <Typography variant='body2' className='font-black text-indigo-600'>+{inheritTier ? tierMarkup : 8}%</Typography>
                      </Box>
                      <Divider className='border-indigo-100 border-dashed' />
                      <Box className='flex justify-between items-center'>
                        <Typography variant='body1' className='font-black'>Giá bán cho Đại lý:</Typography>
                        <Typography variant='h5' className='font-black text-primary'>
                          ${(10 * (1 + (inheritTier ? tierMarkup : 8) / 100)).toFixed(2)}
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Box className='mt-4 p-3 bg-white rounded border border-indigo-100'>
                      <Typography variant='caption' className='text-slate-400 italic block'>
                        * Giá trên chỉ mang tính chất minh họa dựa trên ví dụ $10.00 giá gốc. Giá thực tế sẽ thay đổi theo từng gói cước.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
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

      </Card>
    </>
  )
}

export default AgentPricing
