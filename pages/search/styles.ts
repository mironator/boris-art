import { makeStyles } from '@material-ui/core/styles'

const stylesheet = () => ({
  root: {
    width: '100%',
    borderRadius: 0,
    border: '1px solid rgb(0, 0, 0)',
    '& *': {
      border: 0,
      outline: 0,
    },
  },
  inputRoot: {
    padding: '6px !important',
  },
  paper: {
    borderRadius: 0,
    boxShadow: '0px 8px 12px 0px rgba(0, 0, 0, 0.05)',
    color: 'rgb(184, 184, 184)',
  },
  input: {
    '&::placeholder': {
      color: 'rgb(184, 184, 184)',
    },
  },
})

export default makeStyles(stylesheet, { name: 'SearchPage' })
