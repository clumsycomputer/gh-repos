import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { AppTheme } from 'lib/AppTheme'
import { AsyncState } from 'lib/hooks/useAsyncState'
import { Repository } from 'lib/models/Repository'
import { GetRepositoriesResult } from '../utils/useGetRepositories'
import { getListData } from './utils/getListData'
import { RepositoryCard } from './RepositoryCard/RepositoryCard'
import { PaginationControl } from './PaginationControl'
import { ListNotification } from './ListNotification'

export interface RepositoryListProps {
  getRepositoriesState: AsyncState<GetRepositoriesResult>
  repositoryFilter: RepositoryFilter
  setRepositoryFilter: React.Dispatch<React.SetStateAction<RepositoryFilter>>
  setFocusedRepository: React.Dispatch<React.SetStateAction<Repository | null>>
}

export const RepositoryList = (props: RepositoryListProps) => {
  const {
    getRepositoriesState,
    repositoryFilter,
    setRepositoryFilter,
    setFocusedRepository,
  } = props
  const listData = getListData({ getRepositoriesState })
  const styles = useStyles()
  switch (listData.type) {
    case 'data':
      return (
        <div className={styles.listContainer}>
          <div className={styles.itemsContainer}>
            {listData.result.page.items.map((someRepository) => (
              <RepositoryCard
                key={someRepository.id}
                repository={someRepository}
                setFocusedRepository={setFocusedRepository}
              />
            ))}
          </div>
          <PaginationControl
            repositoryPage={listData.result.page}
            repositoryFilter={repositoryFilter}
            setRepositoryFilter={setRepositoryFilter}
          />
        </div>
      )
    case 'noResults':
      return (
        <ListNotification
          className={styles.infoNotification}
          message={'No Results'}
        />
      )
    case 'emptyFilter':
      return (
        <ListNotification
          className={styles.infoNotification}
          message={'Try Adding a Filter Above'}
        />
      )
    case 'loading':
      return (
        <ListNotification
          className={styles.infoNotification}
          message={'Loading...'}
        />
      )
    case 'error':
      return (
        <ListNotification
          className={styles.errorNotification}
          message={listData.errorMessage}
        />
      )
  }
}

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    listContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      padding: 8,
    },
    itemsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
    infoNotification: {
      fontWeight: 300,
      fontStyle: 'italic',
      color: 'rgba(0, 0, 0, 0.6)',
    },
    errorNotification: {
      padding: 16,
      fontWeight: 800,
      color: theme.palette.error.main,
    },
  })
)
