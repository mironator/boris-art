import moment from 'moment'

export const priceFormatter = (price?: string | number): string =>
  `$${price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

export const dateFormatter = (date?: string | Date): string => moment(date).format('LL')
