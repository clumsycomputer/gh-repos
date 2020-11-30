import { useAsyncState } from 'lib/hooks/useAsyncState'

export interface GetAccessTokenApi {
  authCode: string
}

export interface GetAccessTokenResult {
  accessToken: string
}

export const useGetAccessToken = () =>
  useAsyncState<GetAccessTokenResult, GetAccessTokenApi>(fetchAccessToken)

const fetchAccessToken = (api: GetAccessTokenApi) => {
  const { authCode } = api
  return new Promise<GetAccessTokenResult>((resolve, reject) => {
    const getAccessToken: Promise<GetAccessTokenResult> = fetch(
      `${process.env.REACT_APP_OAUTH_PROXY_URL}/authenticate/${authCode}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => ({
        accessToken: responseData.token,
      }))
      .catch(() => Promise.reject())
    setTimeout(() => {
      getAccessToken.then(resolve).catch(reject)
    }, 1500)
  })
}
