import React, {useState} from 'react'
import {unassignUserFromTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'

// Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const UserAvatar = props => {
  const {users, taskId, boardId} = props || []

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async userId => {
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
      {users.length
        ? users.map(user => (
            <div key={user.id}>
              <Avatar onClick={() => handleClickOpen()}>
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove {user.firstName} from the
                    task?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Changed My Mind
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    color="primary"
                    autoFocus
                  >
                    Yes I Do
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ))
        : null}
    </>
  )
}

const mapDispatch = dispatch => ({
  unassignUser: (taskId, boardId, userId) =>
    dispatch(unassignUserFromTask(taskId, boardId, userId)),
  fetchTasks: boardId => dispatch(getAllTasks(boardId))
})

export default connect(null, mapDispatch)(UserAvatar)
