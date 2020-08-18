import moment from 'moment'
import Event from '@models/Event'
import EventParams from '@models/EventParams'

export const priceFormatter = (price?: string | number): string =>
  `$${price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

export const dateFormatter = (date?: string | Date): string => moment(date).format('LL')

export const formatFlagEventBubble = (event: Event): string => {
  const params: EventParams = EventParams.fromEntity(JSON.parse(event.params))

  const foo = `
    <div style="display: table;">
      <img
        src = "${event.imageUrl}"
        width="55"
        height="45"
        style="float:left;margin: 0 10px 10px 0"/>
      <div style="white-space: normal;width: 300px">
        <strong>${event.type}</strong>
        <br/>
        <strong>Name: </strong> <span>${params.name}</span>
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

  return foo
}
