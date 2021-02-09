import React, {useState} from 'react'
import {default as StarIcon} from '@material-ui/icons/Star'
import {default as FlareIcon} from '@material-ui/icons/Flare'
import {default as Brightness3Icon} from '@material-ui/icons/Brightness3'
import {createMuiTheme, makeStyles} from '@material-ui/core/styles'
import ToggleButton from '@material-ui/core/ToggleButton'
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup'
import {default as dark} from '.theme/darkTheme'

const useStyles = makeStyles(theme => ({}))

export const light = {
  palette: {
    type: 'light'
  }
}

const handleChange = event => {
  setState({...state, [event.target.name]: event.target.value})
}

export const ThemeToggle = props => {
  const [theme, setTheme] = useState(true)
  const classes = useStyles()
  const appliedTheme = createMuiTheme(theme ? light : dark)

  return (
    <ToggleButtonGroup
      value={themes}
      onChange={props.handleChange}
      aria-label="color mode"
    >
      <ToggleButton aria-label="mode">
        <StarIcon />
      </ToggleButton>
      <ToggleButton aria-label="mode">
        <Brightness3Icon />
      </ToggleButton>
      <ToggleButton aria-label="mode" disabled>
        <FlareIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
