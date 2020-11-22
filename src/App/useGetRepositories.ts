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
    return new Promise<GetRepositoriesResult>((resolve) => {
      setTimeout(() => {
        resolve({
          page: {
            items: [],
            currentIndex: 1,
          },
          filter: repositoryFilter,
        })
      }, 500)
    })
  }
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
  return fetch(githubSearchUrl, {
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
        return Promise.resolve({
          page: {
            items: nextSearchResults,
            ...indexData,
          },
          filter: repositoryFilter,
        })
      } else {
        // todo: improve error handlings
        return Promise.reject('ooops')
      }
    })
    .catch((error) => {
      // todo: improve error handling
      return Promise.reject('uhhh')
    })
}
