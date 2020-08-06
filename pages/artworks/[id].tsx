import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'

import Link from '@components/Link'
import Layout from '@components/layout/Layout'
import ArtworkDetails from '@components/artwork-details'
import { ArtworkEntity } from '@interfaces/index'
import { HTTP_SERVER } from '@config/index'
import Artwork from '@models/Artwork'
import ArtworkComparables from '@components/artwork-analytics/charts/artwork-comparables'
import ArtworkValue from '@components/artwork-analytics/charts/artwork-value'
import { Typography } from '@material-ui/core'

interface Props {
  id: string
  entity: ArtworkEntity
}

const ArtworkPage: NextPage<Props> = ({ entity }) => {
  const artwork = Artwork.fromEntity(entity)

  if (!artwork) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
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
      {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { id } = context.params || {}
  // Fetch data from external API

  const res = await fetch(`${HTTP_SERVER}/api/artworks/${id}`)
  const entity: ArtworkEntity = (await res.json()) as ArtworkEntity
  // const artist = Artist.fromEntity(artistEntity)

  if (!entity && context.res) {
    context.res.statusCode = 404
    return { props: { artist: null } }
  }

  // Pass data to the page via props
  return { props: { entity } }
}

export default ArtworkPage
