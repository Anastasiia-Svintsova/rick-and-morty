import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character, CharactersQuery } from '../../types/Character';

interface State {
  characters: null | Character[];
  isCharactersLoading: boolean;
  totalPages: number;
  totalCharactersAmount: number;
  currentPage: number;
}

const initialState: State = {
  characters: null,
  isCharactersLoading: true,
  totalPages: 0,
  totalCharactersAmount: 0,
  currentPage: 1,
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
  },
});

export default characterSlice.reducer;
