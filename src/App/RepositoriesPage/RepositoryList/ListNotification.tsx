import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'

export interface ListNotificationProps
  extends Required<Pick<JSX.IntrinsicElements['div'], 'className'>> {
  message: string
}

export const ListNotification = (props: ListNotificationProps) => {
  const { className, message } = props
  const styles = useStyles()
  return (
    <div className={`${styles.notificationBase} ${className}`}>{message}</div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    notificationBase: {
      padding: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })
)
