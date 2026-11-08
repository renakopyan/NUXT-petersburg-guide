import type { PlaceCategory } from '../types/place'

export interface PlaceCategoryMeta {
  value: PlaceCategory
  title: string
  single: string
  emoji: string
}

export const PLACE_CATEGORIES: PlaceCategoryMeta[] = [
  { value: 'coffee', title: 'Кофейни', single: 'Кофейня', emoji: '☕' },
  { value: 'restaurant', title: 'Рестораны', single: 'Ресторан', emoji: '🍽️' },
  { value: 'bar', title: 'Бары', single: 'Бар', emoji: '🍸' },
]
