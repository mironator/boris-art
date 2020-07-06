import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { artistId } = _req.query
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/price-momentum-chart/?artist_id%5Beq%5D=${artistId}&medium%5Beq%5D=works%20on%20paper&date%5Blte%5D=2012-01-01&date%5Bgte%5D=1990-01-01`
    )
    const data = await apiRes.json()
    const {
      payload: { price_momentum_chart: chartData },
    } = data

    if (!Array.isArray(chartData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(chartData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
