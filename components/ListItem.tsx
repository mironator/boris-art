import React from 'react'
import Link from 'next/link'

import { Artist } from '../interfaces'

type Props = {
  data: Artist
}

const ListItem = ({ data }: Props) => (
  <Link href="/artists/[id]" as={`/artists/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
