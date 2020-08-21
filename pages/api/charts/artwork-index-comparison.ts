import { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import queryString from 'query-string'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    console.log('[FOOO] ', `http://54.156.225.113:8000/v1/artwork-index-comparison-chart/?${queryString.stringify(_req.query)}`)
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/artwork-index-comparison-chart/`,
      {
        method: 'POST',
        body: _req.body
      }
    )
    const data = await apiRes.json()

    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
