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
