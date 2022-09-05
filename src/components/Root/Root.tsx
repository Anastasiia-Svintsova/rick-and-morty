import React, { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomeScreen } from '../HomeScreen'
import { SignUpScreen } from '../SignUpScreen'
import { Header } from '../Header'
import { useAppSelector } from '../../store/hooks/reduxHooks'
import { Box } from '@mui/material'
import { useStyles } from '../UIContext'

export const Root: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer)
  const classes = useStyles()

  return (
    <>
      <Header />

      <Box className={classes.root}>
        {user ? (
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<Navigate replace to='/' />} />
            <Route path='/signUp' element={<SignUpScreen />} />
          </Routes>
        )}
      </Box>
    </>
  )
}

export default Root
