import { useAsyncState } from '../lib/hooks/useAsyncState'
import { DataPage } from '../lib/models/DataPage'
import { Repository } from '../lib/models/Repository'
import { RepositoryFilter } from '../lib/models/RepositoryFilter'

export interface GetRepositoriesApi {
  repositoryFilter: RepositoryFilter
}

export interface GetRepositoriesResult {
  page: DataPage<Repository>
  filter: RepositoryFilter
}

export const useGetRepositories = () =>
  useAsyncState<GetRepositoriesResult, GetRepositoriesApi>(fetchRepositories)

const fetchRepositories = (api: GetRepositoriesApi) => {
  return new Promise<GetRepositoriesResult>((resolve, reject) => {
    const { repositoryFilter } = api
    const queryParameters = {
      q: `${repositoryFilter.keywords.reduce(
        (searchKeywords, someKeyword) => `${searchKeywords}${someKeyword} `,
        ''
      )} ${repositoryFilter.users.reduce(
        (userFilters, someUser) => `${userFilters}user:${someUser} `,
        ''
      )} ${repositoryFilter.languages.reduce(
        (languageFilters, someLanguage) =>
          `${languageFilters}language:${someLanguage} `,
        ''
      )}`,
      sort: repositoryFilter.sortBy,
      page: repositoryFilter.page,
    }
    if (queryParameters.q.trim() === '') {
      setTimeout(() => {
        const emptyResults = createEmptyResults({ repositoryFilter })
        resolve(emptyResults)
      }, 500)
    } else {
      const urlQueryString = (Object.keys(queryParameters) as Array<
        keyof typeof queryParameters
      >)
        .reduce((result, parameterKey) => {
          const parameterValue = queryParameters[parameterKey]
          if (parameterValue) {
            result.append(parameterKey, `${parameterValue}`)
          }
          return result
        }, new URLSearchParams())
        .toString()
      const githubSearchUrl = new URL(
        `https://api.github.com/search/repositories?${urlQueryString}`
      ).toString()
      fetch(githubSearchUrl, {
        method: 'GET',
        headers: {
          // todo: implement auth
          // Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then((response) =>
          response.json().then((responseData) => ({
            responseData,
            pageLinksData: response.headers
              .get('Link')
              ?.split(',')
              .map(
                (pageLink) =>
                  pageLink.match(
                    /&page=([0-9]+)>; rel="(prev|next|last)"$/
                  ) as string[]
              )
              .reduce<Record<string, string>>((result, linkTokens) => {
                // todo: sometimes null
                if (linkTokens) {
                  result[linkTokens[2]] = linkTokens[1]
                }
                return result
              }, {}),
          }))
        )
        .then(({ responseData, pageLinksData }) => {
          const matchedRespositories = responseData.items
          if (matchedRespositories) {
            // todo: improve handling
            const nextSearchResults: Repository[] = matchedRespositories.map(
              (repositoryJson: any) => ({
                id: repositoryJson.id,
                fullName: repositoryJson.full_name,
                name: repositoryJson.name,
                description: repositoryJson.description,
                homepageUrl: repositoryJson.homepage,
                starCount: repositoryJson.stargazers_count,
                forkCount: repositoryJson.forks_count,
                openIssuesCount: repositoryJson.open_issues_count,
                language: repositoryJson.language,
                license: repositoryJson.license?.name || null,
                createdAt: repositoryJson.created_at,
                pushedAt: repositoryJson.pushed_at,
                ownerName: repositoryJson.owner?.login,
                ownerAvatarUrl: repositoryJson.owner?.avatar_url,
              })
            )
            const indexData = pageLinksData
              ? {
                  currentIndex: queryParameters['page'],
                  nextIndex: Number(pageLinksData['next']),
                  previousIndex: Number(pageLinksData['prev']),
                  lastIndex: Number(pageLinksData['last']),
                }
              : {
                  currentIndex: queryParameters['page'],
                }
            return resolve({
              page: {
                items: nextSearchResults,
                ...indexData,
              },
              filter: repositoryFilter,
            })
          } else if (responseData.errors) {
            // todo: improve error handlings
            return Promise.reject(responseData.errors[0])
          } else {
            // todo: improve error handlings
            // rate limit exceeded
            return Promise.reject({ message: responseData.message })
          }
        })
        .catch((requestError: any) => {
          // todo: improve error handlings
          if (
            requestError.message ===
            'The listed users and repositories cannot be searched either because the resources do not exist or you do not have permission to view them.'
          ) {
            const emptyResults = createEmptyResults({ repositoryFilter })
            return resolve(emptyResults)
          } else if (
            requestError.message === 'The search is longer than 256 characters.'
          ) {
            return reject('Oops, your filter has too many characters!')
          } else if (
            requestError.message.startsWith('API rate limit exceeded')
          ) {
            reject('Oops, Github Search API rate limit exceeded!')
          } else {
            reject('Oops, something happened!')
          }
        })
    }
  })
}

interface EmptyResultsApi {
  repositoryFilter: RepositoryFilter
}

const createEmptyResults = (api: EmptyResultsApi): GetRepositoriesResult => {
  const { repositoryFilter } = api
  return {
    page: {
      items: [],
      currentIndex: 1,
    },
    filter: repositoryFilter,
  }
}
