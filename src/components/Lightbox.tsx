import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FsLightbox from 'fslightbox-react'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
})

interface Props {
  src: string
  name?: string
}

function Lightbox({ src, name = 'Image' }: Props) {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)

  return (
    <>
      <input
        className={classes.root}
        type="image"
        src={src}
        alt={name}
        onClick={() => setToggler(!toggler)}
      />
      <FsLightbox toggler={toggler} sources={[src]} />
    </>
  )
}

export default Lightbox
