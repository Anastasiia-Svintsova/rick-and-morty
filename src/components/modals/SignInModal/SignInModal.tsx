import { FC } from 'react'

import { Grid, Box, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import { Link } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../../store/hooks/reduxHooks'
import { commonSlice } from '../../../store/reducers/CommonSlice'
import { CloseButton } from '../../Buttons/CloseButton'
import { SignInForm } from '../../forms/SignInForm'
import { useStyles } from '../../UIContext'

export const SignInModal: FC = () => {
  const { isModalOpen } = useAppSelector((state) => state.commonReducer)
  const { closeModal } = commonSlice.actions
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const handleClose = () => dispatch(closeModal())

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ overflowY: 'scroll' }}
    >
      <Fade in={isModalOpen}>
        <Grid container justifyContent='center' alignItems='center' className={classes.fullHeight}>
          <Grid item md={6} sm={7} xs={11} lg={5} className={classes.modalContainer}>
            <CloseButton onClick={handleClose} />
            <Box px={3} py={7}>
              <Typography color='primary' variant='h4' pb={4}>
                LOGIN
              </Typography>
              <SignInForm onSuccess={handleClose} />

              <Box className={classes.justifyCenter} pt={4}>
                <Typography>Don&apos;t have an account?&nbsp;</Typography>

                <Link to='/signUp' className={classes.linkStyle} onClick={handleClose}>
                  <Typography color='primary'>Register</Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  )
}

export default SignInModal
