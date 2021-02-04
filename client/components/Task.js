import React, {useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CardHeader from '@material-ui/core/CardHeader'

// Custom MUI
import {taskStyles} from './TaskMUI'
import styled from 'styled-components'

// Redux
import {deleteSingleTask, editSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

// Components
import {AddUserToTask, TaskForm, UserAvatar, Chips} from './index'

const TaskContainer = styled.div`
  position: center;
  max-width: 100%;
  word-wrap: break-word;
`
const Task = props => {
  const {task, boardId} = props

  const classes = taskStyles()

  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState(task.description)
  const [name, setName] = useState(task.name)
  const [type, setType] = useState(task.type)
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [label, setLabel] = useState(task.label)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleTypeChange = event => {
    setType(event.target.value)
  }

  const handleLabelChange = event => {
    setLabel(event.target.value)
  }

  const handleDateChange = date => {
    setDueDate(date)
  }

  const handleDelete = async id => {
    await props.removeSingleTask(id)
    await props.getAllTasks(props.boardId)
  }

  const handleSubmit = async () => {
    await props.updateSingleTask(task.id, {
      name,
      description,
      type,
      dueDate,
      label
    })
    await props.getAllTasks(props.boardId)
    setEdit(!edit)
  }

  const taskFormProps = {
    handleDescriptionChange,
    handleNameChange,
    handleTypeChange,
    handleDateChange,
    handleLabelChange,
    name,
    setName,
    description,
    setDescription,
    type,
    setType,
    dueDate,
    setDueDate,
    label,
    setLabel
  }
  return (
    <TaskContainer>
      <Card>
        <CardContent>
          {edit === false ? (
            <div>
              <Accordion style={{boxShadow: 'none', margin: '0'}}>
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
                    <Typography variant="h6" style={{textAlign: 'left'}}>
                      {task.name}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.dueDate}>
                      Due Date: {moment(task.dueDate).format('LL')}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{task.description}</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography variant="subtitle1" style={{textAlign: 'left'}}>
                    Assign user to task:
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <AddUserToTask task={task} board={task.board} />
                  {/* <UserAvatar task={task.users} /> */}
                </AccordionDetails>
              </Accordion>
              {/* <Typography variant="h6">{task.name}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="subtitle1" className={classes.dueDate}>
                Due Date: {moment(task.dueDate).format('LL')}
              </Typography> */}
            </div>
          ) : (
            <TaskForm {...taskFormProps} />
          )}
        </CardContent>
      </Card>
      <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
      {edit === false ? (
        <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton aria-label="submit" onClick={() => handleSubmit()}>
          <DoneIcon color="primary" />
        </IconButton>
      )}
      {/* <AddUserToTask task={task.id} board={props.task.board} /> */}
    </TaskContainer>
  )
}

const mapDispatch = dispatch => {
  return {
    removeSingleTask: id => dispatch(deleteSingleTask(id)),
    getAllTasks: boardId => dispatch(getAllTasks(boardId)),
    updateSingleTask: (id, task) => dispatch(editSingleTask(id, task))
  }
}

export default connect(null, mapDispatch)(Task)
