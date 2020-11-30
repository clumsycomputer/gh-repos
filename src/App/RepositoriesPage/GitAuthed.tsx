import React, { useEffect, useState } from 'react'
import {
  Button,
  CircularProgress,
  createStyles,
  Fade,
  makeStyles,
  Slide,
} from '@material-ui/core'
import GithubIcon from '@material-ui/icons/GitHub'
import VerifiedUserRounded from '@material-ui/icons/VerifiedUserRounded'
import {
  RepositoryFilter,
  serializeRepositoryFilter,
} from 'lib/models/RepositoryFilter'
import { RepositoriesPageProps } from './RepositoriesPage'
import { AppTheme } from 'lib/AppTheme'

export interface GitAuthedProps
  extends Pick<RepositoriesPageProps, 'accessTokenData'> {
  oauthClientId: string
  repositoryFilter: RepositoryFilter
}

export const GitAuthed = (props: GitAuthedProps) => {
  const { accessTokenData, oauthClientId, repositoryFilter } = props
  const styles = useStyles()
  switch (accessTokenData.type) {
    case 'none':
    case 'network-error':
    case 'localStorage-error':
      return (
        <Button
          className={styles.gitAuthedButton}
          size={'small'}
          endIcon={<GithubIcon className={styles.githubIcon} />}
          onClick={() => {
            const redirectCallbackSearchParams = new URLSearchParams()
            redirectCallbackSearchParams.append('client_id', oauthClientId)
            const redirectCallbackUrl = new URL(window.location.href)
            redirectCallbackUrl.search = serializeRepositoryFilter({
              repositoryFilter,
            })
            const basePath = process.env.REACT_APP_BASEPATH
            redirectCallbackUrl.pathname = `${basePath}/auth`
            redirectCallbackSearchParams.append(
              'redirect_uri',
              redirectCallbackUrl.toString()
            )
            window.location.assign(
              `https://github.com/login/oauth/authorize/?${redirectCallbackSearchParams.toString()}`
            )
          }}
        >
          <div className={styles.gitAuthedLabel}>git authed</div>
        </Button>
      )
    case 'network-loading':
    case 'localStorage-verify':
    case 'localStorage-verifying':
      return (
        <div className={styles.progressContainer}>
          <CircularProgress className={styles.inProgress} size={20} />
        </div>
      )
    case 'localStorage-success':
      return <AuthedBadge animate={false} />
    case 'network-success':
      return <AuthedBadge animate />
  }
}

interface AuthedBadgeProps {
  animate: boolean
}

const AuthedBadge = (props: AuthedBadgeProps) => {
  const { animate } = props
  const [fadeLabel, setFadeLabel] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setFadeLabel(true)
    }, 3000)
  }, [])
  const styles = useStyles()
  return (
    <Slide
      direction="left"
      in
      mountOnEnter
      {...(animate ? {} : { timeout: 0 })}
    >
      <Button
        className={styles.gitAuthedButton}
        size={'small'}
        disabled={true}
        endIcon={<VerifiedUserRounded className={styles.githubIcon} />}
      >
        <Slide direction="left" in mountOnEnter timeout={700}>
          <Fade in={!fadeLabel} timeout={fadeLabel ? 700 : 0}>
            <div
              style={{ visibility: animate ? 'inherit' : 'hidden' }}
              className={styles.authedLabel}
            >
              authed!
            </div>
          </Fade>
        </Slide>
      </Button>
    </Slide>
  )
}

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    gitAuthedButton: {
      fontSize: 12,
      color: theme.palette.primary.light,
      padding: '8px 12px 5px 12px',
    },
    githubIcon: {
      color: theme.palette.primary.light,
      marginTop: -5,
    },
    gitAuthedLabel: {
      marginLeft: -2,
    },
    authedLabel: {
      marginLeft: -2,
      color: theme.palette.primary.light,
    },
    progressContainer: {
      paddingRight: 9,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inProgress: {
      marginTop: -1,
      color: theme.palette.primary.light,
    },
  })
)
