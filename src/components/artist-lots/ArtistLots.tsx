import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, MenuItem, Select, Typography, Button } from '@material-ui/core'
import { Container } from 'next/app'
import InfiniteScroll from 'react-infinite-scroller'

import { useArtworkListData } from '@hooks/useArtworkData'
import sortTypes from '@hooks/sortTypes'
import mediumTypes from '@hooks/mediumTypes'
import { Artist, Artwork } from '@interfaces/index'
import Lot from '@components/artist-lot'
import ArtworksFilter from '@components/artworks-filter'

const useStyles = makeStyles(() =>
  createStyles({
    loadingContainer: {
      width: '150px',
      height: '150px',
      position: 'fixed',
      bottom: 0,
      right: 0,
      zIndex: 2,
    },
    heading: {
      marginBottom: '20px',
    },
    sortLabel: {
      marginRight: '7px',
    },
    filtersContainer: {
      '& > *:nth-child(2n):not(:last-child)': {
        marginRight: '15px',
      },
    },
    filterContainer: {
      margin: '20px 0',
    },
  })
)

interface OwnProps {
  artist: Artist
}

type Props = OwnProps

type Filter = {
  maxDateSold: Date
  minDateSold: Date
  maxPriceSold: number
  minPriceSold: number
}

const ArtistLots: React.FC<Props> = ({ artist }) => {
  const { id } = artist
  const limit = 30
  const classes = useStyles()
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [sort, setSort] = useState<keyof typeof sortTypes>(sortTypes.featured)
  const [medium, setMedium] = useState<keyof typeof mediumTypes>(mediumTypes.all)
  const [filter, setFilterState] = useState<Filter>({
    maxDateSold: artist.maxDateSold,
    minDateSold: artist.minDateSold,
    maxPriceSold: artist.maxPriceSold,
    minPriceSold: artist.minPriceSold,
  })
  const { data, isLoading } = useArtworkListData({
    artistId: Number(id),
    offset: page * limit,
    limit,
    sort,
    medium,
  })

  useEffect(() => {
    if (data.length) {
      // omit re-reder triggering on empty data delta
      setArtworks([...artworks, ...data])

      if (!isLoading && data.length < limit) {
        setHasMoreItems(false)
      } else {
        // setHasMoreItems(true)
      }
    }
  }, [isLoading])

  const loadItems = useCallback(() => {
    if (!isLoading) {
      setPage(page + 1)
    }
  }, [page, isLoading])

  const updateSort = useCallback((event: any) => {
    setHasMoreItems(true)
    setSort(event.target.value)
    setPage(0)
    setArtworks([])
  }, [])

  const updateMedium = useCallback((event: any) => {
    setHasMoreItems(true)
    setMedium(event.target.value)
    setArtworks([])
  }, [])

  return (
    <Container>
      <Grid container className={classes.heading} direction="column">
        <Grid item container justify="space-between">
          <Typography variant="h5" component="h2">
            Artworks
          </Typography>

          <Grid item>
            <Grid
              className={classes.filtersContainer}
              container
              direction="row"
              alignItems="center"
            >
              <Typography className={classes.sortLabel}>Medium:</Typography>
              <Select value={medium} onChange={updateMedium}>
                <MenuItem value={mediumTypes.all}>All</MenuItem>
                <MenuItem value={mediumTypes.paintings}>Paintings</MenuItem>
                <MenuItem value={mediumTypes.prints}>Prints</MenuItem>
                <MenuItem value={mediumTypes.undetermined}>Undetermined</MenuItem>
                <MenuItem value={mediumTypes.photographs}>Photographs</MenuItem>
                <MenuItem value={mediumTypes.jewelry}>Jewelry</MenuItem>
                <MenuItem value={mediumTypes.sculpture}>Sculpture</MenuItem>
                <MenuItem value={mediumTypes.furniture}>Furniture</MenuItem>
                <MenuItem value={mediumTypes.ceramics}>Ceramics</MenuItem>
                <MenuItem value={mediumTypes.other}>Other</MenuItem>
                <MenuItem value={mediumTypes.worksOnPaper}>Works on paper</MenuItem>
              </Select>

              <Typography className={classes.sortLabel}>Sort by:</Typography>
              <Select value={sort} onChange={updateSort}>
                <MenuItem value={sortTypes.featured}>Featured</MenuItem>
                <MenuItem value={sortTypes.creationYearLowToHigh}>
                  Year created - Low to High
                </MenuItem>
                <MenuItem value={sortTypes.creationYearHighToLow}>
                  Year created - High to Low
                </MenuItem>
                <MenuItem value={sortTypes.lastPriceLowToHigh}>
                  Last price realized - Low to High
                </MenuItem>
                <MenuItem value={sortTypes.lastPriceHighToLow}>
                  Last price realized - High to Low
                </MenuItem>
                <MenuItem value={sortTypes.dateLastSoldLowToHigh}>
                  Date last sold - Low to High
                </MenuItem>
                <MenuItem value={sortTypes.dateLastSoldHighToLow}>
                  Date last sold - High to Low
                </MenuItem>
                <MenuItem value={sortTypes.nameLowToHigh}>Title - A to Z</MenuItem>
                <MenuItem value={sortTypes.nameHighToLow}>Title - Z to A</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.filterContainer}>
          <ArtworksFilter artist={artist} onChange={setFilterState} />
        </Grid>
      </Grid>
      <Grid container>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={hasMoreItems && !isLoading}
          initialLoad={false}
        >
          <Grid container item spacing={5}>
            {artworks.map((artwork) => (
              <Grid key={artwork.id} item container justify="center" xs={12} sm={6} md={4}>
                <Lot artwork={artwork} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
        {isLoading && (
          <Grid
            container
            className={classes.loadingContainer}
            justify="center"
            alignItems="center"
            key={0}
          >
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default ArtistLots
