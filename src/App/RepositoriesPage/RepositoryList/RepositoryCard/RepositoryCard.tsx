import { Button, createStyles, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { Repository } from 'lib/models/Repository'
import { WebsiteLink } from 'lib/components/WebsiteLink'
import { RepositoryListProps } from '../RepositoryList'
import { CardStat } from './CardStat'

export interface RepositoryCardProps
  extends Pick<RepositoryListProps, 'setFocusedRepository'> {
  repository: Repository
}

export const RepositoryCard = (props: RepositoryCardProps) => {
  const { repository, setFocusedRepository } = props
  const styles = useStyles()
  return (
    <Paper elevation={2} className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{repository.fullName}</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.statsContainer}>
          <div className={styles.statsColumn}>
            <CardStat
              label={'website'}
              value={
                repository.homepageUrl ? (
                  <WebsiteLink href={repository.homepageUrl} />
                ) : (
                  <div className={styles.emptyStat}>not provided</div>
                )
              }
            />
            <CardStat
              label={'language'}
              value={
                repository.language ? (
                  repository.language
                ) : (
                  <div className={styles.emptyStat}>not provided</div>
                )
              }
            />
            <CardStat
              label={'license'}
              value={
                repository.license ? (
                  repository.license
                ) : (
                  <div className={styles.emptyStat}>not provided</div>
                )
              }
            />
          </div>
          <div className={styles.statsColumn}>
            <CardStat label={'stars'} value={`${repository.starCount}`} />
            <CardStat label={'forks'} value={`${repository.forkCount}`} />
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.cardDescription}>{repository.description}</div>
        </div>
      </div>
      <div className={styles.actionsDivider} />
      <div className={styles.actionsContainer}>
        <Button
          className={styles.cardAction}
          size={'small'}
          onClick={() => {
            setFocusedRepository(repository)
          }}
        >
          Show Details
        </Button>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      margin: 8,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 384,
      maxWidth: 384,
      height: 176,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (max-width: 864px)': {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '45%',
        maxWidth: '45%',
      },
      '@media screen and (max-width: 700px)': {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '100%',
        maxWidth: 'calc(100% - 32px)',
      },
    },
    cardHeader: {
      flex: '0 1 auto',
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      display: 'flex',
      flexDirection: 'row',
    },
    cardTitle: {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    cardBody: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    statsContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      padding: 8,
      display: 'flex',
      flexDirection: 'row',
    },
    statsColumn: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
    emptyStat: {
      fontWeight: 200,
    },
    descriptionContainer: {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      padding: '0 8px 6px',
      display: 'flex',
      flexDirection: 'column',
    },
    cardDescription: {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      fontWeight: 300,
      fontSize: 14,
      fontStyle: 'italic',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    actionsDivider: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '1px',
      borderRadius: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    actionsContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      padding: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cardAction: {
      fontSize: 12,
      fontWeight: 300,
    },
  })
)
