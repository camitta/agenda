import React from 'react'
import {connect} from 'react-redux'
import {getAllTasks} from '../store/all-tasks'
import {removeChipsFromSingleTask} from '../store/tasks'

// Material UI
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'

const Chips = props => {
  const {label, fetchTasks, boardId, taskId, removeChips} = props

  const handleDelete = async () => {
    await removeChips(taskId)
    await fetchTasks(boardId)
  }

  return (
    <Chip
      style={{backgroundColor: label, width: 100, justifyContent: 'flex-end'}}
      size="small"
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
