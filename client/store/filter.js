// Action Types
const FILTER_BY_LABEL = 'FILTER_BY_LABEL'

// Action Creators
export const filterByLabel = label => ({
  type: FILTER_BY_LABEL,
  label
})

// Reducer
export default function(state = '', action) {
  switch (action.type) {
    case FILTER_BY_LABEL:
      return action.label
    default:
      return state
  }
}
