import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../../types/Character';
import { User } from '../../types/User';

interface State {
  user: null | User;
  isUserDataLoading: boolean;
  userLikedCharacters: Character[];
}

const initialState: State = {
  user: null,
  isUserDataLoading: true,
  userLikedCharacters: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<null | User>) {
      state.user = action.payload;
      state.isUserDataLoading = false;
    },
    setLikedCharacters(state, action: PayloadAction<Character[]>) {
      state.userLikedCharacters = action.payload;
    },
  },
});

export default userSlice.reducer;
