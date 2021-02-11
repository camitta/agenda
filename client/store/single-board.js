import axios from 'axios'
import socket from '../socket'

// Action Types
const GET_SINGLE_BOARD = 'GET_SINGLE_BOARD'
const REMOVE_SINGLE_BOARD = 'REMOVE_SINGLE_BOARD'
const ADD_SINGLE_BOARD = 'ADD_SINGLE_BOARD'
const EDIT_SINGLE_BOARD = 'EDIT_SINGLE_BOARD'
const ADD_USER_TO_BOARD = 'ADD_USER_TO_BOARD '
const REMOVE_USER_FROM_BOARD = 'REMOVE_USER_FROM_BOARD'

const initialState = {}

// Action Creators
export const fetchSingleBoard = board => ({type: GET_SINGLE_BOARD, board})
const removeSingleBoard = () => ({type: REMOVE_SINGLE_BOARD})
const addedSingleBoard = board => ({type: ADD_SINGLE_BOARD, board})
const editedSingleBoard = board => ({type: EDIT_SINGLE_BOARD, board})
export const addedUsersSingleBoard = board => ({
  type: ADD_USER_TO_BOARD,
  board
})
export const removedUserSingleBoard = board => ({
  type: REMOVE_USER_FROM_BOARD,
  board
})

// Thunks
export const getSingleBoard = boardId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/boards/${boardId}`)
    dispatch(fetchSingleBoard(data))
    socket.emit('singleBoard', data)
  } catch (err) {
    dispatch(fetchSingleBoard({error: err}))
  }
}

export const deleteSingleBoard = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/boards/delete/${id}`)
      dispatch(removeSingleBoard())
    } catch (err) {
      console.error(err)
    }
  }
}

export const addSingleBoard = board => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/boards', board)
      dispatch(addedSingleBoard(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editSingleBoard = (id, board) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/boards/edit/${id}`, board)
      dispatch(editedSingleBoard(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addUserSingleBoard = (id, userEmail) => {
  return async dispatch => {
    try {
      await axios.put(`/api/boards/${id}/add/user`, {email: userEmail})
      const {data} = await axios.get(`/api/boards/${id}`)
      dispatch(addedUsersSingleBoard(data))
      socket.emit('add-user', data)
    } catch (err) {
      console.error(err)
      const {data} = await axios.get(`/api/boards/${id}`)
      return dispatch(fetchSingleBoard({...data, error: err}))
    }
  }
}

export const removeUserSingleBoard = (boardId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/boards/${boardId}/delete/user`, {id: userId})
      const {data} = await axios.get(`/api/boards/${boardId}`)
      dispatch(removedUserSingleBoard(data))
      socket.emit('remove-user', data)
    } catch (err) {
      console.error(err)
    }
  }
}

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_BOARD:
    case REMOVE_USER_FROM_BOARD:
    case EDIT_SINGLE_BOARD:
    case ADD_USER_TO_BOARD:
    case ADD_SINGLE_BOARD:
      return action.board
    case REMOVE_SINGLE_BOARD:
      return initialState
    default:
      return state
  }
}
