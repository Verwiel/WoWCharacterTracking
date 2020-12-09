import React from 'react'
import logo from './assets/logo.svg'
import { Authorization } from './features/authorization/Authorization'
import { BattlenetUser } from './features/battlenet/BattlenetUser'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Authorization />
        <BattlenetUser />
      </header>
    </div>
  )
}

export default App
