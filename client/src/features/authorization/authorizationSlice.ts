import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface AuthorizationState {
  loggedIn: boolean;
  accessToken: string;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  accessToken: '',
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
})

export const { setLoggedIn, setAccessToken } = authorizationSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.authorization.loggedIn
export const selectAccessToken = (state: RootState) => state.authorization.accessToken

export default authorizationSlice.reducer