import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from 'firebase/auth'
import { AppDispatch } from '../store'
import { userSlice } from './UserSlice'
import { FirebaseErrorMessage } from '../../types/firebaseError'
import { Dispatch, SetStateAction } from 'react'
import { AlertProps } from '../../components/UIContext'

const { setUser } = userSlice.actions

export const getAuthError = (errorCode: string) => {
  switch (errorCode) {
    case AuthErrorCodes.INVALID_PASSWORD:
      return FirebaseErrorMessage.INVALID_PASSWORD

    case AuthErrorCodes.USER_DELETED:
      return FirebaseErrorMessage.USER_DELETED

    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return FirebaseErrorMessage.TOO_MANY_ATTEMPTS_TRY_LATER

    case AuthErrorCodes.NEED_CONFIRMATION:
      return FirebaseErrorMessage.NEED_CONFIRMATION

    case AuthErrorCodes.POPUP_BLOCKED:
      return FirebaseErrorMessage.POPUP_BLOCKED

    case AuthErrorCodes.EMAIL_EXISTS:
      return FirebaseErrorMessage.EMAIL_EXISTS

    case AuthErrorCodes.INVALID_EMAIL:
      return FirebaseErrorMessage.INVALID_EMAIL

    default:
      return FirebaseErrorMessage.DEFAULT
  }
}

export const signInByEmail =
  (
    email: string,
    password: string,
    setAlert: Dispatch<SetStateAction<AlertProps>>,
    onSuccess?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      dispatch(setUser(userCredential.user))

      if (onSuccess) onSuccess()

      setAlert({
        show: true,
        severity: 'success',
        message: 'Welcome on board 🚀',
      })
    } catch (error: any) {
      const errorMessage = getAuthError(error.code)

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      })
    }
  }

export const signInByFacebook =
  (setAlert: Dispatch<SetStateAction<AlertProps>>, onSuccess?: () => void) =>
  async (dispatch: AppDispatch) => {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)

      dispatch(setUser(userCredential.user))
      if (onSuccess) onSuccess()

      setAlert({
        show: true,
        severity: 'success',
        message: 'Welcome on board 🚀',
      })
    } catch (error: any) {
      const errorMessage = getAuthError(error.code)

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      })
    }
  }

export const logOut =
  (
    setAlert: Dispatch<SetStateAction<AlertProps>>,
    navigate?: (value: string) => void,
    setAnchorEl?: (value: React.SetStateAction<HTMLElement | null>) => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth()

      await signOut(auth)
      dispatch(setUser(null))
      if (setAnchorEl) setAnchorEl(null)
      if (navigate) navigate('./')

      setAlert({
        show: true,
        severity: 'info',
        message: 'We will miss you...',
      })
    } catch (error: any) {
      const errorMessage = getAuthError(error.code)

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      })
    }
  }
