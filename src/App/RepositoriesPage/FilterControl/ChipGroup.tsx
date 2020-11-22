import { Chip, ChipProps, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { FilterControlProps } from './FilterControl'

export interface ChipGroupProps extends FilterControlProps {
  filterKey: keyof Pick<
    FilterControlProps['repositoryFilter'],
    'keywords' | 'users' | 'languages'
  >
  ChipProps: Pick<ChipProps, 'className'>
}

export const ChipGroup = (props: ChipGroupProps) => {
  const { filterKey, ChipProps, repositoryFilter, setRepositoryFilter } = props
  const styles = useStyles()
  return (
    <>
      {repositoryFilter[filterKey].map((filterValue) => (
        <Chip
          key={filterValue}
          label={filterValue}
          className={`${styles.filterChip} ${ChipProps.className}`}
          onDelete={() => {
            setRepositoryFilter({
              ...repositoryFilter,
              [filterKey]: repositoryFilter[filterKey].reduce<string[]>(
                (result, someFilterValue) => {
                  if (someFilterValue !== filterValue) {
                    result.push(someFilterValue)
                  }
                  return result
                },
                []
              ),
            })
          }}
        />
      ))}
    </>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    filterChip: {
      marginLeft: 8,
      marginTop: 7,
      maxWidth: 256,
      fontStyle: 'italic',
      fontWeight: 500,
    },
  })
)
