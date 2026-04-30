'use client'

import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'
import Grid2 from '@mui/material/Grid2'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import PageHeader from '@/components/layout/shared/PageHeader'

const DownstreamTransactions = () => {
  const transactions = [
    { id: 'DTX-5091', agent: 'TravelConnect', action: 'CREATE_ORDER', package: 'Japan 10GB', amount: '$12.50', status: 'Success', date: '28/04/2026 01:15', latency: '320ms' },
    { id: 'DTX-5090', agent: 'Global eSIM Hub', action: 'TOPUP_BALANCE', package: '-', amount: '$500.00', status: 'Success', date: '28/04/2026 00:45', latency: '150ms' },
    { id: 'DTX-5089', agent: 'CheapData Agency', action: 'CREATE_ORDER', package: 'USA 5GB', amount: '$14.00', status: 'Failed', date: '27/04/2026 23:30', latency: '410ms' },
    { id: 'DTX-5088', agent: 'TravelConnect', action: 'CHECK_BALANCE', package: '-', amount: '$0.00', status: 'Success', date: '27/04/2026 22:10', latency: '85ms' },
    { id: 'DTX-5087', agent: 'Nomad Partner', action: 'CREATE_ORDER', package: 'UK Pro', amount: '$45.00', status: 'Success', date: '27/04/2026 21:55', latency: '290ms' },
  ]

  return (
    <>
      <PageHeader
        title="Lịch sử giao dịch Downstream (API Logs)"
        description="Nhật ký chi tiết các lệnh gọi API từ hệ thống của Đại lý vào hệ thống của chúng ta."
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Phân phối' }, { label: 'Giao dịch Đại lý' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm mbe-6'>
        <CardContent>
          <Grid2 container spacing={4} className='items-end'>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Đại lý (Agent)</Typography>
              <Select fullWidth size='small' defaultValue='all'>
                <MenuItem value='all'>Tất cả Đại lý</MenuItem>
                <MenuItem value='travelconnect'>TravelConnect</MenuItem>
                <MenuItem value='globalhub'>Global eSIM Hub</MenuItem>
                <MenuItem value='cheapdata'>CheapData Agency</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Khoảng thời gian</Typography>
              <Stack direction='row' spacing={2}>
                <TextField fullWidth size='small' type='date' defaultValue='2026-04-01' />
                <TextField fullWidth size='small' type='date' defaultValue='2026-04-28' />
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Loại Action (API)</Typography>
              <Select fullWidth size='small' defaultValue='all'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='create'>CREATE_ORDER</MenuItem>
                <MenuItem value='balance'>CHECK_BALANCE</MenuItem>
                <MenuItem value='topup'>TOPUP_BALANCE</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Typography variant='subtitle2' className='font-black mbe-2 uppercase text-[11px] text-slate-500'>Trạng thái</Typography>
              <Select fullWidth size='small' defaultValue='all'>
                <MenuItem value='all'>Tất cả</MenuItem>
                <MenuItem value='success'>200 OK</MenuItem>
                <MenuItem value='failed'>4xx / 5xx Error</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1 }}>
              <Button variant='tonal' color='primary' fullWidth className='min-bs-[38px]'>
                <i className='tabler-search' />
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm overflow-hidden'>
        <Box className='p-5 border-be bg-slate-50/50 flex justify-between items-center gap-4 flex-wrap'>
          <Stack direction='row' spacing={4}>
            <Box>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Tổng API Calls (24h)</Typography>
              <Typography variant='h5' className='font-black text-primary'>14,208</Typography>
            </Box>
            <Box className='border-is ps-4'>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Tỷ lệ lỗi (Error Rate)</Typography>
              <Typography variant='h5' className='font-black text-error'>0.8%</Typography>
            </Box>
            <Box className='border-is ps-4'>
              <Typography variant='caption' className='font-black uppercase text-slate-400'>Avg Latency</Typography>
              <Typography variant='h5' className='font-black text-success'>240ms</Typography>
            </Box>
          </Stack>
          <TextField 
            size='small' 
            placeholder='Tìm Req ID / Trx ID...' 
            className='min-is-[300px] bg-white'
            InputProps={{
              startAdornment: <InputAdornment position='start'><i className='tabler-search' /></InputAdornment>
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead className='bg-slate-50'>
              <TableRow>
                <TableCell className='font-black uppercase text-[11px]'>Mã GD (Req ID)</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Đại lý gọi API</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Action</TableCell>
                <TableCell className='font-black uppercase text-[11px]'>Tham số (Payload)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Ghi nhận ($)</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Trạng thái</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-right'>Thời gian</TableCell>
                <TableCell className='font-black uppercase text-[11px] text-center'>Payload</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} hover>
                  <TableCell className='font-mono text-xs font-bold text-slate-600'>{tx.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' className='font-bold'>{tx.agent}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={tx.action} 
                      size='small' 
                      color='secondary' 
                      variant='tonal'
                      className='font-mono text-[10px] font-black'
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' className='text-slate-500'>{tx.package}</Typography>
                  </TableCell>
                  <TableCell className='text-right font-black text-primary'>
                    {tx.amount !== '$0.00' ? tx.amount : '-'}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                      <Chip 
                        label={tx.status} 
                        size='small' 
                        color={tx.status === 'Success' ? 'success' : 'error'} 
                        variant='tonal'
                        className='font-black'
                      />
                      <Typography variant='caption' className='text-slate-400 font-mono'>{tx.latency}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Typography variant='caption' className='font-bold text-slate-500'>{tx.date}</Typography>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Tooltip title="Xem JSON Request/Response">
                      <IconButton size='small'><i className='tabler-code text-[18px]' /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default DownstreamTransactions
