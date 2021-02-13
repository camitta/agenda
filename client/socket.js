import io from 'socket.io-client'
import store from './store'
import {fetchAllTasks} from './store/all-tasks'
import {
  addedUsersSingleBoard,
  removedUserSingleBoard
} from './store/single-board'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('all-tasks', tasks => {
  const state = store.getState()
  if (state.user && state.singleBoard.id === tasks[0].boardId) {
    store.dispatch(fetchAllTasks(tasks))
  }
})

socket.on('add-user', board => {
  const state = store.getState()
  if (state.user && state.singleBoard.id === board.id) {
    store.dispatch(addedUsersSingleBoard(board))
  }
})

socket.on('remove-user', board => {
  const state = store.getState()
  if (state.user && state.singleBoard.id === board.id) {
    store.dispatch(removedUserSingleBoard(board))
  }
})

export default socket
