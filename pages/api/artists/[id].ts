import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { ArtistEntity } from '@interfaces/index'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { id } = _req.query

    const apiRes = await fetch(`http://54.156.225.113:8000/v1/artist/${id}`)
    const data = await apiRes.json()
    const artistEntity = _.get(data, 'artist[0]') as ArtistEntity

    if (!artistEntity) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(artistEntity)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
