import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface State {
  user: null | User
  isUserDataLoading: boolean
}

const initialState: State = {
  user: null,
  isUserDataLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<null | User>) {
      state.user = action.payload
      state.isUserDataLoading = false
    },
  },
})

export default userSlice.reducer
