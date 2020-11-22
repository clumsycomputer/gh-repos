import React from 'react'
import { GetRepositoriesResult } from '../../useGetRepositories'
import { RepositoriesPageProps } from '../'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { RepositoryCard } from './RepositoryCard/RepositoryCard'
import { PaginationControl } from './PaginationControl'
import { ListNotification } from './ListNotification'
import { createStyles, makeStyles } from '@material-ui/core'
import { AppTheme } from 'lib/AppTheme'

export interface RepositoryListProps
  extends Omit<RepositoriesPageProps, 'focusedRepository'> {}

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
          message={'Oops, something happened!'}
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

interface ListDataApi
  extends Pick<RepositoryListProps, 'getRepositoriesState'> {}

type ListData =
  | { type: 'emptyFilter' }
  | { type: 'loading' }
  | {
      type: 'data'
      result: GetRepositoriesResult
    }
  | { type: 'noResults' }
  | { type: 'error' }

const getListData = (api: ListDataApi): ListData => {
  const { getRepositoriesState } = api
  if (getRepositoriesState.result?.page.items.length) {
    return {
      type: 'data',
      result: getRepositoriesState.result,
    }
  } else if (
    getRepositoriesState.result?.page.items.length === 0 &&
    isRepositoryFilterEmpty(getRepositoriesState.result?.filter)
  ) {
    return { type: 'emptyFilter' }
  } else if (
    getRepositoriesState.result?.page.items.length === 0 &&
    !isRepositoryFilterEmpty(getRepositoriesState.result?.filter)
  ) {
    return { type: 'noResults' }
  } else if (getRepositoriesState.type === 'loading') {
    return { type: 'loading' }
  } else if (getRepositoriesState.type === 'error') {
    return { type: 'error' }
  } else {
    return { type: 'emptyFilter' }
  }
}

const isRepositoryFilterEmpty = (someRepositoryFilter: RepositoryFilter) =>
  !(
    someRepositoryFilter.keywords.length ||
    someRepositoryFilter.users.length ||
    someRepositoryFilter.languages.length
  )
