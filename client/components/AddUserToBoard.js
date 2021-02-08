//React
import React, {useState} from 'react'

//Redux
import {addUserSingleBoard, removeUserSingleBoard} from '../store/single-board'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'

//Material UI
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/Button'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

const AddUserToBoard = props => {
  const users = props.currentBoard.users || []
  const boardId = props.currentBoard.id

  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEmail = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      await props.addUserToBoard(boardId, email)
      await props.fetchTasks(boardId)
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async userId => {
    try {
      await props.removeUserFromBoard(boardId, userId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Typography>Current Team:</Typography>
      <List>
        {users.length ? (
          users.map(user => (
            <ListItem key={user.id}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>
                {user.firstName} {user.lastName}
              </ListItemText>
              <>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={
                      user.id === props.userState.id
                        ? () => handleClickOpen()
                        : () => handleDelete(user.id)
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            </ListItem>
          ))
        ) : (
          <ListItem>No current members</ListItem>
        )}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove yourself from this board?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(props.userState.id)}
            color="primary"
            autoFocus
            href="/home"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-disabled"
          size="small"
          label="Email"
          variant="filled"
          placeholder="..."
          value={email}
          onChange={handleEmail}
        />
        <IconButton aria-label="submit" onClick={handleSubmit}>
          <PersonAddIcon style={{fontSize: 40}} color="action" />
        </IconButton>
        <>
          {props.boardState.error ? (
            <div>User not registered with Agenda</div>
          ) : (
            <></>
          )}
        </>
      </form>
    </div>
  )
}
const mapState = state => ({
  boardState: state.singleBoard,
  userState: state.user
})

const mapDispatch = dispatch => {
  return {
    addUserToBoard: (id, userEmail) =>
      dispatch(addUserSingleBoard(id, userEmail)),
    removeUserFromBoard: (boardId, userId) =>
      dispatch(removeUserSingleBoard(boardId, userId)),
    fetchTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(mapState, mapDispatch)(AddUserToBoard)
