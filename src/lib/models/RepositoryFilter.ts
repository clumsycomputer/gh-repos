export interface RepositoryFilter {
  keywords: string[]
  users: string[]
  languages: string[]
  sortBy: 'default' | 'stars'
  page: number
}
