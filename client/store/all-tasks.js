import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_TASKS = 'GET_TASKS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const fetchAllTasks = tasks => ({type: GET_TASKS, tasks})

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks
    default:
      return state
  }
}
