import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%'
  },
  root: {
    position: 'relative'
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  top: {
    color: '#ab0505',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0
  },
  circle: {
    strokeLinecap: 'round'
  }
}))

export default function Loading(props) {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      <div className={classes.root}>
        <CircularProgress
          className={classes.bottom}
          variant="determinate"
          size={40}
          thickness={4}
          value={100}
          {...props}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </div>
    </div>
  )
}
