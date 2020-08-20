import { priceFormatter, dateFormatter } from '@utils/formatters'
import Event from '@models/Event'
import EventParams from '@models/EventParams'

const NO_IMAGE_URL = '/images/no-image-available.png'

const getTooltipImage = (url: string | null | undefined) => `
  <img
    src = "${url || NO_IMAGE_URL}"
    width="55"
    height="45"
    style="margin: 0 10px 10px 0;
    object-fit: scale-down;"
  />`

const getTooltipLink = (artworkId: number, artworkName: string) => `
  <strong><a href="/artworks/${artworkId}">${artworkName}</a></strong>`

export type tooltipTypes = {
  url: string
  artworkId: number
  artworkName: string
  auctionHouseName: string
  date: Date
  price: number
  x?: number
  y?: number
}

export const getTooltipRvsHP = ({
  url,
  artworkId,
  artworkName,
  auctionHouseName,
  date,
  price,
  x,
  y,
}: tooltipTypes): string => {
  return `
    <div style="display: flex;">
      ${getTooltipImage(url)}
      <div style="white-space: normal;width: 200px">
        ${getTooltipLink(artworkId, artworkName)}
      </div>
    </div>
    <strong>Auction house:</strong> <span>${auctionHouseName}</span>
    <br/>
    <strong>Sale date:</strong> <span>${dateFormatter(date)}</span>
    <br/>
    <strong>Sold for:</strong> <span>${priceFormatter(price)}</span>
    <br/>
    <strong>Holding Period (Months):</strong> ${x}<span></span>
    <br/>
    <strong>Realized CAR (%):</strong> <span>${y}</span>
    <br/>
    <strong>Index:</strong> <span>${artworkId}</span>
    <br/>
  `
}

export const getTooltipArtworkValue = ({
  url,
  artworkId,
  artworkName,
  auctionHouseName,
  date,
  price,
}: tooltipTypes): string => {
  return `
    <div style="display: flex;">
      ${getTooltipImage(url)}
      <div style="white-space: normal;width: 200px">
        ${getTooltipLink(artworkId, artworkName)}
      </div>
    </div>
    <strong>Auction house:</strong> <span>${auctionHouseName}</span>
    <br/>
    <strong>Sale date:</strong> <span>${dateFormatter(date)}</span>
    <br/>
    <strong>Sold for:</strong> <span>${priceFormatter(price)}</span>
    <br/>
  `
}

export const getTooltipArtworkIndexAll = (event: Event): string => {
  const params: EventParams = EventParams.fromEntity(JSON.parse(event.params))
  // TODO: update entity
  // @ts-ignore
  const artworkId = event.artwork && event.artwork.id

  return `
    <div style="display: flex;">
      ${getTooltipImage(event.imageUrl)}
      <div style="white-space: normal;width: 300px">
        <strong>BAR ${event.type}</strong>
        <br/>
        <strong>Name: </strong> ${getTooltipLink(artworkId, params.name as string)}
        <br/>
        <strong>Price: </strong> <span>${priceFormatter(params.price)}</span>
      </div>
    </div>
    <strong>Auction house: </strong> <span>${params.auctionHouseName}</span>
    <br/>
    <strong>Auction location: </strong> <span>${params.auctionLocation}</span>
    <br/>
    <strong>Auction name: </strong> <span>${params.auctionName}</span>
    <br/>
    <strong>Auction start date: </strong> <span>${dateFormatter(params.auctionStartDate)}</span>
    <br/>
    <strong>Materials: </strong> <span>${params.materials}</span>
    <br/>
  `
}

// @ts-ignore
export const freezeWorkaround = () => ({
  freezeWorkaround: {
    isFreezed: false,
    clone: {
      g: null,
      div: null,
    },
  },
})

// @ts-ignore
export const toggleTooltipFreze = (chart) => {
  const gPlace = chart.container.firstChild
  const divPlace = chart.container
  const currentG = chart.tooltip.label.element
  const currentDiv = chart.tooltip.label.div
  const tooltipOptions = chart.options.tooltip
  const { clone } = tooltipOptions.freezeWorkaround

  if (tooltipOptions.enabled) {
    clone.g = currentG.cloneNode(true)
    gPlace.appendChild(clone.g)

    clone.div = currentDiv.cloneNode(true)
    divPlace.appendChild(clone.div)
    tooltipOptions.enabled = false
  } else {
    debugger
    if (clone.g) {
      gPlace.removeChild(clone.g)
    }
    if (clone.div) {
      divPlace.removeChild(clone.div)
    }

    tooltipOptions.enabled = true
  }
}

export const rangeSelector = {
  selected: 2,
  allButtonsEnabled: true,
  buttons: [
    {
      type: 'year',
      count: 1,
      text: '1y',
    },
    {
      type: 'year',
      count: 5,
      text: '5y',
    },
    {
      type: 'all',
      text: 'All',
    },
  ],
}
