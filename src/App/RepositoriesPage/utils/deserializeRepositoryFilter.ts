import { RepositoryFilter } from 'lib/models/RepositoryFilter'

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
    // page: Number(searchParams.get('page')) || 1,
    page: 1,
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
