import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Task from './Task'
import {TaskForm} from './index'
import {generateErrorMessage, generateListTypeName} from '../functions'
import {Droppable} from 'react-beautiful-dnd'

// Material UI components
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

// Custom MUI
import {listStyles} from './CustomMUI/listMUI'
import {StyledAccordionSummary} from './CustomMUI/GradientAccordion'

// Redux
import {addSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  align-content: center;
  justify-content: center;
  padding: 8px;
  margin: 0 8px 0 0;
`

const List = props => {
  const {tasks, boardId, status, boardType} = props

  const defaultState = {
    name: '',
    description: '',
    type: status,
    dueDate: new Date(),
    label: '',
    index: 0
  }

  const [state, setState] = useState(defaultState)

  // Date picker event returns only the date - this extra function is required.
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

  const classes = listStyles()

  return (
    <Droppable droppableId={status}>
      {provided => (
        <div
          style={{width: '100%'}}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <ListContainer>
            <Typography variant="h3" className={classes.status}>
              {generateListTypeName(status)}
            </Typography>
            <div>
              <Accordion>
                <StyledAccordionSummary
                  expandIcon={<AddIcon />}
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
