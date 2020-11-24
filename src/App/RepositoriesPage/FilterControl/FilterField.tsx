import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { AppTheme } from 'lib/AppTheme'
import {
  AdornedTextField,
  AdornedTextFieldProps,
} from 'lib/components/AdornedTextField'
import { FilterControlProps } from './FilterControl'

export interface FilterFieldProps
  extends Required<
      Pick<AdornedTextFieldProps, 'label' | 'helperText' | 'className'>
    >,
    FilterControlProps {
  filterKey: keyof Pick<
    FilterControlProps['repositoryFilter'],
    'keywords' | 'owners' | 'languages'
  >
}

export const FilterField = (props: FilterFieldProps) => {
  const {
    label,
    className,
    filterKey,
    helperText,
    repositoryFilter,
    setRepositoryFilter,
  } = props
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const styles = useStyles()
  return (
    <AdornedTextField
      className={`${styles.filterLabel} ${className}`}
      label={label}
      helperText={errorMessage || helperText}
      error={Boolean(errorMessage)}
      value={inputValue}
      onChange={(changeEvent) => {
        const nextInputValue = changeEvent.target.value
        setInputValue(nextInputValue)
      }}
      onClick={() => {
        const massagedInputValue = inputValue.toLowerCase().trim()
        if (!massagedInputValue) {
          setErrorMessage('empty')
          return
        }
        const languageActive = Boolean(
          repositoryFilter[filterKey].find(
            (someValue) => someValue === massagedInputValue
          )
        )
        if (languageActive) {
          setErrorMessage('filter exist')
          return
        }
        setRepositoryFilter({
          ...repositoryFilter,
          [filterKey]: [...repositoryFilter[filterKey], massagedInputValue],
          page: 1,
        })
        setInputValue('')
        setErrorMessage('')
      }}
    />
  )
}

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    filterLabel: {
      '& > label::after': {
        marginLeft: 8,
      },
    },
  })
)
