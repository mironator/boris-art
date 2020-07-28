import { makeStyles, createStyles } from '@material-ui/core/styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = () =>
  createStyles({
    cardRoot: {
      maxWidth: 600,
      width: '100%',
    },
    media: {
      // height: 280,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: '100%',
    },
    imageContent: {
      position: 'absolute',
      padding: '10px 15px',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      color: 'white',
      backgroundColor: '#00000000',
      opacity: 0.2,
      transition: '.3s ease-in-out',

      '&:hover': {
        opacity: 1,
        backgroundColor: '#0000006a',
      },
    },

    imageDescription: {},
    artworkName: {
      fontSize: 32,
    },
    artistName: {
      fontSize: 18,
      fontWeight: 500,
    },
    briefInfo: {
      paddingTop: 24,
    },
  })

export default makeStyles(styles, { name: 'ArtworkDetails' })

export type StyleProps = 'cardRoot' | 'imageDescription'
