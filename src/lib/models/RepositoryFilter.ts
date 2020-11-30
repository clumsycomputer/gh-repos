export interface RepositoryFilter {
  keywords: string[]
  owners: string[]
  languages: string[]
  sortBy: 'default' | 'stars'
  page: number
}

export const isRepositoryFilterEmpty = (
  someRepositoryFilter: RepositoryFilter
) =>
  !(
    someRepositoryFilter.keywords.length ||
    someRepositoryFilter.owners.length ||
    someRepositoryFilter.languages.length
  )

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
  searchParams.append('page', `${repositoryFilter.page}`)
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

export interface DeserializeRepositoryFilterApi {
  locationSearch: string
}

export const deserializeRepositoryFilter = (
  api: DeserializeRepositoryFilterApi
): RepositoryFilter => {
  const { locationSearch } = api
  const searchParams = new URLSearchParams(locationSearch)
  return {
    keywords: deserializeFilterValues({
      filterValuesString: searchParams.get('keywords') || '',
    }),
    owners: deserializeFilterValues({
      filterValuesString: searchParams.get('owners') || '',
    }),
    languages: deserializeFilterValues({
      filterValuesString: searchParams.get('languages') || '',
    }),
    sortBy: ['default', 'stars'].includes(searchParams.get('sortBy') || '')
      ? (searchParams.get('sortBy') as RepositoryFilter['sortBy'])
      : 'default',
    page: Number(searchParams.get('page')) || 1,
  }
}

interface DeserializeFilterValuesApi {
  filterValuesString: string
}

const deserializeFilterValues = (api: DeserializeFilterValuesApi): string[] => {
  const { filterValuesString } = api
  return filterValuesString
    .split(',')
    .reduce<string[]>(
      (result, someFilterArg) =>
        someFilterArg ? [...result, someFilterArg] : result,
      []
    )
}
