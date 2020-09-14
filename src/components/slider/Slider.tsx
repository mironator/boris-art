import React, { useCallback } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Typography, Slider } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    sliderContainer: {
      position: 'relative',
      width: '200px',
      height: '35px',
    },
    fromDate: {
      position: 'absolute',
      padding: 0,
      fontSize: '12px',
      bottom: 0,
      left: 0,
    },
    toDate: {
      position: 'absolute',
      padding: 0,
      fontSize: '12px',
      bottom: 0,
      right: 0,
    },
    labelContainer: {
      marginRight: '8px',
    },
  })
)

interface OwnProps {
  defaultValue: number
  label?: string
  min?: number
  max?: number
  onChange: (value: number) => void
}

type Props = OwnProps

const ArtworksFilter: React.FC<Props> = ({ defaultValue, label, onChange, min = 0, max = 100 }) => {
  const classes = useStyles()
  const [sliderValue, setSliderValue] = React.useState<number>(defaultValue)

  const handleValueChange = useCallback((_event: any, newValue: number | number[]) => {
    onChange(newValue as number)
  }, [])

  const handleSliderChange = useCallback((_event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number)
  }, [])

  return (
    <Grid container direction="row" alignContent="center">
      {label && (
        <Grid item className={classes.labelContainer}>
          <Typography>{`${label}`}</Typography>
        </Grid>
      )}
      <Grid item className={classes.sliderContainer}>
        <Slider
          min={min}
          max={max}
          value={sliderValue}
          onChange={handleSliderChange}
          onChangeCommitted={handleValueChange}
          valueLabelDisplay="auto"
          aria-labelledby="continuous-slider"
        />
        <Typography className={classes.fromDate}>{min}</Typography>
        <Typography className={classes.toDate}>{max}</Typography>
      </Grid>
    </Grid>
  )
}

export default ArtworksFilter
