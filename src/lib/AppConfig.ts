export interface AppConfig {
  basePath: string
  oauthClientId: string
  oauthProxyUrl: string
}

export const appConfig: AppConfig = {
  basePath: process.env.REACT_APP_BASEPATH || '',
  oauthClientId: process.env.REACT_APP_OAUTH_CLIENT_ID!,
  oauthProxyUrl: process.env.REACT_APP_OAUTH_PROXY_URL!,
}
