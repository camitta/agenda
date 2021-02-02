import React from 'react'
import Task from './Task'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {connect} from 'react-redux'

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  align-content: center;
  justify-content: center;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`

const List = props => {
  const {tasks} = props
  return (
    <ListContainer>
      <Typography>{props.type}</Typography>
      {tasks &&
        tasks.length &&
        tasks.map(task => (
          <Task key={task.id} task={task} boardId={props.boardId} />
        ))}
    </ListContainer>
  )
}

export default List
