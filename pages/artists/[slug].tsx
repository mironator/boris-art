import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'

import Link from '@components/Link'
import Layout from '@components/Layout'
import artists from '@mocks/artists'
import ArtistDetails from '@components/artist-details'
import { Artist } from '@interfaces/index'

interface Props {
  slug: string
  data: unknown
}

const ArtistPage: NextPage<Props> = (props) => {
  const { data } = props
  if (!data) {
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
      <ArtistDetails artist={data as Artist} />
      {/* <pre>{JSON.stringify(props, undefined, 2)}</pre> */}
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch artist data
  const { slug } = context.params || {}
  const data = artists.find((artist) => artist.id.toString() === (slug as string))

  if (!data && context.res) {
    context.res.statusCode = 404
    return { props: { data: null } }
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default ArtistPage
