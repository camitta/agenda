import React, {Component} from 'react'
import List from './List'
//import thunk creator
import {getSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`
//Need to figure out how to render 3 separate lists that specify the type
class SingleBoard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {boardId} = this.props.match.params
    try {
      this.props.fetchSingleBoard(boardId)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <ListsContainer>
        <List status="todo" />
        <List status="inprogress" />
        <List status="done" />
      </ListsContainer>
    )
  }
}

const mapState = state => ({
  tasks: state.tasks
})
// const mapState = function(state) {
//   console.log('STATE', state);
// }

const mapDispatch = dispatch => {
  return {
    fetchSingleBoard: boardId => dispatch(getSingleBoard(boardId))
  }
}

export default connect(mapState, mapDispatch)(SingleBoard)
