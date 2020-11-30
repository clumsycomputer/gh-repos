import { createStyles, makeStyles } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

export const Page: FunctionComponent = (props) => {
  const { children } = props
  const styles = useStyles()
  return (
    <div className={styles.rootContainer}>
      <div className={styles.pageContainer}>{children}</div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    rootContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    pageContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (min-width: 1264px)': {
        width: 1264,
      },
    },
  })
)
