import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'

import Link from '@components/Link'
import Layout from '@components/Layout'
import artists from '@mocks/artists'
import ArtistDetails from '@components/artist-details'
import { Artist, PriceMomentumChartDatum } from '@interfaces/index'

interface Props {
  slug: string
  artistInfo: Artist
  priceMomentumData: PriceMomentumChartDatum[]
}

const ArtistPage: NextPage<Props> = (props) => {
  const { artistInfo } = props
  if (!artistInfo) {
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
      <Link href="/">&lt; Back to Search</Link>
      <ArtistDetails artist={artistInfo as Artist} />
      {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { slug } = context.params || {}
  const artistInfo = artists.find(
    (artist) => artist.name.toLowerCase() === (slug as string).replace('_', ' ').toLowerCase()
  )

  if (!artistInfo && context.res) {
    context.res.statusCode = 404
    return { props: { artistInfo: null } }
  }

  // Pass data to the page via props
  return { props: { artistInfo } }
}

export default ArtistPage
