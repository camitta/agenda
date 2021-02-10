import React from 'react'

// Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const DeleteUser = props => {
  const {
    firstName,
    lastName,
    userId,
    handleClickOpen,
    handleClose,
    handleDelete,
    open
  } = props

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
            onClick={() => handleDelete(userId)}
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

export default DeleteUser
