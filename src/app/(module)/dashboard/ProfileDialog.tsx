'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { AuthService } from '@/services/auth/authService'
import { useErrorHandler } from '@/utils/errorHandler'
import EditProfileDialog from './EditProfileDialog'

// Translation Imports
import { useI18n } from '@/i18n/I18nProvider'

// Format Utils Imports
import { useSystemSettings } from '@/hooks/useSystemSettings'
import { formatDateTimeBySettings } from '@/utils/formatUtils'

interface ProfileData {
  id: string
  email: string
  name?: string
  phone?: string
  role?: string
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

interface ProfileDialogProps {
  open: boolean
  onClose: () => void
}

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { t } = useI18n()
  const { settings } = useSystemSettings()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const { handle } = useErrorHandler()

  // Load profile data when dialog opens
  useEffect(() => {
    if (open) {
      const loadProfile = async () => {
        try {
          setLoading(true)
          const data = await AuthService.getProfile()
          setProfile(data)
        } catch (error) {
          handle(error)
        } finally {
          setLoading(false)
        }
      }

      loadProfile()
    } else {
      // Reset state when dialog closes
      setProfile(null)
      setLoading(true)
    }
  }, [open, handle])

  // Handle update profile
  const handleUpdateProfile = async (data: {
    name: string
    phone?: string
    role?: string
  }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update mock profile data
      if (profile) {
        const updatedProfile = {
          ...profile,
          name: data.name,
          phone: data.phone !== undefined ? data.phone : profile.phone,
          role: data.role || profile.role,
          updatedAt: new Date().toISOString(),
        };
        setProfile(updatedProfile);
        setEditDialogOpen(false);
      }
    } catch (error) {
      handle(error)
    }
  }


  const fullName = profile?.name ?? profile?.email ?? ''

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
        <DialogTitle>{t('profile.title')}</DialogTitle>
        <Divider />
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <CircularProgress />
            </Box>
          ) : !profile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <Typography>Không thể tải thông tin profile</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
              {/* Avatar and Basic Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pb: 2 }}>
                <CustomAvatar
                  alt={fullName}
                  sx={{ width: 100, height: 100, fontSize: '2.5rem' }}
                >
                  {fullName.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
                </CustomAvatar>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ mb: 0.5 }}>
                    {fullName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {profile.email}
                  </Typography>
                </Box>
                <Button
                  variant='contained'
                  size='small'
                  startIcon={<i className='tabler-edit' />}
                  onClick={() => setEditDialogOpen(true)}
                >
                  {t('profile.editButton')}
                </Button>
              </Box>

              <Divider />

              {/* Profile Details */}
              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.fullName')}
                </Typography>
                <Typography variant='body1'>{profile.name ?? '—'}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.email')}
                </Typography>
                <Typography variant='body1'>{profile.email}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.phone')}
                </Typography>
                <Typography variant='body1'>{profile.phone ?? '—'}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.role')}
                </Typography>
                <Typography variant='body1'>{profile.role ?? '—'}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.status')}
                </Typography>
                <Chip
                  label={profile.isActive ? t('form.active') : t('form.inactive')}
                  size='small'
                  color={profile.isActive ? 'success' : 'default'}
                  variant='tonal'
                />
              </Box>

              {profile.lastLoginAt && (
                <>
                  <Divider />
                  <Box>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      {t('profile.lastLogin')}
                    </Typography>
                    <Typography variant='body1'>
                      {formatDateTimeBySettings(profile.lastLoginAt, settings)}
                    </Typography>
                  </Box>
                </>
              )}

              <Divider />

              <Box>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  {t('profile.createdAt')}
                </Typography>
                <Typography variant='body1'>
                  {formatDateTimeBySettings(profile.createdAt, settings)}
                </Typography>
              </Box>

              {profile.updatedAt && (
                <>
                  <Divider />
                  <Box>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      {t('profile.updatedAt')}
                    </Typography>
                    <Typography variant='body1'>
                      {formatDateTimeBySettings(profile.updatedAt, settings)}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant='contained' color='primary' onClick={onClose}>
            {t('form.close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      {profile && (
        <EditProfileDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          profile={profile}
          onUpdate={handleUpdateProfile}
        />
      )}
    </>
  )
}

