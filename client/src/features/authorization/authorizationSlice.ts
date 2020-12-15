import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import { authBaseURL } from '../../Config'

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

export const checkAccessTokenAsync = (accessToken: string): AppThunk => dispatch => {
  // const myHeaders = new Headers()
  // myHeaders.append('Authorization', 'Bearer ' + accessToken)
//   const body = {
//     <developer client id>:<developer secret>
// redirect_uri=<redirect URI used in authorize request>
// -d scope=<space separated scopes>
// -d grant_type=authorization_code
// -d code=<authorization code>
//   }


  fetch(`${authBaseURL}/token`, {
    method: 'POST',
    // headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data)
      // dispatch(setAccessToken(data.display_name ? data.display_name : data.id))
    }).catch((error) => {
      console.log(error)
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
          dispatch(setLoggedIn(false))
        }
      }
    })
}

export default authorizationSlice.reducer