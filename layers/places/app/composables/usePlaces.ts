import type { Place, PlaceInput } from '@layers/places/app/types/place'

// Демо-данные, пока не подключено хранилище.
// Когда появится API, здесь заменится только источник данных:
// компоненты продолжат работать через usePlaces().
const createDemoPlaces = (): Place[] => [
  {
    id: 'demo-coffee-1',
    category: 'coffee',
    name: 'Кофейня у Фонтанки',
    description: 'Отличный фильтр и тыквенный раф. Большие столы у окна, спокойная музыка.',
    address: 'наб. реки Фонтанки, 1',
    photos: [],
    tags: ['фильтр', 'десерты'],
    workFriendly: { wifi: true, sockets: true, quiet: true },
    comments: [],
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
  },
  {
    id: 'demo-coffee-2',
    category: 'coffee',
    name: 'Маленькая обжарка',
    description: 'Крошечное место на пару столиков, но лучший эспрессо в районе.',
    address: 'ул. Рубинштейна, 2',
    photos: [],
    tags: ['эспрессо', 'с собой'],
    comments: [],
    createdAt: '2026-11-02T10:00:00.000Z',
    updatedAt: '2026-11-02T10:00:00.000Z',
  },
  {
    id: 'demo-restaurant-1',
    category: 'restaurant',
    name: 'Северная кухня',
    description: 'Корюшка, щи и пироги. Брали сет на компанию — всем понравилось.',
    address: 'Невский пр., 3',
    photos: [],
    tags: ['русская кухня', 'для компании'],
    comments: [],
    createdAt: '2026-11-03T10:00:00.000Z',
    updatedAt: '2026-11-03T10:00:00.000Z',
  },
  {
    id: 'demo-bar-1',
    category: 'bar',
    name: 'Бар на крыше',
    description: 'Авторские коктейли и вид на крыши. Лучше бронировать на вечер пятницы.',
    address: 'ул. Ломоносова, 4',
    photos: [],
    tags: ['коктейли', 'вид', 'бронь'],
    comments: [],
    createdAt: '2026-11-04T10:00:00.000Z',
    updatedAt: '2026-11-04T10:00:00.000Z',
  },
]

export function usePlaces() {
  const places = useState<Place[]>('places', createDemoPlaces)

  function addPlace(input: PlaceInput): Place {
    const now = new Date().toISOString()
    const place: Place = {
      ...input,
      id: crypto.randomUUID(),
      comments: [],
      createdAt: now,
      updatedAt: now,
    }
    places.value = [place, ...places.value]
    return place
  }

  function getPlace(id: string) {
    return computed(() => places.value.find((place) => place.id === id))
  }

  return { places, addPlace, getPlace }
}
