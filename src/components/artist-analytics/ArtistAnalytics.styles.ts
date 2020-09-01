import { makeStyles, createStyles } from '@material-ui/core/styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = () =>
  createStyles({
    hidden: {
      visibility: 'hidden',
    },
  })

export default makeStyles(styles, { name: 'ArtistAnalytics' })

export type StyleProps = 'root'
