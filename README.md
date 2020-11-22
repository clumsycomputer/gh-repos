### gh-repos

A simple client for sifting through Github repositories

[_clumsycomputer.github.io/gh-repos_](https://clumsycomputer.github.io/gh-repos/)

### run locally

> yarn install

> yarn start

### rate limiting

Use of the Github Search API is rate limited. Unauthenticated requests are limited to 10 requests per minute. Authenticated requests are limited to 30 requests per minute.

If you wish to make authenticated requests then create a Personal Access Token under your Github account, and assign it to the `REACT_APP_GITHUB_ACCESS_TOKEN` within _**.env.local**_ at the root of the project. Next, you will want to uncomment this [line](https://github.com/clumsycomputer/gh-repos/blob/ed4362b04e090ae754debf318156174d594e9aac/src/App/useGetRepositories.ts#L66), which will enable authenticated requests. Once the above as been done restart the application.
