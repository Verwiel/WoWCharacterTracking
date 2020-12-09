import React from 'react'
import { useSelector } from 'react-redux'
import { selectDisplayName } from './battlenetSlice'

export function BattlenetUser() {
  const displayName = useSelector(selectDisplayName)

  return (
    <div className='column'>
      {displayName && <div className='styles'>
        Logged in as: {displayName}
      </div>}
    </div>
  )
}