<script setup lang="ts">
import type { PlaceCommentInput, PlaceInput } from '@layers/places/app/types/place'
import { PLACE_CATEGORIES } from '@layers/places/app/utils/placeCategories'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { getPlace, updatePlace, addComment } = usePlaces()
const place = getPlace(id.value)

if (!place.value) {
  throw createError({ statusCode: 404, statusMessage: 'Заведение не найдено', fatal: true })
}

useHead({ title: () => place.value?.name ?? 'Заведение' })

const category = computed(() => PLACE_CATEGORIES.find((c) => c.value === place.value?.category))

const workFeatures = computed(() => {
  const work = place.value?.workFriendly
  if (!work) return []
  return [
    { label: 'Wi‑Fi', on: work.wifi },
    { label: 'Розетки', on: work.sockets },
    { label: 'Тихо', on: work.quiet },
  ]
})

const isEditOpen = ref(false)

const formInitial = computed<PlaceInput | undefined>(() => {
  if (!place.value) return undefined
  const { category, name, description, address, coords, photos, tags, workFriendly } = place.value
  return { category, name, description, address, coords, photos, tags, workFriendly }
})

function onSave(input: PlaceInput) {
  updatePlace(id.value, input)
  isEditOpen.value = false
}

function onComment(input: PlaceCommentInput) {
  addComment(id.value, input)
}
</script>

<template>
  <div v-if="place" class="container place">
    <NuxtLink to="/" class="place__back">← Все места</NuxtLink>

    <div class="place__hero">
      <PlaceGallery :photos="place.photos" :category="place.category" :alt="place.name" />

      <div class="place__info">
        <p class="place__eyebrow">{{ category?.emoji }} {{ category?.single }}</p>
        <h1 class="place__title">{{ place.name }}</h1>

        <p v-if="place.address" class="place__address">{{ place.address }}</p>

        <div v-if="place.workFriendly" class="place__work">
          <p class="place__work-title">💻 Можно посидеть поработать</p>
          <ul class="place__work-list">
            <li
              v-for="feature in workFeatures"
              :key="feature.label"
              :class="{ 'place__work-item--off': !feature.on }"
            >
              {{ feature.on ? '✓' : '—' }} {{ feature.label }}
            </li>
          </ul>
        </div>

        <p v-if="place.description" class="place__description">{{ place.description }}</p>

        <div v-if="place.tags.length" class="place__tags">
          <AppTag v-for="tag in place.tags" :key="tag">{{ tag }}</AppTag>
        </div>

        <div class="place__actions">
          <AppButton variant="ghost" @click="isEditOpen = true">✎ Редактировать</AppButton>
        </div>
      </div>
    </div>

    <PlaceComments :comments="place.comments" class="place__comments" @add="onComment" />

    <AppModal v-model="isEditOpen" title="Редактирование">
      <PlaceForm :initial="formInitial" submit-label="Сохранить" @submit="onSave" @cancel="isEditOpen = false" />
    </AppModal>
  </div>
</template>

<style scoped>
.place__back {
  display: inline-block;
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
  transition: color 0.2s;
}

.place__back:hover {
  color: var(--color-accent);
}

.place__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 48px;
  align-items: start;
}

@media (max-width: 860px) {
  .place__hero {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

.place__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.place__eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.place__title {
  margin-top: -8px;
  font-size: clamp(44px, 6vw, 72px);
  line-height: 0.95;
}

.place__address {
  color: var(--color-muted);
}

.place__work {
  padding: 16px 20px;
  border: 1px solid rgb(115 214 171 / 0.35);
  border-radius: var(--radius);
  background: var(--color-work-soft);
}

.place__work-title {
  font-weight: 700;
  color: var(--color-work);
}

.place__work-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  margin-top: 8px;
  list-style: none;
  font-size: 14px;
  font-weight: 600;
}

.place__work-item--off {
  color: var(--color-muted);
}

.place__description {
  font-size: 17px;
  white-space: pre-line;
}

.place__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.place__actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.place__comments {
  max-width: 760px;
  margin-top: 72px;
}
</style>
