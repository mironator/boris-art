import React from 'react'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },

  dropZone: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '2px dashed rgb(184, 184, 184)',
  },

  image: {
    maxWidth: '100%',
    height: '100%',
  },
}))

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/gif', 'image/bmp']

/* TODO:
 * Add cross icon
 * Add drop action makeup
 * Correct allowedTypes
 */

export type DropZoneProps = {
  image: string | undefined
  onImageChanged: (arg0: string) => void
  className?: string
}

const DropZone: React.FC<DropZoneProps> = (props) => {
  const { className, image, onImageChanged } = props

  const classes = useStyles()

  const setupImage = (file: File) => {
    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => onImageChanged(reader.result as string)
    }
  }

  const drop = (ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault()
    setupImage(ev.dataTransfer.files[0])
  }

  return (
    <div className={clsx(classes.root, className)}>
      {image ? (
        <img className={classes.image} src={image} alt="for search" />
      ) : (
        <div className={classes.dropZone} onDrop={drop} onDragOver={(e) => e.preventDefault()}>
          <Typography variant="subtitle1">Drag and drop an image</Typography>
          <Typography variant="subtitle2">or browse to choose a file</Typography>
        </div>
      )}
    </div>
  )
}

export default DropZone
