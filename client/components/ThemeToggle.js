import React, {useContext} from 'react'
import {default as StarIcon} from '@material-ui/icons/Star'
import {default as FlareIcon} from '@material-ui/icons/Flare'
import {default as Brightness3Icon} from '@material-ui/icons/Brightness3'
import {ToggleButtonGroup} from '@material-ui/lab'
import {CustomToggle} from './CustomMUI/ToggleButtonMUI'
import {CustomThemeContext} from '../theme/components/CustomThemeProvider'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function ThemeToggle() {
  const classes = useStyles()
  const {currentTheme, setTheme} = useContext(CustomThemeContext)
  const isThemed = Boolean(currentTheme === 'dark')

  const handleThemeChange = (event, newTheme) => {
    setTheme(newTheme)
  }
  return (
    <ToggleButtonGroup
      value={currentTheme}
      exclusive
      size="small"
      onChange={handleThemeChange}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '.4em'
      }}
    >
      <CustomToggle value="normal" style={{borderRadius: '50%'}}>
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
