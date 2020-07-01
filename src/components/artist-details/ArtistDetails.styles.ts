import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: Theme) =>
  createStyles({
    root: {},
  })

export default makeStyles(styles, { name: 'ArtistDetails' })

export type StyleProps = 'root'
