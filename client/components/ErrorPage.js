import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%'
  }
}))

export default function ErrorPage(props) {
  const classes = useStyles()
  return (
    <div className={classes.page}>
      <Typography>Something went wrong...</Typography>
    </div>
  )
}
