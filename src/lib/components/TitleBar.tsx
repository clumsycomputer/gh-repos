import { createStyles, makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'

export interface TitleBarProps {
  title: string
  actions?: ReactNode[]
}

export const TitleBar = (props: TitleBarProps) => {
  const { title, actions = [] } = props
  const styles = useStyles()
  return (
    <div className={styles.barContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.titleUnderline} />
      </div>
      <div className={styles.actionsContainer}>{actions}</div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    barContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      display: 'flex',
      flexDirection: 'row',
      padding: '10px 10px 0 10px',
    },
    titleContainer: {
      maxWidth: '75%',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    titleUnderline: {
      marginLeft: 14,
      marginTop: 2,
      width: '100%',
      height: 2,
      borderRadius: 2,
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    actionsContainer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  })
)
