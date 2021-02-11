import React, {useState} from 'react'
import {connect} from 'react-redux'
import Task from './Task'
import {TaskForm} from './index'
import {generateErrorMessage, generateListTypeName} from '../functions'
import {Droppable} from 'react-beautiful-dnd'

// Material UI components
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import IconButton from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

// Custom MUI
import {listStyles} from './CustomMUI/listMUI'
import {StyledAccordionSummary} from './CustomMUI/GradientAccordion'

// Redux
import {addSingleTask} from '../store/tasks'
import {getAllTasks} from '../store/all-tasks'

const TaskFormAccordion = props => {
  const {tasks, boardId, status, boardType} = props

  //Manage expanded accordion state
  const [expanded, setExpanded] = useState(false)
  const onAccordionClick = () => {
    setExpanded(prev => !prev)
  }
  const handleAccordionChange = event => {
    if (expanded === true) {
      setExpanded(false)
    }
  }

  return <div>helooo</div>
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

export default connect(mapState, mapDispatch)(TaskFormAccordion)
