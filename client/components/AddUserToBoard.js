//React
import React, {useState} from 'react'

//Redux
import {addUserSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'

//Material UI
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/Button'

const AddUserToBoard = props => {
  const users = props.currentBoard.users || []
  const boardId = props.currentBoard.id

  const [email, setEmail] = useState('')

  const handleEmail = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      await props.addUserToBoard(boardId, email)
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  // render() {
  //   const users = this.props.currentBoard.users || []
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
            </ListItem>
          ))
        ) : (
          <ListItem>No current members</ListItem>
        )}
      </List>
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
      </form>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addUserToBoard: (id, userEmail) =>
      dispatch(addUserSingleBoard(id, userEmail))
  }
}

export default connect(null, mapDispatch)(AddUserToBoard)
