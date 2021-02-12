//React
import React, {useState} from 'react'

//Redux
import {addUserSingleBoard, removeUserSingleBoard} from '../store/single-board'
import {getAllTasks, removeUserfromBoardTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import {DeleteUserFromBoardDialog} from './index'

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

const AddUserToBoard = props => {
  const users = props.currentBoard.users || []
  const boardId = props.currentBoard.id

  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState('')

  const handleClickOpen = (currentId, currentName) => {
    setUserId(currentId)
    setUserName(currentName)
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

  const handleDelete = async () => {
    try {
      await props.removeUserFromBoard(boardId, userId)
      await props.removeUserfromBoardTasks(boardId, userId)
      await props.fetchTasks(boardId)
      handleClose()
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
                    onClick={() => handleClickOpen(user.id, user.firstName)}
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
      <DeleteUserFromBoardDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        userId={userId}
        userName={userName}
      />
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
        <IconButton onClick={handleSubmit}>
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
    fetchTasks: boardId => dispatch(getAllTasks(boardId)),
    removeUserfromBoardTasks: (boardId, userId) =>
      dispatch(removeUserfromBoardTasks(boardId, userId))
  }
}

export default connect(mapState, mapDispatch)(AddUserToBoard)
