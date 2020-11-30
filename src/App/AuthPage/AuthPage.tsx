import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import {
  deserializeRepositoryFilter,
  serializeRepositoryFilter,
} from 'lib/models/RepositoryFilter'
import { GetAccessTokenApi } from '../utils/useGetAccessToken'

export interface AuthPageProps {
  getAccessToken: (api: GetAccessTokenApi) => void
}

export const AuthPage = (props: AuthPageProps) => {
  const { getAccessToken } = props
  const location = useLocation()
  useEffect(() => {
    const authCode = new URLSearchParams(location.search).get('code')
    if (authCode) {
      getAccessToken({ authCode })
    }
  }, [getAccessToken, location.search])
  return (
    <Redirect
      to={`/?${serializeRepositoryFilter({
        repositoryFilter: deserializeRepositoryFilter({
          locationSearch: location.search,
        }),
      })}`}
    />
  )
}
