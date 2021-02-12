import io from 'socket.io-client'
import store from './store'
import {fetchAllTasks} from './store/all-tasks'
import {
  fetchSingleBoard,
  addedUsersSingleBoard,
  removedUserSingleBoard
} from './store/single-board'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

// socket.on('all-tasks', tasks => {
//   store.dispatch(fetchAllTasks(tasks))
// })

socket.on('singleBoard', board => {
  store.dispatch(fetchSingleBoard(board))
})

socket.on('add-user', board => {
  store.dispatch(addedUsersSingleBoard(board))
})

socket.on('remove-user', board => {
  store.dispatch(removedUserSingleBoard(board))
})

export default socket
