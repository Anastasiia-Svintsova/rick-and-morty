import React, { FC, useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { CharacterScreen } from '../../screens/CharacterScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { SignInScreen } from '../../screens/SignInScreen';
import { SignUpScreen } from '../../screens/SignUpScreen';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import {
  getCharacters,
  getUser,
  getLikedCharacters,
  getAllCharactersNames,
} from '../../store/reducers/ActionCreator';

export const Root: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { currentPage, nameParam: searchParam } = useAppSelector(
    (state) => state.characterReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllCharactersNames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCharacters(currentPage, searchParam));
  }, [currentPage, dispatch, searchParam]);

  useEffect(() => {
    if (!user) return;
    dispatch(getLikedCharacters(user.uid));
  }, [dispatch, user]);

  return (
    <>
      {user ? (
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/character/:id' element={<CharacterScreen />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/signIn' element={<SignInScreen />} />
          <Route path='/signUp' element={<SignUpScreen />} />
          <Route path='/character/:id' element={<CharacterScreen />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      )}
    </>
  );
};

export default Root;
