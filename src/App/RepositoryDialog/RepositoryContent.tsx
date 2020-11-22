import React from 'react'
import {
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/CloseRounded'
import { TitleBar } from 'lib/components/TitleBar'
import { WebsiteLink } from 'lib/components/WebsiteLink'
import { NonNullable } from 'lib/types/NonNullable'
import { RepositoryDialogProps } from './RepositoryDialog'
import { RepositoryStat } from './RepositoryStat'

export interface RepositoryContentProps
  extends Pick<
    NonNullable<RepositoryDialogProps, 'focusedRepository'>,
    'focusedRepository'
  > {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RepositoryContent = (props: RepositoryContentProps) => {
  const { focusedRepository, setDialogOpen } = props
  const styles = useStyles()
  return (
    <div className={styles.contentContainer}>
      <TitleBar
        title={focusedRepository.fullName}
        actions={[
          <IconButton
            key={'close-button'}
            size={'small'}
            onClick={() => {
              setDialogOpen(false)
            }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <div className={styles.statsContainer}>
        <div className={styles.statColumn}>
          <RepositoryStat
            label={'website'}
            value={
              focusedRepository.homepageUrl ? (
                <WebsiteLink href={focusedRepository.homepageUrl} />
              ) : (
                <div className={styles.emptyStat}>not provided</div>
              )
            }
          />
          <RepositoryStat
            label={'language'}
            value={
              focusedRepository.language ? (
                focusedRepository.language
              ) : (
                <div className={styles.emptyStat}>not provided</div>
              )
            }
          />
          <RepositoryStat
            label={'license'}
            value={
              focusedRepository.license ? (
                `${focusedRepository.license}`
              ) : (
                <div className={styles.emptyStat}>not provided</div>
              )
            }
          />
        </div>
        <div className={styles.statColumn}>
          <RepositoryStat
            label={'stars'}
            value={`${focusedRepository.starCount}`}
          />
          <RepositoryStat
            label={'forks'}
            value={`${focusedRepository.forkCount}`}
          />
          <RepositoryStat
            label={'issues'}
            value={`${focusedRepository.openIssuesCount}`}
          />
        </div>
        <div className={styles.statColumn}>
          <RepositoryStat
            label={'created'}
            value={parseDate(focusedRepository.createdAt)}
          />
          <RepositoryStat
            label={'pushed'}
            value={parseDate(focusedRepository.pushedAt)}
          />
        </div>
        <div />
      </div>
      <div className={styles.descriptionContainer}>
        <Typography className={styles.description}>
          {focusedRepository.description}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    statsContainer: {
      flexShrink: 0,
      width: '100%',
      paddingTop: 12,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    statColumn: {
      flexGrow: 1,
      maxWidth: '80%',
      padding: '8px 24px',
    },
    emptyStat: {
      fontWeight: 200,
    },
    descriptionContainer: {
      padding: 24,
      paddingTop: 16,
      paddingBottom: 40,
    },
    description: {
      fontWeight: 300,
      fontStyle: 'italic',
    },
  })
)

const parseDate = (githubDate: string) => {
  const tokens = githubDate.match(/^([0-9]+)-([0-9]+)-([0-9]+)T/)!
  const year = tokens[1]
  const month = tokens[2]
  const day = tokens[3]
  return `${year}-${month}-${day}`
}
