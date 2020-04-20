import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
const ENDPOINT = 'http://127.0.0.1:4001'
const socket = socketIOClient(ENDPOINT)




const App = () => {
  const [ledStatus, setLedStatus ] = useState(false)
  
  useEffect(() => {
    socket
      .emit('LED-STATUS-CHECK', true)
      .on('LED-STATUS-UPDATE', bool => {
        setLedStatus(bool)
      })
  }, [])

  return (
    <div>
      <h1>{ledStatus ? 'on' : 'off'}</h1>
      <button 
        onClick={e => {
          socket.emit('LED-STATUS-CHANGE', true)
        }}
      >
        turn on
      </button>
      <button 
        onClick={e => {
          socket.emit('LED-STATUS-CHANGE', false)
        }}
      >
        turn off
      </button>

    </div>
  )
}

export default App


