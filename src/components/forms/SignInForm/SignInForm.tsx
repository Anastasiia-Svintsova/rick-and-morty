import { FC, useState, MouseEvent, useContext } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Box,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'

import { signInValidationSchema } from '../../../common/validation'
import { useAppDispatch } from '../../../store/hooks/reduxHooks'
import { signInByEmail, signInByFacebook } from '../../../store/reducers/ActionCreator'
import { MainButton } from '../../Buttons/MainButton'
import { UIContext, useStyles } from '../../UIContext'

interface Props {
  onSuccess: () => void
}

export const SignInForm: FC<Props> = ({ onSuccess }) => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { setAlert } = useContext(UIContext)
  const classes = useStyles()

  const handleSignInByEmail = (email: string, password: string) => {
    dispatch(signInByEmail(email, password, setAlert, onSuccess))
  }

  const handleSignInByFacebook = () => {
    dispatch(signInByFacebook(setAlert, onSuccess))
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
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

            <MainButton
              text='Submit'
              fullWidth
              disabled={isSubmitting}
              onClick={submitForm}
              variant='contained'
            />

            <MainButton
              text='Login by Facebook'
              fullWidth
              disabled={isSubmitting}
              onClick={handleSignInByFacebook}
              variant='contained'
              color='secondary'
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm
