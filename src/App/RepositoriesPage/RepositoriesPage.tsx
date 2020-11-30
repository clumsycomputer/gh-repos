import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Page } from 'lib/components/Page'
import { TitleBar } from 'lib/components/TitleBar'
import { Repository } from 'lib/models/Repository'
import {
  RepositoryFilter,
  serializeRepositoryFilter,
  deserializeRepositoryFilter,
} from 'lib/models/RepositoryFilter'
import { useManageBodyScroll } from 'lib/hooks/useManageBodyScroll'
import { appConfig } from 'lib/AppConfig'
import { AccessTokenData } from '../utils/getAccessTokenData'
import { useGetRepositories } from './utils/useGetRepositories'
import { FilterControl } from './FilterControl'
import { RepositoryList } from './RepositoryList'
import { RepositoryDialog } from './RepositoryDialog'
import { GitAuthed } from './GitAuthed'

export interface RepositoriesPageProps {
  accessTokenData: AccessTokenData
}

export const RepositoriesPage = (props: RepositoriesPageProps) => {
  const { accessTokenData } = props
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
  const accessTokenRef = useRef<string | undefined>()
  useEffect(() => {
    if (
      accessTokenData.type === 'localStorage-success' ||
      accessTokenData.type === 'network-success'
    ) {
      accessTokenRef.current = accessTokenData.accessToken
    } else {
      accessTokenRef.current = undefined
    }
  }, [accessTokenData])
  useEffect(() => {
    getRepositories({
      repositoryFilter,
      accessToken: accessTokenRef.current,
    })
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
      <TitleBar
        title={'gh-repos'}
        actions={[
          <GitAuthed
            key={'git-authed'}
            oauthClientId={appConfig.oauthClientId}
            accessTokenData={accessTokenData}
            repositoryFilter={repositoryFilter}
          />,
        ]}
      />
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
