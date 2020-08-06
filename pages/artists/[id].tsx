import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'

import Link from '@components/Link'
import Layout from '@components/layout/Layout'
import ArtistDetails from '@components/artist-details'
import { PriceMomentumChartDatum, ArtistEntity } from '@interfaces/index'
import { HTTP_SERVER } from '@config/index'
import Artist from '@models/Artist'
import mediumTypes from '@hooks/mediumTypes'

interface Props {
  id: string
  artistEntity: ArtistEntity
  priceMomentumData: PriceMomentumChartDatum[]
  mediumList: Array<keyof typeof mediumTypes>
}

const ArtistPage: NextPage<Props> = ({ artistEntity, mediumList }) => {
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
      <ArtistDetails artist={artist as Artist} mediumList={mediumList} />
      {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { id } = context.params || {}
  // Fetch data from external API

  const res = await fetch(`${HTTP_SERVER}/api/artists/${id}`)
  const mediumRes = await fetch(`${HTTP_SERVER}/api/artists/medium-list/${id}`)
  const artistEntity: ArtistEntity = (await res.json()) as ArtistEntity
  const mediumList = await mediumRes.json()
  // const artist = Artist.fromEntity(artistEntity)

  if (!artistEntity && context.res) {
    context.res.statusCode = 404
    return { props: { artist: null } }
  }

  // Pass data to the page via props
  return { props: { artistEntity, mediumList } }
}

export default ArtistPage
