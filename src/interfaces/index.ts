// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type Artist = {
  id: number
  name: string
  birth?: Date
  death?: Date
  qualifier?: string
  lotsCost?: number

}

export type ArtistEntity = {
  id: number
  name: string
  nationality: string
  birth: number
  death: number
  qualifier: string | 'NULL'
  lots_cost: number
}
