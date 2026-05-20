'use client'

import { useState } from 'react'

import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import PageHeader from '@/components/layout/shared/PageHeader'

const PermissionsView = () => {
  const [copyDialogOpen, setCopyDialogOpen] = useState(false)
  const [copiedRole, setCopiedRole] = useState('')

  const handleCopy = (role: string) => {
    setCopiedRole(role)
    setCopyDialogOpen(true)
  }

  const roles = ['Warehouse Admin', 'Inventory Manager', 'Picker/Packer', 'Quality Inspector']
  const modules = [
    { name: 'Inventory Management', perms: ['Read', 'Create', 'Update', 'Delete'] },
    { name: 'Procurement (PO)', perms: ['Read', 'Create', 'Approve'] },
    { name: 'Sales (SO)', perms: ['Read', 'Fulfill'] },
    { name: 'Warehouse Map', perms: ['View Only'] },
    { name: 'System Settings', perms: ['Full Access'] }
  ]

  return (
    <>
      <PageHeader
        title='Role-Based Access Control (RBAC)'
        description='Configure granular permissions and module-level accessibility across the workforce'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'System', href: '/system/users' }, { label: 'Permissions' }]}
        actions={<Button variant='contained' startIcon={<i className='tabler-lock-check' />}>Apply Permissions</Button>}
      />

      <Grid2 container spacing={6} className='mt-6'>
        <Grid2 size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Matrix of Authority' subheader='Global Permission mapping per functional role' />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className='bg-slate-50'>
                    <TableCell className='font-bold'>Functional Module</TableCell>
                    {roles.map(role => (
                      <TableCell key={role} align='center' className='font-bold'>
                        <Box className='flex flex-col items-center gap-1'>
                          <span>{role}</span>
                          <Button size='small' variant='outlined' color='secondary' onClick={() => handleCopy(role)}>Sao chép</Button>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules.map((m) => (
                    <TableRow key={m.name} hover>
                      <TableCell>
                        <Box>
                          <Typography variant='body2' className='font-bold'>{m.name}</Typography>
                          <Typography variant='caption'>{m.perms.join(', ')}</Typography>
                        </Box>
                      </TableCell>
                      {roles.map(role => (
                        <TableCell key={role} align='center'>
                          <Checkbox 
                            defaultChecked={role === 'Warehouse Admin'} 
                            color='primary'
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid2>
      </Grid2>

      <Dialog open={copyDialogOpen} onClose={() => setCopyDialogOpen(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Sao chép nhóm quyền</DialogTitle>
        <DialogContent>
          <Typography variant='body2'>Đã sao chép nhóm quyền: <strong>{copiedRole}</strong></Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={() => setCopyDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PermissionsView
