import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { createAppTheme } from 'lib/AppTheme'
import { App } from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createAppTheme()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
