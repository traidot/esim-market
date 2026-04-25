'use client'

import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

import PageHeader from '@/components/layout/shared/PageHeader'

const PricingRules = () => {
  return (
    <>
      <PageHeader
        title="Công cụ Định giá (Pricing Engine)"
        description="Thiết lập các quy tắc cộng phí (Markup) tự động dựa trên Cấp bậc đại lý hoặc từng sản phẩm cụ thể"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chợ eSIM' }, { label: 'Định giá' }]}
        actions={
          <Button variant='contained' startIcon={<i className='tabler-device-floppy' />}>Lưu Cấu hình</Button>
        }
        className='mbe-6'
      />

      <Grid2 container spacing={6}>
        {/* Global Markup Strategy */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card className='border-none shadow-sm'>
            <CardHeader 
              title='Quy tắc Markup Mặc định' 
              subheader='Áp dụng cho tất cả sản phẩm nếu không có cấu hình riêng'
            />
            <Divider />
            <CardContent>
              <Stack spacing={6}>
                <Box className='flex items-center justify-between'>
                  <Box>
                    <Typography variant='body1' className='font-bold'>Markup Cơ sở (%)</Typography>
                    <Typography variant='caption' className='text-slate-400'>Phần trăm lợi nhuận tối thiểu trên giá vốn supplier</Typography>
                  </Box>
                  <TextField size='small' defaultValue="15" slotProps={{ input: { endAdornment: '%' } }} className='w-32' />
                </Box>
                
                <Box className='flex items-center justify-between'>
                  <Box>
                    <Typography variant='body1' className='font-bold'>Làm tròn giá</Typography>
                    <Typography variant='caption' className='text-slate-400'>Tự động làm tròn đến số thập phân gần nhất</Typography>
                  </Box>
                  <Select size='small' defaultValue="0.01" className='w-32'>
                    <MenuItem value="0.01">0.01</MenuItem>
                    <MenuItem value="0.5">0.5</MenuItem>
                    <MenuItem value="1.0">1.0</MenuItem>
                  </Select>
                </Box>

                <Divider />

                <Typography variant='h6' className='font-black'>Markup theo Cấp bậc Đại lý</Typography>
                
                <Grid2 container spacing={4}>
                  {[
                    { tier: 'PLATINUM', markup: '5%', color: 'primary' },
                    { tier: 'GOLD', markup: '10%', color: 'warning' },
                    { tier: 'SILVER', markup: '15%', color: 'secondary' }
                  ].map((t, i) => (
                    <Grid2 key={i} size={{ xs: 12, sm: 4 }}>
                      <Box className='p-4 bg-slate-50 rounded-xl border border-slate-100'>
                        <Typography variant='caption' className='font-black' color={t.color as any}>{t.tier}</Typography>
                        <TextField fullWidth size='small' defaultValue={t.markup} className='mt-2' />
                      </Box>
                    </Grid2>
                  ))}
                </Grid2>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Dynamic Pricing Settings */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card className='border-none shadow-sm h-full'>
            <CardHeader title='Tùy chọn Nâng cao' />
            <Divider />
            <CardContent>
              <Stack spacing={4}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={
                    <Box>
                      <Typography variant='body2' className='font-bold'>Định giá thông minh</Typography>
                      <Typography variant='caption' className='text-slate-400'>Tự động giảm giá khi supplier giảm giá sâu</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch />}
                  label={
                    <Box>
                      <Typography variant='body2' className='font-bold'>Ẩn giá vốn</Typography>
                      <Typography variant='caption' className='text-slate-400'>Không hiển thị giá vốn trong nhật ký cho nhân viên</Typography>
                    </Box>
                  }
                />
                <Divider />
                <Typography variant='caption' className='font-bold text-slate-500 uppercase'>Cảnh báo rủi ro</Typography>
                <TextField 
                  fullWidth 
                  label="Biên lợi nhuận tối thiểu (%)" 
                  defaultValue="2" 
                  helperText="Cảnh báo nếu lợi nhuận sau markup thấp hơn mức này"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Override Rules Table */}
        <Grid2 size={{ xs: 12 }}>
          <Card className='border-none shadow-sm'>
            <CardHeader 
              title='Danh sách Ghi đè (Override Rules)' 
              subheader='Cấu hình giá riêng cho các sản phẩm hoặc đại lý đặc biệt'
              action={<Button variant='tonal' size='small' startIcon={<i className='tabler-plus' />}>Thêm Ghi đè</Button>}
            />
            <CardContent className='p-0'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-be'>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Đối tượng</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Loại Markup</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Giá trị</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase'>Trạng thái</th>
                    <th className='p-4 text-xs font-black text-slate-500 uppercase text-right'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { target: 'Gói Nhật Bản 10GB', type: 'Cố định', value: '+$2.00', status: 'Đang áp dụng' },
                    { target: 'Đại lý TravelConnect', type: 'Phần trăm', value: '7%', status: 'Đang áp dụng' }
                  ].map((row, i) => (
                    <tr key={i} className='border-be last:border-0'>
                      <td className='p-4'><Typography variant='body2' className='font-bold'>{row.target}</Typography></td>
                      <td className='p-4'><Typography variant='body2'>{row.type}</Typography></td>
                      <td className='p-4'><Typography variant='body2' className='font-black text-primary'>{row.value}</Typography></td>
                      <td className='p-4'><Chip label={row.status} size='small' color='success' variant='tonal' /></td>
                      <td className='p-4 text-right'>
                        <IconButton size='small'><i className='tabler-trash text-error' /></IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  )
}

import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'

export default PricingRules
