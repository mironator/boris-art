import _ from 'lodash'
import { RESTDataSource } from 'apollo-datasource-rest'

import Event, { EventEntity } from '@models/Event'

type EventResponse = {
  payload: {
    event: EventEntity[]
  }
}

export default class EventDS extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_BASE_URL
  }

  async getEvents(artistId: number): Promise<Event[]> {
    console.log('[INFO] ArtistDS.getEvents')

    const data = await this.get<EventResponse>(
      `http://54.156.225.113:8000/v1/event/?artist_id[eq]=${artistId}`
    )
    const eventData = _.get(data, 'payload.event')

    return eventData.map((entity: EventEntity) => Event.fromEntity(entity))
  }
}
