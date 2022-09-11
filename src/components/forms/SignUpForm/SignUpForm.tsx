import { FC, useState, MouseEvent, useContext } from 'react'

import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'

import { signUpValidationSchema } from '../../../common/validation'
import { MainButton } from '../../../components/Buttons/MainButton'
import { useStyles, UIContext } from '../../../components/UIContext'
import { useAppDispatch } from '../../../store/hooks/reduxHooks'
import { signInByFacebook, signUp } from '../../../store/reducers/ActionCreator'

interface SignUpFormProps {
  onSuccess: () => void
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSuccess }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { setAlert } = useContext(UIContext)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const handleSignUp = (email: string, password: string, fullName: string) => {
    dispatch(signUp(email, password, fullName, setAlert, onSuccess))
  }

  const handleSignUpByFacebook = () => {
    dispatch(signInByFacebook(setAlert, onSuccess))
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword(!showRepeatPassword)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: '',
        fullName: '',
        password: '',
        repeatPassword: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleSignUp(values.email, values.password, values.fullName)
          setSubmitting(false)
        }, 500)
      }}
      validationSchema={signUpValidationSchema}
    >
      {({
        submitForm,
        isSubmitting,
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <Form>
          <Box className={classes.flexColumn} gap={5}>
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

            <Field
              fullWidth
              id='fullName'
              component={TextField}
              name='fullName'
              type='fullName'
              label='Full Name'
              variant='filled'
              color='info'
              focused
              error={touched.fullName && !!errors.fullName}
              helperText={
                touched.fullName && !!errors.fullName && errors.fullName
              }
              value={values.fullName}
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

            <FormControl
              variant='filled'
              fullWidth
              focused
              error={touched.password && !!errors.password}
            >
              <InputLabel htmlFor='repeatPassword' color='info'>
                Repeat password
              </InputLabel>

              <Field
                fullWidth
                id='repeatPassword'
                label='Repeat password'
                name='repeatPassword'
                component={FilledInput}
                required
                type={showRepeatPassword ? 'text' : 'password'}
                value={values.repeatPassword}
                onChange={handleChange}
                disableUnderline
                error={touched.repeatPassword && !!errors.repeatPassword}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle repeatPassword visibility'
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {touched.repeatPassword && !!errors.repeatPassword && (
                <FormHelperText error>{errors.repeatPassword}</FormHelperText>
              )}
            </FormControl>

            <MainButton
              text='Submit'
              fullWidth
              disabled={isSubmitting}
              onClick={submitForm}
              variant='contained'
              type='submit'
            />

            <MainButton
              text='Continue with Facebook'
              fullWidth
              disabled={isSubmitting}
              onClick={handleSignUpByFacebook}
              variant='contained'
              color='secondary'
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
