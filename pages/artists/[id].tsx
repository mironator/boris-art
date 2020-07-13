import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'

import Link from '@components/Link'
import Layout from '@components/layout/Layout'
import ArtistDetails from '@components/artist-details'
import { PriceMomentumChartDatum, ArtistEntity } from '@interfaces/index'
import { server } from '@config/index'
import Artist from '@models/Artist'

interface Props {
  id: string
  artistEntity: ArtistEntity
  priceMomentumData: PriceMomentumChartDatum[]
}

const ArtistPage: NextPage<Props> = (props) => {
  const { artistEntity } = props
  const artist = Artist.fromEntity(artistEntity)

  if (!artist) {
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
      <ArtistDetails artist={artist as Artist} />
      {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { id } = context.params || {}
  // Fetch data from external API

  const res = await fetch(`${server}/api/artists/${id}`)
  const artistEntity: ArtistEntity = (await res.json()) as ArtistEntity
  // const artist = Artist.fromEntity(artistEntity)

  if (!artistEntity && context.res) {
    context.res.statusCode = 404
    return { props: { artist: null } }
  }

  // Pass data to the page via props
  return { props: { artistEntity } }
}

export default ArtistPage
