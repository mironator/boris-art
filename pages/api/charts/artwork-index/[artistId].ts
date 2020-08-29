import { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import queryString from 'query-string'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artistId, type } = _req.query
    const path = type ? `artwork-index-${type}-chart` : 'artwork-index-chart'
    const query = {
      'artist_id[eq]': artistId,
      ..._.omit(_req.query, ['artistId', 'type']),
    }
    const url = `http://54.156.225.113:8000/v1/${path}/?${queryString.stringify(query)}`

    const apiRes = await fetch(url)

    const data = await apiRes.json()

    // {
    //   "payload": {
    //     "artwork_index_chart": [
    //       {
    //         "index": 1,
    //         "date": "1986-02-22",
    //         "volume": 1
    //       },

    const chartName = path.replace(/-/g, '_')
    const {
      payload: { [chartName]: chartData },
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
