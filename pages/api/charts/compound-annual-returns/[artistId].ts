import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artistId } = _req.query
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/compound-annual-returns-chart/?artist_id[eq]=${artistId}`
    )
    const data = await apiRes.json()

    // {
    //   "payload": {
    //     "compound_returns": [
    //       {
    //         "date": "1986-01-01",
    //         "car": 100
    //       },
    //       {
    //         "date": "1986-04-01",
    //         "car": 83
    //       },

    const {
      payload: { compound_returns: chartData },
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
