import { createMuiTheme, Theme } from '@material-ui/core'
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette'
import { Modify } from 'lib/types/Modify'

// https://www.bergqvist.it/blog/2020/6/26/extending-theme-material-ui-with-typescript
export type AppTheme = Modify<Theme, { palette: AppPalette }>

interface AppPalette extends Palette {
  keyword: Pick<PaletteColor, 'main'>
  owner: Pick<PaletteColor, 'main'>
  language: Pick<PaletteColor, 'main'>
  link: Pick<PaletteColor, 'main'>
}

export const createAppTheme: () => AppTheme = () => {
  const baseTheme = createMuiTheme({
    palette: {
      primary: {
        dark: '#654E54',
        main: '#81819E',
        light: '#B6A0A6',
      },
      error: { main: '#EE7F90' },
    },
  })
  return {
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      keyword: { main: '#d8e2dc' },
      owner: { main: '#ffe5d9' },
      language: { main: '#ffcad4' },
      link: { main: '#bdabe5' },
    },
  }
}
