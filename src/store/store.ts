import { configureStore, combineReducers } from '@reduxjs/toolkit'

import commonReducer from './reducers/CommonSlice'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  commonReducer,
  userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
