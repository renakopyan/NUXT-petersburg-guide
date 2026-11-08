<script setup lang="ts">
import type { Place } from '@layers/places/app/types/place'
import { PLACE_CATEGORIES } from '@layers/places/app/utils/placeCategories'

const props = defineProps<{ place: Place }>()

const category = computed(() => PLACE_CATEGORIES.find((c) => c.value === props.place.category))
const cover = computed(() => props.place.photos[0])

const workFeatures = computed(() => {
  const work = props.place.workFriendly
  if (!work) return []
  return [work.wifi && 'Wi‑Fi', work.sockets && 'розетки', work.quiet && 'тихо'].filter(Boolean)
})
</script>

<template>
  <NuxtLink :to="`/places/${place.id}`" class="card">
    <div class="card__media">
      <img v-if="cover" :src="cover" :alt="place.name" class="card__image" loading="lazy">
      <div v-else class="card__placeholder" aria-hidden="true">{{ category?.emoji }}</div>

      <span v-if="place.workFriendly" class="card__work">💻 Можно поработать</span>
    </div>

    <div class="card__body">
      <h3 class="card__title">{{ place.name }}</h3>
      <p v-if="place.address" class="card__address">{{ place.address }}</p>
      <p v-if="place.description" class="card__description">{{ place.description }}</p>

      <p v-if="workFeatures.length" class="card__features">{{ workFeatures.join(' · ') }}</p>

      <div v-if="place.tags.length" class="card__tags">
        <AppTag v-for="tag in place.tags.slice(0, 3)" :key="tag">{{ tag }}</AppTag>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, var(--color-accent-soft), var(--color-bg));
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  font-size: 48px;
}

.card__work {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-work-soft);
  color: var(--color-work);
  font-size: 12px;
  font-weight: 600;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
}

.card__title {
  font-size: 17px;
  font-weight: 600;
}

.card__address {
  font-size: 13px;
  color: var(--color-muted);
}

.card__description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
}

.card__features {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-work);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
</style>
