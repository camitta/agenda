import React from 'react'
import Task from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {getAllTasks} from '../store/all-tasks'

//need task.type to figure out what list to add to
const TaskContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`
const List = props => {
  console.log('this.props from List', props)
  const {tasks} = props
  return (
    <TaskContainer>
      {tasks &&
        tasks.length &&
        tasks.map(task => <Task key={task.id} taskId={task.id} />)}
    </TaskContainer>
  )
}

export default List
