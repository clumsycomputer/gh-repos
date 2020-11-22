import { Button, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { RepositoryListProps } from './RepositoryList'
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBeforeRounded'

export interface PaginationControlProps
  extends Omit<
    RepositoryListProps,
    'getRepositoriesState' | 'setFocusedRepository'
  > {
  repositoryPage: Required<
    RepositoryListProps['getRepositoriesState']
  >['result']['page']
}

export const PaginationControl = (props: PaginationControlProps) => {
  const { repositoryPage, repositoryFilter, setRepositoryFilter } = props
  const styles = useStyles()
  return (
    <div className={styles.controlContainer}>
      <Button
        disabled={!repositoryPage.previousIndex}
        onClick={() => {
          setRepositoryFilter({
            ...repositoryFilter,
            page: repositoryFilter.page - 1,
          })
        }}
      >
        <NavigateBeforeIcon />
      </Button>
      <div className={styles.paginationLabel}>
        {repositoryPage.currentIndex}
      </div>
      <Button
        disabled={!repositoryPage.nextIndex}
        onClick={() => {
          setRepositoryFilter({
            ...repositoryFilter,
            page: repositoryPage.currentIndex + 1,
          })
        }}
      >
        <NavigateNextIcon />
      </Button>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    controlContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      padding: '28px 16px 24px 16px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paginationLabel: {
      padding: '8px 12px',
      fontWeight: 400,
      borderRadius: 3,
      fontSize: 'large',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  })
)
