import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { Route } from 'react-router-dom'
import { RepositoriesPage } from './RepositoriesPage'

export const App = () => {
  const styles = useStyles()
  return (
    <div className={styles.appContainer}>
      <Route path={'/'}>
        <RepositoriesPage />
      </Route>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    appContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
)
