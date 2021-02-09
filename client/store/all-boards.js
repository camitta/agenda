import axios from 'axios'

// Action Type
const GET_BOARDS = 'GET_BOARDS'

const getBoards = boards => ({
  type: GET_BOARDS,
  boards
})

const defaultState = []

// Action Creators
export const fetchBoards = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/boards')
    dispatch(getBoards(data.boards))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return action.boards
    default:
      return state
  }
}
