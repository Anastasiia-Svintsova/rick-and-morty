import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

const LOCALE_STORAGE_DATA = localStorage.getItem('user')
const USER = LOCALE_STORAGE_DATA ? JSON.parse(LOCALE_STORAGE_DATA) : null

interface State {
  user: null | User
}

const initialState: State = {
  user: USER,
}

export const userSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<null | User>) {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload
    },
  },
})

export default userSlice.reducer
