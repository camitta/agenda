import React, {useContext} from 'react'
import {default as StarIcon} from '@material-ui/icons/Star'
import {default as FlareIcon} from '@material-ui/icons/Flare'
import {default as Brightness3Icon} from '@material-ui/icons/Brightness3'
import {ToggleButtonGroup} from '@material-ui/lab'
import {CustomToggle} from './CustomMUI/ToggleButtonMUI'
import {CustomThemeContext} from '../theme/components/CustomThemeProvider'

export const ThemeToggle = props => {
  const {currentTheme, setTheme} = useContext(CustomThemeContext)

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
