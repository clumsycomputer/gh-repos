import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { createAppTheme } from 'lib/AppTheme'
import { App } from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createAppTheme()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register()
}
