import React, { FC, useCallback, useEffect } from 'react'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Routes, Route, Navigate } from 'react-router-dom'

import { HomeScreen } from '../../screens/HomeScreen'
import { SignInScreen } from '../../screens/SignInScreen'
import { SignUpScreen } from '../../screens/SignUpScreen'
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks'
import { getCharacters } from '../../store/reducers/ActionCreator'
import { userSlice } from '../../store/reducers/UserSlice'

export const Root: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer)
  const { setUser } = userSlice.actions
  const dispatch = useAppDispatch()

  const getUser = useCallback(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser))
      } else {
        dispatch(setUser(null))
      }
    })
  }, [dispatch, setUser])

  useEffect(() => {
    getUser()
    dispatch(getCharacters())
  }, [dispatch, getUser])

  return (
    <>
      {user ? (
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/signIn' element={<SignInScreen />} />
          <Route path='/signUp' element={<SignUpScreen />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      )}
    </>
  )
}

export default Root
