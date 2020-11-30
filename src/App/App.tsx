import React, { useEffect, useMemo } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { appConfig } from 'lib/AppConfig'
import { getAccessTokenData } from './utils/getAccessTokenData'
import { useGetAccessToken } from './utils/useGetAccessToken'
import { useGetUser } from './utils/useGetUser'
import { AuthPage } from './AuthPage'
import { RepositoriesPage } from './RepositoriesPage'

export const App = () => {
  const [getAccessToken, getAccessTokenState] = useGetAccessToken()
  const [getUser, getUserState] = useGetUser()
  useEffect(() => {
    if (getAccessTokenState.type === 'success') {
      localStorage.setItem(
        'accessToken',
        getAccessTokenState.result.accessToken
      )
    }
  }, [getAccessTokenState])
  const initialAccessToken = useMemo(
    () => localStorage.getItem('accessToken'),
    []
  )
  useEffect(() => {
    if (
      getUserState.type === 'error' &&
      getUserState.errorMessage === 'Bad credentials'
    ) {
      localStorage.removeItem('accessToken')
    }
  }, [getUserState])
  const accessTokenData = useMemo(
    () =>
      getAccessTokenData({
        getAccessTokenState,
        getUserState,
        initialAccessToken,
      }),
    [getAccessTokenState, getUserState, initialAccessToken]
  )
  useEffect(() => {
    if (
      accessTokenData.type === 'localStorage-verify' ||
      (accessTokenData.type === 'network-success' &&
        getUserState.type !== 'success' &&
        getUserState.type !== 'loading')
    ) {
      getUser({
        accessToken: accessTokenData.accessToken,
      })
    }
  }, [accessTokenData, getUser, getUserState])
  return (
    <BrowserRouter basename={appConfig.basePath}>
      <Switch>
        <Route path={'/auth'}>
          <AuthPage getAccessToken={getAccessToken} />
        </Route>
        <Route path={'/'}>
          <RepositoriesPage accessTokenData={accessTokenData} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
