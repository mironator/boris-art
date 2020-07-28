import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/artwork-search/?${queryString.stringify(_req.query)}`
    )
    const data = await apiRes.json()
    const {
      payload: { artwork_search: artworkData },
    } = data

    if (!artworkData) {
      throw new Error('Cannot find artwork search data')
    }

    res.status(200).json(artworkData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
