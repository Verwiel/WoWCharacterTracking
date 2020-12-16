import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoggedIn,
  setAuthCode,
  selectIsLoggedIn,
  selectDisplayName,
  setBattlenetUser,
  getAuthorizeHref,
} from './authorizationSlice'
import { getSearchParams, removeSearchParamsFromUrl } from '../../utils/hashUtils'

const hashParams = getSearchParams()
const auth_code = hashParams.code
removeSearchParamsFromUrl()

export function Authorization() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const displayName = useSelector(selectDisplayName)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth_code) {
      dispatch(setAuthCode(auth_code))
      dispatch(setBattlenetUser(auth_code))
      dispatch(setLoggedIn(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div>
        {!isLoggedIn ?
          <button
            aria-label="Log in using OAuth 2.0"
            onClick={async () => window.open(await getAuthorizeHref(), '_self')}
          >
            Log in with Battle.net
          </button>
          : 
          <div>
            Logged in as {displayName}
          </div>
        }
      </div>
    </div>
  )
}
