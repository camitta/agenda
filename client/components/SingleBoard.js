import React, {Component} from 'react'
import List from './List'
//import thunk creator
import {getSingleBoard} from '../store/single-board'
import {connect} from 'react-redux'
import styled from 'styled-components'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space around;
  text-align: center;
`
class SingleBoard extends Component {
  componentDidMount() {
    const {boardId} = this.props.match.params
    try {
      this.props.fetchSingleBoard(boardId)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const boardId = this.props.singleBoard.id
    const {tasks} = this.props.singleBoard

    let todoTasks, progressTasks, doneTasks
    if (tasks && tasks.length) {
      todoTasks = tasks.filter(task => task.type === 'todo')
      progressTasks = tasks.filter(task => task.type === 'inprogress')
      doneTasks = tasks.filter(task => task.type === 'done')
    }

    return (
      <ListsContainer>
        <List status="todo" boardId={boardId} tasks={todoTasks} />
        <List status="inprogress" boardId={boardId} tasks={progressTasks} />
        <List status="done" boardId={boardId} tasks={doneTasks} />
      </ListsContainer>
    )
  }
}

const mapState = state => ({
  singleBoard: state.singleBoard
})

const mapDispatch = dispatch => {
  return {
    fetchSingleBoard: boardId => dispatch(getSingleBoard(boardId))
  }
}

export default connect(mapState, mapDispatch)(SingleBoard)
