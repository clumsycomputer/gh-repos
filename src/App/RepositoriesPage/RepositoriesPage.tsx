import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Page } from 'lib/components/Page'
import { TitleBar } from 'lib/components/TitleBar'
import { Repository } from 'lib/models/Repository'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { useManageBodyScroll } from 'lib/hooks/useManageBodyScroll'
import { useGetRepositories } from './utils/useGetRepositories'
import { serializeRepositoryFilter } from './utils/serializeRepositoryFilter'
import { deserializeRepositoryFilter } from './utils/deserializeRepositoryFilter'
import { FilterControl } from './FilterControl'
import { RepositoryList } from './RepositoryList'
import { RepositoryDialog } from './RepositoryDialog'

export const RepositoriesPage = () => {
  const history = useHistory()
  const location = useLocation()
  const initialRepositoryFilter = useMemo(
    () =>
      deserializeRepositoryFilter({
        locationSearch: location.search,
      }),
    [location.search]
  )
  const [repositoryFilter, setRepositoryFilter] = useState<RepositoryFilter>(
    initialRepositoryFilter
  )
  const [getRepositories, getRepositoriesState] = useGetRepositories()
  const [focusedRepository, setFocusedRepository] = useState<Repository | null>(
    null
  )
  useEffect(() => {
    getRepositories({ repositoryFilter })
  }, [repositoryFilter, getRepositories])
  useEffect(() => {
    const locationSearchString = new URLSearchParams(location.search).toString()
    const filterSearchString = serializeRepositoryFilter({ repositoryFilter })
    if (locationSearchString !== filterSearchString) {
      history.replace({
        search: filterSearchString,
      })
    }
  }, [repositoryFilter, history, location.search])
  useManageBodyScroll({
    scrollDisabled: Boolean(focusedRepository),
  })
  return (
    <Page>
      <TitleBar title={'Repositories'} />
      <FilterControl
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
      />
      <RepositoryList
        getRepositoriesState={getRepositoriesState}
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
        setFocusedRepository={setFocusedRepository}
      />
      <RepositoryDialog
        focusedRepository={focusedRepository}
        setFocusedRepository={setFocusedRepository}
      />
    </Page>
  )
}
