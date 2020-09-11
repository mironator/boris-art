import { makeStyles, createStyles } from '@material-ui/core/styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = () =>
  createStyles({
    root: {},
    tabPanel: {
      paddingLeft: 0,
      paddginRight: 0,
    },
  })

export default makeStyles(styles, { name: 'ArtistDetails' })

export type StyleProps = 'root'
