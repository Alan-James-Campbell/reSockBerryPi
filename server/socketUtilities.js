const Gpio = require('pigpio').Gpio

const addSocketListeners = (socket, io) => {
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('LED-STATUS-CHANGE', (res) => {
    io.emit('LED-STATUS', res)
  })

   socket.on('LED-STATUS-CHANGE', (res) => {
     if(res === true){
       const red = new Gpio(17, {mode: Gpio.OUTPUT})
       const green = new Gpio(18, {mode: Gpio.OUTPUT})
      
       let dutyCycle = 0
       let redOn = true
      
       setInterval(() => {
         dutyCycle += 5
         if (dutyCycle > 255) {
           dutyCycle = 0
           if(redOn){
             red.pwmWrite(dutyCycle)
             redOn = false
           }else {
             green.pwmWrite(dutyCycle)
             redOn = true
           }
         }
         if(redOn){
           red.pwmWrite(dutyCycle)
         }else {
           green.pwmWrite(dutyCycle)
         }  
       }, 20)
     }
   })
}

module.exports = { addSocketListeners }
