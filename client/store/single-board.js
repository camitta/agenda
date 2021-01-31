import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_BOARD = 'GET_SINGLE_BOARD'
const REMOVE_SINGLE_BOARD = 'REMOVE_SINGLE_BOARD'
const ADD_SINGLE_BOARD = 'ADD_SINGLE_BOARD'
const EDIT_SINGLE_BOARD = 'EDIT_SINGLE_BOARD'
/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const fetchSingleBoard = board => ({type: GET_SINGLE_BOARD, board})
const removeSingleBoard = () => ({type: REMOVE_SINGLE_BOARD})
const addedSingleBoard = board => ({type: ADD_SINGLE_BOARD, board})
const editedSingleBoard = board => ({type: EDIT_SINGLE_BOARD, board})
/**
 * THUNK CREATORS
 */
export const getSingleBoard = boardId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/boards/${boardId}`)
    dispatch(fetchSingleBoard(data))
  } catch (err) {
    console.error(err)
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
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_BOARD:
      return action.board
    case REMOVE_SINGLE_BOARD:
      return initialState
    case ADD_SINGLE_BOARD:
      return action.board
    case EDIT_SINGLE_BOARD:
      return action.board
    default:
      return state
  }
}
