import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Draggable} from 'react-beautiful-dnd'
import {checkDueDate} from '../functions'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Custom MUI
import {taskStyles} from './CustomMUI/TaskMUI'
import styled from 'styled-components'

// Redux
import {editSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

// Components
import {AddUserToTask, TaskForm, DeleteTask, Chips} from './index'

const TaskContainer = styled.div`
  position: center;
  max-width: 100%;
  word-wrap: break-word;
`
const Task = props => {
  const {task, boardId, index} = props

  const classes = taskStyles()

  const defaultState = {
    edit: false,
    name: task.name,
    description: task.description,
    type: task.type,
    dueDate: task.dueDate,
    label: task.label
  }

  const [state, setState] = useState(defaultState)

  useEffect(() => {
    checkDueDate(task.dueDate, task.id)
    let isMounted = false
    if (!isMounted) setState(defaultState)
    return () => {
      isMounted = true
    }
  }, [])

  // date picker event returns only the date - this extra function is required
  const handleDateChange = date => {
    setState({...state, dueDate: date})
  }

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = async () => {
    await props.updateSingleTask(task.id, {
      name: state.name,
      description: state.description,
      type: state.type,
      dueDate: state.dueDate,
      label: state.label
    })
    await props.getAllTasks(props.boardId)
    setState({...state, edit: !state.edit})
    checkDueDate(task.dueDate, task.id)
  }
  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskContainer>
            <Card>
              <CardContent>
                {state.edit === false ? (
                  <div>
                    <Accordion style={{boxShadow: 'none', margin: 'auto'}}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div>
                          {task.label &&
                            task.label.length && (
                              <Chips
                                label={task.label}
                                boardId={boardId}
                                taskId={task.id}
                              />
                            )}
                          <Typography
                            variant="h6"
                            style={{textAlign: 'left'}}
                            id={'taskName' + task.id}
                          >
                            {task.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={classes.dueDate}
                          >
                            Due Date: {moment(task.dueDate).format('LL')}
                          </Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className={classes.cardLayout}>
                        <Typography
                          variant="body2"
                          style={{
                            alignSelf: 'flex-start',
                            paddingBottom: '30px'
                          }}
                        >
                          {task.description}
                        </Typography>
                        <Typography variant="subtitle1">
                          Assign user to task:
                        </Typography>
                        <AddUserToTask task={task} board={props.task.board} />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ) : (
                  <TaskForm
                    handleChange={handleChange}
                    state={state}
                    handleDateChange={handleDateChange}
                  />
                )}
              </CardContent>
            </Card>
            <DeleteTask
              taskId={task.id}
              boardId={boardId}
              taskName={task.name}
            />
            {state.edit === false ? (
              <IconButton
                aria-label="edit"
                onClick={() => setState({...state, edit: !state.edit})}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="submit" onClick={() => handleSubmit()}>
                <DoneIcon color="primary" />
              </IconButton>
            )}
          </TaskContainer>
        </div>
      )}
    </Draggable>
  )
}

const mapDispatch = dispatch => {
  return {
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    updateSingleTask: (id, task) => dispatch(editSingleTask(id, task))
  }
}

export default connect(null, mapDispatch)(Task)
