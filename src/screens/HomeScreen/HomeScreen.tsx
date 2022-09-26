import React, { FC } from 'react';

import {
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { MEDIA_QUERY_MOBILE } from '../../common/constants';
import { CharacterList } from '../../components/Character/CharactersList';
import { Footer } from '../../components/Footer';
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
  const { isUserDataLoading } = useAppSelector((state) => state.userReducer);

  const handlePaginationChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchParamChange = (value: string) => {
    const searchParam = { currentPage: 1, nameParam: value };
    dispatch(setSearchParam(searchParam));
  };

  return (
    <Stack className={classes.screenContainer}>
      <Header />

      <Wrapper>
        {!isUserDataLoading ? (
          <Stack spacing={4} alignItems='center'>
            <Search
              options={allCharactersNames}
              value={nameParam}
              setValue={handleSearchParamChange}
            />

            {characters && !!characters.length ? (
              <Pagination
                size={isMobile ? 'small' : 'large'}
                count={totalPages}
                page={currentPage}
                color='primary'
                onChange={(event, page) => handlePaginationChange(page)}
                className={classes.root}
              />
            ) : (
              <Typography>
                {!isCharactersLoading && 'No characters with this name'}
              </Typography>
            )}

            {isCharactersLoading && (
              <CircularProgress
                color='inherit'
                size={50}
                sx={{ display: 'flex', m: 'auto' }}
              />
            )}

            {characters && !isUserDataLoading && (
              <CharacterList characters={characters} />
            )}
          </Stack>
        ) : (
          <CircularProgress
            color='inherit'
            size={50}
            sx={{ display: 'flex', m: 'auto' }}
          />
        )}
      </Wrapper>

      <Footer />
    </Stack>
  );
};

export default HomeScreen;
