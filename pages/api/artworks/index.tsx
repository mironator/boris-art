import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const offset: number = parseInt(_req.query.offset as string, 10) || 0
    const limit: number = parseInt(_req.query.limit as string, 10) || 10

    const apiRes = await fetch(
      `http://54.156.225.113:8000/v1/artwork/?limit=${limit}&offset=${offset}`
    )
    const data = await apiRes.json()
    const {
      payload: { artwork: artworkData },
    } = data

    if (!Array.isArray(artworkData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json({ data: artworkData, ...data.meta })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
