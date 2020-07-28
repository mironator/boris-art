import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artworkId } = _req.query
    const apiRes = await fetch(`http://54.156.225.113:8000/v1/artwork-value-chart/${artworkId}`)
    const data = await apiRes.json()

    // {
    //   "payload": {
    //     "artwork_value_chart": [
    //       {
    //         "value": 15108,
    //         "value_low": 14853,
    //         "sold_for": 31826.5,
    //         "value_high": 15393,
    //         "date": "2006-10-01"
    //       },

    const {
      payload: { artwork_value_chart: chartData },
    } = data

    if (!Array.isArray(chartData)) {
      throw new Error(`Cannot find chart data`)
    }

    res.status(200).json(chartData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
