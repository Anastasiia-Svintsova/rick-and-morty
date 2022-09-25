import React, { FC } from 'react';

import {
  CircularProgress,
  Pagination,
  Stack,
  useMediaQuery,
} from '@mui/material';

import { MEDIA_QUERY_MOBILE } from '../../common/constants';
import { CharacterList } from '../../components/Character/CharactersList';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search/Search';
import { useStyles } from '../../components/UIContext';
import { Wrapper } from '../../components/Wrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { characterSlice } from '../../store/reducers/CharacterSlice';

export const HomeScreen: FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const classes = useStyles();
  const { setCurrentPage, setSearchParam } = characterSlice.actions;
  const {
    characters,
    totalPages,
    allCharactersNames,
    currentPage,
    nameParam,
    isCharactersLoading,
  } = useAppSelector((state) => state.characterReducer);

  const handlePaginationChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchParamChange = (value: string) => {
    const searchParam = { currentPage: 1, nameParam: value };
    dispatch(setSearchParam(searchParam));
  };

  return (
    <Wrapper>
      <Header />

      <Stack spacing={4} alignItems='center'>
        <Search
          options={allCharactersNames}
          value={nameParam}
          setValue={handleSearchParamChange}
        />

        <Pagination
          size={isMobile ? 'small' : 'large'}
          count={totalPages}
          page={currentPage}
          color='primary'
          onChange={(event, page) => handlePaginationChange(page)}
          className={classes.root}
        />

        {isCharactersLoading ? (
          <CircularProgress
            color='inherit'
            size={50}
            sx={{ display: 'flex', m: 'auto' }}
          />
        ) : (
          <>{characters && <CharacterList characters={characters} />}</>
        )}
      </Stack>
    </Wrapper>
  );
};

export default HomeScreen;
