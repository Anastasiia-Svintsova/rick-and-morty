import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    light: Palette['primary']
  }
  interface PaletteOptions {
    light: PaletteOptions['primary']
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#97CE4C',
    },
    secondary: {
      main: '#006',
      light: '#fff',
    },
    error: {
      main: '#E89AC7',
    },
    info: {
      main: '#7a7a75',
    },
    light: {
      main: '#fff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    button: {
      color: '#fff',
    },
  },
})

theme.typography.h1 = {
  fontStyle: 'italic',
  fontSize: 40,
  fontFamily: ['Anton', 'sans-serif'].join(','),
  fontWeight: 'normal',

  [theme.breakpoints.down('sm')]: {
    fontSize: 30,
  },
}

theme.typography.h4 = {
  fontSize: 20,
  fontWeight: 'semibold',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}

export default theme
