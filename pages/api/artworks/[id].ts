import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { ArtworkEntity } from '@interfaces/index'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { id } = _req.query

    const apiRes = await fetch(`http://54.156.225.113:8000/v1/artwork/${id}`)
    const data = await apiRes.json()
    const artworkEntity = _.get(data, 'artwork[0]') as ArtworkEntity

    if (!artworkEntity) {
      throw new Error('Cannot find artwork data')
    }

    res.status(200).json(artworkEntity)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
