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
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'

import PageHeader from '@/components/layout/shared/PageHeader'

const AgentPriceList = ({ id }: { id: string }) => {
  const agentName = id.toUpperCase() === 'A001' ? 'TravelConnect Solutions' : 'Global eSIM Hub'
  const agentTier = id.toUpperCase() === 'A001' ? 'PLATINUM' : 'GOLD'

  const packages = [
    { sku: 'JP-10GB-7D', country: 'Nhật Bản', name: '10GB 7 Ngày', basePrice: 5.00, retailPrice: 8.00, agentPrice: 6.50, appliedRule: 'Ghi đè Gói (Package Level)' },
    { sku: 'JP-UNL-15D', country: 'Nhật Bản', name: 'Không Giới Hạn 15 Ngày', basePrice: 12.00, retailPrice: 18.00, agentPrice: 14.40, appliedRule: 'Quốc gia (+20%)' },
    { sku: 'US-5GB-10D', country: 'Hoa Kỳ', name: '5GB 10 Ngày', basePrice: 8.00, retailPrice: 14.00, agentPrice: 11.90, appliedRule: `Tier ${agentTier}` },
    { sku: 'TH-50GB-10D', country: 'Thái Lan', name: '50GB 10 Ngày', basePrice: 3.50, retailPrice: 6.00, agentPrice: 5.10, appliedRule: 'Quốc gia (+15%)' },
    { sku: 'EU-10GB-30D', country: 'Châu Âu (33 nước)', name: '10GB 30 Ngày', basePrice: 15.00, retailPrice: 24.00, agentPrice: 20.40, appliedRule: `Tier ${agentTier}` },
  ]

  const getRuleColor = (rule: string) => {
    if (rule.includes('Gói')) return 'error'
    if (rule.includes('Quốc gia')) return 'warning'
    return 'primary'
  }

  return (
    <>
      <PageHeader
        title={`Bảng giá Đại lý: ${agentName}`}
        description={`Danh sách giá bán cuối cùng được áp dụng cho đại lý này sau khi tính toán mọi quy tắc chiết khấu.`}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' }, 
          { label: 'Đại lý', href: '/downstream/agents' }, 
          { label: agentName, href: `/downstream/agents/${id}` },
          { label: 'Bảng giá' }
        ]}
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='tonal' color='secondary' component={Link} href={`/downstream/agents/${id}`}>Quay lại</Button>
            <Button variant='contained' color='success' startIcon={<i className='tabler-file-spreadsheet' />}>Xuất Excel</Button>
          </Stack>
        }
        className='mbe-6'
      />

      <Box className='mbe-6 p-4 bg-primary/5 border border-dashed border-primary/20 rounded-xl flex items-center gap-4'>
        <i className='tabler-info-circle text-primary text-2xl' />
        <Typography variant='body2' className='text-slate-600'>
          Đại lý <strong>{agentName}</strong> đang thuộc nhóm <strong>{agentTier}</strong>. 
          Bảng giá dưới đây đã bao gồm các quy tắc ghi đè theo <span className='text-warning font-bold'>Quốc gia</span> hoặc <span className='text-error font-bold'>Gói cước</span> cụ thể.
        </Typography>
      </Box>

      <Card className='border-none shadow-sm'>
        <Box className='p-6 border-be'>
          <Grid2 container spacing={4} className='w-full'>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField 
                fullWidth 
                placeholder='Tìm kiếm SKU, tên gói...' 
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Quốc gia'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='jp'>Nhật Bản</MenuItem>
                <MenuItem value='us'>Hoa Kỳ</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField select fullWidth size='small' defaultValue='all' label='Quy tắc áp dụng'>
                <MenuItem value='all'>Tất cả quy tắc</MenuItem>
                <MenuItem value='pkg'>Ghi đè Gói</MenuItem>
                <MenuItem value='country'>Ghi đè Quốc gia</MenuItem>
                <MenuItem value='tier'>Giá mặc định (Tier)</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Gói cước (SKU)</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Vùng/Quốc gia</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Giá Gốc</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Giá Niêm yết</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right bg-primary/5 text-primary'>Giá Đại lý</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right text-success'>Lợi nhuận</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Cơ sở tính giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => {
                const profit = pkg.agentPrice - pkg.basePrice
                
                return (
                  <TableRow key={pkg.sku} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-black'>{pkg.name}</Typography>
                      <Typography variant='caption' className='text-slate-400'>{pkg.sku}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' className='font-bold'>{pkg.country}</Typography>
                    </TableCell>
                    <TableCell className='text-right text-slate-400'>${pkg.basePrice.toFixed(2)}</TableCell>
                    <TableCell className='text-right text-slate-400'>${pkg.retailPrice.toFixed(2)}</TableCell>
                    <TableCell className='text-right bg-primary/5'>
                      <Typography variant='subtitle2' className='font-black text-primary'>
                        ${pkg.agentPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Typography variant='body2' className='font-black text-success'>
                        ${profit.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={pkg.appliedRule} 
                        color={getRuleColor(pkg.appliedRule) as any} 
                        size='small' 
                        variant='tonal' 
                        className='font-bold'
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default AgentPriceList
