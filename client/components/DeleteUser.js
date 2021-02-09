import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {unassignUserFromTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

// Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const DeleteUser = props => {
  const {firstName, lastName, userId, boardId, taskId} = props

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
      await props.unassignUser(taskId, boardId, userId)
      await props.fetchTasks(boardId)
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Avatar onClick={() => handleClickOpen()}>
        {firstName[0]}
        {lastName[0]}
      </Avatar>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {firstName} from this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color: 'red'}}>
            No
          </Button>
          <Button
            onClick={() => handleDelete()}
            style={{color: 'green'}}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapDispatch = dispatch => ({
  unassignUser: (taskId, boardId, userId) =>
    dispatch(unassignUserFromTask(taskId, boardId, userId)),
  fetchTasks: boardId => dispatch(getAllTasks(boardId))
})

export default connect(null, mapDispatch)(DeleteUser)
