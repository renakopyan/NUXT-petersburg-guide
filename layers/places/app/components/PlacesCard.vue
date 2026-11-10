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
  <NuxtLink :to="`/places/${place.id}`" class="card" :class="`card--${place.category}`">
    <PlaceCover :category="place.category" :src="cover" :alt="place.name" class="card__cover" />

    <div class="card__shade" aria-hidden="true" />

    <div class="card__top">
      <span class="card__category">{{ category?.single }}</span>
      <span v-if="place.workFriendly" class="card__work">💻 Можно поработать</span>
    </div>

    <div class="card__content">
      <h3 class="card__title">{{ place.name }}</h3>
      <p v-if="place.address" class="card__address">{{ place.address }}</p>
      <p v-if="workFeatures.length" class="card__features">{{ workFeatures.join(' · ') }}</p>

      <div v-if="place.tags.length" class="card__tags">
        <AppTag v-for="tag in place.tags.slice(0, 3)" :key="tag">{{ tag }}</AppTag>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow);
  transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
}

.card:hover {
  border-color: rgb(240 179 91 / 0.35);
  box-shadow: var(--shadow-hover), var(--glow);
  transform: translateY(-4px);
}

.card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* Фото на всю карточку, при наведении лёгкий зум */
.card__cover {
  position: absolute;
  inset: 0;
  z-index: -2;
  transition: transform 0.6s ease;
}

.card:hover .card__cover {
  transform: scale(1.05);
}

.card__cover :deep(.cover__emoji) {
  margin-bottom: 30%;
}

/* Затемнение снизу, чтобы текст читался на любом фото */
.card__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    rgb(6 9 18 / 0.95) 0%,
    rgb(6 9 18 / 0.6) 38%,
    transparent 65%
  );
}

.card__top {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
}

.card__category,
.card__work {
  padding: 5px 12px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card__category {
  background: var(--glass);
  border: 1px solid var(--color-border-strong);
}

.card__work {
  background: rgb(18 48 38 / 0.75);
  border: 1px solid rgb(115 214 171 / 0.4);
  color: var(--color-work);
}

.card__content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
}

.card__title {
  font-size: 30px;
  line-height: 1.05;
  text-shadow: 0 2px 12px rgb(0 0 0 / 0.5);
}

.card__address {
  font-size: 13px;
  color: rgb(238 241 247 / 0.75);
}

.card__features {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-work);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
</style>
