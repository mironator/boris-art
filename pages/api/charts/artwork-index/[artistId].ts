import { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import queryString from 'query-string'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artistId } = _req.query

    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/artwork-index-chart/?artist_id[eq]=${artistId}&${queryString.stringify(_.omit(_req.query, 'artistId'))}`
    )
    const data = await apiRes.json()

    // {
    //   "payload": {
    //     "artwork_index_chart": [
    //       {
    //         "index": 1,
    //         "date": "1986-02-22",
    //         "volume": 1
    //       },

    const {
      payload: { artwork_index_chart: chartData },
    } = data

    if (!Array.isArray(chartData)) {
      throw new Error('Cannot find chart data')
    }

    res.status(200).json(chartData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
