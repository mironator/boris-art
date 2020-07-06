import { NextApiRequest, NextApiResponse } from 'next'

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (
  _req,
  res
) => {
  try {
    const apiRes = await fetch('http://54.156.225.113:8000/v1/artist/?limit=100&sort=-lots_count')
    const data = await apiRes.json()
    const {
      payload: { artist: sampleUserData },
    } = data

    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
