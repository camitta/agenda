import React from 'react'
import Task from './Task'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import {connect} from 'react-redux'

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
  const {tasks} = props
  return (
    <TaskContainer>
      <h3>{props.status}</h3>
      {tasks &&
        tasks.length &&
        tasks.map(task => (
          <Task key={task.id} task={task} boardId={props.boardId} />
        ))}
    </TaskContainer>
  )
}

export default List
