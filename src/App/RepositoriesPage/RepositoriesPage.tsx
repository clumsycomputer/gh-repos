import React from 'react'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { Page } from 'lib/components/Page'
import { FilterControl } from './FilterControl'
import { RepositoryList } from './RepositoryList'
import { AsyncState } from 'lib/hooks/useAsyncState'
import { GetRepositoriesResult } from '../useGetRepositories'
import { TitleBar } from 'lib/components/TitleBar'
import { Repository } from 'lib/models/Repository'

export interface RepositoriesPageProps {
  getRepositoriesState: AsyncState<GetRepositoriesResult>
  repositoryFilter: RepositoryFilter
  setRepositoryFilter: React.Dispatch<React.SetStateAction<RepositoryFilter>>
  setFocusedRepository: React.Dispatch<React.SetStateAction<Repository | null>>
}

export const RepositoriesPage = (props: RepositoriesPageProps) => {
  const {
    repositoryFilter,
    setRepositoryFilter,
    getRepositoriesState,
    setFocusedRepository,
  } = props
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
    </Page>
  )
}
