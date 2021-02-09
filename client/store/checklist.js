import axios from 'axios'

// Action Types
const GET_CHECKLIST = 'GET_CHECKLIST'
const ADD_TO_CHECKLIST = 'ADD_TO_CHECKLIST'
const EDIT_CHECKLIST_ITEM = 'EDIT_CHECKLIST_ITEM'
const DELETE_CHECKLIST_ITEM = 'DELETE_CHECKLIST_ITEM'

// Action Creators
const getChecklist = checklist => ({
  type: GET_CHECKLIST,
  checklist
})

const addToChecklist = checklist => ({
  type: ADD_TO_CHECKLIST,
  checklist
})

const editChecklistItem = checklist => ({
  type: EDIT_CHECKLIST_ITEM,
  checklist
})

const deleteChecklistItem = checklist => ({
  type: DELETE_CHECKLIST_ITEM,
  checklist
})

const defaultState = []

// Thunks
export const fetchChecklist = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/checklist')
    dispatch(getChecklist(data))
  } catch (err) {
    console.error(err)
  }
}

export const addChecklistItem = item => async dispatch => {
  try {
    await axios.post('/api/checklist', item)
    const {data} = await axios.get('/api/checklist')
    dispatch(addToChecklist(data))
  } catch (err) {
    console.error(err)
  }
}

export const editChecklist = update => async dispatch => {
  try {
    await axios.put('/api/checklist', update)
    const {data} = await axios.get('/api/checklist')
    dispatch(editChecklistItem(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteItem = itemId => async dispatch => {
  try {
    await axios.delete('/api/checklist', {data: {id: itemId}})
    const {data} = await axios.get('/api/checklist')
    dispatch(deleteChecklistItem(data))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_CHECKLIST:
    case ADD_TO_CHECKLIST:
    case EDIT_CHECKLIST_ITEM:
    case DELETE_CHECKLIST_ITEM:
      return action.checklist
    default:
      return state
  }
}
