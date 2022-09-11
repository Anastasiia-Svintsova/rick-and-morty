import { FC, MouseEvent, useContext, useState } from 'react'

import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link, useNavigate } from 'react-router-dom'

import { MEDIA_QUERY_MOBILE } from '../../common/constants'
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks'
import { logOut } from '../../store/reducers/ActionCreator'
import { commonSlice } from '../../store/reducers/CommonSlice'
import { CosmosBackground } from '../CosmosBackground'
import { SignInModal } from '../modals/SignInModal'
import { useStyles, UIContext } from '../UIContext'
import { UserAvatar } from '../UserAvatar'

export const Header: FC = () => {
  const classes = useStyles()
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isUserDataLoading } = useAppSelector(
    (state) => state.userReducer
  )
  const { openModal } = commonSlice.actions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { setAlert } = useContext(UIContext)

  const handleOpenModal = () => dispatch(openModal())

  const handleMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleSignOut = () => dispatch(logOut(setAlert, navigate, handleClose))

  return (
    <Box>
      <AppBar color='secondary' sx={{ overflow: 'hidden' }}>
        <CosmosBackground />
        <Toolbar className={classes.space}>
          <Box className={classes.alignCenter} sx={{ minHeight: 85 }}>
            <Box
              component='img'
              alt='Rick and morty'
              src={require('../../images/header_image.png')}
              sx={{ width: 100 }}
              hidden={isMobile}
            />
            <Link to='/' className={classes.linkStyle}>
              <Typography variant='h1'>Rick&Morty</Typography>
            </Link>
          </Box>
          <Box className={classes.alignCenter} gap={4}>
            {isUserDataLoading ? (
              <CircularProgress color='inherit' size={25} />
            ) : (
              <>
                {user ? (
                  <Box>
                    <IconButton
                      size='large'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleMenu}
                      color='inherit'
                    >
                      <UserAvatar user={user} />
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Button variant='text' onClick={handleOpenModal}>
                    <Typography
                      variant='button'
                      className={classes.linkStyle}
                      fontSize={16}
                    >
                      Login
                    </Typography>
                  </Button>
                )}
              </>
            )}

            <Link to='/' hidden={isMobile} className={classes.linkStyle}>
              <HomeIcon fontSize='large' />
            </Link>
          </Box>
        </Toolbar>
        <SignInModal />
      </AppBar>
    </Box>
  )
}

export default Header
