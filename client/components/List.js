import React from 'react'
import Task from './Task'
import Paper from '@material-ui/core/Paper'

const List = props => {
  console.log('this.props from List', props)
  const {tasks} = props
  return (
    <Paper>
      {tasks &&
        tasks.length &&
        tasks.map(task => <Task key={task.id} task={task} />)}
    </Paper>
  )
}

export default List
