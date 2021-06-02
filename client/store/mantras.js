import axios from 'axios'

// Action Types
const GET_MANTRAS = 'GET_MANTRAS'

// Action Creators
const getMantras = mantras => ({
  type: GET_MANTRAS,
  mantras
})

// Thunks
export const fetchMantras = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/boards')
    dispatch(getMantras(data.mantras))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_MANTRAS:
      return action.mantras
    default:
      return state
  }
}
