//React components
import React, {useEffect, useState} from 'react'
import List from './List'
import AddUserToBoard from './AddUserToBoard'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

//Redux store items
import {connect} from 'react-redux'
import {getSingleBoard, deleteSingleBoard} from '../store/single-board'
import {getAllTasks} from '../store/all-tasks'

//Material-UI items
import styled from 'styled-components'
import {withStyles} from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

// Custom MUI
import {singleBoardStyles} from './CustomMUI/SingleBoardMUI'

const ListsContainer = styled.div`
  justify-content: space-around;
  padding: 1em 4em 4em 4em;
  display: flex;
  flex-direction: row;
  justify-content: space around;
  text-align: center;
`

const Title = withStyles({
  root: {
    textAlign: 'center',
    marginTop: '1rem'
  }
})(Typography)

const SingleBoard = props => {
  useEffect(() => {
    loadBoardAndTasks()
  }, [])

  const [open, setOpen] = useState(false)

  const boardId = props.match.params.boardId

  function loadBoardAndTasks() {
    try {
      props.fetchSingleBoard(boardId)
      props.getAllTasks(boardId)
    } catch (error) {
      console.log(error)
    }
  }

  function handleModal(event) {
    event.preventDefault()
    setOpen(true)
  }

  async function handleDelete(event) {
    event.preventDefault()
    await props.deleteBoard(boardId)
    setOpen(false)
    props.history.push('/home')
  }

  function handleCancel(event) {
    event.preventDefault()
    setOpen(false)
  }

  const tasks = props.tasks

  let todoTasks, progressTasks, doneTasks
  if (tasks && tasks.length) {
    todoTasks = tasks.filter(task => task.type === 'todo')
    progressTasks = tasks.filter(task => task.type === 'inprogress')
    doneTasks = tasks.filter(task => task.type === 'done')
  }

  const classes = singleBoardStyles()

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<GroupIcon />}
          aria-controls="single-task"
        >
          <Typography>Team Members</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddUserToBoard currentBoard={props.singleBoard} />
        </AccordionDetails>
      </Accordion>
      <Title variant="h3">{props.singleBoard.name}</Title>
      <DragDropContext>
        <ListsContainer>
          <List status="todo" board={boardId} tasks={todoTasks} />
          <List status="inprogress" boardId={boardId} tasks={progressTasks} />
          <List status="done" boardId={boardId} tasks={doneTasks} />
        </ListsContainer>
      </DragDropContext>
      <div className={classes.deleteContainer}>
        <Button
          className={classes.deleteButton}
          variant="contained"
          onClick={handleModal}
        >
          Delete board
        </Button>
        <Modal
          open={open}
          aria-labelledby="delete-board-confirmation"
          aria-describedby="delete-board-modal"
          onClose={handleCancel}
        >
          <div className={classes.modal}>
            Are you sure you want to delete this board?
            <Button onClick={handleDelete} style={{color: 'green'}}>
              Yes
            </Button>
            <Button onClick={handleCancel} style={{color: 'red'}}>
              No
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

const mapState = state => ({
  singleBoard: state.singleBoard,
  tasks: state.allTasks
})

const mapDispatch = dispatch => {
  return {
    fetchSingleBoard: boardId => dispatch(getSingleBoard(boardId)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    deleteBoard: boardId => dispatch(deleteSingleBoard(boardId))
  }
}

export default connect(mapState, mapDispatch)(SingleBoard)
