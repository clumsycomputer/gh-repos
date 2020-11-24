import React, { ReactNode } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'

export interface RepositoryStatProps {
  label: string
  value: ReactNode
}

export const RepositoryStat = (props: RepositoryStatProps) => {
  const { label, value } = props
  const styles = useStyles()
  return (
    <div className={styles.statContainer}>
      <Typography className={styles.statLabel}>{label}:</Typography>
      <Typography className={styles.statValue}>{value}</Typography>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    statContainer: {
      padding: 8,
      display: 'flex',
      flexDirection: 'row',
    },
    statLabel: {
      fontWeight: 300,
      color: 'rgba(0,0,0,0.6)',
    },
    statValue: {
      marginLeft: 8,
      fontStyle: 'italic',
      fontWeight: 400,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  })
)
