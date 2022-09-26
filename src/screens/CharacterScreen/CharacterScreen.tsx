import React, { useEffect } from 'react';

import { CircularProgress, Stack, Typography } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

import { CharacterDetail } from '../../components/Character/CharacterDetail';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { useStyles } from '../../components/UIContext';
import { Wrapper } from '../../components/Wrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { getSingleCharacter } from '../../store/reducers/ActionCreator';

export const CharacterScreen = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { id } = useParams();

  const { currentCharacter, isCharacterLoading } = useAppSelector(
    (state) => state.characterReducer
  );
  const { user, isUserDataLoading } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleCharacter(id));
    }
  }, [dispatch, id]);

  return (
    <Stack className={classes.screenContainer} alignItems='center'>
      <Header />

      <Wrapper>
        {isUserDataLoading || isCharacterLoading ? (
          <CircularProgress
            color='inherit'
            size={50}
            sx={{ display: 'flex', m: 'auto' }}
          />
        ) : (
          <>
            {user ? (
              <>
                {currentCharacter && (
                  <CharacterDetail character={currentCharacter} />
                )}
              </>
            ) : (
              <Typography>
                <Link to='/signUp' className={classes.linkStyleMain}>
                  Register
                </Link>{' '}
                or{' '}
                <Link to='/signIn' className={classes.linkStyleMain}>
                  login
                </Link>{' '}
                to see character detail
              </Typography>
            )}
          </>
        )}
      </Wrapper>

      <Footer />
    </Stack>
  );
};

export default CharacterScreen;
