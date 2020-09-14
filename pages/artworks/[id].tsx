import _ from 'lodash'
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { gql, useQuery } from '@apollo/client'

import Link from '@components/Link'
import Layout from '@components/layout/Layout'
import ArtworkDetails from '@components/artwork-details'
import Artwork from '@models/Artwork'
import ArtworkComparables from '@components/artwork-analytics/charts/artwork-comparables'
import RepeatSales from '@components/artwork-analytics/charts/repeat-sales'
import ArtworkValue from '@components/artwork-analytics/charts/artwork-value'
import { CircularProgress, Grid, Typography } from '@material-ui/core'

interface Props {
  id: number
}

const GET_ARTWORK = gql`
  query GET_ARTWORK($id: Int) {
    artwork(id: $id) {
      id
      name
      creationYear
      lotImagePresignedUrl
      artistId
      lastPrice
      dateLastSold
      description
      materials
      markings
      lastSoldAuctionHouseName
      placeLastSold
      artist {
        name
      }
      lots {
        artworkName
        artist {
          name
        }
        artwork {
          creationYear
        }
        priceEstimateMinUsdZeroied
        auctionStartDate
        lotImageLoadError
        lotNum
        lotImagePresignedUrl
        priceKind
        auctionName
        currency
        artistLotsCount
        lotImageSize
        auctionHouseName
        rawLotId
        imageLoadingStatus
        boughtIn
        lotImageS3Key
        rawAuctionId
        catalogNotes
        priceEstimateMaxUsdZeroied
        artistName
        artistNationality
        artistQualifier
        descriptionId
        lotImageWidth
        priceEstimateMax
        lotImageUrl
        auctionLocation
        priceEstimateMin
        priceSold
        artistDeath
        artworkId
        mediumFinal
        lotImageHeight
        isMultipleObjects
        auctionNum
        priceUsdZeroied
      }
    }
  }
`

const ArtworkPage: NextPage<Props> = ({ id }) => {
  const { data, loading, error } = useQuery<Artwork, { id: number }>(GET_ARTWORK, {
    variables: {
      id,
    },
  })
  const artwork = _.get(data, 'artwork')

  if (!loading && !error && !artwork) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Layout>
      <Link href="/artists/[artistId]" as={`/artists/${artwork.artistId}`}>
        &lt; Back to Artist
      </Link>
      <ArtworkDetails artwork={artwork as Artwork} />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 24 }}>
        Artwork Value
      </Typography>
      <ArtworkValue artwork={artwork as Artwork} />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 24 }}>
        Similar Sales
      </Typography>
      <ArtworkComparables artwork={artwork as Artwork} />
      <Typography variant="h4" component="h4" style={{ marginTop: 24, marginBottom: 24 }}>
        Repeat Sales
      </Typography>
      <RepeatSales artwork={artwork as Artwork} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //  Fetch artist data
  const { id } = context.params || {}

  return { props: { id: +id } }
}

export default ArtworkPage
