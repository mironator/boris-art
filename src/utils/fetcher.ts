// @ts-nocheck

const fetcher = (...args: any[]) => {
  return fetch(...args).then((res) => res.json())
}

export default fetcher
