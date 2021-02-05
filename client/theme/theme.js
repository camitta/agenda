import {createMuiTheme} from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        },
        '*=.MuiButton-root': {
          fontFamily: 'Roboto Mono',
          border: 2,
          color: '#000000'
        },
        '*=.MuiButtonBase-root': {
          fontFamily: 'Roboto Mono'
        }
      }
    }
  },
  palette: {
    primary: indigo,
    secondary: {
      main: '#00bfa5'
    }
  },
  typography: {
    fontFamily: 'Roboto Mono',
    button: {
      fontFamily: 'Roboto Mono',
      border: 2
    },
    '@media (min-width:600px)': {
      fontSize: '1.5rem'
    }
  },
  shape: {
    borderRadius: 0,
    outline: 1
  },
  spacing: 2,
  alignItems: 'center',
  justify: 'center'
})

export default theme
