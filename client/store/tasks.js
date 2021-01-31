import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_TASK = 'GET_SINGLE_TASK'
const REMOVE_SINGLE_TASK = 'REMOVE_SINGLE_TASK'
const ADD_SINGLE_TASK = 'ADD_SINGLE_TASK'
const EDIT_SINGLE_TASK = 'EDIT_SINGLE_TASK'
/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const fetchSingleTask = singleTask => ({type: GET_SINGLE_TASK, singleTask})
const removeSingleTask = () => ({type: REMOVE_SINGLE_TASK})
const addedSingleTask = singleTask => ({type: ADD_SINGLE_TASK, singleTask})
const editedSingleTask = singleTask => ({type: EDIT_SINGLE_TASK, singleTask})
/**
 * THUNK CREATORS
 */
export const getSingleTask = (taskId, boardId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tasks/${taskId}`, boardId)
    dispatch(fetchSingleTask(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteSingleTask = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tasks/delete/${id}`)
      dispatch(removeSingleTask())
    } catch (err) {
      console.error(err)
    }
  }
}

export const addSingleTask = (task, boardId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/tasks/boards/${boardId}`, task)
      dispatch(addedSingleTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editSingleTask = (id, task) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/tasks/edit/${id}`, task)
      dispatch(editedSingleTask(data))
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
    case GET_SINGLE_TASK:
      return action.singleTask
    case REMOVE_SINGLE_TASK:
      return initialState
    case ADD_SINGLE_TASK:
      return action.singleTask
    case EDIT_SINGLE_TASK:
      return action.singleTask
    default:
      return state
  }
}
