const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const { addSocketListeners } =  require('./socketUtilities')

const port = process.env.PORT || 4001
const index = require('./routes/index')

const app = express()

app
  .use('api', require('./api'))

const server = http.createServer(app)

const io = socketIo(server)

io.on('connection', socket => {
  console.log('New client connected')
  addSocketListeners(socket, io)
})

server.listen(port, () => console.log(`Listening on port ${port}`))