import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { Repository } from 'lib/models/Repository'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { useManageBodyScroll } from 'lib/hooks/useManageBodyScroll'
import { RepositoriesPage } from './RepositoriesPage'
import { useGetRepositories } from './useGetRepositories'
import { RepositoryDialog } from './RepositoryDialog'

export const App = () => {
  const [getRepositories, getRepositoriesState] = useGetRepositories()
  const [repositoryFilter, setRepositoryFilter] = useState<RepositoryFilter>({
    keywords: [],
    users: [],
    languages: [],
    sortBy: 'default',
    page: 1,
  })
  const [focusedRepository, setFocusedRepository] = useState<Repository | null>(
    null
  )
  useEffect(() => {
    getRepositories({ repositoryFilter })
  }, [getRepositories, repositoryFilter])
  useManageBodyScroll({
    scrollDisabled: Boolean(focusedRepository),
  })
  const styles = useStyles()
  return (
    <>
      <div className={styles.appContainer}>
        <RepositoriesPage
          getRepositoriesState={getRepositoriesState}
          repositoryFilter={repositoryFilter}
          setRepositoryFilter={setRepositoryFilter}
          setFocusedRepository={setFocusedRepository}
        />
      </div>
      <RepositoryDialog
        focusedRepository={focusedRepository}
        setFocusedRepository={setFocusedRepository}
      />
    </>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    appContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
)
