
import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Tooltip, Typography, Slider } from '@material-ui/core'

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { priceFormatter } from '@utils/formatters'
import { Artist } from '@interfaces/index'

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    priceLabel: {
      color: 'rgba(0, 0, 0, 0.54)',
      padding: 0,
      fontSize: '12px',
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
    sliderContainer: {
      height: '61px',
      width: '200px',
      position: 'relative',
    },
  })
)

interface OwnProps {
  artist: Artist
  onChange: (value: {
    maxDateSold: Date
    minDateSold: Date
    maxPriceSold: number
    minPriceSold: number
  }) => void
}

type Props = OwnProps

interface TooltipProps {
  children: React.ReactElement
  open: boolean
  value: number
}

function ValueLabelComponent(props: TooltipProps) {
  const { children, open, value } = props
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={priceFormatter(value)}>
      {children}
    </Tooltip>
  )
}

const ArtworksFilter: React.FC<Props> = ({
  artist: { maxDateSold, minDateSold, maxPriceSold, minPriceSold },
  onChange,
}) => {
  const classes = useStyles()
  const [fromDate, setFromDate] = useState<Date>(minDateSold)
  const [toDate, setToDate] = useState<Date>(maxDateSold)
  const [sliderValue, setSliderValue] = React.useState<number[]>([minPriceSold, maxPriceSold])
  const [price, setPrice] = React.useState<number[]>([minPriceSold, maxPriceSold])

  const handlePriceChange = useCallback((_event: any, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }, [])

  const handleSliderChange = useCallback((_event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number[])
  }, [])

  useEffect(() => {
    onChange({
      maxDateSold: toDate,
      minDateSold: fromDate,
      maxPriceSold: price[1],
      minPriceSold: price[0],
    })
  }, [fromDate, toDate, price])

  return (
    <Grid container justify="space-around" alignContent="center">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          label="From"
          orientation="landscape"
          variant="inline"
          value={fromDate}
          minDate={minDateSold}
          maxDate={toDate}
          // @ts-ignore
          onChange={setFromDate}
        />
        <DatePicker
          autoOk
          label="To"
          orientation="landscape"
          variant="inline"
          value={toDate}
          minDate={fromDate}
          maxDate={maxDateSold}
          // @ts-ignore
          onChange={setToDate}
        />
      </MuiPickersUtilsProvider>

      <Grid item className={classes.sliderContainer}>
        <Typography className={classes.priceLabel}>Price range</Typography>
        <Slider
          ValueLabelComponent={ValueLabelComponent}
          min={minPriceSold}
          max={maxPriceSold}
          value={sliderValue}
          onChange={handleSliderChange}
          onChangeCommitted={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Typography className={classes.fromDate}>{priceFormatter(sliderValue[0])}</Typography>
        <Typography className={classes.toDate}>{priceFormatter(sliderValue[1])}</Typography>
      </Grid>
    </Grid>
  )
}

export default ArtworksFilter
