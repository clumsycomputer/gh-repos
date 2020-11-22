import React from 'react'
import {
  createStyles,
  IconButton,
  makeStyles,
  TextField,
  TextFieldProps,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export interface AdornedTextFieldProps
  extends Required<
      Pick<
        TextFieldProps,
        'className' | 'label' | 'value' | 'onChange' | 'helperText' | 'error'
      >
    >,
    Required<Pick<JSX.IntrinsicElements['button'], 'onClick'>> {}

export const AdornedTextField = (props: AdornedTextFieldProps) => {
  const {
    className,
    label,
    value,
    onChange,
    onClick,
    helperText,
    error,
  } = props
  const styles = useStyles()
  return (
    <TextField
      className={`${styles.fieldContainer} ${className}`}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      error={error}
      margin={'dense'}
      InputLabelProps={{
        className: styles.fieldLabel,
        shrink: true,
      }}
      InputProps={{
        className: styles.fieldInput,
        endAdornment: (
          <IconButton size={'small'} onClick={onClick}>
            <AddIcon fontSize={'small'} />
          </IconButton>
        ),
      }}
      FormHelperTextProps={{
        className: styles.fieldHelper,
      }}
    />
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    fieldContainer: {
      flexGrow: 1,
      marginLeft: 4,
      padding: 8,
    },
    fieldLabel: {
      marginLeft: 1.5,
      padding: 8,
      fontWeight: 300,
    },
    fieldInput: {
      fontWeight: 300,
    },
    fieldHelper: {
      fontWeight: 300,
      marginLeft: 2,
    },
  })
)
