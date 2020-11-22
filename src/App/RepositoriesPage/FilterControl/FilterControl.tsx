import React from 'react'
import { RepositoryFilter } from 'lib/models/RepositoryFilter'
import { SelectField } from 'lib/components/SelectField'
import keywordDotUrl from 'assets/dots/keyword.png'
import ownerDotUrl from 'assets/dots/owner.png'
import languageDotUrl from 'assets/dots/language.png'
import { RepositoriesPageProps } from '../'
import { FilterChips } from './FilterChips'
import { createStyles, makeStyles, MenuItem } from '@material-ui/core'
import { FilterField } from './FilterField'

export interface FilterControlProps
  extends Pick<
    RepositoriesPageProps,
    'repositoryFilter' | 'setRepositoryFilter'
  > {}

export const FilterControl = (props: FilterControlProps) => {
  const { repositoryFilter, setRepositoryFilter } = props
  const styles = useStyles()
  return (
    <div className={styles.controlContainer}>
      <div className={styles.filterFields}>
        <div className={styles.chipFields}>
          <FilterField
            className={styles.keywordLabel}
            filterKey={'keywords'}
            label={'Keyword'}
            helperText={' '}
            repositoryFilter={repositoryFilter}
            setRepositoryFilter={setRepositoryFilter}
          />
          <FilterField
            className={styles.ownerLabel}
            filterKey={'users'}
            label={'Owner'}
            helperText={' '}
            repositoryFilter={repositoryFilter}
            setRepositoryFilter={setRepositoryFilter}
          />
          <FilterField
            className={styles.languageLabel}
            filterKey={'languages'}
            label={'Language'}
            helperText={' '}
            repositoryFilter={repositoryFilter}
            setRepositoryFilter={setRepositoryFilter}
          />
        </div>
        <div className={styles.selectContainer}>
          <SelectField
            value={repositoryFilter.sortBy}
            onChange={(changeEvent) => {
              const nextSort = changeEvent.target
                .value as RepositoryFilter['sortBy']
              setRepositoryFilter({
                ...repositoryFilter,
                sortBy: nextSort,
                page: 1,
              })
            }}
          >
            <MenuItem className={styles.sortByOption} value={'default'}>
              Best Match
            </MenuItem>
            <MenuItem className={styles.sortByOption} value={'stars'}>
              Stars
            </MenuItem>
          </SelectField>
        </div>
      </div>
      <FilterChips
        repositoryFilter={repositoryFilter}
        setRepositoryFilter={setRepositoryFilter}
      />
      <div className={styles.controlDivider} />
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    controlContainer: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    filterFields: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap-reverse',
    },
    chipFields: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    keywordLabel: {
      '& > label::after ': {
        content: `url(${keywordDotUrl})`,
      },
    },
    ownerLabel: {
      '& > label::after ': {
        content: `url(${ownerDotUrl})`,
      },
    },
    languageLabel: {
      '& > label::after ': {
        content: `url(${languageDotUrl})`,
      },
    },
    selectContainer: {
      flexGrow: 1,
      padding: '8px 8px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    sortByOption: {
      fontWeight: 300,
    },
    controlDivider: {
      marginTop: 4,
      width: '100%',
      height: 2,
      borderRadius: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  })
)
