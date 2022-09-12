import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    common: {
      black: '#222831',
      white: '#ffffff'
    },
    primary: {
      main: '#726a95',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#709fb0',
      contrastText: '#ffffff'
    }
  }
}

export const secondaryTheme: DefaultTheme = {
    borderRadius: '8px',
    palette: {
      common: {
        black: '#333ccc',
        white: '#000000'
      },
      primary: {
        main: '#e3e335',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#709fb0',
        contrastText: '#ffffff'
      }
    }
  }