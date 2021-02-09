import axios from 'axios'

// Action Types
const GET_TASKS = 'GET_TASKS'
const REMOVE_USERS_FROM_BOARD_TASKS = 'REMOVE_USERS_FROM_BOARD_TASKS'
const GET_NON_DB_TASKS = 'GET_NON_DB_TASKS'

const initialState = []

// Action Creators
const fetchAllTasks = tasks => ({type: GET_TASKS, tasks})
const removedUserfromBoardTasks = tasks => ({
  type: REMOVE_USERS_FROM_BOARD_TASKS,
  tasks
})
const getNonDBTasks = tasks => ({type: GET_NON_DB_TASKS, tasks})

// Thunk Creators
export const getAllTasks = boardId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tasks/allTasks/${boardId}`)
    dispatch(fetchAllTasks(data))
  } catch (err) {
    console.log(err)
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
export default function(state = initialState, action) {
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
