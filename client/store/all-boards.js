import axios from 'axios'

const GET_BOARDS = 'GET_BOARDS'

const getBoards = boards => ({
  type: GET_BOARDS,
  boards
})

const defaultState = {}

export const fetchBoards = () => async dispatch => {
  try {
    const {boards} = await axios.get('/api/boards')
    dispatch(getBoards(boards))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return action.boards
    default:
      return state
  }
}
