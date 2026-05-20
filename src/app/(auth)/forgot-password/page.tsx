'use client'

import { useState } from 'react'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import Logo from '@components/layout/shared/Logo'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href='/login'
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h5'>Quên mật khẩu?</Typography>
            <Typography variant='body2' className='text-textSecondary'>
              Nhập email của bạn để yêu cầu đặt lại mật khẩu.
            </Typography>
          </div>

          {submitted ? (
            <Alert severity='info'>
              Yêu cầu đã được ghi nhận. Admin sẽ cập nhật mật khẩu và gửi lại qua email của bạn.
            </Alert>
          ) : (
            <form noValidate onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <TextField
                fullWidth
                label='Email'
                type='email'
                placeholder='Nhập địa chỉ email...'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button fullWidth variant='contained' type='submit'>
                Gửi yêu cầu
              </Button>
            </form>
          )}

          <Box className='flex justify-center'>
            <Link href='/login' className='text-primary text-sm hover:underline'>
              Quay lại đăng nhập
            </Link>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
