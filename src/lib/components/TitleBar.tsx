import React, { ReactNode } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

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
      padding: 10,
      marginBottom: 4,
    },
    titleContainer: {
      maxWidth: '75%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    titleUnderline: {
      marginLeft: 14,
      marginTop: 5,
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
      alignItems: 'center',
    },
  })
)
