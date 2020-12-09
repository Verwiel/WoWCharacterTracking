import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authorizationReducer from '../features/authorization/authorizationSlice'
import battlenetReducer from '../features/battlenet/battlenetSlice'


export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    battlenet: battlenetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
