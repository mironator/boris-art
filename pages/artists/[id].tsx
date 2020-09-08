import _ from 'lodash'
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { gql, useQuery } from '@apollo/client'

import Link from '@components/Link'
import Layout from '@components/layout/Layout'
import ArtistDetails from '@components/artist-details'
import Artist from '@models/Artist'
import { CircularProgress, Grid } from '@material-ui/core'

interface Props {
  id: number
}

const GET_ARTIST = gql`
  query GetArtist($id: Int!) {
    artist(id: $id) {
      id
      name
      bio
      photoS3Key
      photoPresignedUrl
      birth
      death
      qualifier
      lotsCost
      artworksCount
      lotsCount
      mediumTypes
    }
  }
`

const ArtistPage: NextPage<Props> = ({ id }) => {
  const { data, loading, error } = useQuery<Artist, { id: number }>(GET_ARTIST, {
    variables: {
      id,
    },
  })
  const artist = _.get(data, 'artist')

  if (!loading && !error && !artist) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  if (artist) {
    // It's pity, but one of GraphQL cons. 
    const fixedArtist = { ...artist, birth: new Date(artist.birth), death: new Date(artist.death) }
    return (
      <Layout>
        <Link href="/">&lt; Back to Search</Link>
        <ArtistDetails artist={fixedArtist} />
        {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
      </Layout>
    )
  }

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

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { id } = context.params || {}

  return { props: { id: +id } }
}

export default ArtistPage
