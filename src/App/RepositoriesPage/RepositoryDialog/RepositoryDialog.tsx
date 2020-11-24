import React, { useEffect, useState } from 'react'
import { Dialog, useMediaQuery } from '@material-ui/core'
import { Repository } from 'lib/models/Repository'
import { RepositoryContent } from './RepositoryContent'

export interface RepositoryDialogProps {
  focusedRepository: Repository | null
  setFocusedRepository: React.Dispatch<React.SetStateAction<Repository | null>>
}

export const RepositoryDialog = (props: RepositoryDialogProps) => {
  const { focusedRepository, setFocusedRepository } = props
  const [dialogOpen, setDialogOpen] = useState(Boolean(focusedRepository))
  useEffect(() => {
    setDialogOpen(Boolean(focusedRepository))
  }, [focusedRepository])
  const smallFormFactor = useMediaQuery('(max-width: 500px)')
  return (
    <Dialog
      maxWidth={'md'}
      open={dialogOpen}
      fullScreen={smallFormFactor}
      onExited={() => {
        setFocusedRepository(null)
      }}
    >
      {focusedRepository ? (
        <RepositoryContent
          focusedRepository={focusedRepository}
          setDialogOpen={setDialogOpen}
        />
      ) : null}
    </Dialog>
  )
}
