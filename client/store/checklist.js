import axios from 'axios'

const GET_CHECKLIST = 'GET_CHECKLIST'

const getChecklist = checklist => ({
  type: GET_CHECKLIST,
  checklist
})

const defaultState = []

export const fetchChecklist = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/checklist')
    dispatch(getChecklist(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_CHECKLIST:
      return action.checklist
    default:
      return state
  }
}
