import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import {
  setLoggedIn
} from '../authorization/authorizationSlice'

interface SpotifyExampleState {
  displayName: string,
  token: string
}

const initialState: SpotifyExampleState = {
  displayName: '',
  token: ''
}

export const battlenetSlice = createSlice({
  name: 'battlenet',
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
})

export const { setDisplayName } = battlenetSlice.actions

export const selectDisplayName = (state: RootState) => state.battlenet.displayName

export const setUserProfileAsync = (accessToken: string): AppThunk => dispatch => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', 'Bearer ' + accessToken)
  fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data)
      dispatch(setDisplayName(data.display_name ? data.display_name : data.id))
    }).catch((error) => {
      console.log(error)
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
          dispatch(setLoggedIn(false))
        }
      }
    })
}

export default battlenetSlice.reducer
