import { createStyles, makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'

export interface CardStatProps {
  label: string
  value: ReactNode
}

export const CardStat = (props: CardStatProps) => {
  const { label, value } = props
  const styles = useStyles()
  return (
    <div className={styles.statContainer}>
      <div className={styles.statLabel}>{label}:</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    statContainer: {
      padding: 4,
      display: 'flex',
      flexDirection: 'row',
    },
    statLabel: {
      fontSize: 12,
      fontWeight: 300,
      color: 'rgb(91, 91, 91)',
    },
    statValue: {
      marginLeft: 4,
      fontSize: 12,
      fontWeight: 400,
      fontStyle: 'italic',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
)
