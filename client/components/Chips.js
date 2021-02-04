import React from 'react'
import {connect} from 'react-redux'
import {getAllTasks} from '../store/all-tasks'
import {removeChipsFromSingleTask} from '../store/tasks'

// Material UI
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'

const Chips = props => {
  const {label, fetchTasks, boardId, taskId, removeChips} = props

  const labelColor = () => {
    if (label === 'green') return 'secondary'
    else if (label === 'blue') return 'primary'
  }

  const handleDelete = async () => {
    await removeChips(taskId)
    await fetchTasks(boardId)
  }

  console.log('props from Chips: ', props)
  return (
    <Chip
      label={label}
      size="small"
      color={labelColor()}
      onDelete={handleDelete}
      deleteIcon={<CancelIcon />}
    />
  )
}

const mapDispatch = dispatch => {
  return {
    removeChips: id => dispatch(removeChipsFromSingleTask(id)),
    fetchTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(null, mapDispatch)(Chips)
