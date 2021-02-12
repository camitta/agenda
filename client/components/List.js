import React, {useState} from 'react'
import {connect} from 'react-redux'
import Task from './Task'
import {TaskForm} from './index'
import {generateListTypeName, validateForm} from '../functions'
import {Droppable} from 'react-beautiful-dnd'

// Material UI components
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Container from '@material-ui/core/Container'

// Custom MUI
import {listStyles} from './CustomMUI/listMUI'
import {StyledAccordionSummary} from './CustomMUI/GradientAccordion'

// Redux
import {addSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

// const ListContainer = styled.div`
//   background-color: #dfe3e6;
//   border-radius: 3px;
//   align-content: center;
//   justify-content: center;
//   padding: 8px;
//   margin: 0 8px 0 0;
// `

const List = props => {
  const {tasks, boardId, status, boardType} = props

  const defaultState = {
    name: '',
    description: '',
    type: status,
    dueDate: new Date(),
    label: '',
    errors: {
      name: true,
      description: true
    },
    errorHandling: false
  }

  const [state, setState] = useState(defaultState)

  //Manage expanded accordion state
  const [expanded, setExpanded] = useState(false)
  const onAccordionClick = () => {
    setExpanded(prev => !prev)
  }
  const onAccordionSummaryClick = () => {
    setExpanded(true)
  }
  const handleAccordionChange = () => {
    if (expanded === true) {
      setExpanded(false)
    }
  }

  // Date picker event returns only the date - this extra function is required.
  const handleDateChange = date => {
    setState({...state, dueDate: date})
  }

  const handleChange = event => {
    const {name, value} = event.target

    let errors = state.errors
    switch (name) {
      case 'name':
        errors.name = !value.length
        break
      case 'description':
        errors.description = !value.length
        break
      default:
        break
    }
    setState({...state, errors, [event.target.name]: event.target.value})
  }

  const handleSubmit = async () => {
    let length = 0
    if (tasks && tasks.length) {
      length = tasks.length
    }
    await props.add(boardId, {...state, index: length})
    await props.getAllTasks(boardId)
    setState(defaultState)
    if (validateForm(state.errors)) {
      await props.add(boardId, {...state, index: length})
      await props.getAllTasks(boardId)
      setState(defaultState)
      handleAccordionChange()
    } else {
      setState({
        ...state,
        errorHandling: true
      })
    }
  }

  const classes = listStyles()

  return (
    <Droppable droppableId={status}>
      {provided => (
        <div
          style={{width: '100%'}}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Container className={classes.container}>
            <Typography variant="h6" className={classes.status}>
              {generateListTypeName(status)}
            </Typography>
            <div>
              <ClickAwayListener onClickAway={handleAccordionChange}>
                <Accordion expanded={expanded}>
                  <StyledAccordionSummary
                    expandIcon={<AddIcon fontSize="small" />}
                    id="panel1a-header"
                    onClick={onAccordionClick}
                  />
                  <AccordionDetails>
                    <div className={classes.addTaskForm}>
                      <TaskForm
                        state={state}
                        handleChange={handleChange}
                        handleDateChange={handleDateChange}
                      />
                      {props.error &&
                        props.error.response && (
                          <Typography variant="body1" style={{padding: '10px'}}>
                            {typeof props.error.response.data === 'string' &&
                              generateErrorMessage(props.error.response.data)}
                          </Typography>
                        )}
                      <IconButton onClick={handleSubmit}>
                        <DoneIcon />
                      </IconButton>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </ClickAwayListener>

              <Accordion expanded={expanded}>
                <StyledAccordionSummary
                  expandIcon={<AddIcon fontSize="small" />}
                  id="panel1a-header"
                  onClick={onAccordionClick}
                />
                <AccordionDetails onClick={onAccordionSummaryClick}>
                  <div className={classes.addTaskForm}>
                    <TaskForm
                      state={state}
                      handleChange={handleChange}
                      handleDateChange={handleDateChange}
                    />
                    <IconButton onClick={handleSubmit}>
                      <DoneIcon />
                    </IconButton>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            {tasks && tasks.length
              ? tasks.sort((a, b) => a.index - b.index).map((task, index) => {
                  return (
                    <Task
                      task={task}
                      boardId={boardId}
                      boardType={boardType}
                      index={index}
                      key={task.id}
                    />
                  )
                })
              : null}
          </Container>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const mapDispatch = dispatch => {
  return {
    add: (boardId, task) => dispatch(addSingleTask(boardId, task)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(null, mapDispatch)(List)
