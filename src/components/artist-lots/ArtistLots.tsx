import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Typography, CircularProgress } from '@material-ui/core'
import { Container } from 'next/app'
import InfiniteScroll from 'react-infinite-scroller'

import { useArtworkListData } from '@hooks/useArtworkData'
import { Artist, Artwork } from '@interfaces/index'
import Lot from '@components/artist-lot'

const useStyles = makeStyles(() =>
  createStyles({
    loadingContainer: {
      width: '100%',
      height: '150px',
      zIndex: 2,
    },
  })
)

interface OwnProps {
  artist: Artist
}

type Props = OwnProps

const ArtistLots: React.FC<Props> = ({ artist: { id } }) => {
  const limit = 15
  const classes = useStyles()
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const { data, isLoading } = useArtworkListData({
    artistId: Number(id),
    offset: page * limit,
    limit,
  })

  useEffect(() => {
    setArtworks([...artworks, ...data])
  }, [isLoading])

  useEffect(() => {
    if (!isLoading && data.length < limit) setHasMoreItems(false)
  }, [page, isLoading])

  const loadItems = useCallback(
    (nextPage) => {
      setPage(nextPage)
    },
    [setPage]
  )

  return (
    <Container>
      <Typography variant="h5" component="h2">
        Lots
      </Typography>
      <Grid container>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={hasMoreItems && !isLoading}
          loader={
            <Grid
              container
              className={classes.loadingContainer}
              justify="center"
              alignItems="center"
              key={0}
            >
              <CircularProgress />
            </Grid>
          }
        >
          <Grid container item spacing={5}>
            {artworks.map((artwork) => (
              <Grid key={artwork.id} item container justify="center" xs={12} sm={6} md={4}>
                <Lot artwork={artwork} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Grid>
    </Container>
  )
}

export default ArtistLots
