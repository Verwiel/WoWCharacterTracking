import React from 'react'
import logo from './assets/logo.svg'
import { Authorization } from './features/authorization/Authorization'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Authorization />
      </header>
    </div>
  )
}

export default App
