import React, {useState, useEffect} from 'react'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import {deleteSingleTask} from '../store/tasks'

// Material UI
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

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
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {taskName} from the board?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} color="primary">
            Changed My Mind
          </IconButton>
          <IconButton onClick={handleDelete} color="primary" autoFocus>
            Yes I Do
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
