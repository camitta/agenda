import React from 'react'
import Task from './Task'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}))

const List = props => {
  const classes = useStyles()
  const {tasks} = props
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title={props.type} />
      {tasks &&
        tasks.length &&
        tasks.map(task => <Task key={task.id} task={task} />)}
    </Card>
  )
}

export default List
