import { configureStore } from '@reduxjs/toolkit'
import changerReducer from '../redux/change/changeSlice'

export const store = configureStore({
  reducer: {
    changer: changerReducer,
  },
})