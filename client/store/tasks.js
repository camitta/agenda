import {SignalCellularNull} from '@material-ui/icons'
import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_SINGLE_TASK = 'GET_SINGLE_TASK'
const REMOVE_SINGLE_TASK = 'REMOVE_SINGLE_TASK'
const ADD_SINGLE_TASK = 'ADD_SINGLE_TASK'
const EDIT_SINGLE_TASK = 'EDIT_SINGLE_TASK'
const ADD_USER_TO_TASK = 'ADD_USER_TO_TASK'
const REMOVE_CHIPS_FROM_TASK = 'REMOVE_CHIPS_FROM_TASK'
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
const addedUserToTask = singleTask => ({type: ADD_USER_TO_TASK, singleTask})
const removedChipsFromTask = label => ({
  type: REMOVE_CHIPS_FROM_TASK,
  label
})
/**
 * THUNK CREATORS
 */

export const getSingleTask = taskId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tasks/${taskId}`)
    dispatch(fetchSingleTask(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteSingleTask = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tasks/${id}`)
      dispatch(removeSingleTask())
    } catch (err) {
      console.error(err)
    }
  }
}

export const addSingleTask = (boardId, task) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/tasks/boards/${boardId}`, task)
      dispatch(addedSingleTask(data))
    } catch (err) {
      dispatch(addedSingleTask({error: err}))
    }
  }
}

export const editSingleTask = (id, task) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/tasks/${id}`, task)
      dispatch(editedSingleTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const assignUserToTask = (taskId, boardId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/tasks/${taskId}/boards/${boardId}`, {id: userId})
      const {data} = await axios.get(`/api/tasks/${taskId}`)
      dispatch(addedUserToTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeChipsFromSingleTask = taskId => {
  return async dispatch => {
    try {
      const label = {label: ''}
      await axios.put(`/api/tasks/${taskId}/chips/remove`, label)
      dispatch(removedChipsFromTask(taskId, {label}))
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
    case ADD_USER_TO_TASK:
      return action.singleTask
    case REMOVE_CHIPS_FROM_TASK:
      return {...state, label: action.label}
    default:
      return state
  }
}
