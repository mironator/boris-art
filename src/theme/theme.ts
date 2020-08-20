import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#212121',
//     },
//     secondary: {
//       main: '#868e96',
//     },
//   },
//   shape: {
//     borderRadius: 0,
//   },
// })

export default theme
