import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  SelectProps,
} from '@material-ui/core'
import React, { FunctionComponent } from 'react'

export interface SelectFieldProps
  extends Pick<SelectProps, 'value' | 'onChange'> {}

export const SelectField: FunctionComponent<SelectFieldProps> = (props) => {
  const { value, onChange, children } = props
  const styles = useStyles()
  return (
    <FormControl className={styles.fieldContainer}>
      <InputLabel className={styles.fieldLabel}>Sort By</InputLabel>
      <Select
        className={styles.fieldInput}
        margin={'dense'}
        value={value}
        onChange={onChange}
      >
        {children}
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    fieldContainer: {
      minWidth: 120,
      padding: '8px 0 8px',
    },
    fieldLabel: {
      fontWeight: 300,
      padding: '8px 0 8px',
    },
    fieldInput: {
      fontWeight: 300,
    },
  })
)
