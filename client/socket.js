import io from 'socket.io-client'
import store from './store'
import {fetchAllTasks} from './store/all-tasks'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-task', tasks => {
  store.dispatch(fetchAllTasks(tasks))
})

export default socket
