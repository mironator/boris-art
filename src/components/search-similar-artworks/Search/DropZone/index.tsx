// @ts-nocheck

import React, { useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-final-form'

import UploadCloud from '@components/svg-icons/UploadCloud'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    border: 'none !important',
  },

  dropZone: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '2px dashed rgb(184, 184, 184)',
    cursor: 'pointer',

    '&.isActive': {
      backgroundColor: '#efefef',
    },
  },

  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    objectFit: 'scale-down',
  },

  icon: {
    marginBottom: theme.spacing(1),
    fill: '#222',
  },
}))

/* TODO:
 * Add cross icon
 * Add drop action makeup
 * Correct allowedTypes
 */

export type DropZoneProps = {
  fieldName: string
  value: string
  className?: string
}

const DropZone: React.FC<DropZoneProps> = (props) => {
  const { className, fieldName, value } = props
  const [image, setImage] = useState<string | undefined>()

  useEffect(() => {
    // console.log('[INFO] useEffect', value)
    if (!value) {
      setImage(undefined)
    }
  }, [value])

  const form = useForm(fieldName)

  const classes = useStyles()

  const onDrop = useCallback(
    async (acceptedFiles) => {
      // select the first file from the Array of files
      // console.log('[INFO] onDrop', acceptedFiles)
      const file = acceptedFiles[0]
      // use the uploadFile variable created earlier

      const data = new FormData()
      data.append('file', file)

      const response = await fetch('/api/artworks/upload', {
        method: 'POST',
        body: data,
      })
      const foo: { id: number; s3_key: string } = await response.json()

      form.change(fieldName, foo.s3_key)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => setImage(reader.result as string)

      return foo
    },
    // pass in uploadFile as a dependency
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <div className={clsx(classes.root, className)}>
      {image ? (
        <img className={classes.image} src={image} alt="for search" />
      ) : (
        <div
          {...getRootProps()}
          className={clsx(classes.dropZone, isDragActive && 'isActive')}
          onDragOver={(e) => e.preventDefault()}
        >
          <input {...getInputProps()} />
          <UploadCloud className={classes.icon} />
          <Typography variant="subtitle1">Drag and drop an image</Typography>
          <Typography variant="subtitle2">or browse to choose a file</Typography>
        </div>
      )}
    </div>
  )
}

export default DropZone
