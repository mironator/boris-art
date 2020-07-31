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

    // {
    //   "payload": {
    //     "comparables": [
    //       {
    //         "description": "lithograph, grano-lithograph, collotype in colours, with collage and hand-colouring, on Rives Couronne rag paper, 1974, initialled in pencil, numbered 53/98 (there were also 17 artist's proofs), with the embossed date and plate number, published by Propyläen Verlag, Berlin\nImage & Sheet 755 x 555 mm.",
    //         "exhibited": null,
    //         "lot_image_presigned_url": "https://godunov-dev.s3.amazonaws.com/images/233976322/661577dd-27ea-4b35-ab5e-c3090d5679f7?AWSAccessKeyId=AKIAYDYAAVRWP6JBIQ2M&Signature=JaNF54qrWBIxcn86N9cRITnQPdU%3D&Expires=1598415550",
    //         "lot_image_size": 877746,
    //         "edition_size": 98,
    //         "literature": "Bastian 50",
    //         "lot_image_load_error": null,
    //         "medium_final": "prints",
    //         "condition_in": null,
    //         "measurements_depth": null,
    //         "lot_image_height": 3200,
    //         "creation_year": 1974,
    //         "markings": "initialled in pencil, numbered 53/98, with the embossed date and plate number",
    //         "artist_id": 877,
    //         "id": 261347,
    //         "provenance": null,
    //         "edition_current": 53,
    //         "image_loading_status": "dimensions_saved",
    //         "materials": "lithograph, grano-lithograph, with collage and hand-colouring, on Rives Couronne rag paper",
    //         "lot_image_width": 2373,
    //         "measurements_unit": "centimeters",
    //         "measurements_width": 55.5,
    //         "measurements_height": 75.5,
    //         "size_notes": "image & sheet",
    //         "name": "Plate IX, from: Natural History Part I",
    //         "lot_image_s3_key": "images/233976322/661577dd-27ea-4b35-ab5e-c3090d5679f7",
    //         "similarity": 0
    //       },

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
