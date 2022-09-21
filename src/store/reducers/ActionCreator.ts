import { Dispatch, SetStateAction } from 'react';

import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { ref, get, child, update } from 'firebase/database';

import database from '../../common/firebaseDatabase';
import { AlertProps } from '../../components/UIContext';
import { Character } from '../../types/Character';
import { FirebaseErrorMessage } from '../../types/firebaseError';
import { request } from '../../utils/graphql';
import { GET_CHARACTERS } from '../../utils/queries';
import { AppDispatch } from '../store';
import { characterSlice } from './CharacterSlice';
import { userSlice } from './UserSlice';

const { setUser, setLikedCharacters } = userSlice.actions;
const { setCharacters } = characterSlice.actions;

export const getUser = () => (dispatch: AppDispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(setUser(currentUser));
    } else {
      dispatch(setUser(null));
    }
  });
};

export const getAuthError = (errorCode: string) => {
  switch (errorCode) {
    case AuthErrorCodes.INVALID_PASSWORD:
      return FirebaseErrorMessage.INVALID_PASSWORD;

    case AuthErrorCodes.USER_DELETED:
      return FirebaseErrorMessage.USER_DELETED;

    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return FirebaseErrorMessage.TOO_MANY_ATTEMPTS_TRY_LATER;

    case AuthErrorCodes.NEED_CONFIRMATION:
      return FirebaseErrorMessage.NEED_CONFIRMATION;

    case AuthErrorCodes.POPUP_BLOCKED:
      return FirebaseErrorMessage.POPUP_BLOCKED;

    case AuthErrorCodes.EMAIL_EXISTS:
      return FirebaseErrorMessage.EMAIL_EXISTS;

    case AuthErrorCodes.INVALID_EMAIL:
      return FirebaseErrorMessage.INVALID_EMAIL;

    default:
      return FirebaseErrorMessage.DEFAULT;
  }
};

export const signUp =
  (
    email: string,
    password: string,
    fullName: string,
    setAlert: Dispatch<SetStateAction<AlertProps>>,
    onSuccess?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      await updateProfile(user, {
        displayName: fullName,
      });

      dispatch(setUser(user));

      if (onSuccess) onSuccess();

      setAlert({
        show: true,
        severity: 'success',
        message: 'Registration is successful. Welcome on board 🚀',
      });
    } catch (error: any) {
      const errorMessage = getAuthError(error.code);

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      });
    }
  };

export const signInByEmail =
  (
    email: string,
    password: string,
    setAlert: Dispatch<SetStateAction<AlertProps>>,
    onSuccess?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(setUser(userCredential.user));

      if (onSuccess) onSuccess();

      setAlert({
        show: true,
        severity: 'success',
        message: 'Welcome on board 🚀',
      });
    } catch (error: any) {
      const errorMessage = getAuthError(error.code);

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      });
    }
  };

export const signInByFacebook =
  (setAlert: Dispatch<SetStateAction<AlertProps>>, onSuccess?: () => void) =>
  async (dispatch: AppDispatch) => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      const userCredential = await signInWithPopup(auth, provider);

      dispatch(setUser(userCredential.user));
      if (onSuccess) onSuccess();

      setAlert({
        show: true,
        severity: 'success',
        message: 'Welcome on board 🚀',
      });
    } catch (error: any) {
      const errorMessage = getAuthError(error.code);

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      });
    }
  };

export const logOut =
  (
    setAlert: Dispatch<SetStateAction<AlertProps>>,
    navigate?: (value: string) => void,
    setAnchorEl?: (value: React.SetStateAction<HTMLElement | null>) => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth();

      await signOut(auth);
      dispatch(setUser(null));
      if (setAnchorEl) setAnchorEl(null);
      if (navigate) navigate('./');

      setAlert({
        show: true,
        severity: 'info',
        message: 'We will miss you...',
      });
    } catch (error: any) {
      const errorMessage = getAuthError(error.code);

      setAlert({
        show: true,
        severity: 'error',
        message: errorMessage,
      });
    }
  };

export const getCharacters =
  (page = 1, name = '') =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await request(GET_CHARACTERS, { page, name });
      dispatch(setCharacters(data.characters));
    } catch (error: any) {
      console.log(error);
    }
  };

export const getLikedCharacters =
  (userUid: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await get(
        child(ref(database), 'users/' + userUid + '/likedCharacters')
      );

      if (response.exists()) {
        dispatch(setLikedCharacters(response.val()));
        return response.val();
      }
    } catch (error) {
      console.log(error);
    }
  };

export const updateLikedCharacters =
  (characters: Character[], userUid: string) =>
  async (dispatch: AppDispatch) => {
    try {
      await update(ref(database), {
        ['users/' + userUid + '/likedCharacters']: characters,
      });
      dispatch(setLikedCharacters(characters));
    } catch (error) {
      console.log(error);
    }
  };
