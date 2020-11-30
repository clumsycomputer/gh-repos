import { isRepositoryFilterEmpty } from 'lib/models/RepositoryFilter'
import { GetRepositoriesResult } from '../../utils/useGetRepositories'
import { RepositoryListProps } from '../RepositoryList'

export interface ListDataApi
  extends Pick<RepositoryListProps, 'getRepositoriesState'> {}

export type ListData =
  | { type: 'emptyFilter' }
  | { type: 'loading' }
  | {
      type: 'data'
      result: GetRepositoriesResult
    }
  | { type: 'noResults' }
  | {
      type: 'error'
      errorMessage: string
    }

export const getListData = (api: ListDataApi): ListData => {
  const { getRepositoriesState } = api
  if (
    getRepositoriesState.type === 'success' &&
    getRepositoriesState.result.page.items.length
  ) {
    return {
      type: 'data',
      result: getRepositoriesState.result,
    }
  } else if (
    getRepositoriesState.type === 'success' &&
    getRepositoriesState.result.page.items.length === 0 &&
    isRepositoryFilterEmpty(getRepositoriesState.result.filter)
  ) {
    return { type: 'emptyFilter' }
  } else if (
    getRepositoriesState.type === 'success' &&
    getRepositoriesState.result.page.items.length === 0 &&
    !isRepositoryFilterEmpty(getRepositoriesState.result.filter)
  ) {
    return { type: 'noResults' }
  } else if (getRepositoriesState.type === 'loading') {
    return { type: 'loading' }
  } else if (getRepositoriesState.type === 'error') {
    return {
      type: 'error',
      errorMessage:
        getRepositoriesState.errorMessage || 'Oops, something happened!',
    }
  } else {
    return { type: 'emptyFilter' }
  }
}
