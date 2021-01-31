import axios from 'axios'

const GET_MANTRAS = 'GET_MANTRAS'

const getMantras = mantras => ({
  type: GET_MANTRAS,
  mantras
})

const defaultState = {}

export const fetchMantras = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/boards')
    dispatch(getMantras(data.mantras))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_MANTRAS:
      return action.mantras
    default:
      return state
  }
}
