import axios from 'axios'

// Action Type
const GET_BOARDS = 'GET_BOARDS'

// Action Creator
const getBoards = boards => ({
  type: GET_BOARDS,
  boards
})

// Thunk
export const fetchBoards = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/boards')
    dispatch(getBoards(data.boards))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_BOARDS:
      return action.boards
    default:
      return state
  }
}
