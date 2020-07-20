export const priceFormatter = (price: string | number): string =>
  `$${price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
