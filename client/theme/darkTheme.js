import {createMuiTheme} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#26292C',
      light: 'rgb(81, 91, 95)',
      dark: 'rgb(26, 35, 39)',
      contrastText: '#ffffff'
    },
    secondary: {
      light: 'rgba(252, 248, 244, 1)',
      main: 'rgba(187, 161, 193, 1)',
      dark: 'rgba(98, 18, 68, 1)',
      contrastText: 'rgba(255, 255, 255, 1)'
    },
    titleBar: {
      main: '#555555',
      contrastText: '#ffffff'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
