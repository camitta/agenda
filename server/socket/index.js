const Task = require('../db/models/index')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('all-tasks', tasks => {
      socket.broadcast.emit('all-tasks', tasks)
    })

    socket.on('singleBoard', board => {
      socket.broadcast.emit('singleBoard', board)
    })
    socket.on('add-user', board => {
      socket.broadcast.emit('add-user', board)
    })
    socket.on('remove-user', board => {
      socket.broadcast.emit('remove-user', board)
    })
  })
}
