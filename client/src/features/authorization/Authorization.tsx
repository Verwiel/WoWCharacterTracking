import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoggedIn,
  setAccessToken,
  selectIsLoggedIn,
  checkAccessTokenAsync
} from './authorizationSlice'
import { setUserProfileAsync } from '../battlenet/battlenetSlice'
import { getAuthorizeHref } from '../../Config'
import { getSearchParams, removeSearchParamsFromUrl } from '../../utils/hashUtils'

const hashParams = getSearchParams()
const access_token = hashParams.code
removeSearchParamsFromUrl()

export function Authorization() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true))
      dispatch(setAccessToken(access_token))
      dispatch(checkAccessTokenAsync(access_token))
      dispatch(setUserProfileAsync(access_token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div>
        {!isLoggedIn &&
          <button
          aria-label="Log in using OAuth 2.0"
          onClick={() => window.open(getAuthorizeHref(), '_self')}
          >
          Log in with Battle.net
          </button>}
        {isLoggedIn && <div>Logged in!</div>}
      </div>
    </div>
  )
}
