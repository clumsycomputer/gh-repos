import React, { useMemo } from 'react'
import { FilterControlProps } from './FilterControl'
import { createStyles, makeStyles } from '@material-ui/core'
import { ChipGroup } from './ChipGroup'
import { AppTheme } from 'lib/AppTheme'

export interface FilterChipsProps extends FilterControlProps {}

export const FilterChips = (props: FilterChipsProps) => {
  const { repositoryFilter, setRepositoryFilter } = props
  const filterIsEmpty = useMemo(
    () =>
      !(
        repositoryFilter.keywords.length ||
        repositoryFilter.users.length ||
        repositoryFilter.languages.length
      ),
    [repositoryFilter]
  )
  const styles = useStyles()
  return (
    <div className={styles.chipsContainer}>
      <ChipGroup
        filterKey={'keywords'}
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
        ChipProps={{
          className: styles.keywordChip,
        }}
      />
      <ChipGroup
        filterKey={'users'}
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
        ChipProps={{
          className: styles.ownerChip,
        }}
      />
      <ChipGroup
        filterKey={'languages'}
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
        ChipProps={{
          className: styles.languageChip,
        }}
      />
      {filterIsEmpty ? (
        <div className={styles.noFiltersLabel}>No Active Filters</div>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    chipsContainer: {
      padding: '0 8px 8px 8px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    noFiltersLabel: {
      margin: '8px 0 0 6px',
      padding: '6px 2px 6px 4px',
      fontStyle: 'italic',
      fontWeight: 300,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    keywordChip: {
      backgroundColor: theme.palette.keyword.main,
    },
    ownerChip: {
      backgroundColor: theme.palette.owner.main,
    },
    languageChip: {
      backgroundColor: theme.palette.language.main,
    },
  })
)
