import React, {useState, useEffect} from 'react'
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

  useEffect(() => {
    let isMounted = false
    if (!isMounted) setOpen(false)
    return () => {
      isMounted = true
    }
  }, [])

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
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-description">
          Are you sure you want to remove "{taskName}" from the board?
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={handleClose} style={{color: 'red'}}>
            Changed My Mind
          </IconButton>
          <IconButton onClick={handleDelete} style={{color: 'green'}} autoFocus>
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
