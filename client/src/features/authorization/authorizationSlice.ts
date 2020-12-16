import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'

interface AuthorizationState {
  loggedIn: boolean;
  accessToken: string;
  displayName: string;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  accessToken: '',
  displayName: ''
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setAuthCode: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    }
  },
})

export const { setLoggedIn, setAuthCode, setDisplayName } = authorizationSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.authorization.loggedIn
export const selectAccessToken = (state: RootState) => state.authorization.accessToken
export const selectDisplayName = (state: RootState) => state.authorization.displayName

export const getAuthorizeHref = async () => {
  try {
    const res = await axios.get('http://localhost:5000/blizzard/authorize')
    return res.data as string
  } 
  catch(err) {
    console.log(err)
  }
}

export const setBattlenetUser = (accessToken: string): AppThunk => dispatch => {
  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/blizzard/auth/${accessToken}`)
      dispatch(setDisplayName(res.data.battletag ? res.data.battletag : res.data.id))
    } catch(err) {
      console.log(err)
      if (err instanceof XMLHttpRequest) {
        if (err.status === 401) {
          dispatch(setLoggedIn(false))
        }
      }
    }
  }
  
  fetch()
}

export default authorizationSlice.reducer
