export type PlaceCategory = 'coffee' | 'restaurant' | 'bar'

export interface WorkFriendly {
  wifi: boolean
  sockets: boolean
  quiet: boolean
}

export interface PlaceComment {
  id: string
  author: string
  text: string
  createdAt: string
}

export interface Place {
  id: string
  category: PlaceCategory
  name: string
  description: string
  address: string
  photos: string[]
  tags: string[]
  coords?: { lat: number; lng: number }
  workFriendly?: WorkFriendly
  comments: PlaceComment[]
  createdAt: string
  updatedAt: string
}

export type PlaceInput = Pick<
  Place,
  'category' | 'name' | 'description' | 'address' | 'coords' | 'photos' | 'tags' | 'workFriendly'
>

export type PlaceCommentInput = Pick<PlaceComment, 'author' | 'text'>
