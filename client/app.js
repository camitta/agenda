import React from 'react'
import Routes from './routes'
import CustomThemeProvider from './theme/components/CustomThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme/baseTheme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProvider>
        <CssBaseline />
        <Routes />
      </CustomThemeProvider>
    </ThemeProvider>
  )
}
