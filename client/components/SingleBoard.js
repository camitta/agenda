//React components
import React, {useEffect, useState} from 'react'
import List from './List'
import AddUserToBoard from './AddUserToBoard'
import {DragDropContext} from 'react-beautiful-dnd'
import {FilterTasksByLabel} from './index'

//Redux store items
import {connect} from 'react-redux'
import {getSingleBoard, deleteSingleBoard} from '../store/single-board'
import {getAllTasks, getTasksNoDB} from '../store/all-tasks'
import {editSingleTask} from '../store/tasks'

//Material-UI items
import styled from 'styled-components'
import {withStyles} from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

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
  const {tasks} = props

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

  function handleDragEnd({destination, draggableId}) {
    if (!destination) {
      return
    }
    let taskInUse = {}
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(draggableId)) {
        taskInUse = tasks[i]
        tasks.splice(i, 1)
      }
    }
    props.getTasksNoDB([
      ...tasks,
      {...taskInUse, type: destination.droppableId}
    ])
    updateDB(draggableId, destination)
  }

  async function updateDB(draggableId, destination) {
    await props.editSingleTask(draggableId, {type: destination.droppableId})
    await props.getAllTasks(boardId)
  }

  let todoTasks, progressTasks, doneTasks
  if (tasks && tasks.length) {
    todoTasks = tasks.filter(task => task.type === 'todo')
    progressTasks = tasks.filter(task => task.type === 'inprogress')
    doneTasks = tasks.filter(task => task.type === 'done')
  }

  const classes = singleBoardStyles()

  return (
    <div className={classes.singleBoardContainer}>
      {props.singleBoard.type === 'team' ? (
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
      ) : null}
      <Title variant="h3">{props.singleBoard.name}</Title>
      <div className={classes.filterContainer}>
        <FilterTasksByLabel boardId={boardId} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListsContainer>
          <List status="todo" boardId={boardId} tasks={todoTasks} />
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
        <Dialog
          open={open}
          aria-labelledby="delete-board-confirmation"
          aria-describedby="delete-board-modal"
          onClose={handleCancel}
        >
          <DialogTitle style={{padding: '20px 20px 0px 20px'}}>
            Are you sure you want to delete this board?
          </DialogTitle>
          <DialogActions style={{textAlign: 'center'}}>
            <Button onClick={handleDelete} style={{color: 'green'}}>
              Yes
            </Button>
            <Button onClick={handleCancel} style={{color: 'red'}}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

const filterFunc = (tasks, label) => {
  return label === '' || label === 'all'
    ? tasks
    : tasks.filter(task => task.label === label)
}

const mapState = state => {
  return {
    singleBoard: state.singleBoard,
    tasks: filterFunc(state.allTasks, state.filter)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleBoard: boardId => dispatch(getSingleBoard(boardId)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    deleteBoard: boardId => dispatch(deleteSingleBoard(boardId)),
    editSingleTask: (id, task) => dispatch(editSingleTask(id, task)),
    getTasksNoDB: tasks => dispatch(getTasksNoDB(tasks))
  }
}

export default connect(mapState, mapDispatch)(SingleBoard)
