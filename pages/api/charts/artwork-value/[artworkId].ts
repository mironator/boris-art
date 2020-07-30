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
    //   "artwork_value_chart": {
    //     "values": [
    //       [
    //         66835,
    //         62811,
    //         71534,
    //         "1993-04-01"
    //       ],
    //       ...
    //     ],
    //     "sales": [
    //       [
    //         81239,
    //         68000,
    //         true,
    //         "1993-05-04",
    //         "MP",
    //         "Christie's",
    //         null
    //       ],
    //       ...

    const { artwork_value_chart: chartData } = data

    res.status(200).json(chartData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
