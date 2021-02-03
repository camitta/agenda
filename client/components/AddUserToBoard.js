import React, {Component} from 'react'
import {addUserSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

//Material UI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemText from '@material-ui/core/ListItemText'

class AddUserToBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {email: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const boardId = this.props.currentBoard.id
      await this.props.addUserToBoard(boardId, this.state.email)
      // event.target.reset()
      this.state = {email: ''}
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    this.setState({email: event.target.value})
  }

  render() {
    console.log('OUR PROPS', this.props)
    console.log('OUR SINGLEBOARD', this.props.currentBoard.id)
    const users = this.props.currentBoard.users || []
    return (
      <div>
        <h2>Current Team:</h2>
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
        <form className="addUserForm" onSubmit={this.handleSubmit}>
          <div>
            <label className="label" htmlFor="email">
              Add User:
            </label>
            <input type="text" name="email" onChange={this.handleChange} />
            <button type="submit">Send Invite</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addUserToBoard: (id, userEmail) =>
      dispatch(addUserSingleBoard(id, userEmail))
  }
}

export default connect(null, mapDispatch)(AddUserToBoard)
