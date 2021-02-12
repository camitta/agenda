import React, {useState} from 'react'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import {deleteSingleTask} from '../store/tasks'

// Material UI
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const DeleteTask = props => {
  const {taskId, boardId, taskName} = props
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      await props.removeSingleTask(taskId)
      await props.getAllTasks(boardId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-description">
          Are you sure you want to remove "{taskName}" from the board?
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={handleClose} style={{color: 'red'}}>
            no
          </IconButton>
          <IconButton onClick={handleDelete} style={{color: 'green'}} autoFocus>
            yes
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapDispatch = dispatch => {
  return {
    removeSingleTask: id => dispatch(deleteSingleTask(id)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}
export default connect(null, mapDispatch)(DeleteTask)
