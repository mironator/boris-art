import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artistId } = _req.query
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/returns-vs-period-chart/?artist_id[eq]=${artistId}`
    )
    const data = await apiRes.json()

    // {
    //   "payload": {
    //     "returns_vs_period_chart": [
    //       {
    //         "period": 12,
    //         "car": -50,
    //         "artwork_id": 81178
    //       },
    //       {
    //         "period": 49,
    //         "car": 97.01,
    //         "artwork_id": 81162
    //       },

    const {
      returns_vs_period_chart: { points: chartData },
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
