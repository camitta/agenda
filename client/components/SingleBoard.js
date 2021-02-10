//React components
import React, {useEffect, useState} from 'react'
import List from './List'
import AddUserToBoard from './AddUserToBoard'
import {DragDropContext} from 'react-beautiful-dnd'
import {FilterTasksByLabel, DeleteBoard} from './index'

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
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'

// Custom MUI
import {singleBoardStyles} from './CustomMUI/SingleBoardMUI'
import {StyledAccordionSummary} from './CustomMUI/GradientAccordion'

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
  const boardType = props.singleBoard.type

  function loadBoardAndTasks() {
    try {
      props.fetchSingleBoard(boardId)
      props.getAllTasks(boardId)
    } catch (error) {
      console.log(error)
    }
  }

  // Opens the 'delete board' dialog box.
  function handleOpen(event) {
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

  // Allow a draggable item to be dropped without flickering.
  function handleDragEnd({destination, source}) {
    // Filter the task state based on which list they are coming from/leaving.
    const sourceTasks = tasks
      .filter(item => item.type === source.droppableId)
      .sort((a, b) => a.index - b.index)
    const destinationTasks = tasks
      .filter(item => item.type === destination.droppableId)
      .sort((a, b) => a.index - b.index)
    const otherTasks = tasks.filter(
      item =>
        item.type !== source.droppableId &&
        item.type !== destination.droppableId
    )

    const taskLists = {sourceTasks, destinationTasks, otherTasks}

    const destType = destination.droppableId
    const sourceType = source.droppableId

    if (!destination) {
      return
    }

    if (destType !== sourceType) {
      changeLists(taskLists, destination, source)
    } else {
      reorderList(taskLists, destination, source)
    }
    updateDB()
  }

  // Reorder tasks within a list.
  function reorderList(taskLists, destination, source) {
    const {sourceTasks, otherTasks} = taskLists
    const taskInUse = sourceTasks.splice(source.index, 1)
    sourceTasks.splice(destination.index, 0, taskInUse[0])
    sourceTasks.forEach(function(item, i) {
      item.index = i
    })
    props.getTasksNoDB([...otherTasks, ...sourceTasks])
  }

  // Reorganize and reorder tasks between lists.
  function changeLists(taskLists, destination, source) {
    const {sourceTasks, destinationTasks, otherTasks} = taskLists
    const taskInUse = sourceTasks.splice(source.index, 1)
    taskInUse[0].type = destination.droppableId
    destinationTasks.splice(destination.index, 0, taskInUse[0])
    sourceTasks.forEach(function(item, i) {
      item.index = i
    })
    destinationTasks.forEach(function(item, i) {
      item.index = i
    })
    props.getTasksNoDB([...otherTasks, ...destinationTasks, ...sourceTasks])
  }

  // Update the database after organizing/reordering tasks.
  // This must come after state changes, or else the tasks will flicker.
  async function updateDB() {
    for (let i = 0; i < tasks.length; i++) {
      await props.editSingleTask(tasks[i].id, tasks[i])
    }
    await props.getAllTasks(boardId)
  }

  // Separate the tasks based on completion type.
  let todoTasks, progressTasks, doneTasks
  if (tasks && tasks.length) {
    todoTasks = tasks.filter(task => task.type === 'todo')
    progressTasks = tasks.filter(task => task.type === 'inprogress')
    doneTasks = tasks.filter(task => task.type === 'done')
  }

  const classes = singleBoardStyles()

  return (
    <div className={classes.singleBoardContainer}>
      {boardType === 'team' ? (
        <Accordion>
          <StyledAccordionSummary expandIcon={<GroupIcon />}>
            {/* <Typography>team</Typography> */}
          </StyledAccordionSummary>
          <AccordionDetails>
            <AddUserToBoard currentBoard={props.singleBoard} />
          </AccordionDetails>
        </Accordion>
      ) : null}
      <div className={classes.filterContainer}>
        <Title variant="h3">{props.singleBoard.name}</Title>
        <FilterTasksByLabel boardId={boardId} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListsContainer>
          <List
            status="todo"
            boardId={boardId}
            boardType={boardType}
            tasks={todoTasks}
          />
          <List
            status="inprogress"
            boardId={boardId}
            boardType={boardType}
            tasks={progressTasks}
          />
          <List
            status="done"
            boardId={boardId}
            boardType={boardType}
            tasks={doneTasks}
          />
        </ListsContainer>
      </DragDropContext>
      <div className={classes.deleteContainer}>
        <Button
          className={classes.deleteButton}
          variant="contained"
          onClick={handleOpen}
        >
          Delete board
        </Button>
        <DeleteBoard
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          open={open}
        />
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
