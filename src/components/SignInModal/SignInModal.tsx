import React, { FC, useState, MouseEvent, useContext } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { useAppSelector, useAppDispatch } from '../../store/hooks/reduxHooks'
import { commonSlice } from '../../store/reducers/CommonSlice'
import {
  Grid,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { UIContext } from '../UIContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useStyles } from '../UIContext'
import { CloseButton } from '../Buttons/CloseButton'
import { signInByEmail, signInByFacebook } from '../../store/reducers/ActionCreator'
import { Link } from 'react-router-dom'
import { signInValidationSchema } from '../../common/validation'

export const SignInModal: FC = () => {
  const { isModalOpen } = useAppSelector((state) => state.commonReducer)
  const { closeModal } = commonSlice.actions
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { setAlert } = useContext(UIContext)
  const classes = useStyles()

  const handleClose = () => dispatch(closeModal())

  const handleSignInByEmail = (email: string, password: string) => {
    dispatch(signInByEmail(email, password, setAlert, handleClose))
  }

  const handleSignInByFacebook = () => {
    dispatch(signInByFacebook(setAlert, handleClose))
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
              <Formik
                enableReinitialize
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    handleSignInByEmail(values.email, values.password)
                    setSubmitting(false)
                  }, 500)
                }}
                validationSchema={signInValidationSchema}
              >
                {({ submitForm, isSubmitting, values, handleChange, errors, touched }) => (
                  <Form>
                    <Box className={classes.flexColumn} gap='50px'>
                      <Field
                        fullWidth
                        id='email'
                        component={TextField}
                        name='email'
                        type='email'
                        label='Email'
                        variant='filled'
                        color='info'
                        focused
                        error={touched.email && !!errors.email}
                        helperText={touched.email && !!errors.email && errors.email}
                        value={values.email}
                        onChange={handleChange}
                        InputProps={{ disableUnderline: true }}
                      />
                      <FormControl
                        variant='filled'
                        fullWidth
                        focused
                        error={touched.password && !!errors.password}
                      >
                        <InputLabel htmlFor='password' color='info'>
                          Password
                        </InputLabel>

                        <Field
                          fullWidth
                          id='password'
                          label='Password'
                          name='password'
                          component={FilledInput}
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange}
                          disableUnderline
                          error={touched.password && !!errors.password}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />

                        {touched.password && !!errors.password && (
                          <FormHelperText error>{errors.password}</FormHelperText>
                        )}
                      </FormControl>

                      <Button
                        fullWidth
                        disabled={isSubmitting}
                        onClick={submitForm}
                        variant='contained'
                      >
                        <Typography variant='button' fontSize={18}>
                          Submit
                        </Typography>
                      </Button>

                      <Button
                        fullWidth
                        disabled={isSubmitting}
                        onClick={handleSignInByFacebook}
                        variant='contained'
                        color='secondary'
                      >
                        <Typography variant='button' fontSize={18}>
                          Login by Facebook
                        </Typography>
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>

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
