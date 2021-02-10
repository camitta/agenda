import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import theme from './theme/theme'
import Routes from './routes'
import CustomThemeProvider from './components/CustomMUI/CustomThemeProvider'
const dark = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </div>
  )
}
