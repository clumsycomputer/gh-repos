import { AsyncState } from 'lib/hooks/useAsyncState'
import { GetAccessTokenResult } from './useGetAccessToken'
import { GetUserResult } from './useGetUser'

export interface AccessTokenDataApi {
  initialAccessToken: string | null
  getAccessTokenState: AsyncState<GetAccessTokenResult>
  getUserState: AsyncState<GetUserResult>
}

export type AccessTokenData =
  | {
      type: 'localStorage-verify'
      accessToken: string
    }
  | {
      type: 'localStorage-verifying'
      accessToken: string
    }
  | {
      type: 'localStorage-success'
      accessToken: string
    }
  | {
      type: 'localStorage-error'
      accessToken: string
    }
  | { type: 'none' }
  | { type: 'network-loading' }
  | {
      type: 'network-success'
      accessToken: string
    }
  | { type: 'network-error' }

export const getAccessTokenData = (
  api: AccessTokenDataApi
): AccessTokenData => {
  const { initialAccessToken, getAccessTokenState, getUserState } = api
  if (initialAccessToken && getUserState.type === 'empty') {
    return {
      type: 'localStorage-verify',
      accessToken: initialAccessToken,
    }
  } else if (initialAccessToken && getUserState.type === 'loading') {
    return {
      type: 'localStorage-verifying',
      accessToken: initialAccessToken,
    }
  } else if (initialAccessToken && getUserState.type === 'success') {
    return {
      type: 'localStorage-success',
      accessToken: initialAccessToken,
    }
  } else if (initialAccessToken && getUserState.type === 'error') {
    return {
      type: 'localStorage-error',
      accessToken: initialAccessToken,
    }
  } else if (getAccessTokenState.type === 'empty') {
    return { type: 'none' }
  } else if (getAccessTokenState.type === 'loading') {
    return { type: 'network-loading' }
  } else if (getAccessTokenState.type === 'success') {
    return {
      type: 'network-success',
      accessToken: getAccessTokenState.result.accessToken,
    }
  } else {
    // getAccessTokenState.type === 'error'
    return { type: 'network-error' }
  }
}
