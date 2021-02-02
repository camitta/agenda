import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const TaskContainer = styled.div`
  position: center;
  max-width: 33%;
  word-wrap: break-word;
`
const Task = props => {
  const handleDelete = id => {
    props.removeSingleTask(id)
  }

  const task = props.task
  return (
    <TaskContainer>
      <Card>
        <Button onClick={() => handleDelete(task.id)}>delete</Button>
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </Card>
    </TaskContainer>
  )
}

export default Task
