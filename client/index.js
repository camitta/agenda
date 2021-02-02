import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme/theme'
import history from './history'
import store from './store'
import App from './app'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
