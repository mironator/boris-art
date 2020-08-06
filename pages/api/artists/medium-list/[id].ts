import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

import mediumTypes from '@hooks/mediumTypes'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { id } = _req.query

    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/artist-medium-list?artist_id[eq]=${id}`
    )
    const data = await apiRes.json()
    const mediumList = _.get(data, 'payload.artist_medium_list')?.map(
      (item: any) => item.medium
    ) as Array<keyof typeof mediumTypes>

    res.status(200).json(mediumList || [])
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
