import React, {Component} from 'react'
import List from './List'
//import thunk creator
import {getSingleBoard} from '../store/single-board'
import {getAllTasks} from '../store/all-tasks'
import {connect} from 'react-redux'
import styled from 'styled-components'
import AddUserToBoard from './AddUserToBoard'


const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space around;
  text-align: center;
`
class SingleBoard extends Component {
  componentDidMount() {
    try {
      const boardId = this.props.match.params.boardId
      this.props.fetchSingleBoard(boardId)
      this.props.getAllTasks(boardId)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const boardId = this.props.match.params.boardId
    const tasks = this.props.tasks

    let todoTasks, progressTasks, doneTasks
    if (tasks && tasks.length) {
      todoTasks = tasks.filter(task => task.type === 'todo')
      progressTasks = tasks.filter(task => task.type === 'inprogress')
      doneTasks = tasks.filter(task => task.type === 'done')
    }

    return (
      <div>
        <ListsContainer>
          <List status="todo" boardId={boardId} tasks={todoTasks} />
          <List status="inprogress" boardId={boardId} tasks={progressTasks} />
          <List status="done" boardId={boardId} tasks={doneTasks} />
        </ListsContainer>
        {/* <AddUserToBoard currentBoard={this.props.singleBoard} /> */}
      </div>
    )
  }
}

const mapState = state => ({
  singleBoard: state.singleBoard,
  tasks: state.allTasks
})

const mapDispatch = dispatch => {
  return {
    fetchSingleBoard: boardId => dispatch(getSingleBoard(boardId)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(mapState, mapDispatch)(SingleBoard)
