import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Task from './Task'
import {TaskForm} from './index'
import {generateErrorMessage} from '../functions'
import {Droppable} from 'react-beautiful-dnd'

// Material UI components
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

// Redux
import {addSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  align-content: center;
  justify-content: center;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`

const List = props => {
  const {tasks, boardId, status} = props

  const defaultState = {
    name: '',
    description: '',
    type: status,
    dueDate: new Date(),
    label: ''
  }

  const [state, setState] = useState(defaultState)

  useEffect(() => {
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
    await props.add(boardId, state)
    await props.getAllTasks(boardId)
    setState(defaultState)
  }

  return (
    <Droppable droppableId={status}>
      {provided => (
        <div
          style={{width: '100%'}}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <ListContainer>
            <Typography variant="h3">{status}</Typography>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                />
                <AccordionDetails>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TaskForm
                      state={state}
                      handleChange={handleChange}
                      handleDateChange={handleDateChange}
                    />
                    {props.error &&
                      props.error.response && (
                        <div>
                          {generateErrorMessage(props.error.response.data)}
                        </div>
                      )}
                    <IconButton aria-label="submit" onClick={handleSubmit}>
                      <DoneIcon />
                    </IconButton>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            {tasks && tasks.length
              ? tasks.map((task, index) => {
                  return (
                    <Task
                      task={task}
                      boardId={boardId}
                      index={index}
                      key={task.id}
                    />
                  )
                })
              : null}
          </ListContainer>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const mapState = state => ({
  error: state.singleTask.error
})

const mapDispatch = dispatch => {
  return {
    add: (boardId, task) => dispatch(addSingleTask(boardId, task)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId))
  }
}

export default connect(mapState, mapDispatch)(List)
