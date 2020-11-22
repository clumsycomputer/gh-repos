import { createStyles, makeStyles } from '@material-ui/core'
import { AppTheme } from 'lib/AppTheme'
import React from 'react'
import { useMemo } from 'react'

export interface WebsiteLinkProps
  extends Required<Pick<JSX.IntrinsicElements['a'], 'href'>> {}

export const WebsiteLink = (props: WebsiteLinkProps) => {
  const { href } = props
  const hrefUrl = useMemo(() => maybeGetHrefUrl(href), [href])
  const styles = useStyles()
  return (
    <a
      className={styles.websiteLink}
      target={'_blank'}
      rel={'noreferrer'}
      href={hrefUrl?.href || href}
    >
      {hrefUrl
        ? `${hrefUrl.hostname}${
            hrefUrl.pathname.length > 1 ? hrefUrl.pathname : ''
          }`
        : href}
    </a>
  )
}

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    websiteLink: {
      color: theme.palette.link.main,
    },
  })
)

const maybeGetHrefUrl = (href: string): URL | null => {
  try {
    return new URL(href)
  } catch {
    try {
      return new URL(`https://${href}`)
    } catch {
      return null
    }
  }
}
