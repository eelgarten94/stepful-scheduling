import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          border: '1px solid white'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  }
})