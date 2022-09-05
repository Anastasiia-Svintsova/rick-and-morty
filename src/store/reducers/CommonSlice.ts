import { createSlice } from '@reduxjs/toolkit'

interface State {
  isModalOpen: boolean
}

const initialState: State = {
  isModalOpen: false,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
})

export default commonSlice.reducer
