import fetch from 'cross-fetch'
import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import fs from 'fs-extra'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> = async (req, res) => {
  try {
    // parse form with a Promise wrapper
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    // read file from the temporary path
    // const contents = await fs.readFile(data?.files?.file.path, {
    //   encoding: 'utf8',
    // })

    const formData = new FormData()
    // @ts-ignore
    formData.append('file', fs.createReadStream(data?.files?.file.path), {
      // @ts-ignore
      filename: data?.files?.file.name,
      // @ts-ignore
      contentType: data?.files?.file.type,
      // @ts-ignore
      knownLength: data?.files?.file.size,
    })

    // @ts-ignore
    const apiRes = await fetch('http://54.156.225.113:8000/v1/image-upload/', {
      method: 'POST',
      // @ts-ignore
      body: formData,
    })

    const response = await apiRes.json()
    // @ts-ignore
    const foo: { id: number; s3_key: string } = response

    res.status(200).json(foo)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
