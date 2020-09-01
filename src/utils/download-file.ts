import https from 'https'

const downloadFile: (url: string) => Promise<string> = async (url) => {
  const snpData = await new Promise<string>((resolve, reject) => {
    // const url = `https://query1.finance.yahoo.com/v7/finance/download/%5EGSPC?period1=${Math.floor(
    //   from / 1e3
    // )}&period2=${Math.floor(to / 1e3)}&interval=${interval}&events=history`

    let data = ''
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`))
        return
      }

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => resolve(data))
    })

    request.on('error', () => {
      reject()
    })
  })

  return snpData
}

export default downloadFile
