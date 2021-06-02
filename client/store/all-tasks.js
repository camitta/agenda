import axios from 'axios'
import socket from '../socket'

// Action Types
const GET_TASKS = 'GET_TASKS'
const REMOVE_USERS_FROM_BOARD_TASKS = 'REMOVE_USERS_FROM_BOARD_TASKS'
const GET_NON_DB_TASKS = 'GET_NON_DB_TASKS'

// Action Creators
export const fetchAllTasks = tasks => ({type: GET_TASKS, tasks})

const removedUserfromBoardTasks = tasks => ({
  type: REMOVE_USERS_FROM_BOARD_TASKS,
  tasks
})

const getNonDBTasks = tasks => ({type: GET_NON_DB_TASKS, tasks})

// Thunk
export const getAllTasks = boardId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tasks/allTasks/${boardId}`)
    dispatch(fetchAllTasks(data))
    socket.emit('all-tasks', data)
  } catch (err) {
    console.error(err)
  }
}

export const removeUserfromBoardTasks = (boardId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/tasks/boards/${boardId}/delete/user`, {id: userId})
      const {data} = await axios.get(`/api/tasks/allTasks/${boardId}`)
      dispatch(removedUserfromBoardTasks(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const getTasksNoDB = tasks => dispatch => {
  dispatch(getNonDBTasks(tasks))
}

// Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_TASKS:
    case GET_NON_DB_TASKS:
      return action.tasks
    case REMOVE_USERS_FROM_BOARD_TASKS:
      return action.tasks
    default:
      return state
  }
}
