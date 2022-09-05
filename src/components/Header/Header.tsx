import React, { FC, useContext, useState, MouseEvent } from 'react'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Menu,
  Avatar,
} from '@mui/material'
import { CosmosBackground } from '../CosmosBackground'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'
import { useStyles } from '../UIContext'
import { SignInModal } from '../SignInModal'
import { commonSlice } from '../../store/reducers/CommonSlice'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MEDIA_QUERY_MOBILE } from '../../common/constants'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useAppSelector, useAppDispatch } from '../../store/hooks/reduxHooks'
import { UIContext } from '../UIContext'
import { logOut } from '../../store/reducers/ActionCreator'
import { useNavigate } from 'react-router-dom'

export const Header: FC = () => {
  const classes = useStyles()
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.userReducer)
  const { openModal } = commonSlice.actions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { setAlert } = useContext(UIContext)

  const handleOpenModal = () => dispatch(openModal())

  const handleMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleSignOut = () => dispatch(logOut(setAlert, navigate, handleClose))

  return (
    <Box overflow='hidden'>
      <AppBar color='secondary' position='sticky'>
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
                  {user.photoURL ? (
                    <Avatar
                      alt='User avatar'
                      src='https://graph.facebook.com/5076560505798093/picture'
                    />
                  ) : (
                    <AccountCircle fontSize='large' />
                  )}
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
                <Typography variant='button' className={classes.linkStyle} fontSize={16}>
                  Login
                </Typography>
              </Button>
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
