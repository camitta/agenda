import React, {Component} from 'react'
import List from './List'
//import thunk creator
import {addUserSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

class AddUserToBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {email: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  // componentDidMount() {
  //   const { boardId } = this.props.match.params
  //   try {
  //     this.props.fetchSingleBoard(boardId)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const boardId = this.props.currentBoard.id
      this.props.addUserToBoard(boardId, this.state.email)
      event.target.reset()
      this.state = {email: ''}
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    console.log('EMAIL-!!>', event.target.value)
    this.setState({email: event.target.value})
  }

  render() {
    // console.log("STATE WORKED--->", this.state)
    const users = this.props.currentBoard.users || []
    return (
      <div>
        <h2>Current Board Members:</h2>
        <ul>
          {users.length ? (
            users.map(user => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))
          ) : (
            <li>No current members</li>
          )}
        </ul>
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

const mapState = state => ({
  // singleBoard: state.singleBoard
})
// const mapState = function(state) {
//   console.log('STATE', state);
// }

const mapDispatch = dispatch => {
  return {
    addUserToBoard: (id, userEmail) =>
      dispatch(addUserSingleBoard(id, userEmail))
  }
}

export default connect(mapState, mapDispatch)(AddUserToBoard)
