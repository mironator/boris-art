import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const { artworkId } = _req.query
    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/comparables/?artwork_id[eq]=${artworkId}`
    )
    const data = await apiRes.json()

    const {
      payload: { comparables: chartData },
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
