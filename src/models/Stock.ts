import parse from 'csv-parse/lib/sync'
import downloadFile from '@utils/download-file'

export type StockInterval = '1d' | '1wk' | '1mo'
export type IndexName = 'SNP500' | 'GOLD' | 'DOW_JONES' | 'MSCI_WORLD_REAL_ESTATE'

export type Index = {
  code: string
  name: string
}

export const INDICES: Record<IndexName, Index> = {
  SNP500: {
    code: '^GSPC',
    name: 'S&P 500',
  },
  GOLD: {
    code: 'GC=F',
    name: 'COMEX Delayed Price',
  },
  DOW_JONES: {
    code: '^DJI',
    name: 'Dow Jones Industrial Average',
  },
  MSCI_WORLD_REAL_ESTATE: {
    code: 'FREL',
    name: 'Fidelity MSCI Real Estate Index ETF (FREL)',
  },
}

type FinanceFunction = (params?: {
  from?: number
  to?: number
  interval?: StockInterval
}) => Promise<unknown>

export const GENERIC_STOCK: (code: string) => FinanceFunction = (code) => async (
  // @ts-ignore
  { from = new Date(1957, 3, 4).getTime(), to = new Date().getTime(), interval = '1mo' } = {}
) => {
  const url = `https://query1.finance.yahoo.com/v7/finance/download/${code}?period1=${Math.floor(
    from / 1e3
  )}&period2=${Math.floor(to / 1e3)}&interval=${interval}&events=history`

  // console.log('[INFO] downloading document', url)

  const snpData = await downloadFile(url)
  const foo = parse(snpData, {
    columns: ['date', 'open', 'high', 'low', 'close', 'adjClose', 'volume'],
    trim: true,
    fromLine: 2,
    // @ts-ignore
  }).map((i, _idx, arr) => ({ ...i, index: i.open / arr[0].open }))

  return foo
}

export const SNP500: FinanceFunction = GENERIC_STOCK(INDICES.SNP500.code)
export const GOLD_PRICE: FinanceFunction = GENERIC_STOCK(INDICES.GOLD.code)
export const DOW_JONES: FinanceFunction = GENERIC_STOCK(INDICES.DOW_JONES.code)
export const MSCI: FinanceFunction = GENERIC_STOCK(INDICES.MSCI_WORLD_REAL_ESTATE.code)

export default { INDICES }
