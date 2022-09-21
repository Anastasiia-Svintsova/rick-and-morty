import React, { FC } from 'react';

import { CircularProgress } from '@mui/material';

import { CharacterList } from '../../components/Character/CharactersList';
import { Header } from '../../components/Header';
import { Wrapper } from '../../components/Wrapper';
import { useAppSelector } from '../../store/hooks/reduxHooks';

export const HomeScreen: FC = () => {
  const { characters } = useAppSelector((state) => state.characterReducer);

  return (
    <Wrapper>
      <Header />
      {characters ? (
        <CharacterList characters={characters} />
      ) : (
        <CircularProgress
          color='inherit'
          size={50}
          sx={{ display: 'flex', m: 'auto' }}
        />
      )}
    </Wrapper>
  );
};

export default HomeScreen;
