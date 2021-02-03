//React components
import React, {Component} from 'react'
import List from './List'
import AddUserToBoard from './AddUserToBoard'

//Redux store items
import {connect} from 'react-redux'
import {getSingleBoard} from '../store/single-board'
import {getAllTasks} from '../store/all-tasks'

//Material-UI items
import styled from 'styled-components'
import GroupIcon from '@material-ui/icons/Group'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

const ListsContainer = styled.div`
  justify-content: space-around;
  padding: 4em;
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
        <Accordion>
          <AccordionSummary
            expandIcon={<GroupIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Team Members</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddUserToBoard currentBoard={this.props.singleBoard} />
          </AccordionDetails>
        </Accordion>
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
