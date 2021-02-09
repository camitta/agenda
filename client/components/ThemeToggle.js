import React, {useState, useEffect} from 'react'
import {default as StarIcon} from '@material-ui/icons/Star'
import {default as FlareIcon} from '@material-ui/icons/Flare'
import {default as Brightness3Icon} from '@material-ui/icons/Brightness3'
import {createMuiTheme, makeStyles} from '@material-ui/core/styles'
import {ToggleButtonGroup} from '@material-ui/lab'
import {CustomToggle} from './CustomMUI/ToggleButtonMUI'
import dark from '../theme/darkTheme'

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
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
  }, [])
  const handleClick = theme => {
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }

  const classes = useStyles()
  const appliedTheme = createMuiTheme(theme ? light : dark)
  const [formats, setFormats] = React.useState(() => ['bold', 'italic'])
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
  }
  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      size="small"
      onChange={handleFormat}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '.4em'
      }}
    >
      <CustomToggle value="light" style={{borderRadius: '50%'}}>
        <StarIcon fontSize="small" />
      </CustomToggle>
      <CustomToggle value="dark" style={{borderRadius: '50%'}}>
        <Brightness3Icon fontSize="small" />
      </CustomToggle>
      <CustomToggle value="wildcard" style={{borderRadius: '50%'}}>
        <FlareIcon fontSize="small" />
      </CustomToggle>
    </ToggleButtonGroup>
  )
}
