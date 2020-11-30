import { RepositoryFilter } from 'lib/models/RepositoryFilter'

export interface SerializeRepositoryFilterApi {
  repositoryFilter: RepositoryFilter
}

export const serializeRepositoryFilter = (
  api: SerializeRepositoryFilterApi
): string => {
  const { repositoryFilter } = api
  const searchParams = new URLSearchParams()
  maybeAppendFilterValues({
    filterKey: 'keywords',
    repositoryFilter,
    searchParams,
  })
  maybeAppendFilterValues({
    filterKey: 'owners',
    repositoryFilter,
    searchParams,
  })
  maybeAppendFilterValues({
    filterKey: 'languages',
    repositoryFilter,
    searchParams,
  })
  searchParams.append('sortBy', repositoryFilter.sortBy)
  // searchParams.append('page', `${repositoryFilter.page}`)
  return searchParams.toString()
}

interface MaybeAppendFilterValuesApi {
  repositoryFilter: RepositoryFilter
  filterKey: keyof Pick<RepositoryFilter, 'keywords' | 'owners' | 'languages'>
  searchParams: URLSearchParams
}

const maybeAppendFilterValues = (api: MaybeAppendFilterValuesApi) => {
  const { repositoryFilter, filterKey, searchParams } = api
  const filterValues = repositoryFilter[filterKey]
  if (filterValues.length > 0) {
    searchParams.append(
      filterKey,
      filterValues.reduce(
        (result, someFilterArg) => `${result}${someFilterArg},`,
        ''
      )
    )
  }
}
