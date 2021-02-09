import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TASKS = 'GET_TASKS'
const REMOVE_USERS_FROM_BOARD_TASKS = 'REMOVE_USERS_FROM_BOARD_TASKS'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const fetchAllTasks = tasks => ({type: GET_TASKS, tasks})
const removedUserfromBoardTasks = tasks => ({
  type: REMOVE_USERS_FROM_BOARD_TASKS,
  tasks
})
/**
 * THUNK CREATORS
 */

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
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks
    case REMOVE_USERS_FROM_BOARD_TASKS:
      return action.tasks
    default:
      return state
  }
}
