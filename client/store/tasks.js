import axios from 'axios'

// Action Types
const GET_SINGLE_TASK = 'GET_SINGLE_TASK'
const REMOVE_SINGLE_TASK = 'REMOVE_SINGLE_TASK'
const ADD_SINGLE_TASK = 'ADD_SINGLE_TASK'
const EDIT_SINGLE_TASK = 'EDIT_SINGLE_TASK'
const ADD_USER_TO_TASK = 'ADD_USER_TO_TASK'
const REMOVE_USER_FROM_TASK = 'REMOVE_USER_FROM_TASK'
const REMOVE_CHIPS_FROM_TASK = 'REMOVE_CHIPS_FROM_TASK'

const initialState = {}

// Action Creators
const fetchSingleTask = singleTask => ({type: GET_SINGLE_TASK, singleTask})
const removeSingleTask = () => ({type: REMOVE_SINGLE_TASK})
const addedSingleTask = singleTask => ({type: ADD_SINGLE_TASK, singleTask})
const editedSingleTask = singleTask => ({type: EDIT_SINGLE_TASK, singleTask})
const addedUserToTask = singleTask => ({type: ADD_USER_TO_TASK, singleTask})
const removedUserFromTask = singleTask => ({
  type: REMOVE_USER_FROM_TASK,
  singleTask
})
const removedChipsFromTask = label => ({
  type: REMOVE_CHIPS_FROM_TASK,
  label
})

// Thunks
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
      await axios.put(`/api/tasks/${taskId}/assignUser/boards/${boardId}`, {
        id: userId
      })
      const {data} = await axios.get(`/api/tasks/${taskId}`)
      dispatch(addedUserToTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const unassignUserFromTask = (taskId, boardId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/tasks/${taskId}/unassignUser/boards/${boardId}`, {
        id: userId
      })
      const {data} = await axios.get(`/api/tasks/${taskId}`)
      dispatch(removedUserFromTask(data))
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

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_TASK:
    case REMOVE_USER_FROM_TASK:
    case EDIT_SINGLE_TASK:
    case ADD_USER_TO_TASK:
    case ADD_SINGLE_TASK:
      return action.singleTask
    case REMOVE_SINGLE_TASK:
      return initialState
    case REMOVE_CHIPS_FROM_TASK:
      return {...state, label: action.label}
    default:
      return state
  }
}
