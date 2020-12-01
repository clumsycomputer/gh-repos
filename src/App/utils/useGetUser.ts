import { useAsyncState } from 'lib/hooks/useAsyncState'

export interface GetUserApi {
  accessToken: string
}

export interface GetUserResult {}

export const useGetUser = () =>
  useAsyncState<GetUserResult, GetUserApi>(fetchAccessToken)

const fetchAccessToken = (api: GetUserApi) => {
  const { accessToken } = api
  return new Promise<GetUserResult>((resolve, reject) => {
    const getUser: Promise<GetUserResult> = fetch(
      'https://api.github.com/user',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${accessToken}`,
        },
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.message) {
          return Promise.reject(responseData.message)
        }
        return Promise.resolve({})
      })
      .catch((errorMessage) =>
        Promise.reject(
          typeof errorMessage === 'string'
            ? errorMessage
            : 'Oops, something happened!'
        )
      )
    setTimeout(() => {
      getUser.then(resolve).catch(reject)
    }, 1500)
  })
}
