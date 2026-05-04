'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid2 from '@mui/material/Grid2'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import PageHeader from '@/components/layout/shared/PageHeader'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const CreateOrder = () => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = React.useState<'debt' | 'wallet'>('debt')

  const handleCreateOrder = () => {
    toast.success('Tạo đơn hàng thành công!')
    router.push('/orders/list')
  }

  return (
    <>
      <PageHeader
        title="New Order"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đơn hàng', href: '/orders/list' }, { label: 'New Order' }]}
        className='mbe-6'
      />

      <Card className='border-none shadow-sm'>
        <CardContent className='p-8'>
          <Box component='form' noValidate autoComplete='off' className='flex flex-col gap-6 max-w-4xl mx-auto'>
            <Grid2 container spacing={4} alignItems="center">
              
              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>Country/ Region:</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField select fullWidth size='small' defaultValue="" sx={{ '& .MuiSelect-select': { color: 'text.secondary' } }}>
                  <MenuItem value="" disabled><em>Please select (only support keyword queries for country names...)</em></MenuItem>
                  <MenuItem value="JP">Nhật Bản</MenuItem>
                  <MenuItem value="TH">Thái Lan</MenuItem>
                  <MenuItem value="KR">Hàn Quốc</MenuItem>
                  <MenuItem value="US">Hoa Kỳ</MenuItem>
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>Day(s):</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField select fullWidth size='small' defaultValue="" sx={{ '& .MuiSelect-select': { color: 'text.secondary' } }}>
                  <MenuItem value="" disabled><em>Select Days</em></MenuItem>
                  <MenuItem value="7">7 Ngày</MenuItem>
                  <MenuItem value="15">15 Ngày</MenuItem>
                  <MenuItem value="30">30 Ngày</MenuItem>
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>Specification(s):</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField select fullWidth size='small' defaultValue="" sx={{ '& .MuiSelect-select': { color: 'text.secondary' } }}>
                  <MenuItem value="" disabled><em>Select Specifications</em></MenuItem>
                  <MenuItem value="Daily">Daily Plan</MenuItem>
                  <MenuItem value="Total">Total Plan</MenuItem>
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>
                  <span className='text-error'>*</span> Data Plan:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField select fullWidth size='small' defaultValue="" sx={{ '& .MuiSelect-select': { color: 'text.secondary' } }}>
                  <MenuItem value="" disabled><em>Enter Data plan(Support keyword searching)</em></MenuItem>
                  <MenuItem value="unlimited">Unlimited Data</MenuItem>
                  <MenuItem value="10gb">10GB</MenuItem>
                  <MenuItem value="50gb">50GB</MenuItem>
                </TextField>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>
                  <span className='text-error'>*</span> Quantity:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField type='number' fullWidth size='small' defaultValue="1" />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }}>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>Customer Remarks Order:</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField fullWidth size='small' placeholder="Enter order number" />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }} className='self-start mt-2'>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>Remarks:</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <TextField fullWidth multiline rows={4} placeholder="Enter Remarks" />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 3 }} className='self-start mt-2'>
                <Typography variant='body1' className='font-medium md:text-right text-slate-500'>
                  <span className='text-error'>*</span> Payment Method:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'debt' | 'wallet')}
                  >
                    <Box className={`flex items-center justify-between p-3 border rounded-lg mbe-3 cursor-pointer ${paymentMethod === 'debt' ? 'border-primary bg-primary/5' : 'border-slate-200'}`} onClick={() => setPaymentMethod('debt')}>
                      <FormControlLabel value="debt" control={<Radio />} label={<Typography className='font-bold'>Ghi nhận công nợ (Postpaid)</Typography>} className='m-0' />
                      <Typography variant='caption' className='text-slate-500'>Thanh toán đối soát vào cuối tháng</Typography>
                    </Box>
                    
                    <Box className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-slate-200'}`} onClick={() => setPaymentMethod('wallet')}>
                      <FormControlLabel value="wallet" control={<Radio />} label={<Typography className='font-bold'>Trừ tiền ví (Prepaid)</Typography>} className='m-0' />
                      <Typography variant='caption' className='text-slate-500'>Số dư khả dụng: <strong className='text-success'>$1,500.00</strong></Typography>
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Grid2>
            </Grid2>

            <Box className='flex justify-end m-t-8'>
              <Button 
                variant='contained' 
                color='warning' 
                size='large' 
                className='min-is-[120px] font-bold'
                onClick={handleCreateOrder}
                sx={{ bgcolor: '#d97706', '&:hover': { bgcolor: '#b45309' } }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default CreateOrder
