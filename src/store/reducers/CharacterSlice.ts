import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character, CharactersQuery } from '../../types/Character';

interface searchParam {
  currentPage: number;
  nameParam: string;
}

interface State {
  characters: null | Character[];
  allCharactersNames: string[];
  isCharactersLoading: boolean;
  totalPages: number;
  totalCharactersAmount: number;
  currentPage: number;
  nameParam: string;
}

const initialState: State = {
  characters: null,
  allCharactersNames: [],
  isCharactersLoading: true,
  totalPages: 0,
  totalCharactersAmount: 0,
  currentPage: 1,
  nameParam: '',
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharactersQuery>) {
      state.characters = action.payload.results || null;
      state.totalPages = action.payload.info.pages;
      state.totalCharactersAmount = action.payload.info.count;
      state.isCharactersLoading = false;
    },
    setIsCharactersLoading(state, action: PayloadAction<boolean>) {
      state.isCharactersLoading = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setAllCharactersNames(state, action: PayloadAction<string[]>) {
      state.allCharactersNames = Array.from(
        new Set([...state.allCharactersNames, ...action.payload])
      );
    },
    setSearchParam(state, action: PayloadAction<searchParam>) {
      console.log('handled');
      state.nameParam = action.payload.nameParam;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export default characterSlice.reducer;
